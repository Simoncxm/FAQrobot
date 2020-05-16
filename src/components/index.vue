<template>
  <div>
    <c-header></c-header>
    <Row>
      <Col span="12" offset="6">
        <h1>知识图谱生成</h1>
        <h2>输入文章</h2>
        <Input v-model="text" type="textarea" :rows="5" placeholder="Enter something..." />
        <br>
        <br>
        <Button @click="postText">提交</Button>
      </Col>
    </Row>
    <Row>
      <div v-if="show">
        <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
        <br>
        <h3>提出问题</h3>
        <Input v-model="question" clearable style="width: 300px" />
        <br>
        答案：
        {{answer}}
      </div>

    </Row>
  </div>
</template>

<script>
  import CHeader from "./cHeader";
  export default {
    name: 'index',
    components: {CHeader},
    data() {
      return {
        text: '',
        question: '',
        answer: 'nmsl',
        show: false,
        graphData: [{
          name: 'node01'
        }, {
          name: 'node02'
        }, {
          name: 'node03'
        }, {
          name: 'node04'
        }, {
          name: 'node05'
        }, {
          name: 'node06'
        }],
        graphLink: [{
          source: 'node03',
          target: 'node02',
          name: 'link01',
        }, {
          source: 'node01',
          target: 'node03',
          name: 'link02',
        }, {
          source: 'node06',
          target: 'node04',
          name: 'link03'
        }, {
          source: 'node01',
          target: 'node05',
          name: 'link04'
        }]
      }
    },
    mounted() {
      //this.drawPic();
      console.log(this.$cookies.isKey("username") + '\n');
      console.log(this.$cookies.get("username"));
    },
    methods: {
      postText: function () {
        this.$axios({
          method:"post",
          url:"/api/postText",
          data:{
            text:this.text
          }
        }).then((res)=>{
          this.graphData = [];
          this.graphLink = [];
          for (i in res.data) {
            if (!this.graphData.includes(i.object)) {
              this.graphData.push({name: i.object});
            }
            if (!this.graphData.includes(i.subject)) {
              this.graphData.push({name: i.subject});
            }
            this.graphLink.push({
              source: i.subject,
              target: i.object,
              name: i.predicate
            });
          }
          this.drawPic();
          this.show = true;
          //console.log(res.data);
        });
        //console.log(this.text);
      },
      drawPic(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '知识图谱' },
          series: [{
            type: 'graph',
            layout: 'force',
            symbolSize: 40,
            roam: true,edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function (x) {
                  return x.data.name;
                }
              }
            },
            force: {
              repulsion: 2500,
              edgeLength: [10, 50]
            },
            draggable: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#4b565b',
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {}
              }
            },
            data: this.graphData,
            links: this.graphLink,
          }]
        });
      }
    }
  }
</script>
