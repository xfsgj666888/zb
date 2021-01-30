<template>
  <el-menu
    :default-active="'/perUpdate'"
    class="per"
    router
    model="horizontal"
    active-text-color="#409EFF"
  >
    <el-menu-item v-for="(item, i) in perList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "PersonalMenu",
  data() {
    return {
      perList: [
        { name: "/index/content", navItem: "库位操作" },
        { name: "/index/task", navItem: "任务操作" },
      ],
    };
  },
};
</script>
<style>
.per {
  position: fixed;
  margin-left: 0;
  left: 0px;
  top: 60px;
  width: 150px;
  bottom: 0;
}
</style>