<template>
  <div class="page-wrap">
    <div class="wrap">
      <ul class="card-wp">
        <li class="card-item card-blue">
          <div class="card-hd">
            <span>今天{{ $root.perm && $root.perm.BJFX }}</span>
          </div>
          <div class="card-bd">
            <span class="card-name">新机会</span>
            <div class="card-info">
              <p>已处理 ：<strong>3999</strong></p>
              <p>待处理 ：<strong>99</strong></p>
            </div>
          </div>
        </li>
        <li class="card-item card-red">
          <div class="card-hd">
            <span>今天</span>
          </div>
          <div class="card-bd">
            <span class="card-name">总机会</span>
            <div class="card-info">
              <p class="card-cell"><strong>3999</strong></p>
            </div>
          </div>
        </li>
        <li class="card-item card-green">
          <div class="card-hd">
            <span class="active">今天</span>
            <span>本周</span>
            <span>本月</span>
          </div>
          <div class="card-bd">
            <span class="card-name">新预约</span>
            <div class="card-info">
              <p class="card-cell"><strong>3999</strong></p>
            </div>
          </div>
        </li>
        <li class="card-item card-purple">
          <div class="card-hd">
            <span class="active">今天</span>
            <span>本周</span>
            <span>本月</span>
          </div>
          <div class="card-bd">
            <span class="card-name">领取</span>
            <div class="card-info">
              <p class="card-cell"><strong>3999</strong></p>
            </div>
          </div>
        </li>
        <li class="card-item card-orange">
          <div class="card-hd">
            <span>今天</span>
          </div>
          <div class="card-bd">
            <span class="card-name">通话</span>
            <div class="card-info">
            <div class="card-info">
              <p>时长 ：<strong>58"08'</strong></p>
              <p>人数 ：<strong>99</strong></p>
            </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="main-wp clearfix mt20">
        <div class="rank-wp">
          <div class="rank-hd g-title">
            <h2>本周业绩排行榜</h2>
            <div class="block-tab">
              <span class="active">军团</span>
              <span>销售部</span>
              <span>销售组</span>
            </div>
          </div>
          <div class="rank-bd">
            <ul class="rank-list">
              <li :class="{active: key < 3}" v-for="(item, key) in [1,2,3,4,5,6,7,8,9,10]">
                <i class="icon-gold" v-if="key == 0"></i>
                <i class="icon-silver" v-else-if="key == 1"></i>
                <i class="icon-copper" v-else-if="key == 2"></i>
                <i v-else>{{item}}</i>
                <span class="name">蓝翔（lanxiang)</span>
                <span>成交金额：123456元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="deal-wp">
          <div class="deal-hd g-title">
            <h2>我的成交</h2>
            <div class="block-tab">
              <span class="active">近15天</span>
              <span>本月</span>
              <span>上月</span>
            </div>
          </div>
          <div class="deal-bd">
            <div class="chart-wp" ref="dealChart"></div>
          </div>
        </div>

        <div class="deal-wp mt20">
          <div class="deal-hd g-title">
            <h2>我的学员</h2>
          </div>
          <div class="deal-bd">
            <div class="chart-wp" ref="studentChart"></div>
          </div>
        </div>
      </div>

  </div>

  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  data(){
    return {
      dealChart: null,
      studentChart: null,
    }
  },
  components:{

  },
  created() {

  },
  mounted() {
    console.log(echarts);
    this.initDealChart();
    this.initStudentChart();
  },
  beforeDestroy() {
    if (this.dealChart) {
      this.dealChart.dispose();
      this.dealChart = null;
    }

    if (this.studentChart) {
      this.studentChart.dispose();
      this.studentChart = null;
    }
  },
  methods:{
    /*initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.axios.get('/url').then((data) => {
        this.chart.setOption({

        })
      })
    }*/
    initDealChart() {
      this.dealChart = echarts.init(this.$refs.dealChart);
      // 把配置和数据放这里
      this.dealChart.setOption({
        color: ['#4caf5b', '#9f76e3', '#fb4f86', '#ec9e2e'],
        title: {
          show: false,
          text: '我是标题',
        },
        tooltip : {
          trigger: 'item',
          formatter: "¥{c}",
          //alwaysShowContent: true,
        },
        xAxis: {
            type: 'category',
            data: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07']
        },
        yAxis: {
            type: 'value'
        },
        series : [
            {
                type: 'line',
                data:[
                    {value: 335, amount: 100},
                    {value: 310, amount: 100},
                    {value: 234, amount: 100},
                    {value: 135, amount: 100},
                    {value: 310, amount: 100},
                    {value: 234, amount: 100},
                    {value: 135, amount: 100},
                ],
            }
        ]
      })
    },
    initStudentChart() {
      this.studentChart = echarts.init(this.$refs.studentChart);
      // 把配置和数据放这里
      this.studentChart.setOption({
        color: ['#4caf5b', '#9f76e3', '#fb4f86', '#ec9e2e'],
        title: {
          show: false,
          text: '我是标题',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} ({d}%)"
        },
        series : [
            {
                name: '来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data:[
                    {value:335, name: '预约' + 12 + '个'},
                    {value:310, name: '领取' + 12 + '个'},
                    {value:234, name: '新机会' + 12 + '个'},
                    {value:135, name: '回访' + 12 + '个'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }]
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";
  .page-wrap {
    background: #f3f3f3;
  }
  .wrap {
    margin: 0 auto;
    //padding: 30px 0 60px;
    width: 1280px;
  }

  .clearfix {
    &:before, &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
      height: 0;
      line-height: 0;
      overflow: hidden;
    }
  }

  .mt20 {
    margin-top: 20px;
  }

  .g-title {
    padding: 18px 20px 18px 0;
    height: 56px;
    h2 {
      position: relative;
      float: left;
      padding-left: 16px;
      line-height: 20px;
      font-size: 16px;
      color: #4b4b4b;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 20px;
        background: $color-blue;
      }
    }
  }

  .block-tab {
    float: right;
    span {
      float: left;
      margin-right: 24px;
      padding-bottom: 3px;
      border-bottom: 3px solid transparent;
      color: #848e99;
      cursor: pointer;
      &:hover {
        color: $color-blue;
      }
      &.active {
        color: $color-blue;
        border-color: $color-blue;
        cursor: default;
      }
    }
  }

  .cart-wp, .rank-wp, .deal-wp {
    background: $color-white;
  }

  .card-wp {
    height: 130px;
  }
  .card-item {
    float: left;
    margin-right: 20px;
    width: 240px;
    height: 130px;
    background: $color-white;
    &:last-child {
      margin-right: 0;
    }
    .card-hd {
      padding: 0 18px;
      height: 30px;
      line-height: 30px;
      color: #afbdcc;
      background: #f9f9f9;
      font-size: 12px;
      text-align: right;
      span {
        margin-left: 15px;
        cursor: pointer;
        &:active {
          cursor: default;
        }
      }
    }
    .card-bd {
      padding: 10px 20px 0;
      .card-name {
        float: left;
        margin-right: 26px;
        width: 54px;
        text-align: center;
        color: #848e99;
        font-size: 14px;
        &:before {
          content: "";
          display: inline-block;
          margin-bottom: 8px;
          width: 54px;
          height: 54px;
          background: url(images/icon-blue.png) no-repeat center center;
        }
      }
      p {
        margin-top: 6px;
        font-size: 12px;
        color: #afbdcc;
      }
      strong {
        display: inline-block;
        width: 64px;
        text-align: right;
        font-size: 24px;
        font-weight: normal;
      }
      .card-cell {
        margin-right: 14px;
        line-height: 66px;
        text-align: right;
      }
    }
    &.card-blue {
      strong {
        color: $color-blue;
      }
    }
    &.card-red {
      strong {
        color: #e91d27;
      }
      .card-name {
        &:before {
          background-image: url(images/icon-red.png);
        }
      }
    }
    &.card-green {
      .active, strong {
        color: #4caf5b;
      }
      .card-name {
        &:before {
          background-image: url(images/icon-green.png);
        }
      }
    }
    &.card-purple {
      .active, strong {
        color: #9f76e3;
      }
      .card-name {
        &:before {
          background-image: url(images/icon-purple.png);
        }
      }
    }
    &.card-orange {
      strong {
        color: #f2af5a;
      }
      .card-name {
        &:before {
          background-image: url(images/icon-orange.png);
        }
      }
    }
  }

  .rank-wp {
    float: left;
    width: 500px;
    background: $color-white;
    .rank-bd {
      margin: 0 20px 20px;
      border-top: solid 1px #efefef;
    }
  }
  .rank-list {
    li {
      padding: 14px 30px 14px 0;
      border-bottom: solid 1px #efefef;
      line-height: 32px;
      color: #848e99;
      font-size: 14px;
      &.active {
        color: #e91d27;
        i {
          position: relative;
          background: none;
          &:before {
            content: "";
            position: absolute;
            top: -3px;
            left: 0;
            width: 32px;
            height: 41px;
            background: url(images/icon-gold.png) no-repeat center center;
          }
          &.icon-silver {
            &:before {
              background-image: url(images/icon-silver.png);
            }
          }
          &.icon-copper {
            &:before {
              background-image: url(images/icon-copper.png);
            }
          }
        }
      }
      i {
        float: left;
        display: inline-block;
        margin-right: 12px;
        width: 32px;
        height: 32px;
        text-align: center;
        border-radius: 50%;
        color: $color-white;
        background: #fd9137;
        font-style: normal;
      }
      .name {
        display: inline-block;
        width: 230px;
      }
    }
  }

  .deal-wp {
    float: right;
    width: 760px;
    background: $color-white;
    .deal-bd {
      padding: 8px 40px 30px;
    }
  }

  .chart-wp {
    width: 100%;
    height: 240px;
  }
</style>
