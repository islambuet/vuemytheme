<template>                                     
    <!-- Modal -->
    <div class="modal fade text-left" id="modalAddEdit" ref="vueModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <!-- Modal Inner-->        
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabel">
                        <span v-text="(item.id > 0)? 'Edit':'Add'"></span> Module &amp; Tasks
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="saveForm">
                    <div class="modal-body">
                        <input type="hidden" name="item_id" :value="item.id"/>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Name (EN) <b class="text-danger">*</b></label>
                            <div class="col-sm-8">
                                <input type="text" name="item[name_en]" class="form-control" :value="item.name_en"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Name (BN) </label>
                            <div class="col-sm-8">
                                <input type="text" name="item[name_bn]" class="form-control" :value="item.name_bn"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Type <b class="text-danger">*</b></label>
                            <div class="col-sm-8">
                                <select class="form-control" name="item[type]" :value="item.type" @change="onChange($event)">
                                    <option value="MODULE">MODULE</option>
                                    <option value="TASK">TASK</option>
                                </select>
                            </div>
                        </div>
                        <div class="hide-wrap" :class="(item.id > 0 && item.type=='TASK')? '':'hidden'">
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label">Path/ URL <b class="text-danger">*</b></label>
                                <div class="col-sm-8">
                                    <input type="text" name="item[url]" class="form-control" :value="item.url" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label">Controller <b class="text-danger">*</b></label>
                                <div class="col-sm-8">
                                    <input type="text" name="item[controller]" class="form-control" :value="item.controller" />
                                </div>
                            </div>  
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Parent</label>
                            <div class="col-sm-8">
                                <select class="form-control" name="item[parent]" :value="item.parent">
                                    <option value="0">- Select -</option>
                                    <option v-for="(eachItem, i) in items" :value="eachItem.id" :key="i" v-if="eachItem.id != item.id">
                                        {{eachItem.prefix}} {{ eachItem.name_en }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Ordering <b class="text-danger">*</b></label>
                            <div class="col-sm-8">
                                <input type="text" name="item[ordering]" class="form-control" :value="item.ordering"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Status <b class="text-danger">*</b></label>
                            <div class="col-sm-8">
                                <select class="form-control" name="item[status]" :value="item.status">
                                    <option value="Active" selected>Active</option>
                                    <option value="In-Active">In-Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" v-on:click.prevent="$parent.save">Save</button>
                    </div>
                </form>
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'AddEdit',
    props: {
        item: Object,
        items: Array
    },
    mounted: function() {
        // Event fired when modal closed
        $(this.$refs.vueModal).on("hidden.bs.modal", this.modal_hidden);
    }, 
    methods:{
        modal_hidden: function() {
            $(".hide-wrap").addClass('hidden');
            this.$parent.item = this.$parent.item_default; // clears item array in parent component
            document.getElementById("saveForm").reset(); // resets form fields
        },
        onChange: function(event) {
            $(".hide-wrap input").val('');
            if(event.target.value == 'TASK'){
                $(".hide-wrap").removeClass('hidden');
            }else{
                $(".hide-wrap").addClass('hidden');
            }
        }
    }
}
</script>

<style scoped>

</style>