<template>
  <div id="app">
    <MenuNav/>
    <router-view/>
  </div>
</template>

<script>

import MenuNav from './components/shared/MenuNav.vue'
export default {
   
    data() {
      return {
       
      };
    },
    components: {
      MenuNav
    },
}

</script>

<style>

</style>
