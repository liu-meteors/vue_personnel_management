<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<style lang="scss">
  html,body,#app{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>this.isRouterAlive=true)
    }
  }
}
</script>
