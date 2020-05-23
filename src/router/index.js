import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import adminIndex from "../views/admin/adminIndex";
import AddDepartment from "../views/admin/department/AddDepartment";
import DepartmentInformation from "../views/admin/department/DepartmentInformation";
import userIndex from "../views/user/userIndex";
import EmployeeInformation from "../views/admin/employee/EmployeeInformation";
import AddEmployee from "../views/admin/employee/AddEmployee";
import UpdateEmployee from "../views/admin/employee/UpdateEmployee";
import RecruitInformation from "../views/admin/employee/RecruitInformation";
import AddRecruit from "../views/admin/employee/AddRecruit";
import UpdateRecruit from "../views/admin/employee/UpdateRecruit";
import AddDimission from "../views/admin/employee/AddDimission";
import DimissionInformation from "../views/admin/employee/DimissionInformation";
import UpdateDimission from "../views/admin/employee/UpdateDimission";
import RewardAndPunishmentInformation from "../views/admin/RewardAndPunishment/RewardAndPunishmentInformation";
import AddRewardOrPunishment from "../views/admin/RewardAndPunishment/AddRewardOrPunishment";
import EmpInformation from "../views/user/employee/EmpInformation";
import SalaryInformation from "../views/user/salary/SalaryInformation";
import EmpLeaveApply from "../views/user/salary/EmpLeaveApply";
import EmpLeaveCheck from "../views/user/salary/EmpLeaveCheck";
import EmpLeaveInformation from "../views/user/salary/EmpLeaveInformation";
import EmpCheck from "../views/user/check/EmpCheck";
import UpdateEmpInformation from "../views/user/employee/UpdateEmpInformation";
import GradeInformation from "../views/user/salary/GradeInformation";
import AdminPromotionInformation from "../views/admin/Promotion/AdminPromotionInformation";
import EmpPromotionInformation from "../views/user/Promotion/EmpPromotionInformation";
import OneRewardAndPunishmentInformation from "../views/admin/RewardAndPunishment/OneRewardAndPunishmentInformation";
import EmpOneRewardAndPunishmentInformation
  from "../views/user/RewardAndPunishment/EmpOneRewardAndPunishmentInformation";
import EmpRewardAndPunishmentInformation from "../views/user/RewardAndPunishment/EmpRewardAndPunishmentInformation"
import EmpUserLeaveCheck from "../views/user/salary/EmpUserLeaveCheck";
import EmpQuestion from "../views/user/salary/EmpQuestion";
import EmpAllLeave from "../views/user/salary/EmpAllLeave";
import EmpLeaveProcess from "../views/user/salary/EmpLeaveProcess";
import AdminSalaryInformation from "../views/admin/Salary/AdminSalaryInformation";
import AdminLeaveInformation from "../views/admin/Salary/AdminLeaveInformation";
import AdminInterview from "../views/admin/employee/AdminInterview";
import EmpBenefitInformation from "../views/user/Benefit/EmpBenefitInformation";
import AdminBenefitInformation from "../views/admin/Benefit/AdminBenefitInformation";
import AdminAddInterView from "../views/admin/employee/AdminAddInterView";
import ContractInformation from "../views/admin/Contract/ContractInformation";
import EmpRecruitInformation from "../views/user/employee/EmpRecruitInformation";
import EmpInterview from "../views/user/employee/EmpInterview";
import EmpAddInterView from "../views/user/employee/EmpAddInterView";
import NewLogin from "../views/NewLogin";
import AdminEmpContractHistory from "../views/admin/Contract/AdminEmpContractHistory";
import AdminHistoryInformation from "../views/admin/Contract/AdminHistoryInformation";
import EmpAllSalaryInformation from "../views/user/salary/EmpAllSalaryInformation";
import AdminDepEmployeeInformation from "../views/admin/employee/AdminDepEmployeeInformation";
import AdminDepInterview from "../views/admin/employee/AdminDepInterview";
import DepDimissionInformation from "../views/admin/employee/DepDimissionInformation";
import AdminDepEmpContractHistory from "../views/admin/Contract/AdminDepEmpContractHistory";
import AdminDepSalaryInformation from "../views/admin/Salary/AdminDepSalaryInformation";
import AdminDepLeaveInformation from "../views/admin/RewardAndPunishment/AdminDepLeaveInformation";
import DepRewardAndPunishmentInformation from "../views/admin/RewardAndPunishment/DepRewardAndPunishmentInformation";
import AdminDepPromotionInformation from "../views/admin/Promotion/AdminDepPromotionInformation";


Vue.use(VueRouter)
const routes = [
  //
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/newLogin',
    name: '123',
    component: NewLogin
  },
  {
    path: '/userIndex',
    name: '用户首页',
    component: userIndex,
    children:[
      {
        path: '/empInformation',
        name: '个人信息',
        component: EmpInformation,
        meta:{
          access: 999
        }

      },
      {
        path: '/updateEmpInformation',
        name: 'updateEmpInformation',
        component: UpdateEmpInformation,
        meta:{
          access: 999
        }
      },
      {
        path: '/salaryInformation',
        name: 'empSalaryInformation',
        component: SalaryInformation,
        meta:{
          access: 999
        }
      },
      {
        path: '/empRewardAndPunishmentInformation',
        name: 'empRewardAndPunishmentInformation',
        component: EmpRewardAndPunishmentInformation,
        meta:{
          access: 999
        }
      },
      {
        path: '/empOneRewardAndPunishmentInformation',
        name: 'empOneRewardAndPunishmentInformation',
        component: EmpOneRewardAndPunishmentInformation,
        meta:{
          access: 999
        }
      },
      {
        path: '/empLeaveApply',
        name: 'empLeaveApply',
        component: EmpLeaveApply,
        meta:{
          access: 999
        }
      },
      {
        path: '/empLeaveCheck',
        name: 'empLeaveCheck',
        component: EmpLeaveCheck,
        meta:{
          access: 2
        }
      },
      {
        path: '/empLeaveProcess',
        name: '审批进程',
        component: EmpLeaveProcess
      },
      {
        path: '/empAllLeave',
        name: '请假审批进程',
        component: EmpAllLeave,
        meta:{
          access: 999
        }
      },
      {
        path: '/empLeaveInformation',
        name: 'empLeaveInformation',
        component: EmpLeaveInformation,
        meta:{
          access: 2
        }
      },
      {
        path: '/empCheck',
        name: 'empCheck',
        component: EmpCheck
      },
      {
        path: '/gradeInformation',
        name: 'gradeInformation',
        component: GradeInformation,
        meta:{
          access: 999
        }
      },
      {
        path: '/empPromotionInformation',
        name: 'empPromotionInformation',
        component: EmpPromotionInformation,
        meta:{
          access: 999
        }
      },
      {
        path: '/empUserLeaveCheck',
        name: '用户请假信息',
        component: EmpUserLeaveCheck
      },
      {
        path: '/empQuestion',
        name: '考核问卷',
        component: EmpQuestion,
        meta:{
          access: 999
        }
      },
      {
        path: '/empBenefitInformation',
        name: '效益信息',
        component: EmpBenefitInformation,
        meta:{
          access: 3
        }
      },
      {
        path: '/empRecruitInformation',
        name: '员工招聘信息',
        component: EmpRecruitInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/empInterview',
        name: '员工面试信息',
        component: EmpInterview,
        meta:{
          access: 1
        }
      },
      {
        path: '/empAddInterView',
        name: '添加面试信息',
        component: EmpAddInterView,
        meta:{
          access: 1
        }
      },
      {
        path: '/empAllSalaryInformation',
        name: '全部工资信息',
        component: EmpAllSalaryInformation,
        meta:{
          access: 999
        }
      }
    ]
  },
  {
    path: '/adminIndex',
    name: '部门',
    component: adminIndex,
    // redirect: '/login',
    children: [
      {
        path: '/departmentInformation',
        name: '部门信息',
        component: DepartmentInformation,
        meta:{
          access: 999
        }

      },
      {
        path: '/addDepartment',
        name: '创建部门',
        component: AddDepartment,
        meta:{
          access: 999
        }
      }
    ]
  },
  {
    path: '/navigation',
    name: '员工',
    component: adminIndex,
    children: [
      {
        path: '/employeeInformation',
        name: '员工信息',
        component: EmployeeInformation,
        meta:{
          access: 1
        }
      },{
      path: '/addEmployee',
        name: '添加员工',
        component: AddEmployee,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminDepEmployeeInformation',
        name: '部门员工信息',
        component:AdminDepEmployeeInformation,
        meta:{
          access: 0
        }
      },
      {
        path: '/updateEmployee',
        name: '修改员工信息',
        component: UpdateEmployee,
        meta:{
          access: 1
        }
      },
      {
        path: '/recruitInformation',
        name: '招聘信息',
        component: RecruitInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/addRecruit',
        name: '发布招聘信息',
        component: AddRecruit,
        meta:{
          access: 1
        }
      },{
      path: '/updateRecruit',
        name: '修改招聘信息',
        component: UpdateRecruit,
        meta:{
          access: 1
        }
      },
      {
        path: '/addDimission',
        name: '添加离职信息',
        component: AddDimission,
        meta:{
          access: 1
        }
      },{
      path: '/dimissionInformation',
        name: '离职信息',
        component: DimissionInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/depDimissionInformation',
        name: '部门离职信息',
        component: DepDimissionInformation,
        meta:{
          access: 0
        }
      },
      {
        path: '/updateDimission',
        name: '修改离职信息',
        component: UpdateDimission,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminInterview',
        name: '面试信息',
        component: AdminInterview,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminDepInterview',
        name: '部门面试信息',
        component: AdminDepInterview,
        meta:{
          access: 0
        }
      },
      {
        path: '/adminAddInterView',
        name: '新增面试',
        component: AdminAddInterView,
        meta:{
          access: 1
        }
      }
    ]
  },
  {
    path: '/navigation',
    name: '奖惩',
    component: adminIndex,
    children: [
      {
        path: '/rewardAndPunishmentInformation',
        name: '奖惩信息',
        component: RewardAndPunishmentInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/addRewardOrPunishment',
        name: '添加奖惩信息',
        component: AddRewardOrPunishment,
        meta:{
          access: 1
        }
      },
      {
        path: '/oneRewardAndPunishmentInformation',
        name: 'oneRewardAndPunishmentInformation',
        component: OneRewardAndPunishmentInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/depRewardAndPunishmentInformation',
        name: '部门奖惩信息',
        component: DepRewardAndPunishmentInformation,
        meta:{
          access: 0
        }
      }
    ]
  },
  {
    path: '/navigation',
    name: '晋升',
    component: adminIndex,
    children:[
      {
        path: '/adminPromotionInformation',
        name: 'adminPromotionInformation',
        component: AdminPromotionInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminDepPromotionInformation',
        name: '部门晋升信息',
        component: AdminDepPromotionInformation,
        meta:{
          access: 0
        }
      }
    ]
  },
  {
    path: '/navigation',
    name: '工资',
    component: adminIndex,
    children:[
      {
        path: '/adminSalaryInformation',
        name: '工资信息',
        component: AdminSalaryInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminLeaveInformation',
        name: '请假信息',
        component: AdminLeaveInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminDepSalaryInformation',
        name: '部门工资信息',
        component:AdminDepSalaryInformation,
        meta:{
          access: 0
        }
      },
      {
        path: '/adminDepLeaveInformation',
        name: '部门请假信息',
        component:AdminDepLeaveInformation,
        meta:{
          access: 0
        }
      }
    ]
  },
  {
    path: '/navigation',
    name: '效益',
    component: adminIndex,
    children: [
      {
        path: '/adminBenefitInformation',
        name: '管理效益',
        component: AdminBenefitInformation,
        meta:{
          access: 1
        }
      }
    ]
  },
  {
    path: '/navigation',
    name: '合同',
    component: adminIndex,
    children: [
      {
        path: '/contractInformation',
        name: '合同信息',
        component: ContractInformation,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminDepEmpContractHistory',
        name: '部门员工合同历史',
        component:AdminDepEmpContractHistory
      },
      {
        path: '/adminEmpContractHistory',
        name: '所有员工的合同历史',
        component: AdminEmpContractHistory,
        meta:{
          access: 1
        }
      },
      {
        path: '/adminHistoryInformation',
        name: '员工合同历史',
        component: AdminHistoryInformation,
        meta:{
          access: 1
        }
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const identity=sessionStorage.getItem("identity");
  const isLogin = sessionStorage.getItem('isLogin'); //获取本地存储的登陆信息
  const dep=sessionStorage.getItem('dep');
  const pos=sessionStorage.getItem('pos');
  // alert(isLogin)
  if (to.name == '登录') { //判断是否进入的login页
    next();
  } else { //如果进入的非login页
    if (isLogin == "true") {   //同样判断是否登陆
      // console.log(to.matched[0].path)
      if (identity=='admin'){

        if (to.matched[0].path=='/userIndex'){
          next({ name: '登录'});
        }else {
          axios.defaults.headers.common['token']=sessionStorage.getItem('identity')+sessionStorage.getItem('empId')
          if (to.meta.access==999){
            // alert(11111)
            if (dep!=0){
              next({ name: '部门员工信息'});
            }else {
              next();
            }
          }else if (to.meta.access==0){
            // alert('需要验证')
            if (dep==0||dep==1){
              // alert('不通过'+from.name)
              next({ name: '员工信息'});
            }else {
              next();
            }
          }else if (to.meta.access==1){
            if (dep!=0&&dep!=1){
              next({ name: '部门员工信息'});
            }else {
              next();
            }
          }else {
            next();  //已登录，正常进入
          }



        }
      }else {
        if (to.matched[0].path=='/userIndex'){
          switch (to.meta.access) {
            case 1:
              if (dep==1){
                next();
              }else {
                next({ name: 'empSalaryInformation'});
              }
              break;
            case 2:
              if (dep==1||pos==1){
                next()
              }else {
                next({ name: 'empSalaryInformation'});
              }
              break;
            case 3:
              if (pos==1){
                next()
              }else {
                next({ name: 'empSalaryInformation'});
              }

              break;
            case 999:
              next();
              break;

          }
          axios.defaults.headers.common['token']=sessionStorage.getItem('identity')+sessionStorage.getItem('empId')
          next();  //已登录，正常进入

        }else {
          next({ name: '登录'});
        }
      }
    } else {
      next({ name: '登录'});  //没登录，跳转到login页
    }
  }
});
export default router
