<template>
  <Row>
    <Col span="1" offset="17">
      <router-link :to="{path:'/'}">首页</router-link>
    </Col>
    <Col span="1" v-if="isLogin == false">
      <router-link :to="{path:'/login'}">登录</router-link>
    </Col>
    <Col span="1" v-if="isLogin == false">
      <router-link :to="{path:'/register'}">注册</router-link>
    </Col>
    <Col span="2" v-if="isLogin">
      <div type="text" @click="logout">欢迎，{{this.username}}，点此退出</div>
    </Col>
  </Row>
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

</style>
