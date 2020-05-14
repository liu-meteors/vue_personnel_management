<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.empNumber.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column label="部门" prop="departmentName"
                             column-key="date"
                             :filters=departmentFilter
                             :filter-method="filterTag"
            >
            </el-table-column>
            <el-table-column label="职位" prop="positionName"
                             column-key="date"
                             :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                             :filter-method="filterPos"
            >
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-popover
                            placement="right"
                            width="50"
                            trigger="click">
                        <el-upload
                                class="upload-demo"
                                action="http://localhost:8181/importContract"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                accept=".doc, .docx"
                                :on-exceed="handleExceed"
                                :on-success="handleAvatarSuccess"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过100MB</div>
                        </el-upload>
                        <el-button size="mini" slot="reference" @click="uploadContract(scope.$index, scope.row)">上传合同</el-button>
                    </el-popover>
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleDownLoad(scope.$index, scope.row)">下载合同</el-button>


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
                index: '',
                tableData: [{
                    id: '',
                    department: '',
                    posite: '',
                    departmentName: '',
                    positionName: '',
                    fileAddress: ''
                }],
                departmentFilter:[
                    {
                        text: '',
                        value: ''
                    }
                ],
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
            getEmployee(){
                const emp=this
                axios.get('http://localhost:8181/getAllContract').then(function (resp) {
                    emp.tableData=resp.data

                })
            },
            edit(index, row) {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleAvatarSuccess(response, file, fileList) {
                const _this=this
                _this.tableData[_this.index].fileAddress=response.fileAddress
                alert( _this.tableData[_this.index].fileAddress)
                axios.put('http://localhost:8181/updateContract',_this.tableData[_this.index]).then(function (resp) {
                    if (resp.data=='success'){

                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                    }else {
                        _this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'error'
                        });

                    }
                    // _this.$router.push('/employeeInformation')
                })
            },
            uploadContract(index, row){
                this.index=index
            },
            handleDownLoad(index, row) {
                const _this=this
               if (row.fileAddress==null){
                   _this.$notify({
                       title: '警告',
                       message: '合同文件不存在，请先上传',
                       type: 'warning'
                   });
               }else {
                   window.open('http://localhost:8181/downloadContract/'+row.id+'?fileName='+row.departmentName+row.positionName+'的合同.doc')
               }
            }
        },
        created() {
            this.getDepartment()
            this.getEmployee()
        }
    }
</script>

<style scoped>

</style>
