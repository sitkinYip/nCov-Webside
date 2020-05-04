<template>
  <div class="coumap">
    <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
    <div ref="map" class="map"></div>
    <!-- -------------------------------------------------------------- -->
    <div class="text-center my-3 swichmy">
    <b-button-group>
      <b-button  v-b-tooltip.hover v-for='(item,index) in switchdata' :title='"全国"+item.name+"疫情信息"' :key='index' @click="onswitch(item.info)">{{item.name}}</b-button>
      <!-- ------------↑↑↑↑↑↑现有和累计的切换 / ↓↓↓↓↓↓↓↓侧边栏 --------------- -->
        <b-button v-b-toggle.sidebar-right>各省疫情信息</b-button>
    </b-button-group>
    <b-sidebar id="sidebar-right" title="各省疫情信息" right shadow backdrop width="13rem">
      <div class="px-3 py-2">
        <p>
          <b-table striped hover :items="countryitems"></b-table>
        </p>
        <b-img src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/2.jpg" fluid thumbnail style="border-radius: 22px;"></b-img>
      </div>
    </b-sidebar>
    </div>
    <!-- ------------------------ -->
  <div>
    <b-table striped hover :items="otherdata"></b-table>
  </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import 'echarts/map/js/china';
  //引入地图数据
  import mapdata from '@/untlis/map-CountryOption.js'
  export default{
    data(){
      return{
      //控制加载中显示
      show:true,
      countryitems:[],
      otherdata:[],
      switchdata:[
        {
          name:"现有确诊",
          info:"currentConfirmedCount"
        },
        {
          name:"累计确诊",
          info:"confirmedCount"
        }
      ]
      }
    },
    created() {},
    methods:{
      //初始化地图数据
      mapEchartsInit(){
          var myChart=echarts.init(this.$refs.map);
          myChart.setOption(mapdata, true);
      },
      //请求API数据
      async getepidata(info) {
        this.axios({
          url: 'http://api.tianapi.com/txapi/ncovcity/index',
          method: 'GET',
          params: {
            key: '7e83a892f6a95b46d88ba6c7ffc242b1'
          }
        }).then(res => {
          if (res.data.code == 200) {
             this.show=false
             let data=[]
             let provdata=[]
            for(let i in res.data.newslist){
             let obj={}
             obj.name=res.data.newslist[i].provinceShortName
             obj.value=res.data.newslist[i][info]
             data.push(obj)
             // -------------------↓各省疫情信息  ↑全国数据遍历-
             let provobj={}
             provobj.省份=res.data.newslist[i].provinceShortName
             provobj.确诊数=res.data.newslist[i][info];
             provobj.死亡数=res.data.newslist[i].deadCount;
             provdata.push(provobj)
             // ----------------------------otherdata---
             let otherdataobj={}
             }
             this.countryitems=provdata
             mapdata.series[0].data=data
             this.mapEchartsInit()
            // console.log(res.data)
            // this.otherdata[0].
          }
        });
      },
      onswitch(a){
          this.getepidata(a);
      }
    },
    mounted() {
         this.getepidata("currentConfirmedCount");
    }
  }
</script>

<style lang="less" scoped>
  .coumap{
    height: 100%;
  }
  .coumap .map{
    text-align: center;
    width: 100%;
    height: calc(100% - 6.7rem)
  }
  .swichmy{
        margin-bottom: 0 !important;
  }
</style>
