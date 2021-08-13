import Vue from 'vue'

import '@/system-global/SystemVariables.js'

// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";
// const options = {
//     timeout: false,
//     position: "top-center",
//     transition: "Vue-Toastification__fade",
//     maxToasts: 1,
// };
// Vue.use(Toast, options);

var systemFunctions = new Vue({
    methods: {
        loadLanguages: function () {
            var language_files = [
                { language: this.$systemVariables.language, file: 'languages/action.js' },
                { language: this.$systemVariables.language, file: 'languages/button.js' },
                { language: this.$systemVariables.language, file: 'languages/label.js' },
                { language: this.$systemVariables.language, file: 'languages/message.js' },
                { language: this.$systemVariables.language, file: 'languages/response.js' },
            ];

            this.$systemVariables.labels = {};
            try {
                for (var i = 0; i < language_files.length; i++) {
                    var language = language_files[i].language;
                    var filedata = require(`@/${language_files[i].file}`);
                    for (var item in filedata.labels) {
                        this.$systemVariables.labels[item] = filedata.labels[item][language] ? filedata.labels[item][language] : item;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }

        },
        loadTaskLanguages: function (language_files) {
            this.$systemVariables.labelsTask = {};
            try {
                for (var i = 0; i < language_files.length; i++) {
                    var language = language_files[i].language;
                    var filedata = require(`@/${language_files[i].file}`);
                    for (var item in filedata.labels) {
                        this.$systemVariables.labelsTask[item] = filedata.labels[item][language] ? filedata.labels[item][language] : item;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }

        },
        getLabel(key) {
            return this.$systemVariables.labels[key] ? this.$systemVariables.labels[key] : key;
        },
        getLabelTask(key) {
            return this.$systemVariables.labelsTask[key] ? this.$systemVariables.labelsTask[key] : key;
        },
        // setAxiosHeader: function () {
        //     if (this.$systemVariables.user.authToken) {
        //         this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$systemVariables.user.authToken;
        //     }
        //     else {
        //         this.$axios.defaults.headers.common['Authorization'] = '';
        //     }
        // },
        setPageTitle(title) {
            document.title = title;
        },        
        showSuccessMessage(msg) {
          console.log(msg);  
          //TODO toast 2sce
        },
        showResponseFailure() {
            //this.$toast.error(this.$systemFunctions.getLabel('msg_loading_failed_message'));
            //TODO Errort 2sce
        },
        showResponseError(data) {
            //console.log(error);
            if (data.error == 'ACCESS_DENIED') {
                $('.modal').modal('hide');
                this.$systemVariables.statusTaskLoaded = -2;
            }
            else if (data.error == 'API_OFFLINE') {
                $('.modal').modal('hide');
                this.$systemVariables.statusTaskLoaded = -3;
            }
            else if (data.error == 'USER_SESSION_EXPIRED') {
                $('.modal').modal('hide');
                localStorage.setItem(this.$systemVariables.localStorageAuthTokenStr, '');
                this.$axios.defaults.headers.common['Authorization'] = '';
                this.$systemVariables.user = this.$systemVariables.getInitialUser();                
                this.$routes.push("/login");
                this.$toast.error(this.$systemFunctions.getLabel(data.errorMessage));
            }
            else if (data.error == 'VALIDATION_FAILED') {
                if(typeof data.errorMessage=='string'){
                    this.$systemVariables.validationErrors = data.errorMessage;
                }else if(typeof data.errorMessage=='object'){
                    let messages='';
                    for (let message in data.errorMessage) {
                        messages+=data.errorMessage[message]+'<br>';                        
                      }
                    this.$systemVariables.validationErrors = messages;                    
                } else{
                    console.log(data.errorMessage);
                }
                
                
            }
            else {
                //this.$toast.error(this.$systemFunctions.getLabel(data.errorMessage));
                //TODO toast 2sce
            }
            //           
        },
        setUser: function (data) {
            // data == object {token_auth: 'value'}, ...
            for (var item_key in data) {
                this.$systemVariables.user[item_key] = data[item_key];
            }
        },
        // init(){
        //     this.$systemVariables.authToken = localStorage.getItem('authToken');
        //     this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
        // },
        logout($router) {
            this.$axios.get('/user/logout')
            .then(response => {                    
            })
            .catch(error => {
            });
            localStorage.setItem(this.$systemVariables.localStorageAuthTokenStr, '');
            this.$axios.defaults.headers.common['Authorization'] = '';
            this.$systemVariables.user = this.$systemVariables.getInitialUser();
            //console.log(this.$systemVariables.user);
            //this.$routes.push("/login");
            //console.log($router);
            $router.push("/login");
        },
        changeLanguage(language)
        {
            localStorage.setItem(this.$systemVariables.localStorageLanguageStr,language);  
            window.location.reload(); 
        },
        exportCsv(headers,datas,filename="output.csv")
        {
            var csvStr="";
            for(var i=0;i<headers.length;i++)
            {
                csvStr=csvStr+'"'+headers[i].label+'",';
            }
            csvStr+="\n";
            for (var j=0;j<datas.length;j++)
            {
                for(var i=0;i<headers.length;i++)
                {
                    csvStr=csvStr+'"'+datas[j][headers[i].key]+'",'; 
                }
                csvStr+="\n";
            }
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvStr);
            hiddenElement.target = '_blank';
            hiddenElement.download = filename;
            hiddenElement.click();  
        }
    }
});

Vue.prototype.$systemFunctions = systemFunctions