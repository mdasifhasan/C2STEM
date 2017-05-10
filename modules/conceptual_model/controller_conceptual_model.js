/**
 * Created by hasanm on 5/9/2017.
 */

function conceptual_model_load_data(){
    dao_conceptual_model();
}

function conceptual_model_load_views(parent_id) {
    $('#'+parent_id).load('modules/conceptual_model/view_conceptual_model.html', function () {
       populate_data();
    });
}

function populate_data() {

    var $combo_agents = $('#cm_concepts');
    console.log("conceptual_model_load_views loading options of concepts that can be created, total agents: ", Object.keys(concepts.environment).length);

    $combo_agents.append(function() {
        var output = '';
        output += '<optgroup label="Environment">';
        $.each(concepts.environment, function(key, value) {
            output += '<option value="' + key + '">' + value.name + '</option>';
        });
        output += '</optgroup>';
        console.log("output: " , output)
        return output;
    });
    $combo_agents.append(function() {
        var output = '';
        output += '<optgroup label="Agents">';
        $.each(concepts.agents, function(key, value) {
            output += '<option value="' + key + '">' + value.name + '</option>';
        });
        output += '</optgroup>';
        console.log("output: " , output)
        return output;
    });
}

function is_ready_cm() {
    if (!is_ready_cm_dao())
        return false;
    return true;
}