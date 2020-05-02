
export default {
  title : {
      text: '省份疫情',
      subtext: '省份疫情分布情况',
      x:'center'
  },
  tooltip : {
      trigger: 'item'
  },
  dataRange: {
      min: 0,
      max: 600,
      x: 'right',
      y: 'bottom',
      text:['累计确诊参考'],
      calculable : false
  },
  roamController: {
      show: true,
      x: 'right',
      mapTypeControl: {
          'china': true
      }
  },
  series : [
      {
          name: '广东省疫情-累计确诊',
          type: 'map',
          mapType: '广东',
          roam: true,
          itemStyle:{
              normal:{label:{show:true}},
              emphasis:{label:{show:true}}
          },
          data:[
            {name: '珠海市',value:130},
            {name: '广州市',value: 50},
            {name: '中山市',value:31},
            {name: '佛山市',value: 55},
            {name: '清远市',value:90},
            {name: '梅州市',value: 10},
            {name: '汕头市',value:70},
            {name: '东莞市',value: 50},
            {name: '惠州市',value:30},
            {name: '深圳市',value: 50}
          ]
      }
  ]
};
