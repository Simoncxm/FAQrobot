<template>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <MenuItem name="1">
          <Icon type="ios-home" />
          <router-link :to="{path:'/'}">首页</router-link>
        </MenuItem>
        <MenuItem name="2" v-if="!isLogin">
          <Icon type="md-person" />
          <router-link :to="{path:'/login'}">登录</router-link>
        </MenuItem>
        <MenuItem name="3" v-if="!isLogin">
          <Icon type="md-person-add" />
          <router-link :to="{path:'/register'}">注册</router-link>
        </MenuItem>
        <MenuItem name="4" v-if="isLogin">
          <Icon type="md-home" />
          <div type="text" @click="logout">欢迎，{{this.username}}，点此退出</div>
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
  export default {
    name: "cHeader",
    data() {
      return {
        isLogin: false,
        username: ''
      }
    },
    created() {
      this.isLogin = this.$cookies.isKey("username") != null && this.$cookies.isKey("username") != '';
      if (this.isLogin) {
        this.username = this.$cookies.get("username");
      }
    },
    methods: {
      logout: function () {
        this.$cookies.remove("username");
        this.isLogin = false;
      }
    }
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>

