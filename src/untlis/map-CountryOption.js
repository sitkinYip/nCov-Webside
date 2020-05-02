//map-option.js
let CoutyDataList = [];

export default {
  title: {
    text: '全国疫情实时',
    subtext: '全国最新疫情信息实时',
    x: 'center'
  },
  tooltip: {
    triggerOn: "click",
    formatter: function(e, t, n) {
      return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
    }
  },
  visualMap: {
    min: 0,
    max: 1000,
    left: 26,
    bottom: 40,
    showLabel: !0,
    text: ["感染数分布"],
    pieces: [{
      gt: 1000,
      label: "> 1000人",
      color: "#7f1100"
    }, {
      gte: 500,
      lte: 999,
      label: "500 - 900 人",
      color: "#ff5428"
    }, {
      gte: 200,
      lt: 499,
      label: "200 - 400 人",
      color: "#ff8c71"
    }, {
      gte: 10,
      lt: 200,
      label: "10 - 200 人",
      color: "#ff9b9b"
    }, {
      gt: 0,
      lt: 9,
      label: "1 - 9 人",
      color: "#ffd6be"
    }, {
      value: 0,
      color: "#ffffff"
    }],
    show: !0
  },
  geo: {
    map: "china",
    roam: true,
    scaleLimit: {
      min: 1,
      max: 2
    },
    zoom: 1.23,
    top: 120,
    label: {
      normal: {
        show: !0,
        fontSize: "14",
        color: "rgba(0,0,0,0.7)"
      }
    },
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: "rgba(0, 0, 0, 0.2)"
      },
      emphasis: {
        areaColor: "#f2d5ad",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0
      }
    }
  },
  series: [{
    name: "确诊病例",
    type: "map",
    geoIndex: 0,
    data: CoutyDataList
  }]
};
