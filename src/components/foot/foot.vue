<!--  -->
<template>
  <div class="footNav">
       <mt-tabbar v-model="$store.state.selected">
          <mt-tab-item id="miste">
            <icon slot="icon" name="miste"></icon>
            外卖 
          </mt-tab-item>
          <mt-tab-item id="order"> 
            <icon slot="icon" name="order"></icon>
            订单
          </mt-tab-item>
          <mt-tab-item id="search">
            <icon slot="icon" name="search"></icon>
            搜索
          </mt-tab-item>
          <mt-tab-item id="profile">
            <icon slot="icon" name="profile"></icon>
            我的
          </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {
  //注册组件
  },

  computed: {
  //计算属性
    gopage:function(){
        return this.$store.state.selected
    }
  },
  watch:{
    //监听
    gopage(newval,oldval){
        this.$router.push(newval);
    }

  },

  mounted:function() {
  //生命周期

  },

  methods: {
  //函数
  }
}
</script>

<style lang='scss' scoped>
.footNav{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>