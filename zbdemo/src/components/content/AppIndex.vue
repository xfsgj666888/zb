<template>
  <el-container>
    <el-header class="app-el-header">
      <nav-menu></nav-menu>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <content-menu></content-menu>
      </el-aside>
      <el-container>
        <el-main class="app-el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "../menu/NavMenu";
import ContentMenu from "../menu/ContentMenu";
export default {
  name: "ContentIndex",
  components: {
    ContentMenu,
    NavMenu,
  },
};
</script>
<style>
.app-el-header {
  padding: 0;
}
.app-el-main {
  padding: 0 20px;
}
</style>