<template>
    <div>      
      <Sidebar />
      <div id="main" class='layout-navbar'>
        <Header />
        <!-- BEGIN: Content-->
        <div id="main-content">            
              <LoadingAccessDeny v-if="$systemVariables.statusTaskLoaded==-2"/>                
              <SiteOffline v-else-if="$systemVariables.statusTaskLoaded==-3"/>                
              <router-view v-else />
              <Footer />
        </div>
      </div>
      <div id="system_load_js"></div>
    </div>
</template>

<script>
import Header from "../Header.vue";
import Sidebar from "../Sidebar.vue";
import Footer from "../Footer.vue";
import LoadingAccessDeny from "../busy-states/LoadingAccessDeny.vue";
import SiteOffline from "../busy-states/SiteOffline.vue";

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    SiteOffline,
    LoadingAccessDeny,
  },
  mounted(){
    var divScripts = document.getElementById('system_load_js');
    let newScript = document.createElement('script');
    newScript.src = 'theme/js/main.js';    
    divScripts.appendChild(newScript);
  }
};
</script>

<style  scoped>
</style>