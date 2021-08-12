import Vue from 'vue'
//import router from '@/router'

function initialData() {
  var localStorageAuthTokenStr='authToken';
  var localStorageLanguageStr='language';
  var language = localStorage.getItem(localStorageLanguageStr) ? localStorage.getItem(localStorageLanguageStr) : 'bn';  
  return {
    localStorageAuthTokenStr:localStorageAuthTokenStr,
    localStorageLanguageStr:localStorageLanguageStr,
    language: language,
    user: {
      authToken: localStorage.getItem(localStorageAuthTokenStr) ? localStorage.getItem(localStorageAuthTokenStr) : '',
      id: 0,
      name: language == 'en' ? 'Guest' : 'অতিথি',
      tasks: []
    },
    statusTaskLoaded: 0,    //Loading=0,success=1,failed=-1,acceesdenied=-2, site_off_line = -3  for all page
    statusDataLoaded: 1,    //Loading=0,loaed=1
    labels: {},
    labelsTask: {},
    validationErrors:'',
    dbStatus:{'YES':'Yes','NO':'No','ACTIVE':'Active','INACTIVE':'In-Active','DELETE':'Deleted'}
  }
}
//const initialData = () => ({})

var systemVariables = new Vue(
  {
    data: function () {
      var tempdata = initialData();
      return tempdata;
    },
    mounted: function () {
      //console.log(this.labels_task);
    },
    methods: {
      getInitialUser() {
        return initialData().user;        
      }
      /*get_label(key){
        return this.labels[key]?this.labels[key]:key;
      },
      get_label_task(key){
        return this.labels_task[key]?this.labels_task[key]:key;
      },
      set_user: function(data){
        // data == object {token_auth: 'value'}, ...
        for (var item_key in data){
            this.user[item_key] = data[item_key];
        }
      },*/

      /*,
      logout: function(){
        localStorage.setItem('token_auth','');
        localStorage.setItem('token_csrf','');
        this.user=initial_data().user;
        if(router.path != '/login')
        {
          router.push("/login");
          return;
        }
      }*/
    }
  }
);
Vue.prototype.$systemVariables = systemVariables


/* import Vue from 'vue'
var systemVariables = new Vue({
    data() {
        return {
            authToken: localStorage.getItem('authToken') ? localStorage.getItem('authToken'):'',
            user: {
                id: 0
            },
            tasks: [],
            siteLoaded: '' //Loading = 0, Loaded = 1, Failed = -1
        }
    }
});

Vue.prototype.$systemVariables = systemVariables */
