<template>
    <div class="prvmap">
      <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
      <div ref="map" class="map"></div>

      <!-- ---------------------------侧边栏 -->
      <div class="text-center my-3">
        <b-button-group>
          <b-button  v-b-tooltip.hover v-for='(item,index) in provswitchdata' :title='"全市"+item.name+"疫情信息"' :key='index' @click="onproswitch(item.info,index)">{{item.name}}</b-button>
          <!-- ------------↑↑↑↑↑↑现有和累计的切换  ↓↓↓↓↓↓↓↓侧边栏 --------------- -->
            <b-button v-b-toggle.sidebar-right>各省疫情信息</b-button>

        </b-button-group>

        <b-sidebar id="sidebar-right" title="各市疫情信息" right shadow backdrop width="14rem">
          <div class="px-3 py-2">
            <p>
              <b-table striped hover :items="provinceitems"></b-table>
            </p>
            <b-img src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/1.jpg" fluid thumbnail style="border-radius: 22px;"></b-img>
          </div>
        </b-sidebar>
      </div>

    </div>
</template>

<script>
  import echarts from "echarts";
  import 'echarts/map/js/province/guangdong.js';
  import mapdata from '@/untlis/map-PrvinceOption.js';

  export default{
   data(){
      return{
        show:true,
        provswitchdata:[
            {
              name:"现有确诊",
              info:"currentConfirmedCount"
            },
            {
              name:"累计确诊",
              info:"confirmedCount"
              }
        ],
        provinceitems: [
          {
            name:"",
            value:1
        }]
        }
    },
    methods:{
      mapEchartsInit(){
          var myChart=echarts.init(this.$refs.map);
          myChart.setOption(mapdata, true);
      },
      onproswitch(a,b){
           this.getepidata(a);
              // console.log(a,b)
      },
      getepidata(info) {
        this.axios({
          url: 'http://api.tianapi.com/txapi/ncovcity/index',
          method: 'GET',
          params: {
            key: '7e83a892f6a95b46d88ba6c7ffc242b1'
          }
        }).then(res => {
          if (res.data.code == 200) {
             this.show=false
             let citydata=[];  //侧边栏数据
             let data=[]  //广东省 数据
             for(let i in res.data.newslist[8].cities){
             let cityobj={}
             //--------------------------------------------
             cityobj.城市名=res.data.newslist[8].cities[i].cityName;
             cityobj.确诊数=res.data.newslist[8].cities[i][info];
             cityobj.死亡数=res.data.newslist[8].cities[i].deadCount;

             citydata.push(cityobj)
             // ------------------------------------------
             let obj={}
             obj.name=res.data.newslist[8].cities[i].cityName+'市'
             obj.value=res.data.newslist[8].cities[i][info]
             data.push(obj);
             // ------------------------------------------
             }
            mapdata.series[0].data=data
            this.provinceitems=citydata
            this.mapEchartsInit();
          }

        });
      }
    },
      mounted() {
          this.getepidata("currentConfirmedCount")
      }
  }

</script>

<style lang="less" scoped>
  .prvmap{
    height: 100%;
  }
  .prvmap .map{
    width: 100%;
    height: calc(100% - 7rem)
  }


</style>
