<template>    
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
            <div class="sidebar-header">
                <div class="d-flex justify-content-between">
                    <div class="logo">
                        <router-link to="/"><img src="theme/images/logo/logo.png" alt="Logo" srcset=""></router-link>                            
                    </div>
                    <div class="toggler">
                        <a href="javascript:void(0)" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <div class="sidebar-menu">
                <ul class="menu">
                    <li class="sidebar-item"><router-link to="/" class='sidebar-link'><i class="bi bi-grid-fill"></i><span>{{$systemFunctions.getLabel('label_dashboard')}}</span></router-link></li>
                    <menu-tree v-for="(item, index) in $systemVariables.user.tasks" :key="index" :menu="$systemVariables.user.tasks[index]"></menu-tree>
                </ul>
            </div>
            <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>        
    
</template>

<script>
    import MenuTree from "./MenuTree.vue";
    export default {
        components: {
            MenuTree
        },        
    }
</script>

<style  scoped>

</style>
