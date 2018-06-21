<template>
  <div id="shop" class="bgfff">

    <transition name="loading">
      <load v-if="!getshopnum"></load>
    </transition> 
    <div class="big">
        <div class="topbg">
                <img class="topbgimg" :src="imgpath+shopinfo.image_path">
        </div>
        <div class="shoptop">
            <div class="toptop ih30">
              <router-link :to="{path: '/miste', query: {geohash:geohash}}"><icon class="backicon" name="back"></icon></router-link>
              <span class="right">
                  <icon class="backicon2" name="cart"></icon>
                  <icon class="backicon2" name="more"></icon> 
              </span>
            </div>
            <div class="topfoot">
                <div class="topleft">
                    <img :src="imgpath+shopinfo.image_path">
                </div>
                <div class="topright nowarp">
                    <router-link to="/shop/shopDetail">
                        <div class="foota">
                            <div class="footamain fs1-2 nowarp">{{shopinfo.name}}</div>
                            <icon name="right" class="icon3"></icon>
                        </div>
                    </router-link>
                    <div class="footb nowarp">
                        <div class="nowarp">公告:{{shopinfo.promotion_info}}</div>
                    </div>
                    <div class="footc">
                        <span class="footcmain"><span v-if="shopinfo.delivery_mode">{{shopinfo.delivery_mode.text}}•</span><span>约{{shopinfo.order_lead_time}}</span></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="shopmid mgtop10">
            <div v-if="shopinfo.activities && shopinfo.activities.length" class="midtop"><span class="te mgr5">{{shopinfo.activities[0].icon_name}}</span><span>{{shopinfo.activities[0].description}}</span><span class="right">{{shopinfo.activities.length}}个活动 <icon name="down" class="icon4"></icon></span></div>
            <div class="mytab">
                <div @click="shoporscore=true;footdiv=true" :class="{ on:shoporscore }">商品</div>
                <div @click="shoporscore=false;footdiv=false" :class="{ on:!shoporscore }" >评价{{shopinfo.rating}}分</div>
            </div>
        </div>

    <transition name="fade-choose" mode="out-in">
      <div class="shopmain" v-show="shoporscore">
          <div class="mianleft">
              <div class="leftdiv on">
                  <div >
                      <icon class="icon5" name="hot"></icon>
                      <span>热销</span>
                  </div>
              </div>
              <div class="leftdiv">
                <div>
                  <icon class="icon5" name="discount"></icon>
                    <span>优惠</span>
                </div>
              </div>
              <div class="leftdiv">
                <div> 
                  <span>很长的蔡明</span>
                </div>  
              </div>
              <div class="leftdiv">
                <div>
                  <span>段蔡明</span>
                </div>
              </div>
              <div class="leftdiv">
                <div>
                  <span>菜名</span>
                </div>
              </div>
              <div class="leftdiv">
                <div>
                  <span>菜名</span>
                </div>
              </div>
              <div class="leftdiv">
                <div>
                  <span>菜名</span>
                </div>
              </div>
          </div>
          <div class="mainright">
              <div class="item" v-for="(item,index) in getshopnum" :key="index">
                  <div class="itemtop ih30 after">
                      <span class="fs15">{{item.name}}</span>
                      <span class="fs0-8 col9f">{{item.description}}</span>
                  </div>
                  <div class="itemmain">
                      <div v-for="(items,index) in item.foods" :key="index" class="iteminfo after">
                          <div class="infoimgbox">
                              <img :src="imgpath+items.image_path">
                          </div>
                          <div class="inforight">
                              <div class="fs15 ih20">{{items.name}}</div>
                              <div class="ih15 col9f"><span class="fs10 mgl">{{items.tips}}</span></div>
                              <div class="ih15"><span v-if="false" class="fs10 mgl"><span class="zk">7折</span><span class="yh">每单限1份优惠</span></span></div>
                              <div class="ih20">
                                <span class="colred fs12">￥</span>
                                <span class="colred mgr5">{{items.specfoods[0].price}}</span>
                                <span v-if="false" class="fs12 col9f midline">￥56</span>
                                <span class="right">
                                  <span v-if="items.mynum" @click="removecar(items)"><icon class="addicon y4" name="offline"></icon></span>
                                  <span v-if="items.mynum" class="ih20 inblock">{{items.mynum}}</span>
                                  <span @click="addcar(items)"  v-if="items.specfoods.length==1"><icon name="add" class="addicon y4" ></icon></span>
                                  <span class="fs12 right gz" v-if="items.specfoods.length>1&&false">选规则</span>
                                </span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </transition>


    <transition name="opacity" mode="out-in">
          <div v-if="carinfo&&mycar.length>=1" class="car">
              <div class="carmain flex2">
                  <div class="cartop padlr10 ih50">
                        <span>购物车</span>
                        <span @click="mycar=[]" class="right"><icon class="addicon mgr5 y4" name="delete"></icon>清空</span>
                  </div>
                  <div class="carmainbox flex1">
                      <div v-for="(item,index) in mycar" class="carbox after padlr10 bgfff ih50" :key="index">
                            <span class="bold col666">{{item.shop.specfoods[0].name}}</span>
                            <span class="right">
                                <span class="colred mgr5">￥{{item.shop.specfoods[0].price*item.num}}</span>
                                <span @click="item.num=item.num-1"><icon class="addicon y4" name="offline"></icon></span>
                                <span class="ih20 inblock">{{item.num}}</span>
                                <span @click="item.num=item.num+1" class=""><icon name="add" class="addicon y4"></icon></span>
                            </span>
                      </div>
                  </div>
              </div>
          </div>
    </transition>
    
    <transition name="opacity">
      <div v-if="footdiv" class="foot" :class="{on:mycar.length>=1}">
            <div class="footleft" @click="mycar.length>0?carinfo=!carinfo:''">
                <div class="footlogo">
                    <icon name="footcar" class="footicon"></icon>
                    <div v-if="mycar.length" class="rednum">{{mycarshopnum}}</div>
                </div>
                <div class="footmain">
                    <div v-if="!mycar.length" class="">未选购商品</div>
                    <div v-if="mycar.length" class="ih30 fs1-2">￥ {{mycarshoppic}}</div>
                    <div v-if="mycar.length" class="ih20">{{yftips}}</div>
                </div>
            </div>
            <div class="footright" :class="{on:shoppicbig==1}">
                <span v-if="!mycar">￥{{this.shopinfo.float_minimum_order_amount}}起送</span>
                <span v-if="shoppicbig==2">还差￥{{this.shopinfo.float_minimum_order_amount-mycarshoppic}}起送</span>
                <span v-if="shoppicbig==1">去结算</span>
            </div>
      </div>
    </transition>


    <transition name="fade-choose">
      <div class="score" v-show="!shoporscore">
        <div class="scoretop">
          <div class="scoretopleft">
              <div class="fs1-2 colf60">{{shopinfo.rating}}</div>
              <div class="fs15 col9f">综合评价</div>
              <div class="fs0-8 col9f">高于周边商家{{parseInt(scorerating.compare_rating*100)}}%</div>
          </div>
          <div class="scoretopright">
              <div><span class="fs15 col9f mgr5">评价服务</span><stars :num="parseFloat(scorerating.service_score).toFixed(1)"></stars><span class="colf60 right">{{parseFloat(scorerating.service_score).toFixed(1)}}</span></div>
              <div><span class="fs15 col9f mgr5">菜品评价</span><stars :num="parseFloat(scorerating.food_score).toFixed(1)"></stars><span class="colf60 right">{{parseFloat(scorerating.food_score).toFixed(1)}}</span></div>
              <div><span class="fs15 col9f mgr5">送达时间</span><span class="fs15 colf60">{{scorerating.deliver_time}}分钟</span></div>
          </div>
        </div>
        <div class="scoremain">
              <div class="scoremaintop after">
                <div v-for="(item,index) in scoretags" :key="index" class="ih30 fs0-8" :class="{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}">{{item.name}}({{item.count}})</div>
              </div>
              <div class="scoremaininfo">
                  <div v-for="(item,index) in score" :key="index" class="scoreitem after">
                      <div class="scoreitemleft">
                          <img :src="imgaddpath(item.avatar)" >
                      </div>
                      <div class="scoreitemright fs12 col9f">
                          <div>
                              <span>{{item.username}}</span>
                              <span class="right">{{item.rated_at}}</span>
                          </div>
                          <div>
                              <stars :num="item.rating_star"></stars>
                          </div>
                          <div>
                              {{item.time_spent_desc}}
                          </div>
                          <div class="scoreimgbox">
                            <img v-for="(itema,index) in item.item_ratings" :key="index" :src="imgaddpath(itema.image_hash)">
                          </div>
                          <div class="namebox">
                              <div v-for="(itemb,index) in item.item_ratings" :key="index">{{itemb.food_name}}</div>
                          </div>

                      </div>
                  </div>
                
              </div>
        </div>
      </div>
    </transition>
  </div>

  <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>


  </div>
</template>

<script>
import axios from 'axios'
import stars from '../../components/stars/stars'
import load from '../../components/load/load'
export default {
  data () {
    return {
      carinfo:false,                            //购物车详情是否显示
      mycarList:'',  
      mycar:[],                               //我的购物车
      footdiv:true,                             //脚部购物车是否显示
      shopon:0,                                 //商品种类选中的哪个
      shopinfo:"",
      imgpath:'http://cangdu.org:8001/img/',
      shopmean:"", //食品信息
      shoporscore:true,
      score:"",                                 //评价信息
      scorerating:"",                           //评价分数  
      scoretags:"",                             //评价分类
      scoreindex:0,                             //选中第几个评价分类
      num:1,
      modal:false,                              //模态框显示隐藏
      myrouter:true,                             //是否显示big div
      yftips:"",
      shopID:'',
      geohash:''
    }
  },
  components:{
  //注册组件
    stars,
    load
  },
  created:function () {
    this.myrouter=(this.$route.path=="/shop"?true:false);
    console.log(this.myrouter+this.$route.path)
    //localStorage.removeItem("mycarList");
  },
  beforeMount:function(){
    if (!this.$route.query.id) {
			this.shopID = 1
		}else{
			this.shopID =parseInt(this.$route.query.id);
    }
    this.geohash=this.$route.query.geohash
  },
  mounted:function(){
  //生命周期
    //餐馆详情
      axios.get('http://cangdu.org:8001/shopping/restaurant/'+this.shopID).then(response => {
        this.shopinfo=response.data;
        this.yftips=JSON.stringify(this.shopinfo.piecewise_agent_fee.tips);
      }, response => {
        console.log(response);
      });
      //食品详情
      axios.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id='+this.shopID).then(response => {
        this.shopmean=response.data;
      }, response => {
        console.log(response);
      });
      //评论详情
      axios.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.shopID+'/ratings?offset=0&limit=10').then(response => {
        this.score=response.data;
      }, response => {
        console.log(response);
      });
      //评论分数
      axios.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.shopID+'/ratings/scores').then(response => {
        this.scorerating=response.data;
      }, response => {
        console.log(response);
      });
       //评论分类
      axios.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.shopID+'/ratings/tags').then(response => {
        this.scoretags=response.data;
      }, response => {
        console.log(response);
      });
      var that=this;
      //获取购物车信息
      if(localStorage.getItem("mycarList")){
          that.mycarList=JSON.parse(localStorage.getItem("mycarList"));
          that.mycar=[...that.mycarList].filter(x=>x.shopID===this.shopID)
      }
      else{
        that.mycarList=[];
      }
      console.log(JSON.stringify(this.mycarList))
      console.log(JSON.stringify(this.mycar))
  },
  computed:{
  //计算属性
    mycarshopnum:function(){
        var num=0;
        for(var i=0;i<this.mycar.length;i++){
              num+=this.mycar[i].num;
        }
        return num
    },
      //计算商品价格(商品只有一个种类)
      mycarshoppic:function(){
          var num=0;
          for(var i=0;i<this.mycar.length;i++){
                num+=(this.mycar[i].shop.specfoods[0].price*this.mycar[i].num);
          }
          return num
      },
      //判断商家起送价与目前购物车价格
      shoppicbig:function(){
          if(this.mycar){
                if(this.mycarshoppic>=this.shopinfo.float_minimum_order_amount){
                    return 1
                }else{
                    return 2
                }
          }else{
              return false
          }
      },
      getshopnum:function(){
          for(var i=0;i<this.shopmean.length;i++){
              for(var k=0;k<this.shopmean[i].foods.length;k++){
                    var isadd=true;                          //判断该商品是否在购物车
                    for( var h=0;h<this.mycar.length;h++){
                        if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                            this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                            isadd=false;
                            break;
                        }
                    }
                    if(isadd){
                        this.shopmean[i].foods[k].mynum=0;
                    }
                    
              }
          }
          return this.shopmean
      }
  },
  watch:{
       "$route":"newpage",
       mycar:{
          handler (val1,val2){
                for(var i=0;i<val1.length;i++){
                    if(val1[i].num==0){
                        val1.splice(i,1);
                    }
                }
                if(!(val1.length>=1)){
                    console.log("清空操作")
                    this.carinfo=false;
                    this.mycarList=[...this.mycarList].filter(x=>x.shopID!==this.shopID);
                }
                localStorage.setItem("mycarList",JSON.stringify(val1));
                console.log("mycar执行了")
          },
          deep:true
      },
       mycarList:{
          handler (val1,val2){
                for(var i=0;i<val1.length;i++){
                    if(val1[i].num==0){
                        val1.splice(i,1);
                    }
                }
                if(!(val1.length>=1)){
                    this.carinfo=false;
                }
                localStorage.setItem("mycarList",JSON.stringify(val1));
                console.log("执行了")
          },
          deep:true
      }
  },
  methods:{
  //函数
    imgaddpath:function(e){
      return "https://fuss10.elemecdn.com/"+e+".jpeg"
    },
    newpage:function(){
      this.myrouter=(this.$route.path=="/shop"?true:false);
      console.log(this.myrouter+this.$route.path)
    },
    addcar:function(e){
        var that=this;
        that.mycarList=JSON.parse(localStorage.getItem("mycarList"));
        if(that.mycar.length>0){
            var addok=true;                                              //数据是否添加
            for(var i =0;i<that.mycarList.length;i++){
                if(that.mycarList[i].shop.item_id==e.item_id&&that.mycarList[i].shop.category_id==e.category_id&&that.mycarList[i].shop.restaurant_id==e.restaurant_id){
                    that.mycarList[i].num =that.mycarList[i].num+ 1;
                    addok=false;
                    break;
                }
            }
            if(addok){
                  that.mycarList.push({"shopID":this.shopID,"shop":e,"num":1});
            }
        }else{
            that.mycarList.push({"shopID":this.shopID,"shop":e,"num":1});
        }
        that.mycar=[...that.mycarList].filter(x=>x.shopID===this.shopID);
        console.log(JSON.stringify(that.mycarList))
        console.log(JSON.stringify(that.mycar))
    },
    removecar:function(e){
        for(var i=0;i<this.mycarList.length;i++){
            if(this.mycarList[i].shop.specfoods[0]._id==e.specfoods[0]._id){
                  this.mycarList[i].num==1?this.mycarList.splice(i,1):(this.mycarList[i].num=this.mycarList[i].num-1);
                  break;
            }
        }
        this.mycar=[...this.mycarList].filter(x=>x.shopID===this.shopID)
        localStorage.setItem("mycarList",JSON.stringify(this.mycarList));
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft>img{
  max-width:100%;
  max-height:100%;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  margin-bottom:10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab>div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab>div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv>div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on>div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
#shop{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:#9f9f9f;
}
.infoimgbox>img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;

}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
.scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:1;
  text-align:center;
}
.scoretopright{
  flex:1;
}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop>div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
  background-color:red;
}
.scoreitemleft>img{
  width:100%;
  border-radius:50%; 
}
.scoreitemright{
  flex:1;
}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox>div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow: scroll;

}
.scoreimgbox>img{
  width:4rem;
  height:4rem;
  background-color:red;
  margin-right:10px;
}
.big{
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  height: 100%;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
  position:fixed;
  bottom:0px;
  left:0px;
  width:100%;
}
.foot.on .footicon{
  color:#fff;
}
.foot.on .footmain{
  color:#fff;
}
.foot.on .footlogo{
  background-color:#3190E8;
}
.foot.on .footright{
  color:#fff;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footright.on{
  background-color:#4CD964;
  color:white;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  color:#8a8a8a;
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.rednum{
   position: absolute;
   top:-3px;
   right:-5px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:18px;
   width:18px;
   text-align:center;
   line-height:18px;
   font-size:12px;
}
.car{
   position: fixed;
   top:0px;
   left:0px;
   width:100vw;
   height:100vh;
   background-color:rgba(0,0,0,0.5);
}
.carmain{
  position:absolute;
  width:100%;
  bottom:0px;
  left:0px;
  padding-bottom:50px;
  max-height:70%;
}
.cartop{
  background-color:#ECEFF1;
}
.carmainbox{
  overflow-y: scroll;
}
.y2{
  transform: translateY(2px);
}
.y4{
  transform: translateY(4px); 
}
.bold{
  font-weight: bold;
}
.col666{
  color: #666;
}
.fade-choose-enter-active, .fade-choose-leave-active {
        transition: opacity .5s;
    }
    .fade-choose-leave, .fade-choose-leave-active {
        display: none;
    }
    .fade-choose-enter, .fade-choose-leave-active {
        opacity: 0;
    }
</style>