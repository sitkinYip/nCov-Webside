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
  
  import mapdata from '@/untlis/map-PrvinceOption.js';
  // import 'echarts/map/js/province/guangdong.js'

  export default{
	  created() {
	  	// console.log(this.$route.query.chname)
	  	this.prchname=this.$route.query.chname;
		
		
		if(this.$route.query.name){
			this.mname=this.$route.query.name.toLowerCase()
			
		}else{
			this.mname='guangdong'
			this.prchname='广东'
		}
		// console.log(this.mname)
	  	require('echarts/map/js/province/'+this.mname+'.js')
	  	this.getepidata("currentConfirmedCount",this.prchname)
	  },
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
        }],
		prchname:'',
		mname:'guangdong',
		
        }
		
    },
    methods:{
      mapEchartsInit(){
          var myChart=echarts.init(this.$refs.map);
          myChart.setOption(mapdata, true);
      },
      onproswitch(a,b){
           this.getepidata(a,this.prchname);
              // console.log(a,b)
      },
      async getepidata(info,sfname) {
		  
		  if(!sfname){
			  sfname='广东'
		  }
		  // console.log(sfname)
		  // console.log(sfname)
        this.axios({
          url: 'http://api.tianapi.com/txapi/ncovcity/index',
          method: 'GET',
          params: {
            key: '7e83a892f6a95b46d88ba6c7ffc242b1'
          }
        }).then(res => {
			let sf=''
          if (res.data.code == 200) {
			  // console.log(res.data.newslist)
			  let newslist=res.data.newslist
			  for(let i in newslist){
				  if(newslist[i].provinceShortName==sfname){
					  sf=newslist[i]
					  // console.log(newslist[i])
					  window.citydatas=sf
				  }
			  }
			  
             this.show=false
             let citydata=[];  //侧边栏数据
             let data=[]  //广东省 数据
             for(let i in sf.cities){
             let cityobj={}
             //--------------------------------------------
             cityobj.城市名=sf.cities[i].cityName;
             cityobj.确诊数=sf.cities[i][info];
             cityobj.死亡数=sf.cities[i].deadCount;

             citydata.push(cityobj)
             // ------------------------------------------
             let obj={}
             obj.name=sf.cities[i].cityName+'市'
             obj.value=sf.cities[i][info]
             data.push(obj);
             // ------------------------------------------
             }
			 // console.log(data)
			 mapdata.series[0].name=this.prchname+'省疫情-累计确诊'
			 if(info=='currentConfirmedCount'){
				 mapdata.series[0].name=this.prchname+'省疫情-目前确诊'
			 }
			 
			 mapdata.series[0].mapType=this.prchname
            mapdata.series[0].data=data
            this.provinceitems=citydata
            this.mapEchartsInit();
          }

        });
      }
    },
      mounted() {
		  // console.log(this.prchname)
          
      },
			
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
