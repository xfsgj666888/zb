<template>
  <div class="nav-div">
    <img src="../../assets/1.jpg"/>
    <i
      class="el-icon-switch-button"
    ></i>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
}
</script>

<style>
.nav-div{
  width: 100%;
  background-color: rgb(253, 209, 0);
  overflow: hidden;
}

.nav-div img{
  width: 110px;
  float: left;
  margin: auto 20px;
}

.el-icon-switch-button {
  cursor: pointer;
  outline: 0;
  float: right; 
  font-size: 40px; 
  color: #222; 
  padding: 10px;
}
</style>