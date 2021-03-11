<template>
  <div id="accountlist">
    <div class="search">
      <el-input v-model="number" placeholder="编号"></el-input>
      <el-button  icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="container">
        <div class="result">
            <el-table class="table"
                :data="AccountData"
                style="width: 100%; height: 100%"
                max-height="600"
            >
                <el-table-column
                    align="center"
                    prop="number"
                    label="编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="sf"
                    label="身份"
                    :filters="[{ text: '管理员', value: '管理员' }, { text: '老师', value: '老师' }, { text: '学生', value: '学生' }]"
                    :filter-method="filterSF"
                    width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <!-- <el-button
                        size="mini"
                        @click="handleChange(scope.$index, scope.row)"
                        >修改</el-button> -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    
  </div>
</template>
<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
    name: "AccountList",
    data () {
      return {
        number: "",
        AccountData: [
          {
            number: "132332",
            name: "123213324",
            sf: "老师"
          },
          {
            number: "132332",
            name: "123213324",
            sf: "学生"
          },
          {
            number: "132332",
            name: "123213324",
            sf: "学生"
          },
          {
            number: "132332",
            name: "123213324",
            sf: "老师"
          },
          {
            number: "132332",
            name: "123213324",
            sf: "学生"
          }
        ]
      }
    },
    filters: {

    },
    created() {
        this.getAllUserInfo();
    },
    methods: {
        getAllUserInfo() {
            axios({
                method: 'GET',
                url: servicePath.getAllUserInfo,
                withCredentials: true
            }).then(res => {
                // console.log(res);
                if(res.data.data == "没有登录") {
                  this.$router.push({name:'Login'});
                  localStorage.clear();
                }else {
                  this.AccountData = res.data.data;
                }
            })
        },
        filterSF(value, row) {
            return row.sf === value;
        },
        search() {

        },
        // handleChange() {
        // },
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios({
                    method: 'POST',
                    url: servicePath.deleteUserAccount,
                    data: row,
                    withCredentials: true
                }).then(res => {
                    console.log(res);
                    if(res.status == '200') {
                        this.getAllUserInfo();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                    
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>
<style lang="less" scoped>
#accountlist {
  .search{
    min-width: 800px;
    padding: 10px;
    border-radius: 4px;
    background: #cedbf0;
    display: flex;
    justify-content: center;
    .el-input {
      width: 30% !important;
      margin-right: 20px;
    }
  }
  .container{
    margin-top: 10px;
    width: 760px;
    height: 100%;
    min-height: 550px;
    background: #cedbf0;
    padding: 20px;
    border-radius: 10px;
    max-height: 550px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .result{
        width: 760px;
        height: 550px;
        overflow: hidden;
        .el-table {
            max-width: unset;
        }
        .table {
            width: 780px !important;
        }
    }
  }
}
</style>