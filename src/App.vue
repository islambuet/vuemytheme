<template>
  <div id="system_main_container">    
    <Loading v-show="$systemVariables.statusDataLoaded == 0" />
    <Loading v-if="statusSiteLoaded == 0" />
    <LoadingFailed v-else-if="statusSiteLoaded == -1" />
    <ThemeDefault v-else-if="statusSiteLoaded == 1 && $systemVariables.user.id > 0" />
    <ThemeSingle v-else-if="statusSiteLoaded == 1 && !($systemVariables.user.id > 0)" />
  </div>
</template>

<script>
import ThemeDefault from "./components/themes/ThemeDefault.vue";
import ThemeSingle from "./components/themes/ThemeSingle.vue";
import Loading from "./components/busy-states/Loading.vue";
import LoadingFailed from "./components/busy-states/LoadingFailed.vue";
export default {
  components: {
    Loading,
    LoadingFailed,
    ThemeDefault,
    ThemeSingle,
  },

  data() {
    return {
      statusSiteLoaded: 0, //Loading=0,success=0,failed=-1  only this page
    };
  },
  created() {
    // this.checkAuthState();
  },
  mounted() {
    //before create
    this.$systemFunctions.loadLanguages();
    //this.$axios.defaults.baseURL = 'http://127.0.0.1:8085/api';
    //this.$axios.defaults.baseURL = 'http://192.168.0.3/api';
    this.$axios.defaults.baseURL = 'http://127.0.0.1/ams/ams_back/public/api/';
    // this.$axios.defaults.baseURL = 'http://127.0.0.1:8085/api';
    this.$axios.defaults.headers.common['language'] = this.$systemVariables.language;
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$systemVariables.user.authToken;
    //before axios call
    let $this=this;
    this.$axios.interceptors.request.use(function (config) {  
        //$this.$toast.clear();
        return config;
      }, function (error) {        
        return Promise.reject(error);
      });
    this.$systemFunctions.setPageTitle(this.$systemFunctions.getLabel("label_site_title"));
    this.init();    
  },
  methods: {
    init()
    {      
      this.$axios.all([      
          this.$axios.get('/user/initialize'),          
        ]).then(this.$axios.spread((resUser) => 
        {
          //console.log(resUser.data);
          let successAll=true;
          if(resUser.data.error){            
              successAll=false;
          }
          else{
            if(resUser.data.user){               
              this.$systemFunctions.setUser(resUser.data.user); 
            }                        
          }          
          if(successAll){
            this.statusSiteLoaded=1;
            if(!(this.$systemVariables.user.id>0)){
                if(this.$router.history.current.path!='/login'){
                this.$router.push("/login");
              }
            }            
          }
          else{
            this.statusSiteLoaded=-1;
          }          
        })).catch(error => {                     
          this.statusSiteLoaded=-1;
      });
    }
  },
  
};
</script>

<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
