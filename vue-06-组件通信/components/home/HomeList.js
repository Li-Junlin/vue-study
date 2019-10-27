(function () {
    const template = `<div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>姓名</th>
                                <th>技能</th>
                                <th>职位</th>
                                <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <item v-for="(emp, index) in empList" :key="emp.id" :emp="emp" :deleteEmp="deleteEmp" :index="index"/>
                            </tbody>
                        </table>
                        </div>`
    window.HomeList = {
        template,
        props: {
            empList: Array,
            deleteEmp: Function
        },
        components: {
            Item
        }
    }
})();