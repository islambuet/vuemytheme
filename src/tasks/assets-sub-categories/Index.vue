<template>
    <div v-if="$systemVariables.statusTaskLoaded==1">
        <div class="card">
            <div class="card-header p-1">
                <h4 class="card-title">{{$systemFunctions.getLabelTask('label_task')}}</h4>
            </div>
            <hr class="my-0"/>
            <div class="card-content">
                <div class="card-body px-2 pt-2 pb-0 d-print-none">
                    <div class="row">
                        <div class="col-md-6 col-sm-12 d-flex align-items-center">
                            <div class="btn-group btn-group-sm" role="group">
                                <button v-if="permissions.action_1" type="button" class="btn btn-m bg-gradient-primary" data-toggle="modal" data-target="#modalAddEdit" @click="addItem()">
                                    <i class="feather icon-plus-circle"></i> {{$systemFunctions.getLabel('action_1')}}
                                </button>
                                <button v-if="permissions.action_5" type="button" class="btn btn-m bg-gradient-primary" onclick="window.print();">
                                    <i class="feather icon-printer"></i> {{$systemFunctions.getLabel('action_5')}}
                                </button>
                                <button v-if="permissions.action_6" type="button" class="btn btn-m bg-gradient-primary" @click="$systemFunctions.exportCsv(columns.csv,getFilteredItems,'usergroups.csv')">
                                    <i class="feather icon-download"></i> {{$systemFunctions.getLabel('action_6')}}
                                </button>
                                <button v-if="permissions.action_0" type="button" class="btn btn-m bg-gradient-primary" @click="init">
                                    <i class="feather icon-rotate-cw"></i> {{$systemFunctions.getLabel('action_refresh')}}
                                </button>
                            </div>
                        </div>
                        <div v-if="permissions.action_7" class="col-md-6 col-sm-12 d-flex align-items-center">
                            <div class="input-group float-right p-0 input-group-sm">
                                <input @keyup.enter="search" v-model="searchString" type="text" class="form-control" placeholder="Search..." aria-describedby="button-addon2">
                                <div class="input-group-append" id="button-addon2">
                                        <button  class="btn btn-m bg-gradient-primary waves-effect waves-light" type="button"><i class="feather icon-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body" style='overflow-x:auto'>
                    <table class="table table-m table-bordered">
                        <thead class="table-active cell-m">
                            <tr>
                                <th class="cell-nowrap d-print-none">{{$systemFunctions.getLabel('label_action')}}</th>
                                <th v-for="(column,i) in columns.csv" :key="'columnTable'+i">{{$systemFunctions.getLabel(column.label)}}</th>                            
                            </tr>
                        </thead>
                        <tbody class="table-striped table-hover cell-m">
                            <tr v-for="item in getFilteredItems" :key="item.id">
                                <td class="col-2 d-print-none">
                                    <div class="btn-group">
                                        <div class="dropdown">
                                            <button class="btn btn-sm bg-gradient-primary dropdown-toggle waves-effect waves-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{$systemFunctions.getLabel('label_action')}}</button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
                                                <a v-if="permissions.action_2" class="dropdown-item text-info" href="javascript:void(0)" @click="editItem(item)" data-toggle="modal" data-target="#modalAddEdit"><i class="feather icon-edit"></i> {{$systemFunctions.getLabel('action_2')}}</a>                                                <!-- 
                                                <a class="dropdown-item text-danger" href="javascript:void(0)" @click="deleteData(item.id)"><i class="feather icon-trash"></i> Delete</a> -->
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="col-1">{{ item.id }}</td>
                                <td class="col-5">{{ $systemVariables.language == 'en' ? item.name_en : item.name_bn }}</td>
                                <td class="col-3">{{ item.ordering }}</td>
                                <td class="col-3">{{ item.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination :items = "items" :onChangePageOption="getItems" :pagination="pagination"  />
                </div>
            </div>
        </div>
        <!-- Modal for addEdit -->
        <div class="modal fade" id="modalAddEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="item.id>0" class="modal-title" id="exampleModalCenterTitle">{{$systemFunctions.getLabelTask('label_edit')}} ({{this.$systemVariables.language == 'en' ? item.name_en : item.name_bn}})</h5>
                        <h5 v-else class="modal-title" id="exampleModalCenterTitle">{{$systemFunctions.getLabelTask('label_new')}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ValidationError/>
                        <form id="formSave">
                            <input type="hidden" name="id" :value="item.id" />
                            <fieldset class="form-group">
                               <label>{{$systemFunctions.getLabel('label_asset_group')}}</label>                                
                               <select v-model="item.asset_group_id" id="" class="form-control">
                                   <option v-for="(item, index) in $systemVariables.assets.groups" :key="index" :value="item.id">{{ $systemVariables.language == 'en' ? item.name_en : item.name_bn }}</option>
                               </select>
                            </fieldset>
                            <fieldset class="form-group">
                               <label>{{$systemFunctions.getLabel('label_asset_category')}}</label>                                
                               <select name="item[asset_category_id]" v-model="item.asset_category_id" id="" class="form-control">
                                   <option v-for="(item, index) in $systemVariables.assets.categories" :key="index" :value="item.id">{{ $systemVariables.language == 'en' ? item.name_en : item.name_bn }}</option>
                               </select>
                            </fieldset>

                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_name')}}</label>                                
                                <input name="item[name_en]" v-model="item.name_en" type="text" class="form-control" placeholder="In English" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_name')}}</label>                                
                                <input name="item[name_bn]" v-model="item.name_bn" type="text" class="form-control" placeholder="In Bangla" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_ordering')}}</label>                                
                                <input name="item[ordering]" v-model="item.ordering" type="text" class="form-control" placeholder="Ordering" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_status')}}</label>                                  
                                <select class="form-control" name="item[status]" v-model="item.status" required>                                    
                                    <option :value="$systemVariables.dbStatus.ACTIVE">{{$systemVariables.dbStatus.ACTIVE}}</option>
                                    <option :value="$systemVariables.dbStatus.INACTIVE">{{$systemVariables.dbStatus.INACTIVE}}</option>
                                </select>
                            </fieldset>
                            <button @click="saveItem()" type="button" class="btn bg-gradient-success mr-1 mb-1 waves-effect waves-light float-right">{{$systemFunctions.getLabel('button_save')}}</button>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ValidationError from '@/components/ValidationError.vue';
    export default {
        components: {
            Pagination,
            ValidationError,
        },

        data (){
            return {
                refreshRole:false,
                permissions:{'action_0':0},
                columns:{csv:[]},
                //csv:all-hidden,hidden,control/all,filter/search
                itemDefault: {id: 0, asset_category_id: '', name_en: '', name_bn: '', ordering:'', status: ''},
                items: {data:[]},
                item: {},                
                editing: false,
                searchString: '',
                pagination: {current_page: 1,per_page_options: [2,10,20,500,1000],per_page:20,show_all_items:true},
                modules_tasks:{'max_level':1,'tree':[]}, 
                module_task_max_action:8,
            }
        },
        mounted (){
            if(!(this.$systemVariables.user.id>0)){
                return;
            }
            this.$systemFunctions.loadTaskLanguages([
                {language:this.$systemVariables.language,file:'tasks/assets-sub-categories/language.js'},
            ]);
            this.init();            
        },
        computed:{   
            getFilteredItems:function(){   
                return this.items.data.filter((item)=>{
                    if(this.searchString){
                        if(item[this.$systemVariables.language == 'en' ? 'name_en' : 'name_bn'].toLowerCase().indexOf(this.searchString.toLowerCase())==-1){
                            return false;
                        } 
                    }
                    return true;
                });
            },         
        }, 
        methods: {
            init(){
                this.searchString='';
                this.$systemVariables.statusTaskLoaded=0;
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.get('/assets-sub-categories/initialize')
                .then(res=>{
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.setColumnCsv();
                        this.permissions=res.data.permissions;
                        this.itemDefault=res.data.itemDefault;
                        this.$systemVariables.statusTaskLoaded=1;
                        this.getItems(this.pagination);
                    }
                }).catch(error => {                      
                    this.$systemVariables.statusDataLoaded = 1;
                    if (error.response && error.response.data && error.response.data.error) {
                        this.$systemFunctions.showResponseError(error.response.data);            
                    } else {            
                        this.$systemFunctions.showResponseFailure();
                    }                              
                });

            },
            setColumnCsv() {
                this.columns.csv=[];                
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabel('label_id'),
                    key: 'id'
                });
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabelTask('label_task'),
                    key: this.$systemVariables.language == 'en' ? 'name_en' : 'name_bn'
                });
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabel('label_ordering'),
                    key: 'status'
                });
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabel('label_status'),
                    key: 'status'
                });
            },
            getItems(pagination){
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.get('/assets-sub-categories/get-items?page='+ pagination.current_page+'&perPage='+ pagination.per_page)
                .then(res => {
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.items=res.data.items;                                                
                    }
                }).catch(error => {                      
                    this.$systemVariables.statusDataLoaded = 1;
                    if (error.response && error.response.data && error.response.data.error) {
                        this.$systemFunctions.showResponseError(error.response.data);            
                    } else {            
                        this.$systemFunctions.showResponseFailure();
                    }                              
                });
            },            
            addItem(){
                this.$systemVariables.validationErrors='';
                this.item={};
                Object.assign(this.item, this.itemDefault);                
            },
            editItem(item){
                this.$systemVariables.validationErrors='';
                this.item={};
                Object.assign(this.item, item);                            
            },         
            saveItem(){
                
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.post('/assets-sub-categories/save-item',new FormData(document.getElementById('formSave')))
                .then(res => {
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.$toast.success(this.$systemFunctions.getLabel('msg_success_saved'), {timeout: 2000 });
                        $('#modalAddEdit').modal('hide');
                        this.getItems(this.pagination);
                    }
                }).catch(error => {                      
                    this.$systemVariables.statusDataLoaded = 1;
                    if (error.response && error.response.data && error.response.data.error) {
                        this.$systemFunctions.showResponseError(error.response.data);            
                    } else {            
                        this.$systemFunctions.showResponseFailure();
                    }                              
                });
            },
        }
    }
</script>

<style  scoped>

</style>
