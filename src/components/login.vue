<template>
  <div>
    <c-header></c-header>
    <Row>
      <Col span="12" offset="6">
        <h1>登录</h1>
        <br>
        <br>
        用&ensp;户&ensp;名：
        <Input v-model="username" prefix="ios-contact" placeholder="Enter name" style="width: 280px" />
        <br>
        <br>
        密&ensp;&ensp;&ensp;&ensp;码：
        <Input v-model="password" password type="password" style="width: 280px" />
        <br>
        <br>
        <Button @click="login()">登录</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import CHeader from "./cHeader";
  export default {
    name: "login",
    components: {CHeader},
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        console.log(this.username + " " + this.password);
        this.$cookies.set("username", this.username);
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
