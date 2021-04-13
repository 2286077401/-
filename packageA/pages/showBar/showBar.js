import * as echarts from '../../../utils/echarts'

Component({
  data: {
    ec: {
      onInit: initChart // 3、将数据放入到里面
    },
    custnamelist: [],
    allmoneylist: [],
    allcountlist: [],
  },
  properties: {
    getmaplist: {
      type: Array
    }
  },
  lifetimes: {
    attached() { 
    },
    ready: function () { 
    },
  },
  methods: {}
})
//chart对象（一定要有）
var chart = null
//图表标题文字
var titletext = ''
//数据源（其实没用到）
var dataSource = []
const app = getApp();
//初始化
function initChart(canvas, width, height) { 
  if (wx.getStorageSync('getmaplist') != '') {
    var optiondata = wx.getStorageSync('getmaplist')
  } else if (wx.getStorageSync('baritem') != '') {
    var optiondata = wx.getStorageSync('baritem') 
  } else {
    var optiondata = wx.getStorageSync('databao0')
  }

  let xdata0 = optiondata.map(officer => officer.proname);
  let totalmoney = optiondata.map(officer => officer.totalmoney);
  let totalcount = optiondata.map(officer => officer.totalcount);
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  //创建数据对象
  var option = {
    title: {
      x: 'center',
      y: 'top',
      padding: [15, 100, 10, 10]
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      x: 40,
      y: 600,
      data: ['销售数量', '销售金额']
    },
    //网格
    grid: {
      containLabel: true,
      height: 500,
      // top: 10,
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    //x轴
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        rotate:40  ,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize:8//更改坐标轴文字大小
        }
      },
    }],
    // y轴
    yAxis: [{
      type: 'value',
      axisLabel: {
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize:8//更改坐标轴文字大小
        }
      },
    }],
    //数据
    series: [{
      name: '销售数量',
      type: 'bar',
      data: totalmoney,
      animationDuration: 2800,
      animationEasing: "cubicInOut",
      itemStyle: {
        normal: {
          color: '#21D96E', 
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              color: 'black',
              fontSize: 8,
            }
          }
        }
      },
    }, {
      name: '销售金额',
      type: 'bar',
      data: totalcount,
      itemStyle: {
        normal: {
          color: '#22A6FD',
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              color: 'black',
              fontSize: 8,
            }
          }
        }
      },
    }]
  }
  chart.setOption(option)
  return chart
  // }, 2000);
  // }

}