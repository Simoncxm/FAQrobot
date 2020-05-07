<template>
  <div>
    <h1>知识图谱生成</h1>
    <h2>输入文章</h2>
    <Input v-model="text" type="textarea" :rows="5" placeholder="Enter something..." />
    <Button @click="postText">提交</Button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    postText: function () {
      console.log(this.text);
    }
  }
}
</script>
