(function (Vue) {
	const items = [
		{ id: 1, content: 'vue', completed: false },
		{ id: 2, content: 'Java', completed: false },
		{ id: 3, content: 'Pythen', completed: false }
	]

	const TODO_ITEMS_STORAGE_KEY = "todo_items_key"

	const itemsStorage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(TODO_ITEMS_STORAGE_KEY) || "[]")
		},
		save: function (newItems) {
			localStorage.setItem(TODO_ITEMS_STORAGE_KEY, JSON.stringify(newItems))
		}
	}

	var todoapp = new Vue({
		el: "#todoapp",
		data: {
			itemId: 3,
			items: itemsStorage.fetch(),
			currentItem: null,
			filterStatus: "all"
		},

		watch: {
			items: {
				deep: true,
				handler: function (newItems, oldItems) {
					console.log("调用 items 监听方法")
					itemsStorage.save(newItems)
				}
			}
		},

		computed: {
			filterItem() {
				switch (this.filterStatus) {
					case "active":
						return this.items.filter(item => !item.completed)
						break
					case "completed":
						return this.items.filter(item => item.completed)
						break
					default:
						return this.items
						break
				}
			},
			toggleAll: {
				get() {
					console.log("toggleAll get 方法")
					return this.remaining === 0
				},
				set(newStatus) {
					console.log("toggleAll set 方法")
					this.items.forEach(item => {
						item.completed = newStatus
					});
				}
			},
			remaining() {
				const unItems = this.items.filter(function (item) {
					return !item.completed
				})
				return unItems.length
			}
		},
		methods: {
			finishEdit(item, index, event) {
				if (!this.currentItem) {
					return
				}

				this.currentItem = null

				const content = event.target.value.trim();
				if (!content) {
					console.log("finishEdit 方法")
					this.reomveItam(index)
					return
				}
				item.content = content
			},
			toOrCancelEdit(item) {
				console.log("toOrCancleEdit 方法")
				if (item != null && item.completed) {
					return
				}
				this.currentItem = item
			},
			reomveCompleted() {
				this.items = this.items.filter(item => !item.completed)
			},
			reomveItam(index) {
				console.log("reomveItam 方法")
				this.items.splice(index, 1)
			},
			addItem(event) {
				// 1、获取输入文本类容
				const content = event.target.value.trim();
				console.log("添加类容：", content)
				// 2、判断是否为空
				if (!content.length) {
					console.log("添加类容为空！")
					return
				}
				// 3、添加item
				this.items.push(
					{ id: ++this.itemId, content, completed: false }
				)
				// 4、清空输入框
				event.target.value = ''
				console.log("添加成功！")
			}
		},
		directives: {
			'todo-focus': {
				inserted(el, binbing) {
					el.focus();
				},
				update(el, binbing) {
					el.focus();
				}
			}
		}
	})

	window.onhashchange = function () {
		const hash = window.location.hash.substr(2) || 'all'
		todoapp.filterStatus = hash;
	}

	window.onhashchange()
})(Vue);
