<template>
  <div>
    <Row>
      <Col span="12" offset="6">
        <h1>知识图谱生成</h1>
        <h2>输入文章</h2>
        <Input v-model="text" type="textarea" :rows="5" placeholder="Enter something..." />
        <Button @click="postText">提交</Button>
        <div v-if="show" id="myChart" :style="{width: '600px', height: '600px'}"></div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      text: '',
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
      }],
      graphLink: [{
        source: 'node01',
        target: 'node02',
        name: 'link01'
      }, {
        source: 'node01',
        target: 'node03',
        name: 'link02',
      }, {
        source: 'node01',
        target: 'node04',
        name: 'link03'
      }, {
        source: 'node01',
        target: 'node05',
        name: 'link04'
      }]
    }
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
