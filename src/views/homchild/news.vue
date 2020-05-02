<template>
  <div>
  <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      fade
      controls
      no-hover-pause
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>
<!-- -------------------------------------------轮播图--------------------- -->

<!-- -------------------------------------------新闻----------------- -->
<br>
<!-- ------------------------------------------------------------ -->
<div>
  <b-card-group deck>
    <b-card title="新型冠状病毒" img-src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/3.jpg" img-alt="Image" img-top>
      <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
      <b-card-text>
        <p class="mb-0">{{this.nCovInfo.info1}}</p>
        <p class="mb-0">{{this.nCovInfo.info4}}</p>
        <p class="mb-0">{{this.nCovInfo.info5}}</p>
      </b-card-text>
      <b-button href="https://baike.baidu.com/item/2019%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92/24267858?fr=aladdin">点击了解更多</b-button>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>

    <b-card title="传播途径和感染源" img-src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/5.jpg" img-alt="Image" img-top>
      <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
      <b-card-text>
        <p class="mb-0">{{this.nCovInfo.info3}}</p>

        <p class="mb-0">{{this.nCovInfo.info2}}</p>

      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>

    <b-card title="传染宿主" img-src="https://cdn.jsdelivr.net/gh/devil-trigger/sdn/ncov/4.jpg" img-alt="Image" img-top>
      <b-overlay :show="show" rounded="sm" style="height: 100%;" v-if='show'></b-overlay>
      <b-card-text>
         <p class="mb-0">{{this.nCovInfo.info6}}</p>
         <p>栖息环境：栖息于500-2769米的海拔高度之间。在南亚，该物种常见于降雨大的山地森林中。它们栖息于洞穴、废弃的旧隧道、寺庙、房屋、枯井和树木的空洞中。</p>
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  </b-card-group>
</div>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        slide: 0,
        show:true,
        sliding: null,
        nCovInfo:{}
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      getNewsdata(){
          this.axios({
              url: 'http://api.tianapi.com/txapi/ncov/index',
              method: 'GET',
              params:{
                  key: '869941cd56fe09e14b255d12467651bd'
                }
            }).then(res => {
              if (res.data.code == 200) {
                 // console.log(res.data.newslist[0].desc)
                 this.show=false
                this.nCovInfo.info1=res.data.newslist[0].desc.note1;
                this.nCovInfo.info2=res.data.newslist[0].desc.note2;
                this.nCovInfo.info3=res.data.newslist[0].desc.note3;
                this.nCovInfo.info4=res.data.newslist[0].desc.remark1;
                this.nCovInfo.info5=res.data.newslist[0].desc.remark2;
                this.nCovInfo.info6=res.data.newslist[0].desc.remark3;
                // console.log(res)
              }
            });
          }
      },
      mounted() {
          this.getNewsdata()
      }
    }

</script>

<style scoped="scoped">
.nCov-info-card{
  overflow: hidden;
  display: flex;
}
.nCov-info-card>div{
  margin-left: 30px;
}
</style>
