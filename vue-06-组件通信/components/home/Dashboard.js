(function () {
    const template = `<div class="row placeholders">
                        <div v-for="(attribute, index) in attributes" :key=index class="col-xs-6 col-sm-3 placeholder">
                            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
                            height="200" class="img-responsive" alt="Generic placeholder thumbnail">
                            <h4>{{attribute}}</h4>
                            <span class="text-muted">
                                <a href="#" @click="deleteAttribute(index)">删除</a>
                            </span>
                        </div>
                     </div>`
    window.Dashboard = {
        props: ["attributes"],
        methods: {
            deleteAttribute(index){
                this.$emit("delete_attribute", index)
            }
        },
        template
    }
})();