<template>
  <div>
    <div class="con-div-one">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="con-div-two">
      <el-row>
        <search-bar class="con-search-bar" ref="searchBar"></search-bar>
        <add-form class="con-add"></add-form>
      </el-row>
      <div>
        <el-table
          :data="
            locations.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          border
          :height="735 + 'px'"
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" width="150">
          </el-table-column>
          <el-table-column prop="location" label="库位" width="200">
          </el-table-column>
          <el-table-column prop="ip" label="绑定ip" width="200">
          </el-table-column>
          <el-table-column prop="lock" label="占用情况" width="200" :formatter = "formatter">
          </el-table-column>
          <el-table-column prop="taskId" label="占用taskId" width="200">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="show(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteLocations(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 15, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="locations.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-dialog class="con-dialog" title="修改信息" :visible.sync="dialogEditFormVisible">
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
          <el-button type="primary" @click="editLocations">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import SearchBar from "../components/SearchBar";
import AddForm from "../components/AddForm";
export default {
  name: "Content",
  components: {
    SearchBar,
    AddForm,
  },
  data() {
    return {
      dialogEditFormVisible: false,
      pagesize: 5,
      currentPage: 1,
      locations: [],
      form: {
        id: "",
        location: "",
        ip: "",
        lock: "",
        taskId: "",
        createTime: "",
      },
    };
  },
  mounted: function () {
    this.loadLocations();
  },
  methods: {
    loadLocations() {
      this.$axios.get("/location/list").then((resp) => {
        this.locations = resp.data.data.content;
      });
    },
    show(row) {
      var _lock = true;
      if (row.lock == "未占用") {
        var _lock = false;
      }
      this.dialogEditFormVisible = true;
      this.form = {
        id: row.id,
        location: row.location,
        ip: row.ip,
        lock: _lock,
        taskId: row.taskId,
        createTime: row.createTime,
      };
    },
    clear() {
      this.form = {
        id: "",
        location: "",
        ip: "",
        lock: "",
        taskId: "",
      };
      this.dialogEditFormVisible = false;
    },
    editLocations() {
      var date1 = dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.$axios
        .post("/location/edit", {
          id: this.form.id,
          location: this.form.location,
          ip: this.form.ip,
          lock: this.form.lock,
          taskId: this.form.taskId,
          createTime: this.form.createTime,
          updateTime: date1,
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.$emit("editLocations", row);
          }
        });
    },
    deleteLocations(row) {
      // this.$confirm("确认删除？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.$axios.delete("/location/delete").then((resp) => {
      //       this.loadLocations();
      //       this.$emit("deleteLocations", row);
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消",
      //     });
      //   });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    formatter(row, index) {
      if (row.lock == true) {
        row.lock = "已占用";
      }
      if (row.lock == false) {
        row.lock = "未占用";
      }
      return row.lock
    },
  },
};
</script>

<style>
.con-div-one {
  margin: 20px 0px;
}
.con-div-two {
  overflow: hidden;
  margin: 5px 10px;
}
.con-search-bar {
  float: left;
}
.con-add {
  float: right;
}
</style>