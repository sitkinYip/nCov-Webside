<template>
  <div class="wormap">
          <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
      <div ref="map" class="map"></div>
    <div class="text-center my-3 swichmy">
    <b-button-group>
      <b-button  v-b-tooltip.hover v-for='(item,index) in switchworlddata' :title='"全球"+item.name+"疫情信息"' :key='index' @click="onswitch(item.info,index)">{{item.name}}</b-button>
      <!-- ------------↑↑↑↑↑↑现有和累计的切换  ↓↓↓↓↓↓↓↓侧边栏 --------------- -->
        <b-button v-b-toggle.sidebar-right>各国疫情信息</b-button>
    </b-button-group>
    <b-sidebar id="sidebar-right" title="各国疫情信息" right shadow backdrop width="15rem">
      <div class="px-3 py-2">
        <p>
          <b-table striped hover :items="worlditems"></b-table>
        </p>
        <b-img src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/6.jpg" fluid thumbnail style="border-radius: 22px;"></b-img>
      </div>
    </b-sidebar>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import 'echarts/map/js/world';
  import "echarts-gl"
  import mapdata from '@/untlis/map-WorldOption.js';

  export default{
   data(){
      return{
          show:true,
          switchworlddata:[
            {
              name:"现有确诊",
              info:"currentConfirmedCount"
            },
            {
              name:"累计确诊",
              info:"confirmedCount"
            }
          ],
          worlditems:[]
        }
    },
    methods:{
      mapEchartsInit(){
          var myChart=echarts.init(this.$refs.map);
          myChart.setOption(mapdata, true);
      },
      getWorldData(info) {
        this.axios({
          url: 'http://api.tianapi.com/txapi/ncovabroad/index',
          method: 'GET',
          params: {
            key: '869941cd56fe09e14b255d12467651bd'
          }
        }).then(res => {
          if (res.data.code == 200) {
              this.show=false;
              let WorldData=[];
              let WorldTableData=[];
              for(let i in res.data.newslist){
                let obj={}
                obj.name=res.data.newslist[i].provinceName
                obj.value=res.data.newslist[i][info]
                WorldData.push(obj)
                // -------------------------地图数据遍历↑↑↑------------------
                // -------------------------侧边栏遍历↓↓↓↓↓------------------
                let Tableobj={};
                Tableobj.国家=res.data.newslist[i].provinceName;
                Tableobj.感染数=res.data.newslist[i][info]
                Tableobj.死亡数=res.data.newslist[i].deadCount;
                WorldTableData.push(Tableobj)
              }
              this.worlditems=WorldTableData
              // console.log(WorldData)
              mapdata.options[0].series.data=WorldData
               this.mapEchartsInit();
               console.log(res)
          }
        });
      },
      onswitch(a){
          this.getWorldData(a)

        }
    },
    mounted() {
        this.getWorldData("currentConfirmedCount")
    }
  }

</script>

<style lang="less" scoped>

  .wormap{
    height: 100%;
  }
  .wormap .map{
    text-align: center;
    width: 100%;
    height: calc(100% - 7rem)
  }
</style>
