<template>
  <div>
    <c-header></c-header>
    <Row>
      <Col span="12" offset="6">
        <h1>注册</h1>
        <br>
        <br>
        用&ensp;户&ensp;名：
        <Input v-model="username" prefix="ios-contact" placeholder="Enter name" style="width: 280px" @input="change" />
        <br>
        <br>
        密&ensp;&ensp;&ensp;&ensp;码：
        <Input v-model="password" password type="password" style="width: 280px" @input="change" />
        <br>
        <br>
        重复密码：
        <Input v-model="repassword" password type="password" style="width: 280px" @input="change" />
        <br>
        <br>
        <Button :disabled="avalableFn" @click="register()">注册</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import CHeader from "./cHeader";
  export default {
    name: "register",
    components: {CHeader},
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
        avalable: false
      }
    },
    computed: {
      avalableFn() {
        return !this.avalable;
      }
    },
    methods: {
      register: function () {
        console.log(this.username + " " + this.password);
        this.$router.push('/login');
      },
      change: function () {
        this.avalable = (this.password === this.repassword) && this.username != '' && this.password != '';
        console.log(this.avalable);
      }
    }
  }
</script>

<style scoped>

</style>
