<template>
  <div>
    <div class="layout">
      <Layout>
        <c-header></c-header>
        <Content :style="{padding: '0 50px'}">
          <Row>
            <Col span="12" offset="6">
              <h1>知识图谱生成</h1>
              <br>
              <h2>输入文章</h2>
              <br>
              <Input v-model="text" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="Enter something..." />
              <br>
              <br>
              或上传.docx格式文件
              <input id="docx" type="file"/>
              <br>
              <br>
              <Button @click="postText" :disabled="isButton">提交</Button>
            </Col>
          </Row>
          <Row>
            <div v-if="show">
              <div id="myChart" :style="{width: '600px', height: '600px', margin: '0 auto'}"></div>
            </div>
            <br>
            <h3>提出问题</h3>
            <br>
            <Input v-model="question" search @on-search="getAnswer" enter-button :disabled="isAnswer" style="width: 400px; margin: 0 auto" />
            <br>
            <br>
            <h3>答案：</h3>{{answer}}
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
          </Row>
        </Content>
        <Footer class="layout-footer-center">2020 &copy; Fengrubei</Footer>
      </Layout>
    </div>
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
        url: '',
        question: '',
        answer: '',
        isButton: false,
        isAnswer: false,
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
      document.getElementById("docx").addEventListener("change", this.readFileInputEventAsArrayBuffer);
    },
    methods: {
      postText() {
        if (this.text != '' && this.url === '') {
          let formData = new FormData();
          formData.append('text', this.text);
          this.isButton = true;
          this.$axios({
            method:"post",
            url:"/api/",
            data: formData
          }).then((res)=>{
            var arr = res.data.spos;
            let dataList = [];
            this.graphData = [];
            this.graphLink = [];
            for (var i in arr) {
              if (!dataList.includes(arr[i].object)) {
                dataList.push(arr[i].object);
                this.graphData.push({name: arr[i].object});
              }
              if (!dataList.includes(arr[i].subject)) {
                dataList.push(arr[i].subject);
                this.graphData.push({name: arr[i].subject});
              }
              this.graphLink.push({
                name: arr[i].predicate,
                source: arr[i].subject,
                target: arr[i].object
              });
            }
            this.show = true;
            this.$nextTick(function () {
              this.drawPic();
            })
            //console.log(this.graphData);
            //console.log(this.graphLink);
            this.isButton = false;
          });
        }
        else if (this.url != '' && this.text === '') {
          console.log(this.url);
        }
        else if (this.url != '' && this.text != '') {
          alert("不能同时输入多个来源");
        }
        else {
          alert("请输入内容");
        }
        //console.log(this.text);
      },
      drawPic() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '知识图谱' },
          series: [{
            type: 'graph',
            layout: 'force',
            symbolSize: 40,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
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
              repulsion: 1500,
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
      },
      readFileInputEventAsArrayBuffer(event) {
        let that = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          var arrayBuffer = loadEvent.target.result; //arrayBuffer
          that.$mammoth
            .extractRawText({ arrayBuffer: arrayBuffer })
            .then(that.displayResult)
            .done();
        };
        reader.readAsArrayBuffer(file);
      },
      displayResult(result) {
        this.text = result.value;
      },
      getAnswer() {
        if (this.question === '') {
          alert("问题不能为空");
        }
        else {
          this.isAnswer = true;
          this.$axios.get('/ap2/?question=' + this.question).then((res)=>{
            this.answer = res.data.answer;
            this.isAnswer = false;
          });
        }
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
    background: #5b6270;
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
