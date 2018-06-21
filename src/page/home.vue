<template>
  <div>
      <div class="fixed bgfff">
        <mt-header>
            <span slot="left">elm</span>
            <mt-button slot="right" @click.native="gologin">登录|注册</mt-button>
        </mt-header>
    </div>

    <div class=" bgf5">
      <div class="ih50 padlr10 box bgfff">
        <span  class="">当前选择城市</span>
        <span  class="right fs0-8 col9f">定位不准时，请在城市列表选择</span>
      </div>
      <mt-cell :title="$store.state.nowcity.name" class="col after" to="city"  is-link  value=""></mt-cell>

      <div class="mgtop10 bgfff">
        <mt-cell class="after" title="热门城市"></mt-cell>
        <div class="itembox ovhid col">
          <div v-for="item in hotcity" :key="item.id" @click='gocity({name:item.name,id:item.id})'>{{item.name}}</div>
        </div>        
      </div>         

      <div v-for="(items,index) in getlist" :key="index" class="mgtop10 bgfff">
        <mt-cell class="after" :title="index"></mt-cell>
        <div class="itembox ovhid">
          <div class="nowarp" v-for="item in items" v-bind:key="item.id" @click='gocity({name:item.name,id:item.id})'>{{item.name}}</div>
        </div>        
      </div>    

    </div>
  </div>
</template>

<script>
import axios from 'axios'
    export default{
        data(){
            return{
                hotcity:{},
                cityList:{},
                nowcity:{}
            }
        },
        mounted:function(){
            this.hotCity();
            this.citylist();
            //定位城市
            axios.get('http://cangdu.org:8001/v1/cities?type=guess').then(response => {
                this.$store.state.nowcity={"name":response.data.name,"id":response.data.id};
            }, response => {
                console.log(response);
            })
        },
        computed:{
            getlist:function(){
                var mycitylist={};
                for(var i=65;i<=90;i++){
                    var num=String.fromCharCode(i);
                    mycitylist[num]=this.cityList[num];
                }
                return mycitylist;
            }
        },
        methods:{
            citylist(){
                axios.get('http://cangdu.org:8001/v1/cities?type=group').then(response => {
                    this.cityList=response.data
                }, response => {
                    console.log(response);
                });
            },
            hotCity(){
                axios.get('http://cangdu.org:8001/v1/cities?type=hot').then(response => {
                    this.hotcity=response.data;
                }, response => {
                    console.log(response);
                    
                });
            },
            gologin(){
                this.$router.push('login');
            },
            gocity(e){
                this.$router.push('city');
                this.$store.state.nowcity = e;
            }
            
        }
    }
</script>

<style scoped>
.itembox>div{
  width:25%;
  float:left;
  text-align:center;
  height:40px;
  line-height:40px;
  box-sizing: border-box;
  border-right:1px solid #e4e4e4;
  border-bottom:1px solid #e4e4e4;
}
.itembox>div:nth-child(4n){
  border-right:0px;
}
</style>

