<template>
    <div class="col-md-8 col-12 offset-md-2">        
        <div class="text-center">
            <h1 class="error-title">{{$systemFunctions.getLabel('msg_404_title')}}</h1>
            <p class="fs-5 text-gray-600">{{$systemFunctions.getLabel('msg_404_message')}}</p>
            <a href="index.html" class="btn btn-lg btn-outline-primary mt-3">Go Home</a>
        </div>
        <img class="img-error" src="theme/images/error-404.png" alt="Not Found" style="width:100%">
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>

</style>