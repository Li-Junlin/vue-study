import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home";
import Member from "@/views/member";
import Supplier from "@/views/supplier";
import Goods from "@/views/goods";
import Staff from "@/views/staff";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "/login", // 路由名称
      component: Login // 组件对象 
    }, {
      path: "/",
      name: "layout",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          meta: { title: "首页" },
          component: Home
        }
      ]
    }, {
      path: "/member",
      component: Layout,
      children: [
        {
          path: "/",
          component: Member,
          meta: { title: "会员管理" }
        }
      ]
    }, {
      path: "/supplier",
      component: Layout,
      children: [
        {
          path: "/",
          component: Supplier,
          meta: { title: "供应商管理" }
        }
      ]
    }, {
      path: "/goods",
      component: Layout,
      children: [
        {
          path: "/",
          component: Goods,
          meta: { title: "商品管理" }
        }
      ]
    }, {
      path: "/staff",
      component: Layout,
      children: [
        {
          path: "/",
          component: Staff,
          meta: { title: "员工管理" }
        }
      ]
    }

  ]
});

export default router;
