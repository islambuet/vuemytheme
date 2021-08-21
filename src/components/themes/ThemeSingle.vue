<template>
    <div>
        <LoadingAccessDeny v-if="$systemVariables.statusTaskLoaded==-2"/>                
        <SiteOffline v-else-if="$systemVariables.statusTaskLoaded==-3"/>                
        <router-view/>
    </div>
</template>

<script>
import LoadingAccessDeny from "../busy-states/LoadingAccessDeny.vue";
import SiteOffline from "../busy-states/SiteOffline.vue";

export default {
  components: {
    SiteOffline,
    LoadingAccessDeny,
  },
};
</script>

<style  scoped>
</style>