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
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      </b-jumbotron>

      <h2>实时详细数据</h2>
      <b-table id="table-transition-example" :items="countryitems"></b-table>


      <!-- <div id="myChart" ref="myChart" style="width: 100%;height: 600px;"></div> -->
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
            }
          ]
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
                  let Tabledata=[]
                    for(let i in res.data.newslist){
                        let CountrtTableObj = {};
                        CountrtTableObj.地区=res.data.newslist[i].provinceName
                        CountrtTableObj.累计=res.data.newslist[i].confirmedCount
                        CountrtTableObj.疑似=res.data.newslist[i].suspectedCount
                        CountrtTableObj.治愈=res.data.newslist[i].curedCount
                        CountrtTableObj.死亡=res.data.newslist[i].deadCount
                        Tabledata.push(CountrtTableObj)
                    }
                    this.countryitems=Tabledata

                    // console.log(res.data)

                }
            })
      }

},
created() {
  this.getcontinentdata()
},
  mounted(){
    // this.mapEchartsInit();
}
}
</script>

<style scoped="scoped">
.world {
  width: 95%;
  margin: 0 auto;
  margin-top: 1rem;
  height:  calc(100% - 3.2rem);
}
</style>
