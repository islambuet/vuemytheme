<template>
    <div v-if="$systemVariables.statusTaskLoaded==1">
        <div class="card">
            <div class="card-header p-1">
                <h4 class="card-title">{{$systemFunctions.getLabelTask('label_user_groups')}}</h4>
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
                        <thead class="table-light cell-m">
                            <tr>
                                <th class="cell-nowrap d-print-none">{{$systemFunctions.getLabel('label_action')}}</th>
                                <th v-for="(column,i) in columns.csv" :key="'columnTable'+i">{{$systemFunctions.getLabel(column.label)}}</th>                            
                            </tr>
                        </thead>
                        <tbody class="table-striped table-hover cell-m">
                            <tr v-for="item in getFilteredItems" :key="item.id">
                                <td class="col-2 d-print-none">
                                    <button class="btn btn-sm bg-gradient-primary dropdown-toggle waves-effect waves-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{$systemFunctions.getLabel('label_action')}}</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
                                        <a v-if="permissions.action_2" class="dropdown-item text-info btn-sm" href="javascript:void(0)" @click="editItem(item)" data-toggle="modal" data-target="#modalAddEdit"><i class="feather icon-edit"></i> {{$systemFunctions.getLabel('action_2')}}</a>
                                        <a v-if="permissions.action_2" class="dropdown-item text-info btn-sm" href="javascript:void(0)" @click="assignTask(item)" data-toggle="modal" data-target="#modalAssignTask"><i class="feather icon-check-square"></i> {{$systemFunctions.getLabelTask('action_assign_Task')}}</a>
                                        <!-- 
                                        <a class="dropdown-item text-danger" href="javascript:void(0)" @click="deleteData(item.id)"><i class="feather icon-trash"></i> Delete</a> -->
                                    </div>
                                
                                    
                                </td>
                                <td class="col-1">{{ item.id }}</td>
                                <td class="col-7">{{ item.name }}</td>
                                <td class="col-1">{{ item.ordering }}</td>
                                <td class="col-2">{{ item.status }}</td>
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
                        <h5 v-if="item.id>0" class="modal-title" id="exampleModalCenterTitle">{{$systemFunctions.getLabelTask('label_edit')+'('+item.name+')'}}</h5>
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
                                <label>{{$systemFunctions.getLabel('label_name')}}</label>
                                <input name="item[name]" v-model="item.name" type="text" class="form-control" placeholder="Name" required>
                            </fieldset>
                            <fieldset class="form-group">
                                <label>{{$systemFunctions.getLabel('label_ordering')}}</label>                                
                                <input name="item[ordering]" v-model="item.ordering" type="number" class="form-control" placeholder="Ordering Number" required>
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
        <!-- Modal For assign Task -->
        <div class="modal fade" id="modalAssignTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <!-- <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document"> -->
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">{{$systemFunctions.getLabelTask('action_assign_Task')+'('+item.name+')'}}</h5>
                        
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">                        
                        <div v-if="refreshRole">
                            <div class="card" v-for="(modules_tasks_gropus, id) in get_modules_tasks_tree" :key="id">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" :data-target="'#root_module_'+id" aria-expanded="true">{{modules_tasks_gropus.name}}</button>
                                        
                                    </h5>
                                    <button @click="saveRole('form_save_task_'+id)" type="button" class="btn bg-gradient-success mr-1 mb-1 waves-effect waves-light float-right">{{$systemFunctions.getLabel('button_save')}}</button>                            
                                </div>
                                <div :id="'root_module_'+id" class="collapse show">
                                    <div class="card-body" style='overflow-x:auto'>
                                        <form :id="'form_save_task_'+id">
                                            <table class="table table-m table-bordered">
                                                <thead class="table-light cell-m">
                                                    <tr>
                                                        <th :colspan="modules_tasks_gropus.max_level">{{$systemFunctions.getLabelTask('label_module_task_name')}}</th>
                                                        <th v-for="(j,i) in module_task_max_action" :key="'th'+i">
                                                            <label><input type="checkbox" :data-type="'header_action_'+i+'_'+id" class="header_action"> {{$systemFunctions.getLabel('action_'+i)}}</label>
                                                        </th>                            
                                                    </tr>
                                                </thead>
                                                <tbody class="table-striped table-hover cell-m">
                                                    <tr v-for="(module_task) in modules_tasks_gropus.modules_tasks" :key="module_task.id"> 
                                                        <td v-for="(j, i) in modules_tasks_gropus.max_level" :key="'td'+i">                            
                                                            <label v-if="module_task.level==j">
                                                                <input type="hidden" :name="'tasks['+module_task.id+'][task_id]'" :value="module_task.id" v-if="module_task.type=='TASK'" />
                                                                <input type="checkbox" :data-id="module_task.id" :class="'task_action '+module_task.parent_class" />
                                                                {{module_task.name_en}}
                                                            </label>
                                                        </td>
                                                        <td v-for="(j, i) in module_task_max_action" :key="'td_action'+i" >
                                                            <label v-if="module_task.type=='TASK'">                                                            
                                                                <input type="checkbox" 
                                                                :class="'header_action_'+i+' header_action_'+i+'_'+id+' '+module_task.parent_class+' '+'parent_'+module_task.id" 
                                                                v-model="module_task['action_'+i]"
                                                                value="1"
                                                                :name="'tasks['+module_task.id+'][actions]['+i+']'"
                                                                :title="$systemFunctions.getLabel('action_'+i)"
                                                                />                              
                                                            </label> 
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </form>
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
                itemDefault: {id: 0,name: '',ordering: '',status: ''},
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
                {language:this.$systemVariables.language,file:'tasks/user-groups/language.js'},
            ]);
            $(document).ready(function()
            {
                $(document).off("click", ".header_action");
                $(document).on("click",'.header_action',function()
                {
                    if($(this).is(':checked'))
                    {
                        $('.'+$(this).attr('data-type')).prop('checked', true);
                    }
                    else
                    {
                    $('.'+$(this).attr('data-type')).prop('checked', false);
                    }
                });
                $(document).off("click", ".task_action");
                $(document).on("click",'.task_action',function()
                {

                    if($(this).is(':checked'))
                    {
                        //$('.parent_'+$(this).attr('data-id')+':not(.header_action_3)').prop('checked', true);
                        $('.parent_'+$(this).attr('data-id')+':not(.header_action_3,.header_action_7,.header_action_8)').prop('checked', true);
                    }
                    else
                    {
                        $('.parent_'+$(this).attr('data-id')).prop('checked', false);
                    }
                });
            });
            this.init();            
        },
        computed:{   
            getFilteredItems:function(){   
                return this.items.data.filter((item)=>{
                    if(this.searchString){
                        if(item['name'].toLowerCase().indexOf(this.searchString.toLowerCase())==-1){
                            return false;
                        } 
                    }
                    return true;
                });
            }, 
            get_modules_tasks_tree:function(){ 
                var items={};
                var modules_tasks=this.modules_tasks.tree;      
                for(var i=0;i< modules_tasks.length;i++)
                {
                    if(modules_tasks[i].level==1)
                    {
                        items[modules_tasks[i].module_task.id]={name:modules_tasks[i].module_task.name_en,modules_tasks:[],max_level:1};
                        for(var j=i;j< modules_tasks.length;j++)
                        {
                            var item={};
                            Object.assign(item,modules_tasks[j].module_task);
                            item.level=modules_tasks[j].level;
                            item.parent_class=modules_tasks[j].parent_class;
                            items[modules_tasks[i].module_task.id].modules_tasks.push(item);
                            if(item.level>items[modules_tasks[i].module_task.id].max_level)
                            {
                            items[modules_tasks[i].module_task.id].max_level=item.level;              
                            }
                            for(var k=0;k<this.module_task_max_action;k++){
                                if(this.item['action_'+k] !=undefined)
                                {
                                    if(this.item['action_'+k].indexOf(','+item.id+',')>=0){
                                        item['action_'+k]=true;
                                    }else{
                                        item['action_'+k]=false;
                                    }
                                }else{
                                    item['action_'+k]=false;
                                }
                            }
                            if(((j+1)==modules_tasks.length)||(modules_tasks[j+1].level==1))            
                            {
                                i=j;              
                                break;
                            }
                        }
                                
                    }
                }
                //console.log(items);
                return items;
            }           
        }, 
        methods: {
            init(){
                this.$systemVariables.statusTaskLoaded=0;
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.get('/user-groups/initialize')
                .then(res=>{
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.setColumnCsv();
                        this.modules_tasks=res.data.modules_tasks;
                        this.permissions=res.data.permissions;
                        this.permissions=res.data.permissions;
                        this.itemDefault=res.data.itemDefault;
                        //this.items=res.data.items;                        
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
                    label: this.$systemFunctions.getLabel('label_name'),
                    key: 'name'
                });
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabel('label_ordering'),
                    key: 'ordering'
                });
                this.columns.csv.push({
                    label: this.$systemFunctions.getLabel('label_status'),
                    key: 'status'
                });
            },
            getItems(pagination){
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.get('/user-groups/get-items?page='+ pagination.current_page+'&perPage='+ pagination.per_page)
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
            assignTask(item){
                this.$systemVariables.validationErrors='';
                this.refreshRole=false;
                let $this=this;
                //settimeout for rerender the div
                setTimeout(() => {
                    $this.refreshRole=true;
                    $this.item={};
                    Object.assign($this.item, item);                
                 }, 1);
                
            },            
            saveItem(){
                
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.post('/user-groups/save-item',new FormData(document.getElementById('formSave')))
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
            saveRole(form_id){
                this.$systemVariables.statusDataLoaded=0;
                this.$axios.post('/user-groups/save-role/'+this.item.id,new FormData(document.getElementById(form_id)))
                .then(res => {
                    this.$systemVariables.statusDataLoaded = 1;
                    if(res.data.error==''){
                        this.$toast.success(this.$systemFunctions.getLabel('msg_success_saved'), {timeout: 2000 });
                        $('#modalAssignTask').modal('hide');
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
