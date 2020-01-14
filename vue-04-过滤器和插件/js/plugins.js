(function () {
    // 声明 MyPlugin 插件对象
    const MyPlugin = {};
    MyPlugin.install = function (Vue, options) {

        // 添加全局方法或属性
        Vue.MyGlobalMethod = function () {
            alert('MyPlugin.myGlobalMethod 全局方法调用')
        };

        // 2、添加全局指令
        Vue.directive('my-directive', {
            inserted(el, binding) {
                el.innerHTML = 'MyPlugin.my-directive 指令被调用：' + binding.value;
            }
        });

        // 3、添加实例方法 new Vue()
        Vue.prototype.$myMethod = function (value) {
            alert('Vue 实例方法myMethod被调用：' + value)
        };
    }
    window.MyPlugin = MyPlugin;
})()