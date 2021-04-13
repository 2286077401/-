import * as echarts from '../../../utils/echarts.js';
import geoJson from '../../../lib/mapData.js';
let chart = null;
let dataList = [{ name: 'china' }];
let pageInstance = {}
// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart); //容器初始化
  echarts.registerMap('china', geoJson); //地图数据注册
  var option = {
    tooltip: {
      triggerOn: "click",
      formatter: function (e, t, n) {
        pageInstance.BindEvent(e);
        return e.name
      }
    },//点击响应事件
    toolbox: {
      show: true,
      orient: 'vertical',
      x: 'right',
      y: 'center',
      feature: {
          mark: {
              show: true
          },
          dataView: {
              show: true,
              readOnly: false
          }
      }
  },
    geo: {
      map: "china",
      roam: !1,
      layoutCenter: ["50%", "50%"], 
      scaleLimit: {
        min: 1,
        max: 2
      },
      zoom: 1.3,
      top: 120,
      label: {
        normal: {
          show: !0,
          fontSize: "10",
          color: "rgba(0,0,0,0.7)"
        },
        emphasis: { // 高亮时样式
          color: "#333"
        }
      },
      itemStyle: {
        normal: {
          borderWidth: 1,//边际线大小
          borderColor:'white',//边界线颜色
          areaColor:'#DD9466'//默认区域颜色
      },
        emphasis: {
          show: true,
          areaColor: 'red',//鼠标滑过区域颜色
          label: {
              show: true,
              textStyle: {
                  color: '#fff'
              }
          }
        }
      }
    },//地图颜色等配置
    series: [{
      name: '选择器',
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
      left: 'left',
      top: '25%',
      width: '50%',
      height: '50%',
      roam: true,
      selectedMode: 'single',
      showLegendSymbol: false,
   
      geoIndex: 0,
      data: dataList
    }]//对应点击事件响应
  };

  chart.setOption(option);//返回初始化结果

  
  return chart;
}

Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    created: function () {
       pageInstance = this;
    }
  },
  methods: {
    BindEvent(e){
 
      console.log(e.name)
    }
  }
})
 