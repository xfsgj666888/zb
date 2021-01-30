<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-input
      @keyup.enter.native="searchClick"
      placeholder=""
      prefix-icon="el-icon-search"
      size="small"
      style="width: 400px;margin-right: 10px"
      v-model="keywords">
    </el-input>
    <el-button class="seach-button" size="small" type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    data () {
      return {
        keywords: '',
      }
    },
    methods: {
    }
  }
</script>
<style>
    .seach-button{
        width: 74px;
        height: 32px;
    }
</style>