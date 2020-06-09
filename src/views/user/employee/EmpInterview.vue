<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="今日面试" name="first">
            <div>
                <el-table
                        v-loading="loading"
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="面试信息"
                            prop="viewDateStr"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="电话"
                            prop="phone">
                    </el-table-column>
                    <el-table-column
                            label="地点"
                            prop="address">
                    </el-table-column>
                    <el-table-column
                            label="部门"
                            prop="departmentName"
                            column-key="date"
                            :filters=departmentFilter
                            :filter-method="filterTag"
                    >
                    </el-table-column>
                    <el-table-column
                            label="职位"
                            prop="positionName"
                            column-key="date"
                            :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                            :filter-method="filterPos"
                    >
                    </el-table-column>
                    <el-table-column
                            label="面试状态"
                            prop="isInterview"
                            column-key="date"
                            :filters="[{text: '未面试', value: '未面试'}, {text: '已面试', value: '已面试'}, {text: '已拒绝', value: '已拒绝'},{text: '已发送',value: '已发送'}]"
                            :filter-method="filterType"
                    >
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入姓名搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="downLoad(scope.$index, scope.row)">下载简历</el-button>
                            <el-button
                                    :disabled="scope.row.isView==1"
                                    size="mini"
                                    @click="interview(scope.$index, scope.row)">面试</el-button>
                            <el-popover
                                    placement="right"
                                    width="50"
                                    trigger="click">
                                <el-upload
                                        class="upload-demo"
                                        action="http://localhost:8181/importMail"
                                        :on-preview="handlePreview"
                                        multiple
                                        :limit="1"
                                        accept=".doc, .docx"
                                        :on-success="handleAvatarSuccess"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过100MB</div>
                                </el-upload>
                                <el-button size="mini" slot="reference" :disabled="scope.row.isSend==1" @click="sendMail(scope.$index, scope.row)">发送</el-button>
                            </el-popover>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="全部信息" name="second">
            <div>
                <el-table
                        v-loading="loading"
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="面试信息"
                            prop="viewDateStr"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="电话"
                            prop="phone">
                    </el-table-column>
                    <el-table-column
                            label="地点"
                            prop="address">
                    </el-table-column>
                    <el-table-column
                            label="部门"
                            prop="departmentName"
                            column-key="date"
                            :filters=departmentFilter
                            :filter-method="filterTag"
                    >
                    </el-table-column>
                    <el-table-column
                            label="职位"
                            prop="positionName"
                            column-key="date"
                            :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                            :filter-method="filterPos"
                    >
                    </el-table-column>
                    <el-table-column
                            label="面试状态"
                            prop="isInterview"
                            column-key="date"
                            :filters="[{text: '未面试', value: '未面试'}, {text: '已面试', value: '已面试'}, {text: '已拒绝', value: '已拒绝'},{text: '已发送',value: '已发送'}]"
                            :filter-method="filterType"
                    >
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入姓名搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="downLoad(scope.$index, scope.row)">下载简历</el-button>
                            <el-button
                                    :disabled="scope.row.isView==1"
                                    size="mini"
                                    @click="interview(scope.$index, scope.row)">面试</el-button>
                            <el-popover
                                    placement="right"
                                    width="50"
                                    trigger="click">
                                <el-upload
                                        class="upload-demo"
                                        action="http://localhost:8181/importMail"
                                        :on-preview="handlePreview"
                                        multiple
                                        :limit="1"
                                        accept=".doc, .docx"
                                        :on-success="handleAvatarSuccess"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过100MB</div>
                                </el-upload>
                                <el-button size="mini" slot="reference" :disabled="scope.row.isSend==1" @click="sendMail(scope.$index, scope.row)">发送</el-button>
                            </el-popover>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        name: "AdminPromotionInformation",
        data() {
            return {
                fileList: '',
                activeName: 'first',
                empId: '',
                sendIndex: '',
                tableData: [{
                    id: '',
                    name: '',
                    phone: '',
                    address: '',
                    mail: '',
                    isView: '',
                    isSend: '',
                    viewDate: '',
                    viewDateStr: '',
                    departmentName: '',
                    positionName: '',
                    isInterview: ''

                }],
                departmentForm: {
                    id: '',
                    name: ''
                },
                departmentFilter:[
                    {
                        text: '',
                        value: ''
                    }
                ],
                search: '',
                loading: false
            }
        },
        methods: {
            sendMail(index, row){
                this.empId=row.id
                this.sendIndex=index
            },
            updateSend(id){
                const _this=this

                _this.tableData[_this.sendIndex].isSend=1
                _this.tableData[_this.sendIndex].isView=1
                axios.put('http://localhost:8181/updateInterviewById',_this.tableData[_this.sendIndex]).then(function (resp) {
                    if (resp.data=='success'){
                        _this.$notify({
                            title: '成功',
                            message: '发送成功',
                            type: 'success'
                        });
                        _this.loading=false;
                    }else {
                        _this.tableData[_this.sendIndex].isSend=0
                        _this.$notify.error({
                            title: '错误',
                            message: '发送失败'
                        });
                        _this.loading=false;
                    }
                })
            },
            handleAvatarSuccess(response, file, fileList) {
                const _this=this
                _this.loading=true;
                axios.get('http://localhost:8181/sendOffer/'+response.fileName+'/'+_this.empId).then(function (resp) {

                    if (resp.data=='success'){
                        _this.updateSend(_this.empId)

                    }else {
                        _this.$notify.error({
                            title: '错误',
                            message: '发送失败'
                        });
                    }
                })
            },
            handlePreview(file) {

                console.log(file);
            },
            getDepartment(){
                const dep=this
                axios.get('http://localhost:8181/getAllDepartment').then(function (resp) {
                    dep.departmentForm=resp.data
                    dep.departmentFilter=resp.data
                    console.log(dep.departmentFilter)
                })
            },
            getInterviewNow(){
                const _this=this

                axios.get('http://localhost:8181/getAllInterviewNow').then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            getInterview(){
                const _this=this
                axios.get('http://localhost:8181/getAllInterview').then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.departmentName === value;
            },
            filterType(value, row) {
                return row.isInterview === value;
            },
            filterPos(value, row) {
                return row.positionName === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleClick(tab, event) {
                console.log(tab, event);
                if (tab.name=='first'){
                    this.getInterviewNow()
                }else {
                    this.getInterview()
                }

            },
            downLoad(index, row){
                window.location.href='http://localhost:8181/download/'+row.id+'?fileName='+row.name+'的简历.pdf'
                // window.open('http://localhost:8181/download/'+row.id+'?fileName='+row.name+'的简历.pdf')
            },
            look(index, row){
                window.location.href=row.fileUrl
            },
            interview(index, row){
                const _this=this
                row.isView=1
                axios.put('http://localhost:8181/updateInterviewById',row).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            send(index, row){
                window.location.href=row.fileUrl
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({
                    path:'/empLeaveInformation',
                    query:{
                        leaveId: row.id
                    }
                })
            },
            handleDelete(index, row) {
                const _this=this
                axios.delete('http://localhost:8181/deleteInterviewById/'+row.id).then(function (resp) {
                    if (resp.data=='success'){
                        window.location.reload()
                    }else {
                        _this.$notify.error({
                            title: '错误',
                            message: '删除失败'
                        });
                    }
                })
            },
        },
        created() {
            this.getInterviewNow()
            // this.getInterview()
            this.getDepartment()
        }
    }
</script>

<style scoped>

</style>
