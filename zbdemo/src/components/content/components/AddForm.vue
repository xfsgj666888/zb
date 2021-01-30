<template>
  <div>
    <el-button
      class="add-button-add"
      size="small"
      type="primary"
      @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
      <el-form :v-model="form">
        <el-form-item label="库位">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="绑定ip">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="是否占用">
          <el-checkbox v-model="form.lock" style="float: left;"></el-checkbox>
        </el-form-item>
        <el-form-item label="占用taskId">
          <el-input v-model="form.taskId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        location: "",
        ip: "",
        lock: "",
        taskId: "",
        createTime: "",
      },
    };
  },
  methods: {
    clear() {
      this.form = {
        location: "",
        ip: "",
        lock: "",
        taskId: "",
        createTime: "",
      };
      this.dialogFormVisible = false;
    },
    onSubmit() {
      var date1 = dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.$axios
        .post("/location/add", {
          location: this.form.location,
          ip: this.form.ip,
          lock: this.form.lock,
          taskId: this.form.taskId,
          createTime: date1,
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.$emit("onSubmit");
          }
        });
    },
  },
};
</script>

<style>
.add-button-add {
  width: 74px;
  height: 32px;
}
</style>