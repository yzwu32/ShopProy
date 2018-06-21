<!--  -->
<template>
<div>
    <transition name="loading">
      <load v-show="!shoplist"></load>
    </transition> 
    <mt-header fixed  class="fs1-2" :title="msiteTitle">
      <router-link to="/" slot="left">
        <div><icon class="search2" name="search2" ></icon></div>
      </router-link>
      <mt-button class="fs0-8" slot="right">登录|注册</mt-button>
    </mt-header>

    <div class="padtop40">
      <mt-swipe class="myswipe" :auto="0">
        <mt-swipe-item v-for="items in category" :key="items.id" class="myitem">
          <div v-for="(item,index) in items" :key="index">
            <div class="imgbox"><img :src="imgBaseUrl+item.image_url"></div>
            <div class="fs0-8 col9f mgtop5">{{item.title}}</div>
          </div>
        </mt-swipe-item>
      </mt-swipe>

      <div class="mgtop10 bgfff maindiv">
        <div class="ih30 pad10">
          <div class="svgbox left">
            <icon name="shop" class="shopicon"></icon>
          </div>
          <div class="fs0-8 left col9f mgleft10">
            附近商家
          </div>
        </div>

        <router-link :to="{path: '/shop', query: {id:item.id,geohash:geohash}}" v-for="(item,index) in shoplist" :key="index" class="shoplist after">
            <div class="shopimgbox">
                <img :src="imgshopUrl+item.image_path">
            </div>
            <div class="rightbox">
                <div class="shoptop">
                  <span class="pinpai fs10 mgl">品牌</span>
                  <span class="shopname">{{item.name}}</span>
                  <span class="rightspan right fs10 mgr"><span v-for="(itemsupports,index) in item.supports" :key="index" class="">{{itemsupports.icon_name}}</span></span>
                </div>
                <div class="xxdiv">
                  <div class="xxbox fs10 mgl">
                    <span v-for="(itemxx,index) in 5" :key="index" class="xxspan1"><icon v-if="index+1<=item.rating" name="xx" class="xx"></icon><icon v-if="index+1>item.rating" name="xx2" class="xx"></icon><span v-if="item.rating-(index)>0&&item.rating-(index)<1" :class="xxclass+(item.rating*10-index*10)"><icon name="xx" class="xx"></icon></span></span>
                  </div>
                  <span class="colred fs10 mgl mgleft8">{{item.rating}}</span>
                  <span class="fs10 mgl">月售{{item.recent_order_num}}单</span>
                  <span class="rightspan fs10 right mgr">
                      <span v-if="item.delivery_mode" class="fn">{{item.delivery_mode.text}}</span>
                      <span class="zs ">准时达</span>
                  </span>
                </div>
                <div class="shopfoot">
                    <div><span class="fs10 mgl">￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span></div>
                    <div><span class="right fs10 mgr"><span class="">{{item.distance}}/</span><span class="col">{{item.order_lead_time}}</span></span></div>
                </div>
            </div>
            </router-link>
        </div>



      </div>

    <foot></foot>
</div>
</template>

<script>
import load from '../../components/load/load'
import foot from '../../components/foot/foot'
import axios from 'axios'
export default {
  data () {
    return {
        geohash:'',
        msiteTitle:'',
        category:[],
        imgBaseUrl:'https://fuss10.elemecdn.com', //图片域名地址
        shoplist:"",
        imgshopUrl:'http://cangdu.org:8001/img/',
        xxclass:"xxspan2 w",
    };
  },

  components: {
  //注册组件
    load,
    foot
  },

  computed: {
  //计算属性

  },
  beforeMount:function(){
    if (!this.$route.query.geohash) {
			this.geohash = "31.23037,121.473701";//默认地址
		}else{
			this.geohash = this.$route.query.geohash
    }
    axios.get('http://cangdu.org:8001/v2/pois/'+this.geohash).then(response => {
      this.msiteTitle=response.data.name;
    },response=>{
      console.log(response);
    })

  },
  mounted:function() {
    console.log(localStorage.getItem("mycarList"))
  //生命周期
    axios.get('http://cangdu.org:8001/v2/index_entry').then(response => {
        console.log(response);
        var mybody=response.data;
        var num=parseInt(mybody.length/8);
        var category=[];
        var arr=[];
        for(var i=0;i<num;i++){
           arr=[];
          for(var h= 0;h<8;h++){
            arr.push(mybody[i*8+h]);
          }
          category.push(arr);
        }
        arr=[];
        if(num*8<mybody.length){
          for(var k=num*8;k<mybody.length;k++){
              arr.push(mybody[num*8+k]) 
          }
          category.push(arr);
        }
        this.category=category;
        console.log(this.category);
      }, response => {
        console.log(response);
      });

    axios.get('http://cangdu.org:8001/shopping/restaurants?latitude='+this.geohash.latitude+'&longitude='+this.geohash.longitude+'').then(response => {
        console.log(response);
        this.shoplist=response.data;
      }, response => {
        console.log(response);
      });

  },

  methods: {
  //函数
  }
}
</script>

<style lang='scss' scoped>
.fs10{
  font-size: 12px;
  transform: scale(.8);
  display:inline-block;
}
.mgr{
  transform-origin:100% 50% 0;/*改变缩放基点*/
}
.mgl{
  transform-origin:0 50% 0;/*改变缩放基点*/
}
.myswipe{
  height:210px;
  box-sizing:border-box;
  padding-bottom:30px;
  padding-top:10px;
  background-color:#ffffff;
  border-bottom:1px solid #E4E4E4;
}
.myswipe .mint-swipe-indicators .is-active{
  background-color:#26a2ff;
}

.myitem>div{
  width:25%;
  height:50%;
  box-sizing:border-box;
  float:left;
  text-align:center;
}
.imgbox{
  height:60%;
}
.imgbox img{
  height:100%;
}
.shopicon{
  width:100%;
  height:100%;
  margin-bottom:-2px;
}
.svgbox{
  width:15px;
  height:15px;
}
.mgleft10{
  margin-left:10px;
}
.shoplist{
  padding:10px;
  overflow: hidden;
  display:flex;
}
.shoplist>div{
  float:left;
}
.shopimgbox{
  width:60px;
  height:60px;
  margin-right:5px;
}
.shopimgbox>img{
  height:100%;
  width:100%;
  background-color:red;
}
.maindiv{
  border-top:1px solid #E4E4E4;
}

.search2{
  width:20px;
  height:20px;
}
.rightbox{
  font-size:0.8rem;
  flex:1;
}
.shoptop,.xxdiv{
  height:25px;
  line-height:25px;
}
.pinpai{
  display:inline-block;
  width:30px;
  text-align:center;
  font-weight:bold;
  height:20px;
  line-height:20px;
  background-color:#ffd930;
  border-radius:3px;
}
.shopname{
  font-weight:bold;
  font-size:0.8rem;
}
.rightspan>span{
  display:inline-block;
  height:14px;
  border:1px solid #A3ACB7;
  margin-left:3px;
  padding:1px;
  color:#A3ACB7;
  line-height:14px;
  font-size:12px;
}

.xx{
  width:10px;
  height:10px;
  
}
.xxbox{
  display:inline-block;
  height:25px;
  box-sizing:border-box;
}
.xxbox>span{
    margin-right:-2px;
}
.xxspan1{
  position:relative;
  display:inline-block;
}
.xxspan2{
  display:inline-block;
  position:absolute;
  left:0px;
  overflow: hidden;
}
.w1{
  width:10%;
}
.w2{
  width:20%;
}
.w3{
  width:30%;
}
.w4{
  width:40%;
}
.w5{
  width:50%;
}
.w6{
  width:60%;
}
.w7{
  width:70%;
}
.w8{
  width:80%;
}
.w9{
  width:90%;
}
.fn{
  background-color:#3190E8;
  color:white !important;
  border-color:#3190E8 !important;
}
.zs{
  color:#3190E8 !important;
   border-color:#3190E8 !important;
}
.mgleft8{
  margin-left:-8px;
}
.shopfoot>div{
  width:50%;
  float:left;
}
.myhead{
  height:40px;
  box-sizing:border-box;
  line-height:40px;
  position:fixed;
  background-color:#26a2ff;
  width:100%;
  color:white;
  padding:0px 10px;
  text-align:center;
  z-index:1;
}
.myhead>div{
  display:inline-block;
}
.headright{
  position:absolute;
  right:10px;
}
.headmain{
  max-width:55%;
  margin:0px auto;
}
.search2{
  width:20px;
  height:20px;
  position:absolute;
  top:10px;
  left:10px;
}
</style>