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
                                <button v-if="permissions.action_6" type="button" class="btn btn-m bg-gradient-primary" @click="$systemFunctions.exportCsv(columns.csv,getFilteredItems,'moduletasks.csv')">
                                    <i class="feather icon-download"></i> {{$systemFunctions.getLabel('action_6')}}
                                </button>
                                <button v-if="permissions.action_0" type="button" class="btn btn-m bg-gradient-primary" @click="init">
                                    <i class="feather icon-rotate-cw"></i> {{$systemFunctions.getLabel('action_refresh')}}
                                </button>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="card-body" style='overflow-x:auto'>
                    <table class="table table-bordered">
                        <thead class="table-active">
                            <tr>
                                <th class="cell-nowrap d-print-none">{{$systemFunctions.getLabel('label_action')}}</th>
                                <th v-for="(column,i) in columns.csv" :key="'columnTable'+i">{{$systemFunctions.getLabel(column.label)}}</th>                            
                            </tr>
                        </thead>
                        <tbody class="table-striped table-hover">
                            <tr v-for="item in getFilteredItems" :key="item.id">
                                <td class="col-2 d-print-none">
                                    <button class="btn btn-sm bg-gradient-primary dropdown-toggle waves-effect waves-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{$systemFunctions.getLabel('label_action')}}</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
                                        <a v-if="permissions.action_2" class="dropdown-item text-info btn-sm" href="javascript:void(0)" @click="editItem(item)" data-toggle="modal" data-target="#modalAddEdit"><i class="feather icon-edit"></i> {{$systemFunctions.getLabel('action_2')}}</a>
                                    </div>
                                </td>
                                <td class="col-1">{{ item.id }}</td>
                                <td class="col-1">{{ item.type }}</td>                                
                                <td class="col-1" v-for="column in modules_tasks.max_level+1" :key="'name_'+column">{{ item['name_'+(column-1)] }}</td>
                                <td class="col-1">{{ item.url }}</td>
                                <td class="col-1">{{ item.controller }}</td>
                                <td class="col-1">{{ item.ordering }}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
        <!-- Modal for addEdit -->
        <div class="modal fade small" id="modalAddEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="item.id>0" class="modal-title" id="exampleModalCenterTitle">{{$systemFunctions.getLabelTask('label_edit')+'('+item.name_0+')'}}</h5>
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
                                <label>{{$systemFunctions.getLabel('label_name_en')}}</label>
                                <input name="item[name_en]" v-model="item.name_en" type="text" class="form-control form-control-sm" :placeholder="$systemFunctions.getLabel('label_name_en')" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_name_bn')}}</label>
                                <input name="item[name_bn]" v-model="item.name_bn" type="text" class="form-control form-control-sm" :placeholder="$systemFunctions.getLabel('label_name_bn')" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabelTask('label_module_task_type')}}</label>                                  
                                <select class="form-control form-control-sm" name="item[type]" v-model="item.type" required>   
                                    <option :value="type" v-for="type in types" :key="'type_'+type">{{type}}</option>
                                </select>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabelTask('label_parent')}}</label>                                  
                                <select class="form-control form-control-sm" name="item[parent]" v-model="item.parent" required>  
                                    <option value="0">Main Menu</option> 
                                    <option :value="parent.value" v-for="parent in getParents" :key="'parent_'+parent.value">{{parent.text}}</option>                                    
                                </select>
                            </fieldset>

                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabelTask('label_url')}}</label>
                                <input name="item[url]" v-model="item.url" type="text" class="form-control form-control-sm" placeholder="url" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabelTask('label_controller')}}</label>
                                <input name="item[controller]" v-model="item.controller" type="text" class="form-control form-control-sm" placeholder="controller" required>
                            </fieldset>

                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_ordering')}}</label>                                
                                <input name="item[ordering]" v-model="item.ordering" type="number" class="form-control form-control-sm" placeholder="Ordering Number" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_status')}}</label>                                  
                                <select class="form-control form-control-sm" name="item[status]" v-model="item.status" required>                                    
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
                permissions:{'action_0':0},
                columns:{csv:[]},
                //csv:all-hidden,hidden,control/all,filter/search                
                itemDefault: {id:0,name_en:'',name_bn:'',type:'',parent:0,url:'',controller:'',ordering:'',status:''},
                items: {data:[]},
                item: {},     
                types:[],                                           
                modules_tasks:{'max_level':1,'tree':[]}, 
            }
        },
        mounted (){
            if(!(this.$systemVariables.user.id>0)){
                return;
            }
            this.$systemFunctions.loadTaskLanguages([
                {language:this.$systemVariables.language,file:'tasks/modules-tasks/language.js'},
            ]);            
            this.init();            
        },
        computed:{   
            getFilteredItems:function(){  
                var items=[];
                for(var i=0;i<this.modules_tasks.tree.length;i++)
                {                    
                    var item={};
                    Object.assign(item, this.modules_tasks.tree[i].module_task);
                    item['name_0']=this.modules_tasks.tree[i].module_task['name_'+((this.$systemVariables.language=='en')?'bn':'en')]; 
                    for(var level=1;level<=this.modules_tasks.max_level;level++)
                    {
                        if(level==this.modules_tasks.tree[i].level)
                        {
                            item['name_'+level]=this.modules_tasks.tree[i].module_task['name_'+this.$systemVariables.language];          
                        }
                        else
                        { 
                            item['name_'+level]='';   
                        }
                    }                                
                    items.push(item);                    
                }
                
                return items;  
            },  
            getParents:function(){ 
                var temp_items=[];  
                for(var i=0;i<this.modules_tasks.tree.length;i++)
                {
                    if(this.modules_tasks.tree[i].module_task.type!='TASK')
                    {
                        temp_items.push({value:this.modules_tasks.tree[i].module_task.id,text:this.modules_tasks.tree[i].prefix+''+this.modules_tasks.tree[i].module_task['name_en']});
                    }
                } 
                return temp_items;
            }    
        }, 
        methods: {
            init(){
                this.$systemVariables.statusTaskLoaded=0;
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.get('/modules-tasks/initialize')
                .then(res=>{
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                                                
                        this.permissions=res.data.permissions;
                        this.itemDefault=res.data.itemDefault;
                        this.types=res.data.types;
                        this.$systemVariables.statusTaskLoaded=1;
                        this.getItems();
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
                    label: this.$systemFunctions.getLabelTask('label_module_task_type'),
                    key: 'type'
                });
                this.columns.csv.push({
                        label: this.$systemFunctions.getLabel('label_name_'+((this.$systemVariables.language=='en')?'bn':'en')),
                        key: 'name_0'
                    });
                for(var level=1;level<=this.modules_tasks.max_level;level++)
                {
                    this.columns.csv.push({
                        label: this.$systemFunctions.getLabel('label_name_'+this.$systemVariables.language),
                        key: 'name_'+level
                    });         
                }
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabelTask('label_url'),
                    key: 'url'
                });
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabelTask('label_controller'),
                    key: 'controller'
                });                
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabel('label_ordering'),
                    key: 'ordering'
                });
                
            },
            getItems(){
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.get('/modules-tasks/get-items')
                .then(res => {
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.modules_tasks=res.data.modules_tasks;  
                        this.setColumnCsv();                                                                      
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
                this.$axios.post('/modules-tasks/save-item',new FormData(document.getElementById('formSave')))
                .then(res => {
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.$systemFunctions.showSuccessMessage(this.$systemFunctions.getLabel('msg_success_saved'));
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
