<template>    
    <nav id="system_left_sidebar" class="sidebar d-print-none">
        <ul class="list-unstyled">
        <li @click="$systemHtmlElementsAction.click_task_links($event)">
          <router-link to="/">
            {{$systemFunctions.getLabel('label_dashboard')}}
          </router-link>
          </li>
        <menu-tree v-for="(item, index) in $systemVariables.user.tasks" :key="index" :menu="$systemVariables.user.tasks[index]" :item_id_prefix="'side_menu_user_'"></menu-tree>        
        <!-- <menu-tree v-for="(item, index) in $system_variables.visitors.tasks" :key="index" :menu="$system_variables.visitors.tasks[index]" :item_id_prefix="'side_menu_visitors_'"></menu-tree>         -->
    </ul>
    </nav>        
    
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
