<template>
  <div>
    <!-- 查询条件 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top: 20px"
    >
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付方式">
          <el-option
            v-for="option in payTypeOptions"
            :key="option.tyep"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="searchMap.birthday"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="会员生日"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="bottom-position">
        <el-button type="primary" @click="getFatchData">
          <i class="el-icon-search" />查询
        </el-button>
        <el-button type="primary" @click="handleAdd('pojoForm')">
          <i class="el-icon-user-solid" />新增
        </el-button>
        <el-button @click="restForm('searchForm')">
          <i class="el-icon-refresh-right" />重置
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="memberList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="90"></el-table-column>
      <el-table-column prop="cardNum" label="卡号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="birthday" label="生日"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="integral" label="积分"></el-table-column>
      <el-table-column prop="money" label="余额"></el-table-column>
      <el-table-column prop="payType" label="支付方式">
        <template slot-scope="scope">
          <span>{{scope.row.payType | payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />

    <!-- 弹出框 -->
    <el-dialog title="会员编辑" width="500px" :visible.sync="dialogFormVisible">
      <el-form
        ref="pojoForm"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width:400px"
        :model="pojo"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员名字" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="pojo.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="会员生日"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="pojo.payType" placeholder="支付方式">
            <el-option
              v-for="option in payTypeOptions"
              :key="option.tyep"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="pojo.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="addData('pojoForm')">确 定</el-button> -->
        <el-button
          type="primary"
          @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";

const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];

export default {
  data() {
    return {
      memberList: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示10数据
      searchMap: {
        // 条件查询绑定的条件值
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      payTypeOptions,
      dialogFormVisible: false, // 是否打开弹出框，默认关闭弹出框
      pojo: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: ""
      },
      rules: {
        cardNum: [
          { required: true, message: "会员卡号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "会员名字不能为空", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "支付方式不能为空", trigger: "change" }
        ]
      }
    };
  },

  created() {
    this.getFatchData();
  },

  methods: {
    getFatchData() {
      // memberApi.getMemberList().then(repsonse => {
      //   const memberListResp = repsonse.data;
      //   console.log(memberListResp);
      //   this.memberList = memberListResp.data;
      // });
      memberApi
        .searchMember(this.currentPage, this.pageSize, this.searchMap)
        .then(repsonse => {
          const respData = repsonse.data;
          console.log(respData);
          this.memberList = respData.data.rows;
          this.total = respData.data.total;
        });
    },

    // 分页方法
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getFatchData();
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getFatchData();
    },

    // 重置参数
    restForm(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
    },

    // 添加会员信息
    addData(pojoForm) {
      this.$refs[pojoForm].validate(vilid => {
        if (vilid) {
          console.log("参数验证通过！");
          memberApi.addMember(this.pojo).then(response => {
            const respData = response.data;
            if (respData.flag) {
              this.getFatchData();
              this.$message({
                showClose: true,
                message: respData.message,
                type: "success"
              });
              // 获取新列表数据
              this.getFatchData();
              // 退出弹出框
              this.dialogFormVisible = false;
            } else {
              this.$message({
                showClose: true,
                message: respData.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },

    // 弹出新的窗口
    handleAdd(formName) {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick() 是一个异步事件，当渲染结束之后，它的回调函数才会被执行
        this.restForm(formName);
      });
    },

    // 操作方法
    handleEdit(line) {
      console.log(`编辑 ${line.name} 会员信息`);
      // 根据用户Id查询会员信息
      memberApi.getMemberById(line.id).then(response => {
        const respData = response.data;
        if (respData.flag) {
          // 查询成功赋值给 pojo 对象
          this.pojo = respData.data;
          // 打开弹出窗口
          this.handleAdd("pojoForm");
        } else {
          this.$message({
            message: "会员信息查询异常，请稍等再试！",
            type: "wrning"
          });
        }
      });
    },

    // 修改会员信息
    updateData(formName) {
      // 调用验证函数验证表单提交数据
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用api修改会员信息
          memberApi.updateMemberById(this.pojo).then(response => {
            const respData = response.data;
            if (respData.flag) {
              this.$message({
                message: respData.message,
                type: "success"
              });
              this.dialogFormVisible = false;
            } else {
              // 修改失败添加提示信息
              this.$message({
                message: respData.message,
                type: "wrning"
              });
            }
          });
        } else {
          // 提交参数验证失败
          return false;
        }
      });
    },

    handleDelete(line) {
      this.$message(`删除 ${line.name}`);
    }
  },

  filters: {
    payTypeFilter(type) {
      // 在过滤器中不能引用当前实例 this  this.payTypeOptions 错误
      const payObj = payTypeOptions.find(obj => obj.type === type);
      return payObj ? payObj.name : null;
    }
  }
};
</script>

<style scoped>
.bottom-position {
  float: right;
  /* margin-right: 20px; */
}
</style>