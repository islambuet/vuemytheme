<template>
    <div v-if="$systemVariables.statusTaskLoaded==1">
         <div class="main container">
            <div class="row justify-content-md-center center-align">
                <div class="col-xl-8 col-12 shadow px-0">
                    <div class="card bg-authentication rounded-0 mb-0">
                            <div class="row m-0">
                                <div class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                                    <img src="theme/images/pages/login.png" alt="branding logo">
                                </div>
                                <div class="col-lg-6 col-12 p-0">
                                    <div class="card rounded-0 mb-0 px-2">
                                        <div class="card-header pb-1">
                                            <div class="card-title">
                                                <h4 class="mb-0">{{ $systemFunctions.getLabel('label_login') }}</h4>
                                            </div>
                                        </div>
                                        <p class="px-2">{{ $systemFunctions.getLabel('label_welcome') }}</p>
                                        <div class="card-content">
                                            <div class="card-body pt-1">
                                                <form @submit.prevent="login" id="formLogin">
                                                    <fieldset class="form-label-group form-group position-relative has-icon-left">
                                                        <!-- <input type="text" class="form-control" id="user-name" placeholder="Username" v-model="userName" required=""> -->
                                                        <input type="text" class="form-control" id="user-name" placeholder="Username" name="username" value="0500454" required="" />
                                                        <div class="form-control-position">
                                                            <i class="feather icon-user"></i>
                                                        </div>
                                                        <label for="user-name">{{ $systemFunctions.getLabel('label_username') }}</label>
                                                    </fieldset>
                                                    <fieldset class="form-label-group position-relative has-icon-left">
                                                        <!-- <input :type="[showPassword ? 'text' : 'password']" class="form-control" id="user-password"  v-model="password" placeholder="Password" required=""> -->
                                                        <input :type="[showPassword ? 'text':'password']" class="form-control" id="user-password" placeholder="Password" name="password" value="12345678" required="" />
                                                        <div class="form-control-position">
                                                            <i :class="[showPassword ? 'feather icon-eye-off' : 'feather icon-eye']" @click="showPassword = !showPassword"></i>
                                                        </div>
                                                        <label for="user-password">{{ $systemFunctions.getLabel('label_password') }}</label>
                                                    </fieldset>
                                                    <!--<div class="form-group d-flex justify-content-between align-items-center">
                                                        <div class="text-left">
                                                            <fieldset class="checkbox">
                                                                <div class="vs-checkbox-con vs-checkbox-primary">
                                                                    <input type="checkbox">
                                                                    <span class="vs-checkbox">
                                                                        <span class="vs-checkbox--check">
                                                                            <i class="vs-icon feather icon-check"></i>
                                                                        </span>
                                                                    </span>
                                                                    <span class="">Remember me</span>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                        <div class="text-right"><a href="auth-forgot-password.html" class="card-link">Forgot Password?</a></div>
                                                    </div>-->
                                                    <!-- <a href="auth-register.html" class="btn btn-outline-primary float-left btn-inline waves-effect waves-light">Register</a> -->
                                                    <button type="submit" class="btn btn-primary btn-inline waves-effect waves-light">{{ $systemFunctions.getLabel('label_login') }}</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="login-footer">
                                          <!-- <router-link to="/user-groups">asdfasdf</router-link> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      /*userName: "0500454",
      password: "12345678",*/
      errors: "",
      showPassword: false,
    };
  },
  mounted: function () {    
    this.init();
  },
  methods: {
    init(){      
      this.$systemVariables.statusTaskLoaded = 1; //0 for other tasks
      this.$systemVariables.statusDataLoaded = 1;
      if(this.$systemVariables.user.id>0){        
        this.$router.push("/");
      }      
    },
    login() {
      this.$systemVariables.statusDataLoaded = 0;      
      let formData=new FormData(document.getElementById('formLogin'));
      this.$axios.post("user/login", formData)
        .then((res) => {
          this.$systemVariables.statusDataLoaded = 1;
          if (res.data.error == "") {
            //console.log(res.data.user);
            this.$systemFunctions.setUser(res.data.user);
            localStorage.setItem(this.$systemVariables.localStorageAuthTokenStr, res.data.user.authToken);
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$systemVariables.user.authToken;
            //this.$router.push("/");//due to theme change init method is calling again and redirect happening there            
          }                    
        })
        .catch((error) => {          
          console.log("Error:");
          console.log(error.response);
          this.$systemVariables.statusDataLoaded = 1;
          if (error.response && error.response.data && error.response.data.error) {
            this.$systemFunctions.showResponseError(error.response.data);            
          } else {            
            this.$systemFunctions.showResponseFailure();
          }
        });

    },
  },
};
</script>

<style  scoped>
.main {
   height: auto;
}

.login-left {
  background: #0d6efd;
}

.login-left > img {
  margin-left: 12%;
}

.center-align {
  /*margin-top: 20vh;*/
  margin-right: 0px;
  margin-left: 0px;
}

.center-align > div{
  margin-top: 20vh;
}

.bg-authentication {
  background-color: #eff2f7;
}

.bg-authentication .login-footer {
  padding: 0rem 1.5rem 3.5rem;
}

.bg-authentication .login-footer .footer-btn .btn {
  padding: 0.9rem 1.2rem !important;
  margin: 1rem 1rem 1rem 0rem;
}

#user-password {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.input-group-text {
  background-color: #ffffff;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .bg-authentication {
    width: 100%;
  }
  .center-align {
    margin-top: 20vh;
  }
}
</style>
