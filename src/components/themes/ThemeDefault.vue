<template>
    <div>      
      <Header/>
      <SidebarLeft/>
      <!-- <SidebarRight/>       -->
      <div id="system_content">
        <LoadingAccessDeny v-if="$systemVariables.statusTaskLoaded==-2"/>                
        <SiteOffline v-else-if="$systemVariables.statusTaskLoaded==-3"/>                
        <router-view/>
      </div>
    </div>
</template>

<script>
import Header from "../Header.vue";
import SidebarLeft from "../SidebarLeft.vue";
import SidebarRight from "../SidebarRight.vue";
import Footer from "../Footer.vue";
import LoadingAccessDeny from "../busy-states/LoadingAccessDeny.vue";
import SiteOffline from "../busy-states/SiteOffline.vue";

export default {
  components: {
    Header,
    SidebarLeft,
    SidebarRight,
    Footer,
    SiteOffline,
    LoadingAccessDeny,
  },
  mounted(){
    // var divScripts = document.getElementById('system_load_js');
    // let newScript = document.createElement('script');
    // newScript.src = 'theme/js/main.js';    
    // divScripts.appendChild(newScript);
  }
};
</script>

<style  scoped>
</style>