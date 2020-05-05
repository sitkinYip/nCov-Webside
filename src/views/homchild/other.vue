<template>
  <div>
    <div class="world">
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template v-slot:header>
          疫情信息
        </template>

        <template v-slot:lead>
          7:00-10:00为更新高峰且数据更新有稍许延迟，数据若滞后敬请谅解
        </template>
        <hr class="my-4" />
        <p></p>
        <!-- ------------------Aplayer------ -->
        <ncovplayer></ncovplayer>
        <!-- ----------------------------0-- -->
      </b-jumbotron>

<!-- ------------------------------------------------- -->

      <div class="table-style">
        <h2>国内疫情实时详细数据</h2>
        <b-table id="table-transition-example" :items="countryitems" :busy="isBusy" hover small caption-top responsive>
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </div>
      <div id="myChart" ref="myChart" style="width: 100%;height: 50rem;margin-bottom: 3.2rem;"></div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import mapdata from '@/untlis/other-Option.js'

export default{
  data(){
      return{
          countryitems:[
            {
              地区: '黑龙江',
              疑似: 89,
              现存:234,
              累计:234,
              治愈:32,
              死亡:32,
              重症:32,
              _rowVariant: 'danger'
            },
          ],
          isBusy: true,
          othersource:[["疫情地区Top5"],["疑似"],["累计确诊"],["痊愈数"],["死亡数"]]
      }
  },
  methods:{
      mapEchartsInit(){
          let myChart = this.$echarts.init(this.$refs.myChart);
          myChart.setOption(mapdata, true);
      },
      async getcontinentdata(){
          this.axios({
            url:"http://api.tianapi.com/txapi/ncovcity/index",
            method: 'GET',
            params: {
              key: '7e83a892f6a95b46d88ba6c7ffc242b1'
            }}).then(res=>{
                if(res.data.code == 200){
                  this.isBusy = !this.isBusy
                  let Tabledata=[]
                    for(let i in res.data.newslist){
                        let CountrtTableObj = {};
                        CountrtTableObj.疫情地区=res.data.newslist[i].provinceName
                        CountrtTableObj.现有=res.data.newslist[i].currentConfirmedCount
                        CountrtTableObj.累计=res.data.newslist[i].confirmedCount
                        CountrtTableObj.疑似=res.data.newslist[i].suspectedCount
                        CountrtTableObj.治愈=res.data.newslist[i].curedCount
                        CountrtTableObj.死亡=res.data.newslist[i].deadCount
                        Tabledata.push(CountrtTableObj)
                    }
                    this.countryitems=Tabledata
                }
               // -----------------------柱状图数据-------------
                for (let i = 0; i < mapdata.dataset.source.length ; i++) {
                  this.othersource[0].push(this.countryitems[i].疫情地区);
                  this.othersource[1].push(this.countryitems[i].疑似)
                  this.othersource[2].push(this.countryitems[i].累计)
                  this.othersource[3].push(this.countryitems[i].治愈)
                  this.othersource[4].push(this.countryitems[i].死亡)
                }
                 // console.log(this.othersource)
                mapdata.dataset.source=this.othersource
                // ------------------------
                this.mapEchartsInit();
            })

      },
},
created() {

},
  mounted(){
this.getcontinentdata()
},

}
</script>

<style scoped="scoped">
.world {
  width: 95%;
  margin: 0 auto;
  margin-top: 1rem;
  height:  calc(100% - 3.2rem);
}
/* .table-style{
  width: 70rem;
  margin: 0 auto;
} */
</style>
