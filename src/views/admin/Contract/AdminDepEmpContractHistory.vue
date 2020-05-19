<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.empNumber.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="工号"
                    prop="empNumber">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    prop="username">
            </el-table-column>
<!--            <el-table-column label="部门" prop="departmentName"-->
<!--                             column-key="date"-->
<!--                             :filters=departmentFilter-->
<!--                             :filter-method="filterTag"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column label="职位" prop="positionName"
                             column-key="date"
                             :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                             :filter-method="filterPos"
            >
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入工号搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="downHistory(scope.$index, scope.row)">下载合同</el-button>
<!--                    <el-popover-->
<!--                            placement="right"-->
<!--                            width="50"-->
<!--                            trigger="click">-->
<!--                        <el-upload-->
<!--                                class="upload-demo"-->
<!--                                action="http://localhost:8181/importHistory"-->
<!--                                :on-preview="handlePreview"-->
<!--                                :on-remove="handleRemove"-->
<!--                                multiple-->
<!--                                :limit="1"-->
<!--                                accept=".pdf, .PDF"-->
<!--                                :on-success="handleAvatarSuccess"-->
<!--                                :file-list="fileList">-->
<!--                            <el-button size="small" type="primary">点击上传</el-button>-->
<!--                            <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过100MB</div>-->
<!--                        </el-upload>-->
<!--                        <el-button size="mini" slot="reference" @click="uploadHistory(scope.$index, scope.row)">上传合同</el-button>-->
<!--                    </el-popover>-->
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            @click="handleDelete(scope.$index, scope.row)">查看历史合同</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <!--        <el-pagination-->
        <!--                background-->
        <!--                layout="prev, pager, next"-->
        <!--                :page-size="5"-->
        <!--                :total="1000"-->
        <!--                @current-change="page">-->
        <!--        </el-pagination>-->
    </div>

</template>

<script>
    export default {
        data() {
            return {
                // pageSize: '',
                // total: '',
                fileList: '',
                historyIndex: '',
                tableData: [{
                    id: '',
                    username: '',
                    phone: '',
                    address: '',
                    empNumber: '',
                    password: '',
                    department: '',
                    posite: '',
                    signDateStr: '',
                    overDateStr: '',
                    salary: '',
                    departmentName: '',
                    positionName: '',
                }],
                contractHistory:{
                    id:'',
                    fileAddress: '',
                    empId: '',
                },
                // departmentFilter:[
                //     {
                //         text: '',
                //         value: ''
                //     }
                // ],
                search: ''
            }
        },
        methods: {
            getDepartment(){
                const dep=this
                axios.get('http://localhost:8181/getAllDepartment').then(function (resp) {
                    dep.departmentForm=resp.data
                    dep.departmentFilter=resp.data
                    console.log(dep.departmentFilter)
                })
            },
            filterPos(value, row) {
                return row.positionName === value;
            },
            filterTag(value, row) {
                return row.departmentName === value;
            },
            getConEmployee(dep){
                const emp=this
                axios.get('http://localhost:8181/getEmpByDep/'+dep).then(function (resp) {
                    emp.tableData=resp.data

                })
            },
            downHistory(index, row) {
                const me=this
               axios.get('http://localhost:8181/getDownHistoryByEmpId/'+row.id).then(function (resp) {
                    if (resp.data==''){
                        me.$notify({
                            title: '警告',
                            message: '该员工并没有上传合同',
                            type: 'warning'
                        });
                    }else {
                        window.open('http://localhost:8181/downloadHistory/'+resp.data.id+'?fileName='+row.username+row.empNumber+'的合同.pdf')
                    }
               })
            },
            uploadHistory(index, row){
                this.contractHistory.empId=row.id
            },
        },
        created() {
            this.getConEmployee(sessionStorage.getItem('dep'))
        }
    }
</script>

<style scoped>

</style>
