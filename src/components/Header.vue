<template>
    <div>
      <header class='mb-3'>
            <nav class="navbar navbar-expand navbar-light ">
                <div class="container-fluid">
                    <a href="javascript:void(0)" class="burger-btn d-block">
                        <i class="bi bi-justify fs-3"></i>
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown me-1">
                                <a class="nav-link active dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class='bi bi-flag-fill bi-sub fs-4 text-gray-600'></i>                                    
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">                                    
                                    <li><a class="dropdown-item" href="javascript:void(0)" @click="$systemFunctions.changeLanguage('bn')">বাংলা</a></li>
                                    <li><a class="dropdown-item" href="javascript:void(0)" @click="$systemFunctions.changeLanguage('en')">English</a></li>                                    
                                </ul>
                            </li>                            
                        </ul>
                        <div class="dropdown">
                            <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="user-menu d-flex">
                                    <div class="user-name text-end me-3">
                                        <h6 class="mb-0 text-gray-600">{{ $systemVariables.user.name }}</h6>
                                        <p class="mb-0 text-sm text-gray-600">{{ $systemVariables.user.name }}</p>
                                    </div>
                                    <div class="user-img d-flex align-items-center">
                                        <div class="avatar avatar-md">
                                            <img src="theme/images/profile.jpg">
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">                                
                                <li><a class="dropdown-item" href="javascript:void(0)" @click="$systemFunctions.logout()"><i class="icon-mid bi bi-box-arrow-left me-2"></i> {{$systemFunctions.getLabel('label_logout')}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
    export default {

    }
</script>

<style  scoped>

</style>
