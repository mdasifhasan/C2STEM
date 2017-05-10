/**
 * Created by hasanm on 5/9/2017.
 */
function conceptual_model_load_views(parent_id) {
    console.log("conceptual_model_load_views", parent_id)
    $('#'+parent_id).load('modules/conceptual_model/view_conceptual_model.html');
}
