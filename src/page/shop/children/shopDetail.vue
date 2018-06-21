<template>
  <div class="padtop50 bgf5 rating_page">
      <mt-header fixed class="fs1-2" title="商家详情">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      </mt-header>

      <div class="maina bgfff">
          <mt-cell class="after" title="活动与属性"></mt-cell>
          <div class="pad10">
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
          </div>
      </div>

      <div class="mgtop10 bgfff">
          <mt-cell class="after" title="食品监督安全公示" to="//github.com" is-link value="企业认证详情"></mt-cell>
          <div class="pad10 flex">
                <div class="w60 mgr5">
                     <img class="">
                </div>
                <div class="flex1">
                      <div class="ih30"><span class="col9f">督查检查结果:</span><span class="colred">差</span></div>
                      <div class="ih30"><span class="col9f">检查日期:</span><span class="col9f">2017-02-03</span></div>
                </div>
          </div>
      </div>

      <div class="mgtop10 bgfff">
          <mt-cell class="after" title="商家信息"></mt-cell>
          <div class="shopmain fs0-8">
            <div class="ih50 after padr10">
                <span>商家名称:效果演示</span>
            </div>
            <div class="ih50 after padr10">
                <span>地址:上海市江岸区</span>
            </div>
            <div class="ih50 after padr10">
                <span>营业时间:9:30-22:00</span>
            </div>
            <div class="ih50 after padr10">
                <span>营业执照</span>
                <span class="right"><icon class="w15 col9f" name="right"></icon></span>
            </div>
            <div class="ih50 after padr10">
                <span>餐饮服务许可证</span>
                <span class="right"><icon class="w15 col9f" name="right"></icon></span>
            </div>
          </div>
      </div>
      <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

  </div>
</template>

<script>


export default {
  data () {
    return {
      
    }
  },
  components:{
  //注册组件
      
  },
  mounted:function(){
  //生命周期

  },
  computed:{
  //计算属性

  },
  methods:{
  //函数
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    background-color: #ebebeb;
    z-index: 18;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
.myicon{
  padding:0px 2px;
  border-radius:3px;
}
.bgcolred{
  background-color:red;
}
.shopmain{
  box-sizing:border-box;
  padding-left:10px;
}
</style>