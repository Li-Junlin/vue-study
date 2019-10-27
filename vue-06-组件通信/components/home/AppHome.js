(function () {
    const template = `  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <!--右边上半区域-->
                            <h1 class="page-header">Dashboard</h1>
                            <dashboard :attributes="attributes" @delete_attribute="deleteAttribute"></dashboard>
                        
                            <!--右边下半区域-->
                            <h2 class="sub-header">Section title</h2>
                            <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>
                        </div>`

    window.AppHome = {
        template,
        data() {
            return {
                attributes: ["风遁", "水遁", "雷遁", "土遁", "火遁"],
                empList: [
                    { id: "1", name: "卡卡西", skill: "雷遁·千鸟", position: "上忍" },
                    { id: "2", name: "鸣人", skill: "风遁·螺旋手里剑", position: "下忍" },
                    { id: "3", name: "凯", skill: "七门遁甲", position: "上忍" },
                    { id: "4", name: "佐助", skill: "火遁·大火球", position: "下忍" },
                ]
            }
        },
        components: {
            Dashboard,
            HomeList
        },
        methods: {
            deleteEmp(index) {
                this.empList.splice(index, 1)
            },
            deleteAttribute(index) {
                this.attributes.splice(index, 1)
            }
        },
    }

})();