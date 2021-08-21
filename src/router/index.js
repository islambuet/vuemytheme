import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Get Routes according folder structure inside tasks folder
//Index.vue is main file url is the folder name
//subdirectory url will be subdirectory way

function getRoutes() {
  let routes =[];
  routes.push({ path: '/',  component: () => import('@/tasks/Dashboard.vue')});
  routes.push({ path: '/login', component: () => import('@/tasks/Login.vue')});
  let vueIndexFiles = require.context('@/tasks/',true,/\/Index\.vue$/).keys();
  for(let i=0;i<vueIndexFiles.length;i++) {
    let file=vueIndexFiles[i];
    let path=file.substr(1,file.length-11);  
    routes.push({ path: path, component: () => import('@/tasks'+path+'/Index.vue')});  
    //routes.push({ path: path, component: () => import('@/tasks'+path+'/Index.vue'),children: [{path: 'add'},{path: 'edit/:item_id'}]});    
         
  }
  routes.push({ path: '*',  component: () => import('@/components/busy-states/404.vue')});


  return routes;
}
let routes =getRoutes();

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
Vue.prototype.$routes = router;

export default router
