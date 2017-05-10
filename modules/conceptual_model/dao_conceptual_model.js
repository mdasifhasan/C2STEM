/**
 * Created by hasanm on 5/10/2017.
 */

var concepts = null;
function dao_conceptual_model() {
    $.getJSON('modules/conceptual_model/default_concepts.json', function (data) {
        console.log("conceptual model data:")
        console.log(data);
        concepts = data
    })
}

function is_ready_cm_dao() {
    if (concepts === null)
        return false;
    return true;
}