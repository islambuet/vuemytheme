<template>                                     
    <!-- Modal -->
    <div class="modal fade text-left" id="modalAddEdit" ref="vueModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <!-- Modal Inner-->        
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabel">Add System Configuration</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="saveForm">
                    <div class="modal-body">
                        <input type="hidden" name="item_id" :value="item.id"/>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">{{$systemFunctions.getLabel("label_name")}} <b class="text-danger">*</b></label>
                            <div class="col-sm-8">
                                <input type="text" name="item[purpose]" class="form-control" :value="item.purpose"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Config Value <b class="text-danger">*</b></label>
                            <div class="col-sm-8">
                                <input type="text" name="item[config_value]" class="form-control" :value="item.config_value"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Description</label>
                            <div class="col-sm-8">
                                <textarea rows="3" name="item[description]" class="form-control" :value="item.description"></textarea>
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
        item: Object
    },
    mounted: function() {
        // Event fired when modal closed
        $(this.$refs.vueModal).on("hidden.bs.modal", this.modal_hidden)
    },   
    methods:{
        modal_hidden: function() {
            this.$parent.item = this.$parent.item_default; // clears item array in parent component
            document.getElementById("saveForm").reset(); // resets form fields
        }
    }
}
</script>

<style scoped>

</style>