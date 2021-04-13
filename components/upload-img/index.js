const iconDef = "data:image/svg+xml;base64,PHN2ZyB0PSIxNTYyMzEyOTk0MDI0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyOTIiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNODA1LjMgMjcyYzI5LjQgMCA1NC42IDEwLjQgNzUuNCAzMS4zIDIwLjkgMjAuOSAzMS4zIDQ1LjkgMzEuMyA3NS40Vjc1MmMwIDI5LjQtMTAuNCA1NC42LTMxLjMgNzUuNC0yMC45IDIwLjktNDUuOSAzMS4zLTc1LjQgMzEuM0gyMTguN2MtMjkuNCAwLTU0LjYtMTAuNC03NS40LTMxLjNTMTEyIDc4MS41IDExMiA3NTJWMzc4LjZjMC0yOS40IDEwLjQtNTQuNiAzMS4zLTc1LjRzNDUuOS0zMS4zIDc1LjQtMzEuM2g5My40bDIxLjItNTYuNmM1LjItMTMuNiAxNS0yNS40IDI5LTM1LjIgMTQtOS44IDI4LjQtMTQuOCA0My4xLTE0LjhoMjEzLjNjMTQuOCAwIDI5LjEgNC45IDQzLjEgMTQuOCAxNCA5LjggMjMuNyAyMS42IDI5IDM1LjJsMjEuMiA1Ni42aDkzLjV2MC4xek0zODAuMiA2OTcuMWMzNi41IDM2LjUgODAuNSA1NC44IDEzMS44IDU0LjggNTEuNCAwIDk1LjMtMTguMyAxMzEuOC01NC44IDM2LjUtMzYuNSA1NC44LTgwLjUgNTQuOC0xMzEuOCAwLTUxLjQtMTguMy05NS4zLTU0LjgtMTMxLjgtMzYuNS0zNi41LTgwLjUtNTQuOC0xMzEuOC01NC44cy05NS4zIDE4LjMtMTMxLjggNTQuOC01NC44IDgwLjUtNTQuOCAxMzEuOGMwIDUxLjMgMTguMiA5NS4zIDU0LjggMTMxLjh6IG00Ny4xLTIxNi42YzIzLjUtMjMuNSA1MS43LTM1LjIgODQuNy0zNS4yczYxLjMgMTEuNyA4NC43IDM1LjJjMjMuNSAyMy41IDM1LjIgNTEuNyAzNS4yIDg0LjdzLTExLjcgNjEuMy0zNS4yIDg0LjdjLTIzLjUgMjMuNS01MS43IDM1LjItODQuNyAzNS4ycy02MS4zLTExLjctODQuNy0zNS4yYy0yMy41LTIzLjUtMzUuMi01MS43LTM1LjItODQuN3MxMS43LTYxLjIgMzUuMi04NC43eiIgcC1pZD0iMTI5MyIgZmlsbD0iI2JmYmZiZiI+PC9wYXRoPjwvc3ZnPg=="; //默认的文件上传icon
const iconDel = "data:image/svg+xml;base64,PHN2ZyB0PSIxNTgyMjgwMTExMzAzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyODYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTUxNS4zNTY0NDQgOTE0LjY1OTU1NkE0MDQuODc4MjIyIDQwNC44NzgyMjIgMCAwIDEgMzU3LjcxNzMzMyAxMzcuMzg2NjY3YTQwNC43MDc1NTYgNDA0LjcwNzU1NiAwIDAgMSA1MjEuNjE0MjIzIDIxOC44NTE1NTUgNDA0Ljg3ODIyMiA0MDQuODc4MjIyIDAgMCAxLTIwNi4zMzYgNTI2Ljc5MTExMSA0MDMuMDAwODg5IDQwMy4wMDA4ODkgMCAwIDEtMTU3LjYzOTExMiAzMS42MzAyMjN6IG0wLTc0Ni4zODIyMjNjLTE4OC41ODY2NjcgMC0zNDEuNTYwODg5IDE1My43MTM3NzgtMzQxLjU2MDg4OCAzNDEuNTA0czE1Mi45MTczMzMgMzQxLjUwNCAzNDEuNTYwODg4IDM0MS41MDRjMTg4LjUyOTc3OCAwIDM0MS41MDQtMTUyLjkxNzMzMyAzNDEuNTA0LTM0MS41MDRzLTE1My43NzA2NjctMzQxLjUwNC0zNDEuNTA0LTM0MS41MDR6IG0wIDAiIHAtaWQ9IjIyODciIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48cGF0aCBkPSJNMzY0LjAzMiA2OTIuODQ5Nzc4YTMxLjc0NCAzMS43NDQgMCAwIDEtMjIuMjQzNTU2LTUzLjkzMDY2N2wzMDEuOTY2MjIzLTMwMS45NjYyMjJhMzEuODU3Nzc4IDMxLjg1Nzc3OCAwIDEgMSA0NS4xMTI4ODkgNDUuMjI2NjY3TDM4Ni45NTgyMjIgNjgzLjIzNTU1NmEzMS42MzAyMjIgMzEuNjMwMjIyIDAgMCAxLTIyLjkyNjIyMiA5LjYxNDIyMnogbTAgMCIgcC1pZD0iMjI4OCIgZmlsbD0iI2Q4MWUwNiI+PC9wYXRoPjxwYXRoIGQ9Ik02NjUuODg0NDQ0IDY5Mi44NDk3NzhhMzEuNTczMzMzIDMxLjU3MzMzMyAwIDAgMS0yMi4xMjk3NzctOS41NTczMzRMMzQxLjc4ODQ0NCAzODEuNDRhMzEuOTcxNTU2IDMxLjk3MTU1NiAwIDAgMSA0NS4xNjk3NzgtNDUuMTY5Nzc4bDMwMS4xMTI4ODkgMzAyLjY0ODg4OWEzMS44NTc3NzggMzEuODU3Nzc4IDAgMCAxLTIyLjE4NjY2NyA1My45MzA2Njd6IG0wIDAiIHAtaWQ9IjIyODkiIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48L3N2Zz4="; //删除icon
const iconLoading = "data:image/svg+xml;base64,PHN2ZyB0PSIxNjA2NDU0MDk5NDM3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQzMDgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNODc2Ljg2NCA3ODIuNTkyYzMuMjY0IDAgNi4yNzItMy4yIDYuMjcyLTYuNjU2IDAtMy40NTYtMy4wMDgtNi41OTItNi4yNzItNi41OTItMy4yNjQgMC02LjI3MiAzLjItNi4yNzIgNi41OTIgMCAzLjQ1NiAzLjAwOCA2LjY1NiA2LjI3MiA2LjY1NnpNNzM2LjMyIDkzNS45MzZjMi4zMDQgMi40MzIgNS41NjggMy44NCA4Ljc2OCAzLjg0YTEyLjE2IDEyLjE2IDAgMCAwIDguODMyLTMuODQgMTMuNzYgMTMuNzYgMCAwIDAgMC0xOC41NiAxMi4yMjQgMTIuMjI0IDAgMCAwLTguODMyLTMuODQgMTIuMTYgMTIuMTYgMCAwIDAtOC43NjggMy44NCAxMy42OTYgMTMuNjk2IDAgMCAwIDAgMTguNTZ6IG0tMTg0IDgyLjMwNGMzLjQ1NiAzLjY0OCA4LjMyIDUuNzYgMTMuMTg0IDUuNzZhMTguMzY4IDE4LjM2OCAwIDAgMCAxMy4xODQtNS43NiAyMC42MDggMjAuNjA4IDAgMCAwIDAtMjcuOTY4IDE4LjM2OCAxOC4zNjggMCAwIDAtMTMuMTg0LTUuODI0IDE4LjM2OCAxOC4zNjggMCAwIDAtMTMuMTg0IDUuNzYgMjAuNjA4IDIwLjYwOCAwIDAgMCAwIDI4LjAzMnogbS0xOTguMzM2LTUuNzZjNC42MDggNC44IDExLjA3MiA3LjY4IDE3LjYgNy42OGEyNC40NDggMjQuNDQ4IDAgMCAwIDE3LjUzNi03LjY4IDI3LjQ1NiAyNy40NTYgMCAwIDAgMC0zNy4yNDggMjQuNDQ4IDI0LjQ0OCAwIDAgMC0xNy41MzYtNy42OCAyNC40NDggMjQuNDQ4IDAgMCAwLTE3LjYgNy42OCAyNy41MiAyNy41MiAwIDAgMCAwIDM3LjE4NHogbS0xNzUuNjgtOTEuODRjNS43NiA2LjA4IDEzLjgyNCA5LjYgMjEuOTUyIDkuNmEzMC41OTIgMzAuNTkyIDAgMCAwIDIyLjAxNi05LjYgMzQuMzY4IDM0LjM2OCAwIDAgMCAwLTQ2LjU5MiAzMC41OTIgMzAuNTkyIDAgMCAwLTIyLjAxNi05LjYgMzAuNTkyIDMwLjU5MiAwIDAgMC0yMS45NTIgOS42IDM0LjM2OCAzNC4zNjggMCAwIDAgMCA0Ni41OTJ6TTU3LjE1MiA3NjEuMjhjNi45MTIgNy4zNiAxNi42NCAxMS42NDggMjYuMzY4IDExLjY0OGEzNi43MzYgMzYuNzM2IDAgMCAwIDI2LjQzMi0xMS41ODQgNDEuMjggNDEuMjggMCAwIDAgMC01NS45MzYgMzYuNzM2IDM2LjczNiAwIDAgMC0yNi40MzItMTEuNTg0IDM2LjggMzYuOCAwIDAgMC0yNi4zNjggMTEuNTIgNDEuMjggNDEuMjggMCAwIDAgMCA1NnpNMTIuNzM2IDU2NC42NzJhNDIuODggNDIuODggMCAwIDAgMzAuNzg0IDEzLjQ0IDQyLjg4IDQyLjg4IDAgMCAwIDMwLjc4NC0xMy40NCA0OC4xMjggNDguMTI4IDAgMCAwIDAtNjUuMjE2IDQyLjg4IDQyLjg4IDAgMCAwLTMwLjcyLTEzLjQ0IDQyLjg4IDQyLjg4IDAgMCAwLTMwLjg0OCAxMy40NCA0OC4xMjggNDguMTI4IDAgMCAwIDAgNjUuMjE2ek01Mi41NDQgMzY5LjI4YTQ4Ljk2IDQ4Ljk2IDAgMCAwIDM1LjIgMTUuMzYgNDguOTYgNDguOTYgMCAwIDAgMzUuMi0xNS4zNiA1NC45NzYgNTQuOTc2IDAgMCAwIDAtNzQuNTYgNDguOTYgNDguOTYgMCAwIDAtMzUuMi0xNS40MjQgNDguOTYgNDguOTYgMCAwIDAtMzUuMiAxNS40MjQgNTQuOTc2IDU0Ljk3NiAwIDAgMCAwIDc0LjU2eiBtMTE1Ljc3Ni0xNTYuOGMxMC4zNjggMTEuMDA4IDI0Ljk2IDE3LjQwOCAzOS42OCAxNy40MDggMTQuNTkyIDAgMjkuMTg0LTYuNCAzOS41NTItMTcuNDA4YTYxLjg4OCA2MS44ODggMCAwIDAgMC04My44NCA1NS4xMDQgNTUuMTA0IDAgMCAwLTM5LjYxNi0xNy40MDhjLTE0LjY1NiAwLTI5LjI0OCA2LjQtMzkuNjE2IDE3LjQwOGE2MS44ODggNjEuODg4IDAgMCAwIDAgODMuODR6IG0xNjkuMDI0LTg3LjY4YzExLjUyIDEyLjE2IDI3LjcxMiAxOS4yNjQgNDMuOTY4IDE5LjI2NCAxNi4yNTYgMCAzMi40NDgtNy4wNCA0My45NjgtMTkuMjY0YTY4LjY3MiA2OC42NzIgMCAwIDAgMC05My4xODQgNjEuMjQ4IDYxLjI0OCAwIDAgMC00My45NjgtMTkuMjY0IDYxLjI0OCA2MS4yNDggMCAwIDAtNDMuOTY4IDE5LjI2NCA2OC43MzYgNjguNzM2IDAgMCAwIDAgOTMuMTg0eiBtMTg5LjYzMi0xLjA4OGMxMi42NzIgMTMuNDQgMzAuNTI4IDIxLjI0OCA0OC40NDggMjEuMjQ4czM1LjcxMi03LjgwOCA0OC4zODQtMjEuMjQ4YTc1LjU4NCA3NS41ODQgMCAwIDAgMC0xMDIuNDY0QTY3LjM5MiA2Ny4zOTIgMCAwIDAgNTc1LjM2IDBjLTE3LjkyIDAtMzUuNzc2IDcuODA4LTQ4LjQ0OCAyMS4yNDhhNzUuNTg0IDc1LjU4NCAwIDAgMCAwIDEwMi40NjR6TTcwMC44IDIxMC4zMDRjMTMuODI0IDE0LjU5MiAzMy4yOCAyMy4xMDQgNTIuNzM2IDIzLjEwNCAxOS41ODQgMCAzOS4wNC04LjUxMiA1Mi44LTIzLjEwNGE4Mi40MzIgODIuNDMyIDAgMCAwIDAtMTExLjc0NCA3My40NzIgNzMuNDcyIDAgMCAwLTUyLjgtMjMuMTY4Yy0xOS41MiAwLTM4LjkxMiA4LjUxMi01Mi43MzYgMjMuMTY4YTgyLjQzMiA4Mi40MzIgMCAwIDAgMCAxMTEuNzQ0eiBtMTI0LjAzMiAxNTguNTI4YzE0Ljk3NiAxNS44NzIgMzYuMDMyIDI1LjA4OCA1Ny4yMTYgMjUuMDg4IDIxLjEyIDAgNDIuMjQtOS4yMTYgNTcuMTUyLTI1LjA4OGE4OS4zNDQgODkuMzQ0IDAgMCAwIDAtMTIxLjA4OCA3OS42MTYgNzkuNjE2IDAgMCAwLTU3LjE1Mi0yNS4wODhjLTIxLjE4NCAwLTQyLjI0IDkuMjE2LTU3LjIxNiAyNS4wODhhODkuMzQ0IDg5LjM0NCAwIDAgMCAwIDEyMS4wODh6IG01MC40MzIgMjA0LjAzMmMxNi4xMjggMTcuMDg4IDM4Ljc4NCAyNy4wMDggNjEuNjMyIDI3LjAwOCAyMi43ODQgMCA0NS40NC05LjkyIDYxLjU2OC0yNy4wMDhhOTYuMjU2IDk2LjI1NiAwIDAgMCAwLTEzMC40MzIgODUuNzYgODUuNzYgMCAwIDAtNjEuNTY4LTI3LjA3MmMtMjIuODQ4IDAtNDUuNDQgOS45ODQtNjEuNjMyIDI3LjA3MmE5Ni4xOTIgOTYuMTkyIDAgMCAwIDAgMTMwLjQzMnoiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjQzMDkiPjwvcGF0aD48L3N2Zz4="; //上传中icon
let uploadInterval = null; 
const fileUploadUrl = "https://api.jiuwusan.cn/common/upload/img"; //图片上传接口地址
const filePrefix = "https://api.jiuwusan.cn"; //读取文件的前缀
Component({
  //该组件为表单组件
  behaviors: ['wx://form-field'],
  //定义外部class名字
  externalClasses: ['box-class', 'row-class', 'item-class', 'icon-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    value: { // 初始值
      type: [String, Array],
      value: null
    },
    max: { // 最大张数
      type: Number,
      value: 1
    },
    source: { // 来源 1 相册，2相机，-1，所有
      type: Number,
      value: -1
    },
    icon: { // 自定义上传icon
      type: String,
      value: null
    },
    disabled: { // 是否允许编辑
      type: Boolean,
      value: false
    },
    params: { // 额外提交的表单数据
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icondef: iconDef,
    delicon: iconDel,
    loadingicon: iconLoading,
    paths: [], //完整路径
    temps: [],
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      if (uploadInterval) {
        clearInterval(uploadInterval);
      }
    },
  },
  observers: {
    /**
     * 对value值进行监听
     * @param {*} value 
     */
    'value': function (value = "") {
      let paths = valueToArray(clone(value));
      if (Object.prototype.toString.call(paths) != Object.prototype.toString.call(value) && value) {
        //这样做是为了防止死循环
        this.setData({
          value: paths
        })
      }
      this.setData({
        paths: fttpath(clone(paths))
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chooseImage: function () {
      let that = this;
      //计算可选张数
      let {
        max,
        source,
        temps,
        paths
      } = that.data;
      let count = max - paths.length - temps.length;
      let sourceType = ['album', 'camera'];
      if (source == 1) {
        sourceType = ['album'];
      } else if (source == 2) {
        sourceType = ['camera'];
      }
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: sourceType,
        success(res) {
          // 得到临时存放的图片
          const tempFilePaths = res.tempFilePaths;
          that.uploadFiles(tempFilePaths);
        }
      })
    },
    uploadFiles(array = []) {
      if (array.length <= 0) {
        return;
      }
      let that = this;
      that.setData({
        temps: array
      })
      //防止深克隆
      let compdata = clone(that.data);
      let value = compdata.value || [];
      let params = compdata.params || [];
      //注册一个心跳，按照选择的顺序一次上传
      let finishArray = [];
      let current = false;
      let currentIndex = 0;
      uploadInterval = setInterval(() => {
        if (currentIndex != array.length && !current) {
          //未全部上传&&没有正在上传的图片，开始上传
          current = true; //开始上传
          uploadImage(array[currentIndex], params, (rs) => {
            //处理返回的数据
            if (rs.path) {
              finishArray.push(rs.path);
            }
            ++currentIndex;
            current = false;
          });
        } else if (currentIndex == array.length && !current) {
          //清空心跳
          clearInterval(uploadInterval);
          //连接两个数组
          Array.prototype.push.apply(value, finishArray);
          let paths = fttpath(clone(value));
          that.setData({
            value,
            paths,
            temps: []
          })
          //向外传递
          that.bindchange({
            value
          });
        }
      }, 100)
    },
    /**
     * 删除图片
     */
    delImg: function (e) {
      let that = this;
      let index = e.currentTarget.dataset.index;
      let compdata = clone(that.data);
      let value = compdata.value;
      let paths = compdata.paths;
      //移除元素
      value.splice(index, 1);
      paths.splice(index, 1);
      that.setData({
        paths,
        value
      })
      //向父组件传值
      that.bindchange({
        value
      });
    },
    /**
     * 放大图片
     */
    previewImage: function (e) {
      let current = e.currentTarget.dataset.current;
      let urls = this.data.paths;
      wx.previewImage({
        current: current,
        urls: urls
      })
    },
    /**
     * 向外部提供change回调
     */
    bindchange: function (object) {
      this.triggerEvent('change', object);
    }
  }
})

/**
 * 上传单张图片
 * @param {*} tempFilePath 上传文件资源的路径
 * @param {*} formData HTTP 请求中其他额外的 form data
 * @param {*} callback 结果回调
 */
const uploadImage = function (tempFilePath, params = {}, callback) {
  wx.uploadFile({
    url: fileUploadUrl, //接口地址
    filePath: tempFilePath,
    name: 'file', //服务端可以通过这个 key 获取文件的二进制内容
    formData: params,
    success(res) {
      //处理上传返回的数据
      let data = JSON.parse(res.data);
      if (callback) {
        callback({
          path: data.path //返回上传成功的文件路径
        });
      }
    },
    fail(err) {
      wx.showToast({
        title: '文件上传失败',
        icon: 'none'
      })
      callback({
        path: null
      });
    }
  })
}

/**
 * 对对象进行深克隆
 * @param {*} obj 
 */
const clone = function (obj) {
  if (obj) {
    try {
      //这一步，会过滤掉function和undefined
      return JSON.parse(JSON.stringify(obj));
    } catch (error) {
      //说明不是一个对象，返回本体
      return obj;
    }
  }
  return null;
}

/**
 * 格式化路径
 * @param {*} path 数组或者字符串
 */
function fttpath(path) {
  let isArray = true;
  let paths = path;
  if (Object.prototype.toString.call(path) != '[object Array]') {
    isArray = false;
    paths = [path];
  }
  for (var i = 0; i < paths.length; i++) {
    if (!paths[i]) {
      continue;
    }
    if (!(paths[i].indexOf("http") == 0 || paths[i].indexOf("data:") == 0)) {
      paths[i] = filePrefix + paths[i];
    }
  }
  if (!isArray) {
    return paths[i].join(",");
  }
  return paths;
}

/**
 * 将value值转换数组
 */
function valueToArray(value) {
  let array = [];
  if (value) {
    if (Object.prototype.toString.call(value) == '[object Array]') {
      //如果是数组直接复制
      array = value;
    } else if (Object.prototype.toString.call(value) == '[object String]') {
      //处理,分割的形式  "1.jpg,2.jpg"
      value = String(value);
      if (value != "") {
        //防止 value = [""]
        array = value.split(",");
      }
    }
  }
  return array;
}