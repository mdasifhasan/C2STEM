/**
 * Created by hasanm on 5/9/2017.
 */

function conceptual_model_load_data(){
    dao_conceptual_model();
}

function conceptual_model_load_views(parent_id) {
    $('#'+parent_id).load('modules/conceptual_model/view_conceptual_model.html');
    console.log("accessing conceptual model data:")
    console.log(concepts);
}

function is_ready_cm() {
    if (!is_ready_cm_dao())
        return false;
    return true;
}