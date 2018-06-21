<!--  -->
<template>
  <div>
    <mt-header :title="$store.state.nowcity.name" class='fs1-2' fixed>
        <mt-button slot="left"><mt-button icon="back"></mt-button></mt-button>
        <mt-button slot="right" class='fs0-8'>切换城市</mt-button>
    </mt-header>
    
    <div class="mgtop50 padlr10 bgfff padbot10">
      <form v-on:submit.prevent>
        <input class="cityinput" required placeholder="输入商务楼，学校，地址" v-model="inputval"/>
        <div class="submit bgcol ih40" @click="searchcity">提交</div>
      </form>
    </div>

    <div class="main">

      <div v-if="list==''" class="his after">
        <div class='maintop fs0-8 padlr10'>搜索历史</div>
        <div v-if="his" class="mainbody bgfff ">
          <div v-for="(item,index) in his" :key="index" class="pad10 after">
              <div class="ih30">{{item.name}}</div>
              <div class="ih30 fs0-8 col9f" @click="goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})">{{item.address}}</div>
          </div>
          <div class="clearall ih30 pad10 col9f" @click="removeall">
              清空所有
          </div>
        </div>
      </div>

      <div v-if="list!=''" class='search bgfff'> 
          <div v-for="(item,index) in list" :key="index" @click="goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})" class="pad10 after">
              <div class="ih30">{{item.name}}</div>
              <div class="ih30 fs0-8 col9f">{{item.address}}</div>
          </div>
      </div>

    </div>

</div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
        inputval:"",
        list:"",
        his:""
    };
  },

  components: {
  //注册组件
  },

  computed: {
  //计算属性
  },

  mounted:function() {
  //生命周期
    if(localStorage.getItem("his")){
        this.his=JSON.parse(localStorage.getItem("his"));
    }

  },

  methods: {
      
  //函数
    searchcity(){
        if(this.inputval){
            axios.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&keyword='+this.inputval+'&type=search').then(response => {
                this.list=response.data;
                if(response.data==""){
                Toast('抱歉，空空如也');
          }
            }, response => {
                console.log(response);
                
            });
        }
    },
    goaddress(e){
        var arr=[];
        if(localStorage.getItem("his")){
            arr=JSON.parse(localStorage.getItem("his"));
            for(var i=0;i<arr.length;i++){
                if(arr[i].geohash==e.geohash){
                var isok=true;
                }
            }
            if(!isok){
                arr.push(e);
                arr.reverse();
            }
        }
        else{
            arr.push(e);
            arr.reverse();
        }
        localStorage.setItem("his",JSON.stringify(arr));
        this.his=JSON.parse(localStorage.getItem("his"));
        this.list='';
        var geohash=e.geohash;
        this.$router.push({path:'/miste', query:{geohash}})
    },
    removeall(){
      localStorage.removeItem("his");
      this.his="";
    }
  }
}
</script>

<style lang='scss' scoped>
.cityinput{
  width:100%;
  height:40px;
  margin:10px 0px;
  outline:0px;
  padding:0px 5px;
  box-sizing:border-box;
}
.submit{
  text-align:center;
  color:white;
  border-radius:3px;
}
.fs0-8{
  font-size:0.8rem !important;
}

.main{
  border-top:2px solid #E4E4E4;
}
.maintop{ 
    padding: 10px;
  border-bottom:2px solid #E4E4E4;
}
.clearall{
  text-align:center;
}
</style>