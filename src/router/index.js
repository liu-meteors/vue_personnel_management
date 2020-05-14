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


Vue.use(VueRouter)
const routes = [
  //
  {
    path: '/login',
    name: '登录',
    component: Login
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
        meta:[
          {
            access:0
          }
        ]
      },
      {
        path: '/updateEmpInformation',
        name: 'updateEmpInformation',
        component: UpdateEmpInformation,
        meta:[
          {
            access:0
          }
        ]
      },
      {
        path: '/salaryInformation',
        name: 'empSalaryInformation',
        component: SalaryInformation,
        meta:[
          {
            access:0
          }
        ]
      },
      {
        path: '/empRewardAndPunishmentInformation',
        name: 'empRewardAndPunishmentInformation',
        component: EmpRewardAndPunishmentInformation,
        meta:[
          {
            access:0
          }
        ]
      },
      {
        path: '/empOneRewardAndPunishmentInformation',
        name: 'empOneRewardAndPunishmentInformation',
        component: EmpOneRewardAndPunishmentInformation,
        meta:[
          {
            access:0
          }
        ]
      },
      {
        path: '/empLeaveApply',
        name: 'empLeaveApply',
        component: EmpLeaveApply
      },
      {
        path: '/empLeaveCheck',
        name: 'empLeaveCheck',
        component: EmpLeaveCheck
      },
      {
        path: '/empLeaveProcess',
        name: '审批进程',
        component: EmpLeaveProcess
      },
      {
        path: '/empAllLeave',
        name: '请假审批进程',
        component: EmpAllLeave
      },
      {
        path: '/empLeaveInformation',
        name: 'empLeaveInformation',
        component: EmpLeaveInformation
      },
      {
        path: '/empCheck',
        name: 'empCheck',
        component: EmpCheck
      },
      {
        path: '/gradeInformation',
        name: 'gradeInformation',
        component: GradeInformation
      },
      {
        path: '/empPromotionInformation',
        name: 'empPromotionInformation',
        component: EmpPromotionInformation
      },
      {
        path: '/empUserLeaveCheck',
        name: '用户请假信息',
        component: EmpUserLeaveCheck
      },
      {
        path: '/empQuestion',
        name: '考核问卷',
        component: EmpQuestion
      },
      {
        path: '/empBenefitInformation',
        name: '效益信息',
        component: EmpBenefitInformation
      },
      {
        path: '/empRecruitInformation',
        name: '员工招聘信息',
        component: EmpRecruitInformation
      },
      {
        path: '/empInterview',
        name: '员工面试信息',
        component: EmpInterview
      },
      {
        path: '/empAddInterView',
        name: '添加面试信息',
        component: EmpAddInterView
      }
    ]
  },
  {
    path: '/adminIndex',
    name: '部门',
    component: adminIndex,
    meta:{
      requireAuth: true
    },
    // redirect: '/login',
    children: [
      {
        path: '/departmentInformation',
        name: '部门信息',
        component: DepartmentInformation
      },
      {
        path: '/addDepartment',
        name: '创建部门',
        component: AddDepartment
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
        component: EmployeeInformation
      },{
      path: '/addEmployee',
        name: '添加员工',
        component: AddEmployee
      },
      {
        path: '/updateEmployee',
        name: '修改员工信息',
        component: UpdateEmployee
      },
      {
        path: '/recruitInformation',
        name: '招聘信息',
        component: RecruitInformation
      },
      {
        path: '/addRecruit',
        name: '发布招聘信息',
        component: AddRecruit
      },{
      path: '/updateRecruit',
        name: '修改招聘信息',
        component: UpdateRecruit
      },
      {
        path: '/addDimission',
        name: '添加离职信息',
        component: AddDimission
      },{
      path: '/dimissionInformation',
        name: '离职信息',
        component: DimissionInformation
      },
      {
        path: '/updateDimission',
        name: '修改离职信息',
        component: UpdateDimission
      },
      {
        path: '/adminInterview',
        name: '面试信息',
        component: AdminInterview
      },
      {
        path: '/adminAddInterView',
        name: '新增面试',
        component: AdminAddInterView
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
        component: RewardAndPunishmentInformation
      },
      {
        path: '/addRewardOrPunishment',
        name: '添加奖惩信息',
        component: AddRewardOrPunishment
      },
      {
        path: '/oneRewardAndPunishmentInformation',
        name: 'oneRewardAndPunishmentInformation',
        component: OneRewardAndPunishmentInformation
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
        component: AdminPromotionInformation
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
          who: 1
        }
      },
      {
        path: '/adminLeaveInformation',
        name: '请假信息',
        component: AdminLeaveInformation
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
        component: AdminBenefitInformation
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
        component: ContractInformation
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
          next();  //已登录，正常进入
        }
      }else {
        if (to.matched[0].path=='/userIndex'){
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
