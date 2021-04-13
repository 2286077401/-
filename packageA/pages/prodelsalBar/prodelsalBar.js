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
    prodelsalBardatalistnext: {
      type: Array,
    }
  },
  lifetimes: {
    attached() {
      let lest = wx.getStorageSync('custnamelist3')
      if (lest == '' || lest == undefined) {
        this.custprosalesdata('')
      }
    }
  },
  methods: {
    custprosalesdata: function (id, typeid, guige, getime, letime) { 
      wx.showLoading({
        title: '加载中',
      })
      let url = app.globalData.url + '/report?action=proShipRank&rows=5&page=1 '
      let data = new Object()
      data.proidEQ = id
      data.protypeidEQ = typeid
      data.specificationLIKE = guige
      data.saletimeGE = getime
      data.saletimeLE = letime
      app.wxRequest("POST", url, {
        "params": JSON.stringify(data)
      }, (res) => {  
        this.setData({
          listdata: res.data.rows, 
        })
        wx.hideLoading({}) 
      }, (err) => { 
        wx.showToast({
          title: '服务器请求出错',
          icon: "none"
        })
      })
    },
  }
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
  if (wx.getStorageSync('prodelsalBardatalistnext') != '') {
    var officers = wx.getStorageSync('prodelsalBardatalistnext')
  }else if (wx.getStorageSync('baritem') != '') {
    var officers = wx.getStorageSync('baritem') 
  } else {
    var officers = wx.getStorageSync('databao3')
  }

 
  const custnamelist3 = officers.map(officer => officer.proname);
  const allmoneylist3 = officers.map(officer => officer.totalmoney);
  const allcountlist3 = officers.map(officer => officer.totalcount);

  // setTimeout(function () {
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
      text: '产品发货销售分析',
      padding: [15, 100, 10, 10]
    },
    tooltip: {
      trigger: 'axis',

    },
    legend: {
      x: 40,
      y: 600,
      data: ['销售总数量', '销售总金额']
    },
    //网格
    grid: {
      containLabel: true,
      height: 500,
      // top: 100,
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
      data: custnamelist3,
      axisLabel: {
        interval: 0,
        rotate:40  ,
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 8 //更改坐标轴文字大小
        }
      },
    }],
    // y轴
    yAxis: [{
      type: 'value',
      axisLabel: {
        textStyle: {
          // color: '#c3dbff',  //更改坐标轴文字颜色
          fontSize: 8 //更改坐标轴文字大小
        }
      },
    }],
    //数据
    series: [{
      name: '销售总数量',
      type: 'bar',
      data: allcountlist3,
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
      name: '销售总金额',
      type: 'bar',
      data: allmoneylist3,
      itemStyle: {
        normal: {
          color: '#22A6FD',  label: {
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


}