<template>
  <header id="system_top_bar" class="d-print-none">
    <!-- LOGO -->
    <div id="logo_container" class="d-none d-lg-block d-xl-block float-left">
        <img style="height: 25px;" v-bind:src="$systemVariables.baseUrl+'theme/images/logo-lg.png'" alt="">        
    </div>
    <!-- Left Sidebar handler -->
    <button id="handler_left_sidebar" class="handler-sidebar float-left" v-on:click="$systemHtmlElementsAction.click_handler_left_sidebar($event)">
        <i class="bi bi-justify fs-3"></i>
    </button>
    <!-- Right Sidebar handler -->
    <!-- <button id="handler_right_sidebar" class="handler-sidebar float-right" v-on:click="$systemHtmlElementsAction.click_handler_right_sidebar($event)">
        <i class="bi bi-justify fs-3"></i>
    </button>     -->
    <ul class="list-unstyled float-right mb-0">
        
        <!-- Language options -->
        <li>
           
            <a class="nav-link dropdown-toggle mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <span class="ml-1">
                                    {{$systemFunctions.getLabel('label_change_language')}} 
                                </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <!-- item-->
                <a href="#" class="dropdown-item" id="system_language_english" v-on:click="$systemFunctions.changeLanguage('en')">
                    <span>English</span>
                </a>
                <!-- item-->
                <a href="" class="dropdown-item" id="system_language_bangla" v-on:click="$systemFunctions.changeLanguage('bn')">
                    <span>বাংলা</span>
                </a>
            </div>
        </li>
        <!-- Users options -->
        <li>
            <a class="nav-link dropdown-toggle mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img v-bind:src="$systemVariables.user.info.profile_picture" v-if="$systemVariables.user.info.profile_picture" alt="profileImage" class="rounded-circle" style="height: 32px;width: 32px;">
                <img v-bind:src="$systemVariables.baseUrl+'theme/images/guest.png'" v-else alt="Image" class="rounded-circle" style="height: 32px;width: 32px;">
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-item">
                    <h6 class="text-overflow m-0">{{$systemFunctions.getLabel('label_welcome')}} {{$systemVariables.user.name}}</h6>
                </div>
                <!-- item-->                
                <a href="#" class="system_ajax dropdown-item"><i class="icon-mid bi bi-person-square me-2"></i> Profile Picture</a>
                <!-- item-->
                <a href="#" class="system_ajax dropdown-item"><i class="icon-mid bi bi-file-lock-fill me-2"></i> Change Password</a>                
                <div class="dropdown-divider"></div>
                <a href="#" class="system_ajax dropdown-item" v-on:click.prevent="$systemFunctions.logout()"><i class="icon-mid bi bi-power me-2"></i> {{$systemFunctions.getLabel('label_logout')}}</a>
            </div>            
        </li>
    </ul>
</header>
</template>
<script>
export default {  
  mounted(){
    
  }
};
</script>