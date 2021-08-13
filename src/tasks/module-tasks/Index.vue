<template>
    <div>
        <section class="card mb-1">
            <div class="card-header p-1">
                <h4 class="card-title">Module &amp; Tasks List</h4>
            </div>
            <hr class="my-0"/>
            <div class="card-content">
                <div class="card-body px-1 pt-1 pb-0">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-m btn-primary" data-toggle="modal" data-target="#modalAddEdit" @click="addEditForm(1, [])">
                            <i class="feather icon-plus-circle"></i> Add
                        </button>
                        <button type="button" class="btn btn-m btn-primary">
                            <i class="feather icon-printer"></i> Print
                        </button>
                        <button type="button" class="btn btn-m btn-primary">
                            <i class="feather icon-download"></i> Download
                        </button>
                    </div>
                </div>
                <div class="card-body p-1">
                    <div class="table">
                        <table class="table table-m table-bordered">
                            <thead class="table-light cell-m">
                                <tr>
                                    <th class="cell-nowrap">Action</th>
                                    <th>ID</th>
                                    <th title="In english">Name (EN)</th>
                                    <th title="In bangla">Name (BN)</th>
                                    <th>Type</th>
                                    <th>Path/ URL</th>
                                    <th>Controller</th>
                                    <th>Ordering</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody v-if="items.length>0" class="table-striped table-hover cell-m">
                                <tr v-for="(item, i) in items" :key="item.id">
                                    <td>
                                        <div class="dropdown">
                                            <button class="btn btn-m btn-primary dropdown-toggle" type="button" :id="'dd_btn_'+i" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Action
                                            </button>
                                            <div class="dropdown-menu" :aria-labelledby="'dd_btn_'+i">
                                                <a class="dropdown-item text-primary" data-toggle="modal" data-target="#modalAddEdit" @click="addEditForm(2, item)">
                                                    <i class="feather icon-edit"></i> Edit
                                                </a>
                                                <a class="dropdown-item text-danger" @click.prevent="deleteItem(item.id)"><i class="feather icon-trash-2"></i> Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.prefix }} {{ item.name_en }}</td>
                                    <td>{{ item.name_bn }}</td>
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.url }}</td>
                                    <td>{{ item.controller }}</td>
                                    <td>{{ item.ordering }}</td>
                                    <td>{{ item.status }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="9" class="text-center">- NO DATA FOUND -</td>
                                </tr>
                            </tbody>                                          
                        </table>
                    </div>

                    <div class="modal-wrap">
                        <AddEdit :item="item" :items="items" />
                    </div>
                </div>
            </div>
        </section>
        <!--/ Content Body -->
    </div>
</template>

<script>

import AddEdit from './AddEdit.vue';

export default {
    name: "Login",
    components: {
        AddEdit 
    },        
    mounted: function() {
        this.win_hight = window.innerHeight-280;
        this.item = this.item_default;
        this.init();
    },
    data: function() {
        return {
            win_hight: window.innerHeight,
            modal_action: 0, // According to action. (1 for ADD | 2 for EDIT | 3 for DELETE)
            items: [],
            item: {},
            item_default: {
                'id': 0,
                'name_en': '',
                'name_bn': '',
                'type': 'MODULE',
                'url': '',
                'controller': '',
                'ordering': 999,
                'status': 'Active'
            }
        }
    },        
    methods:{
        init() {
            this.item = this.item_default;
            this.$axios.get('/api/module-tasks')
            .then((response)=>{
                if(response.status == 200) {
                    this.items = response.data.items;
                } else {
                    console.log('Status Code: '+response.status+'\n'+'Message: '+response.statusText);
                }
            })
            .catch((error)=>{
                console.log('Fetch Error: ');
                console.log(error);
            });
        },
        addEditForm(action, row) {  // Here, we will check if the ADD/ EDIT/ DELETE action is Allowed or not. 
            // ---- Check permission ----
            //         here....
            // --------------------------
            if(action == 2){
                this.item = row;
            }
        },
        save(){ // ADD and EDIT
            let formData=new FormData(document.getElementById('saveForm'));
            let item_id = formData.get('item_id');

            let url_part='';
            if(!isNaN(item_id) && item_id > 0){
                url_part += '/'+item_id;
                formData.append('_method', 'PUT');
            }
            // Axios(http) Request
            this.$axios.post('/api/module-tasks'+url_part, formData)
            .then((response)=>{
                if(response.data.response == "success") {
                    this.$toast.success(response.data.string, {timeout: 2000});
                    $("#modalAddEdit").modal('hide');
                    this.init();
                } else {
                    console.log('Status Code: '+response.status+'\n'+'Message: '+response.statusText);
                }
            })
            .catch((error)=>{
                if(error.response.status == 422){
                    let error_msg='';
                    for (let [key, value] of Object.entries(error.response.data.errors)) {
                        error_msg += '\n'+value[0];
                    }
                    this.$toast.error(error_msg);
                }
                else{
                    this.$toast.error(error.response.statusText);
                }
            });
        },
        deleteItem(delete_id){ // DELETE
            if(!confirm('Are you sure?')){
                return;
            }
            this.$axios.delete('/api/module-tasks/'+delete_id, {})
            .then((response)=>{
                if(response.data.response == "success") {
                    this.$toast.success(response.data.string, {timeout: 2000});
                    this.init();
                } else {
                    console.log('Status Code: '+response.status+'\n'+'Message: '+response.statusText);
                }
            })
            .catch((error)=>{
                console.log(error.response);
            });
        }
    }
}
</script>

<style  scoped>
    .cell-nowrap{width: 1%; white-space: nowrap}
</style>
