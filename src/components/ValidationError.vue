<template>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="$systemVariables.validationErrors">
        <div v-html="$systemVariables.validationErrors">
        
        </div>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="$systemVariables.validationErrors=''">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
    export default {

    }
</script>

<style  scoped>

</style>
