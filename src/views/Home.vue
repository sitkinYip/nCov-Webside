<template>
  <div class="home">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">疫情实时信息</b-navbar-brand>
        <!-- --------------------手机端搜索框↓↓↓↓↓↓↓↓↓↓↓------------------ -->
        <div class="d-block d-md-none">
<!--         <van-search
           v-model="value"
           show-action
           placeholder="请输入搜索关键词"
           @search="onSearch"
           background="#17A2B8"
         >
           <template #action>
             <div @click="onSearch">搜索</div>
           </template>
         </van-search> -->
        </div>
        <!-- --------------------pC端导航和搜索------------------ -->
        <b-collapse id="nav-collapse" is-nav class="d-none d-md-block">
          <b-navbar-nav>
            <b-nav-item v-for="(item, index) in navdata" :key="index" @click="tabget(item.id, item.search,item.routername)">{{ item.name }}数据</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" :placeholder="'搜索' + seacon" v-model='search'></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" @click='onsearch'>搜索</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- -=== =↑↑↑↑↑  PC和手机端的顶部栏============================== -->
    <!-- -======↓↓↓↓↓ 手机端的 显示组件================================= -->
    <div class="d-block d-md-none">
    <van-notice-bar mode="closeable" class="NoticeBar" background="#ecf9ff" >
      通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容
    </van-notice-bar>



    <!-- ----------------------------------------------------底部栏 -->

      <van-tabbar v-model="active" class="nav">
        <van-tabbar-item icon="cluster-o" to="/world">全球数据</van-tabbar-item>
        <van-tabbar-item icon="bar-chart-o" to="/china">全国数据</van-tabbar-item>
        <van-tabbar-item icon="location-o" to="/province">省份数据</van-tabbar-item>
        <van-tabbar-item icon="newspaper-o" to="/news">疫情新闻</van-tabbar-item>
        <van-tabbar-item icon="more-o" to="/other">更多资讯</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- ---------------------------------------------------------------------------- -->
  <router-view/>
  </div>
</template>
<script>
  import py from '@/untlis/py.js'
export default {
  name: 'Home',
  data() {
    return {
      isHovered: false,
      navdata: [
        {
          id: 0,
          name: '全球',
          routername:"World"
        },
        {
          id: 1,
          name: '全国',
          search:'省份',
          routername:"China"
        },
        {
          id: 2,
          name: '省份',
          search:'城市',
          routername:"Province"
        },
        {
          id: 3,
          name: '新闻',
          search:'新闻',
          routername:"News"
        },
        {
          id: 4,
          name: '更多',
          search:'其他',
          routername:"Other"
        }
      ],
      seacon: '',
      active: 0,
      //控制加载中显示
      show:true,
      rounames:'',
      search:'',
      searchindex:''
    };
  },
  created() {

  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    tabget(i, n,rou) {
      console.log(i);
      this.searchindex=i
      if (i >= 1) {
        this.seacon = n;
      }
      if(this.rounames==rou){
        return
      }
      this.rounames=rou

      this.$router.push({
        name:rou
      })

    },
    // //初始化地图数据
    // mapEchartsInit(){
    //     var myChart=echarts.init(this.$refs.map);
    //     myChart.setOption(mapdata, true);
    // }
    onsearch(){
      if(this.searchindex==1){
        let data=this.search
        if(this.search.charAt(this.search.length-1)=='省'){
          data=data.substr(0,data.length-1)
        }

        let ping=py.chineseToPinYin(data)
        console.log(ping)

        return
      }
    },
    getprodata(){

    }

  },
};
</script>
<style lang="less" scoped="scoped">
.home{
   height: calc(100% - 3.5rem);
   width: 100%;
   position: relative;
   padding-bottom: 3rem;
 }
.nav {
  height: 3.5rem;
}
/deep/.van-tabbar-item__icon {
  font-size: 1.5rem;
}
.NoticeBar{
  margin-top: 20px;
  height: 2.5rem;
font-size: 0.67rem;color: #1989fa;
}
// .NoticeBar>d
</style>
