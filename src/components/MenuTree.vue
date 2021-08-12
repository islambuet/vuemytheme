<template>
  <li v-if="menu.type=='MODULE'" class="sidebar-item  has-sub"><a href="javascript:void(0)" class="sidebar-link"><i class="bi bi-pentagon-fill"></i><span>{{menu['name_'+$systemVariables.language]}}</span></a>
    <ul class="submenu">
        <menu-item v-for="child in menu.children" :key="child.id" :menu="child"></menu-item>
    </ul>
  </li>  
  <li v-else class="sidebar-item"><router-link :to="menu.url" class='sidebar-link'><i class="bi bi-life-preserver"></i><span>{{ menu['name_'+$systemVariables.language]}}</span></router-link></li>
  <!-- <li v-else class="nav-item"><router-link :to="menu.url"><i class="feather icon-target"></i><span class="menu-title">{{ menu['name_'+$systemVariables.language]}}</span></router-link></li> -->
  <!-- <li v-else class="nav-item" ><router-link :to="menu.url"><i class="feather icon-target"></i><span class="menu-item"><i class="feather icon-target"></i>{{ menu['name_'+$systemVariables.language]}}</span></router-link></li> -->
  <!-- <li v-else class="nav-item"><router-link :to="menu.url"><i class="feather icon-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-warning badge-pill float-right">1</span></router-link> -->
  

</template>

<script>
export default { 
  name: "menuItem",   
  props: {
    menu:Object,      
  },
};
</script>
<style scoped>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>