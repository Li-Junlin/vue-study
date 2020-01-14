<template>
  <div>
    <app-header></app-header>
    <app-narbar></app-narbar>
    <app-main></app-main>
  </div>
</template>
<script>
// 导入组件
import AppHeader from "./AppHeader";
import AppNarbar from "./AppNarbar";
import AppMain from "./AppMain";
export default {
  components: { AppHeader, AppNarbar, AppMain }
};
</script>

<style scoped>
/**头部样式 */
.header {
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}
/**导航栏样式 */
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color: #545c64;
}
/**主页面样式 */
.main {
  position: absolute;
  padding: 10px;
  top: 50px;
  left: 230px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  /* background-color: #204366; */
}
</style>
