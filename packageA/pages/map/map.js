import * as echarts from '../../../utils/echarts.js'
import geoJson from '../../../lib/mapData.js'; //中国地图
import provinceMap from '../../../utils/province.js'
const util = require('../../../utils/util.js')
const app = getApp()
let chart = null;
let chart1 = null;
let chart2 = null;
let chart3 = null;
let chart4 = null;
let chart5 = null;
var option = {};
var xdata0 = [];
var datelist0 = [];
var jindatelist0 = [];

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 10,
      y: 210,
      textStyle: {
        fontSize: 10
      },
      data: ['销售总数', '销售金额']
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: {show: true, readOnly: false},
        // magicType: {show: true, type: ['line', 'bar']},
        // restore: {show: true},
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        fontSize: 8
      },
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '销售总数',
        type: 'bar',
        data: datelist0,
        itemStyle: {
          normal: {
            color: '#24EE79',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: 'black',
                fontSize: 8,
              }
            }
          }
        }
      },
      {
        name: '销售金额',
        type: 'bar',
        data: jindatelist0,
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
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}
// 第一页结束
function initChart2(canvas, width, height, dpr) {
  chart1 = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart1);

  option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 10,
      y: 210,
      textStyle: {
        fontSize: 10
      },
      data: ['销售总数', '销售金额']
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: {show: true, readOnly: false},
        // magicType: {show: true, type: ['line', 'bar']},
        // restore: {show: true},
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        fontSize: 8
      },
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '销售总数',
        type: 'bar',
        data: datelist0,
        itemStyle: {
          normal: {
            color: '#24EE79',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: 'black',
                fontSize: 8,
              }
            }
          }
        }
      },
      {
        name: '销售金额',
        type: 'bar',
        data: jindatelist0,
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
        }
      }
    ]
  };

  chart1.setOption(option);
  return chart1;
}
// 第二页结束
function initChart3(canvas, width, height, dpr) {
  chart2 = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart2);

  option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 10,
      y: 210,
      textStyle: {
        fontSize: 10
      },
      data: ['销售总数', '销售金额']
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: {show: true, readOnly: false},
        // magicType: {show: true, type: ['line', 'bar']},
        // restore: {show: true},
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        fontSize: 8
      },
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '销售总数',
        type: 'bar',
        data: datelist0,
        itemStyle: {
          normal: {
            color: '#24EE79',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: 'black',
                fontSize: 8,
              }
            }
          }
        }
      },
      {
        name: '销售金额',
        type: 'bar',
        data: jindatelist0,
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
        }
      }
    ]
  };

  chart2.setOption(option);
  return chart2;
}
// 第三页结束
function initChart4(canvas, width, height, dpr) {
  chart3 = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart3);

  option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 10,
      y: 210,
      textStyle: {
        fontSize: 10
      },
      data: ['销售总数', '销售金额']
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: {show: true, readOnly: false},
        // magicType: {show: true, type: ['line', 'bar']},
        // restore: {show: true},
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        fontSize: 8
      },
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '销售总数',
        type: 'bar',
        data: datelist0,
        itemStyle: {
          normal: {
            color: '#24EE79',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: 'black',
                fontSize: 8,
              }
            }
          }
        }
      },
      {
        name: '销售金额',
        type: 'bar',
        data: jindatelist0,
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
        }
      }
    ]
  };
  chart3.setOption(option);
  return chart3;
}
// 第四页结束
function initChart5(canvas, width, height, dpr) {
  chart4 = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart4);

  option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 10,
      y: 210,
      textStyle: {
        fontSize: 10
      },
      data: ['销售总数', '销售金额']
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: {show: true, readOnly: false},
        // magicType: {show: true, type: ['line', 'bar']},
        // restore: {show: true},
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        fontSize: 8
      },
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '销售总数',
        type: 'bar',
        data: datelist0,
        itemStyle: {
          normal: {
            color: '#24EE79',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: 'black',
                fontSize: 8,
              }
            }
          }
        }
      },
      {
        name: '销售金额',
        type: 'bar',
        data: jindatelist0,
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
        }
      }
    ]
  };

  chart4.setOption(option);
  return chart4;
}
// 第五页结束
function initChart6(canvas, width, height, dpr) {
  chart5 = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart5);

  option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 10,
      y: 210,
      textStyle: {
        fontSize: 10
      },
      data: ['销售总数', '销售金额']
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: {show: true, readOnly: false},
        // magicType: {show: true, type: ['line', 'bar']},
        // restore: {show: true},
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      data: xdata0,
      axisLabel: {
        interval: 0,
        fontSize: 8
      },
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '销售总数',
        type: 'bar',
        data: datelist0,
        itemStyle: {
          normal: {
            color: '#24EE79',
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: 'black',
                fontSize: 8,
              }
            }
          }
        }
      },
      {
        name: '销售金额',
        type: 'bar',
        data: jindatelist0,
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
        }
      }
    ]
  };

  chart5.setOption(option);
  return chart5;
}
// 第六页结束

//中国地图
function randomData() {
  return Math.round(Math.random() * 1000);
}
let provinceData = []
let drawProvinceName = ''
let cityList = []
let selectCity = {}

var touchDot = 0; //触摸时的原点 
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 

Page({
  data: {

    getprovincenumlist: [],
    ec1: {
      lazyLoad: true
    }, //中国地图
    ec: {
      onInit: initChart
    }, //第一个条形统计图
    ec2: {
      onInit: initChart2
    }, //第一个条形统计图
    ec3: {
      onInit: initChart3
    }, //第一个条形统计图
    ec4: {
      onInit: initChart4
    }, //第一个条形统计图
    ec5: {
      onInit: initChart5
    }, //第一个条形统计图
    ec6: {
      onInit: initChart6
    }, //第一个条形统计图
    getmaplist: [],
    custprosaleslist: [], //产品销售区域分析
    salprosalBarlist: [], //业务员产品销售分析
    prodelsalBardatalist: [], //产品发货销售分析
    prodelperBardatalist: [], //产品发货同期对比
    cusdelperBardatalist: [], //客户发货同期对比
    toptapnum: 0,
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [{
        text: '产品销售区域分析'
      },
      {
        text: '客户产品销售分析'
      },
      {
        text: '业务员产品销售分析'
      },
      {
        text: '产品发货销售分析'
      },
      {
        text: '产品发货同期对比'
      },
      {
        text: '客户发货同期对比'
      },

    ],
    currentTab: 0,
    navScrollLeft: 0,
    //中国地图
    isLoaded: false,
    isDisposed: false,
    showToolTip: true,
    toolTip: {
      x: -200,
      y: -200,
      name: '',
      value: ''
    },
    showBack: false,
    showMap: !1,
    // 地图数据
    centerPoint: {
      longitude: 0,
      latitude: 0,
    },
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  // 触摸开始事件 
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件 util.throttle(function (e) {  }, 1000)
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    // 向左滑动  
    if (touchMove - touchDot <= -40 && time < 10) { 
    }
    // 向右滑动 
    if (touchMove - touchDot >= 40 && time < 10) { 
    }
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
 

  onReady: function () {
    this.chinaTool = this.data.toolTip
    this.provinceTool = this.data.toolTip
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-map');
    this.drawChina()
  },
  drawChina() {
    const defaultTip = {
      x: -200,
      y: -200,
      name: '',
      value: ''
    }
    this.setData({
      toolTip: defaultTip,
      showBack: !1
    })
    this.provinceTool = defaultTip
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart);
      echarts.registerMap('china', geoJson); // 绘制中国地图

      this.setChinaOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false,
      });

      setTimeout(() => {
        this.setData({
          showToolTip: true
        })
      }, 500)
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  drawProvince(defaultCityList) {
    this.setData({
      toolTip: this.provinceTool,
      showBack: true
    }) 
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart); 
      echarts.registerMap(drawProvinceName, provinceData); // 绘制中国地图
      this.setProvinceOption(chart);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  setChinaOption(chart) {
    const option = {
      tooltip: {
        show: false,
        trigger: 'item',
        backgroundColor: "#FFF",
        padding: [
          10,
          15,
          8,
          15,
        ],
        extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
        textStyle: {
          fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
          color: '#FFD07F',
          fontSize: 12,
        },
        renderMode: 'richText',
        formatter: (a) => { 
        } 
      },
      geo: [{ 
        map: "china",
        roam: false, 
        aspectScale: 0.8,  
        zoom: 1,
        layoutCenter: ["50%", "50%"],  
        layoutSize: '120%', 
        label: {
  
          normal: {
            show: true,
            textStyle: {
              color: "rgba(0, 0, 0, 0.9)",
              fontSize: '10'
            }
          },
          emphasis: { // 高亮时样式
            color: "#333"
          }
        },
        itemStyle: {
          // 图形上的地图区域
          normal: {
            borderColor: "rgba(0,0,0,0.2)",
            areaColor: "#FFD07F"
          }
        },
      }],
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          // dataView: {
          //   readOnly: false
          // },
          // restore: {},
          saveAsImage: {}
        }
      },

      series: [{
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        roam: true, // 鼠标是否可以缩放
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [{
            name: '北京',
            value: randomData()
          },
          {
            name: '天津',
            value: randomData()
          },
          {
            name: '上海',
            value: randomData()
          },
          {
            name: '重庆',
            value: randomData()
          },
          {
            name: '河北',
            value: randomData()
          },
          {
            name: '河南',
            value: randomData()
          },
          {
            name: '云南',
            value: randomData()
          },
          {
            name: '辽宁',
            value: randomData()
          },
          {
            name: '黑龙江',
            value: randomData()
          },
          {
            name: '湖南',
            value: randomData()
          },
          {
            name: '安徽',
            value: randomData()
          },
          {
            name: '山东',
            value: randomData()
          },
          {
            name: '新疆',
            value: randomData()
          },
          {
            name: '江苏',
            value: randomData()
          },
          {
            name: '浙江',
            value: randomData()
          },
          {
            name: '江西',
            value: randomData()
          },
          {
            name: '湖北',
            value: randomData()
          },
          {
            name: '广西',
            value: randomData()
          },
          {
            name: '甘肃',
            value: randomData()
          },
          {
            name: '山西',
            value: randomData()
          },
          {
            name: '内蒙古',
            value: randomData()
          },
          {
            name: '陕西',
            value: randomData()
          },
          {
            name: '吉林',
            value: randomData()
          },
          {
            name: '福建',
            value: randomData()
          },
          {
            name: '贵州',
            value: randomData()
          },
          {
            name: '广东',
            value: randomData()
          },
          {
            name: '青海',
            value: randomData()
          },
          {
            name: '西藏',
            value: randomData()
          },
          {
            name: '四川',
            value: randomData()
          },
          {
            name: '宁夏',
            value: randomData()
          },
          {
            name: '海南',
            value: randomData()
          },
          {
            name: '台湾',
            value: randomData()
          },
          {
            name: '香港',
            value: randomData()
          },
          {
            name: '澳门',
            value: randomData()
          }
        ]
      }]
    };
    chart.setOption(option);
    chart.on('click', (e) => {
      var that = this
      setTimeout(() => {
        const toolTip = {
          x: e.event.offsetX,
          y: e.event.offsetY,
          name: e.data.name,
          value: e.data.value
        }
        that.setData({
          toolTip
        }) 
      }, 1000);
      that.getprovincenum(e.data.name, '', 'chinese')
    })
    chart.on('mousemove', (e) => {
      var that = this
      setTimeout(() => {
        const toolTip = {
          x: e.event.offsetX,
          y: e.event.offsetY,
          name: e.data.name,
          value: e.data.value
        }
        that.setData({
          toolTip
        }) 
      }, 1000);
      that.getprovincenum(e.data.name, '', 'chinese')
      wx.setStorageSync('provincename', e.data.name)

    })
  },
  setProvinceOption(chart) {
    const option = {
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: '{b}: {c}'
      },

      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          saveAsImage: {}
        }
      },
      geo: [{
        // 地理坐标系组件
        map: drawProvinceName,
        roam: false, // 可以缩放和平移
        aspectScale: 0.8, // 比例
        zoom: 0.8,
        layoutCenter: ["50%", "50%"], // position位置
        layoutSize: 300, // 地图大小，保证了不超过 370x370 的区域
        label: {
          // 图形上的文本标签
          normal: {
            show: true,
            textStyle: {
              color: "rgba(0, 0, 0, 0.9)",
              fontSize: '10'
            }
          },
          emphasis: { // 高亮时样式
            color: "#333"
          }
        },
        itemStyle: {
          // 图形上的地图区域
          normal: {
            borderColor: "rgba(0,0,0,0.2)",
            areaColor: "#FFD07F"
          }
        },
      }],
      series: [{
        type: 'map',
        mapType: drawProvinceName,
        geoIndex: 0,
        roam: true, // 鼠标是否可以缩放
        label: {
          normal: {
            show: true
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#389BB7',
            areaColor: '#fff',
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        },
        animation: false,
        data: cityList
      }],
    };
    chart.on('click', (e) => {
      const toolTip = {
        x: e.event.offsetX,
        y: e.event.offsetY,
        name: e.data.name,
        value: e.data.value
      }
      this.setData({
        toolTip
      }) 
    })
    chart.on('mousemove', (e) => {

      setTimeout(() => {
        const toolTip = {
          x: e.event.offsetX,
          y: e.event.offsetY,
          name: e.data.name,
          value: e.data.value
        }
        this.setData({
          toolTip
        })
      }, 1000)
      let sname = wx.getStorageSync('provincename') 
      this.getprovincenum(sname, e.data.name, 'chinese')
    })
    chart.on('mouseup', (e) => {
      var that = this
      setTimeout(() => {
        selectCity = e.data 
      }, 1000);
      that.getprovincenum(wx.getStorageSync('provincename'), e.data.name, 'chinese')
    })
    chart.setOption(option);
  },
  checkoutDetail() { 

    if (!this.data.showBack) { 
      drawProvinceName = provinceMap[this.data.toolTip.name]
      this.getProvinceData(drawProvinceName, (defaultCityList) => {
        this.drawProvince()
      })
    } else { // go city
      this.setData({
        showBack: !1,
        showToolTip: !1,
        showMap: !0
      })
      // this.provinceTool = this.data.toolTip
      // this.setData({
      //   centerPoint: {
      //     longitude: selectCity.cp[0],
      //     latitude: selectCity.cp[1]
      //   }
      // })
      wx.showToast({
        title: '加载' + this.data.toolTip.name + '数据..',
        icon: "none"
      })
    }
  },
  backChart() {
    this.setData({
      showBack: !0,
      showMap: !1,
      showToolTip: !0,
      toolTip: this.provinceTool
    })
  },
  backChina() {
    this.setData({
      toolTip: this.provinceTool
    })
  },
  getProvinceData(provinceName, callback = function () {}) {
    var jsonData = require('../../until/mapjson.js');
    var res;
    if (provinceName == 'zhejiang') res = jsonData.zhejiang;
    if (provinceName == 'yunnan') res = jsonData.yunnan;
    if (provinceName == 'xizang') res = jsonData.xizang;
    if (provinceName == 'xinjiang') res = jsonData.xinjiang;
    if (provinceName == 'taiwan') res = jsonData.taiwan;
    if (provinceName == 'sichuan') res = jsonData.sichuan;
    if (provinceName == 'shanxi') res = jsonData.shanxi;
    if (provinceName == 'shanghai') res = jsonData.shanghai;
    if (provinceName == 'shandong') res = jsonData.shandong;
    if (provinceName == 'anhui') res = jsonData.anhui;
    if (provinceName == 'beijing') res = jsonData.beijing;
    if (provinceName == 'chongqing') res = jsonData.chongqing;
    if (provinceName == 'fujian') res = jsonData.fujian;
    if (provinceName == 'gansu') res = jsonData.gansu;
    if (provinceName == 'guangdong') res = jsonData.guangdong;
    if (provinceName == 'guangxi') res = jsonData.guangxi;
    if (provinceName == 'guizhou') res = jsonData.guizhou;
    if (provinceName == 'hainan') res = jsonData.hainan;
    if (provinceName == 'hebei') res = jsonData.hebei;
    if (provinceName == 'heilongjiang') res = jsonData.heilongjiang;
    if (provinceName == 'henan') res = jsonData.henan;
    if (provinceName == 'hebei') res = jsonData.hebei;
    if (provinceName == 'hunan') res = jsonData.hunan;
    if (provinceName == 'jiangsu') res = jsonData.jiangsu;
    if (provinceName == 'jiangxi') res = jsonData.jiangxi;
    if (provinceName == 'jilin') res = jsonData.jilin;
    if (provinceName == 'liaoning') res = jsonData.liaoning;
    if (provinceName == 'neimenggu') res = jsonData.neimenggu;
    if (provinceName == 'ningxia') res = jsonData.ningxia;
    if (provinceName == 'qinghai') res = jsonData.qinghai;
 
    cityList = []
    res.features.forEach((item) => {
      cityList[cityList.length] = {
        name: item.properties.name,
        value: randomData(),
        id: item.id,
        cp: item.properties.cp
      }
    })
    provinceData = res
    callback(cityList)
    // })

  },
  getprovincenum(provinceName, city, type) {
    wx.showLoading({
      title: '加载中...',
      icon: "none"
    })
    var x;
    if (type == 'chinese') {
      switch (provinceName) {
        case '浙江':
          x = "浙江省";
          break;
        case '云南':
          x = "云南省";
          break;
        case '西藏':
          x = "西藏区";
          break;
        case '新疆':
          x = "新疆区";
          break;
        case '台湾':
          x = "台湾";
          break;
        case '四川':
          x = "四川省";
          break;
        case '山西':
          x = "山西省";
          break;
        case '上海':
          x = "上海市";
          break;
        case '山东':
          x = "山东省";
          break;
        case '安徽':
          x = "安徽省";
          break;
        case '北京':
          x = "北京市";
          break;
        case '重庆':
          x = "重庆市";
          break;
        case '福建':
          x = "福建省";
          break;
        case '甘肃':
          x = "甘肃省";
          break;
        case '广东':
          x = "广东省";
          break;
        case '广西':
          x = "广西区";
          break;
        case '贵州':
          x = "贵州省";
          break;
        case '海南':
          x = "海南省";
          break;
        case '河北':
          x = "河北省";
          break;
        case '黑龙江':
          x = "黑龙江省";
          break;
        case '河南':
          x = "河南省";
          break;
        case '河北':
          x = "河北省";
          break;
        case '湖南':
          x = "湖南省";
          break;
        case '江苏':
          x = "江苏省";
          break;
        case '江西':
          x = "江西省";
          break;
        case '吉林':
          x = "吉林省";
          break;
        case '辽宁':
          x = "辽宁省";
          break;
        case '内蒙古':
          x = "内蒙古区";
          break;
        case '宁夏':
          x = "宁夏区";
          break;
        case '青海':
          x = "青海省";
          break;
      }
      let user = wx.getStorageSync('user')
      const url = 'https://kinsana.lianxiangnet.com:442/withUnLog/location?action=getPhoneProSaleArea&isstat=true'
 
      let data = {}
      data.provincename = x,
        data.cityname = city,
        data.id = user.account.id,
        app.wxRequest("POST", url, {
          "params": JSON.stringify(data)
        }, (res) => { 
          this.setData({
            getprovincenumlist: res.data[0]
          })
          wx.hideLoading({})
        }, (err) => {
          wx.showToast({
            title: '服务器请求出错',
          })
        })
    } else {
      switch (provinceName) {
        case 'zhejiang':
          x = "浙江省";
          break;
        case 'yunnan':
          x = "云南省";
          break;
        case 'xizang':
          x = "西藏区";
          break;
        case 'xinjiang':
          x = "新疆区";
          break;
        case 'taiwan':
          x = "台湾";
          break;
        case 'sichuan':
          x = "四川省";
          break;
        case 'shanxi':
          x = "山西省";
          break;
        case 'shanghai':
          x = "上海市";
          break;
        case 'shandong':
          x = "山东省";
          break;
        case 'anhui':
          x = "安徽省";
          break;
        case 'beijing':
          x = "北京市";
          break;
        case 'chongqing':
          x = "重庆市";
          break;
        case 'fujian':
          x = "福建省";
          break;
        case 'gansu':
          x = "甘肃省";
          break;
        case 'guangdong':
          x = "广东省";
          break;
        case 'guangxi':
          x = "广西区";
          break;
        case 'guizhou':
          x = "贵州省";
          break;
        case 'hainan':
          x = "海南省";
          break;
        case 'hebei':
          x = "河北省";
          break;
        case 'heilongjiang':
          x = "黑龙江省";
          break;
        case 'henan':
          x = "河南省";
          break;
        case 'hebei':
          x = "河北省";
          break;
        case 'hunan':
          x = "湖南省";
          break;
        case 'jiangsu':
          x = "江苏省";
          break;
        case 'jiangxi':
          x = "江西省";
          break;
        case 'jilin':
          x = "吉林省";
          break;
        case 'liaoning':
          x = "辽宁省";
          break;
        case 'neimenggu':
          x = "内蒙古区";
          break;
        case 'ningxia':
          x = "宁夏区";
          break;
        case 'qinghai':
          x = "青海省";
          break;
      }
      let user = wx.getStorageSync('user')
      const url = 'https://kinsana.lianxiangnet.com:442/withUnLog/location?action=getPhoneProSaleArea&isstat=true'
      
      let data = {}
      data.provincename = x,
        data.cityname = city,
        data.id = user.account.id,
        app.wxRequest("POST", url, {
          "params": JSON.stringify(data)
        }, (res) => {
 
          this.setData({
            getprovincenumlist: res.data
          })
          wx.hideLoading({})
        }, (err) => {
          wx.showToast({
            title: '服务器请求出错',
          })
        })
    }
  },
  //页面跳转
  godetail: function (e) { 
    wx.navigateTo({
      url: 'mapdetail?stat=' + e.currentTarget.dataset.stat,
    })

  },
  //事件处理函数
  onLoad: function () {
    setTimeout(() => {
      let lasttime = util.lastmonth()
      let thistime = util.getnewData()
      this.getmapData('', lasttime, thistime, '', '', '', '');
    }, 500)

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },

  switchNav(event) { 
    let that = this
    let lasttime = util.lastmonth()
    let thistime = util.getnewData()
    var cur = event.currentTarget.dataset.current;
    switch (cur) {
      case 0: 
        wx.reLaunch({
          url: 'map',
        })
        break;
      case 1:
        that.custprosalesdata();
        break;
      case 2:
        that.salprosalBardata();
        break;
      case 3:
        that.prodelsalBardata('', '', '', lasttime, thistime);
        break;
      case 4:
        that.prodelperBardata('', '2020');
        break;
      case 5:
        that.cusdelperBardata('', '2020');
        break;
    }
    that.setData({
      toptapnum: event.currentTarget.dataset.current,
    })
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 3;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 产品销售区域分析
  getmapData: function (placeid, timege, timele, guige, city, county, proid) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let url = app.globalData.url + '/report?action=proSaleArea&rows=7&page=1'
    let data = new Object()
    data.placeidEQ = placeid
    data.cityEQ = city
    data.countyEQ = county
    data.proidEQ = proid
    data.specificationLIKE = guige //规格
    data.saletimeGE = timege
    data.saletimeLE = timele
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => { 
      if (res.data.rows != '') {
        let officers = res.data.rows
        wx.setStorageSync('databao0', res.data.rows)
        let custnamelist = officers.map(officer => officer.proname);
        let allmoneylist = officers.map(officer => officer.totalmoney);
        let allcountlist = officers.map(officer => officer.totalcount); 
        option.series[0].data = allcountlist;
        option.xAxis[0].data = custnamelist;
        option.series[1].data = allmoneylist; 
        chart.setOption(option);
        that.setData({
          getmaplist: res.data.rows,
        })
      } else {
        wx.showToast({
          title: '本月暂无数据',
          icon: "none"
        })
      }
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //客户产品销售分析
  custprosalesdata: function (id) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/report?action=custProSales&tjlx=detail&rows=7&page=1'
    let data = new Object()
    data.custid = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        let officers = res.data.rows
        wx.setStorageSync('databao1', res.data.rows)
        let custnamelist = officers.map(officer => officer.custname);
        let allmoneylist = officers.map(officer => officer.allmoney);
        let allcountlist = officers.map(officer => officer.allcount);
        option.series[0].data = allcountlist;
        option.xAxis[0].data = custnamelist;
        option.series[1].data = allmoneylist; 
        chart1.setOption(option);
        this.setData({
          custprosaleslist: res.data.rows,
          // custnamelist,
          // allmoneylist,
          // allcountlist,
        })
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }

      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //业务员产品销售分析
  salprosalBardata: function (id) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/report?action=salerFaHuoPaiMing&rows=7&page=1'
    let data = new Object()
    data.saleridEQ = id
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao2', res.data.rows)
        let officers = res.data.rows
        let custnamelist = officers.map(officer => officer.saler);
        let allmoneylist = officers.map(officer => officer.totalmoney);
        let allcountlist = officers.map(officer => officer.totalcount);
        option.series[0].data = allcountlist;
        option.xAxis[0].data = custnamelist;
        option.series[1].data = allmoneylist; 
        chart2.setOption(option);
        this.setData({
          salprosalBarlist: res.data.rows,
          // custnamelist,
          // allmoneylist,
          // allcountlist,
        })
      } else {
        wx.showToast({
          title: '暂无本月数据',
          icon: "none"
        })
      }
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //产品发货销售分析
  prodelsalBardata: function (id, typeid, guige, getime, letime) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/report?action=proShipRank&rows=7&page=1 '
    let data = new Object()
    data.proidEQ = id
    data.protypeidEQ = typeid
    data.specificationLIKE = guige
    data.saletimeGE = getime
    data.saletimeLE = letime
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao3', res.data.rows) 
        let officers = res.data.rows
        let custnamelist = officers.map(officer => officer.proname);
        let allmoneylist = officers.map(officer => officer.totalmoney);
        let allcountlist = officers.map(officer => officer.totalcount);
        option.series[0].data = allcountlist;
        option.xAxis[0].data = custnamelist;
        option.series[1].data = allmoneylist;

        chart3.setOption(option);
        this.setData({
          prodelsalBardatalist: res.data.rows,
          // custnamelist,
          // allmoneylist,
          // allcountlist,
        })
      } else {
        wx.showToast({
          title: '暂无本月数据',
          icon: "none"
        })
      }
      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //产品发货同期对比
  prodelperBardata: function (id, yeartimeEQ) {
    wx.showLoading({
      title: '加载中..',
    })
    let url = app.globalData.url + '/report?action=productSendTongQiDuiBi&rows=7&page=1 '
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao4', res.data.rows) 
        let officers = res.data.rows
        let custnamelist = officers.map(officer => officer.proname);
        let allmoneylist = officers.map(officer => officer.uptotalcount);
        let allcountlist = officers.map(officer => officer.totalcount);
        option.series[0].data = allcountlist;
        option.xAxis[0].data = custnamelist;
        option.series[1].data = allmoneylist;

        chart4.setOption(option);

        this.setData({
          prodelperBardatalist: res.data.rows,
          // custnamelist,
          // allmoneylist,
          // allcountlist,
        })
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }

      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
  //客户发货同期对比
  cusdelperBardata: function (id, yeartimeEQ) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.url + '/report?action=custSendTongQiDuiBi&rows=7&page=1 '
    let data = new Object()
    data.proidEQ = id
    data.yeartimeEQ = yeartimeEQ
    app.wxRequest("POST", url, {
      "params": JSON.stringify(data)
    }, (res) => {
      if (res.data.rows != '') {
        wx.setStorageSync('databao5', res.data.rows) 
        let officers = res.data.rows
        let custnamelist = officers.map(officer => officer.custname);
        let allmoneylist = officers.map(officer => officer.totalcount);
        let allcountlist = officers.map(officer => officer.uptotalcount);
        option.series[0].data = allcountlist;
        option.xAxis[0].data = custnamelist;
        option.series[1].data = allmoneylist;

        chart5.setOption(option);

        this.setData({
          cusdelperBardatalist: res.data.rows,
          // custnamelist,
          // allmoneylist,
          // allcountlist,
        })
      } else {
        wx.showToast({
          title: '暂无数据',
        })
      }

      wx.hideLoading({})
    }, (err) => { 
      wx.showToast({
        title: '服务器请求出错',
        icon: "none"
      })
    })
  },
});