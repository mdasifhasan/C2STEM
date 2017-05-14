/**
 * Created by hasanm on 5/9/2017.
 */

function conceptual_model_load_data(){
    dao_conceptual_model();
}

function create_new_concept() {
    var selected_concept = $('#cm_concepts').val();
    console.log("selected_concept:",selected_concept);
    var selected_agent = null;
    if( selected_concept in concepts.environment ){
        selected_agent = concepts.environment[selected_concept];
    }else if( selected_concept in concepts.agents ){
        selected_agent = concepts.agents[selected_concept];
    }
    console.log("selected_agent",selected_agent);
    if(selected_agent !== null){

    }
}

function OnViewLoaded() {
    populate_view();
    $("#cm_create_concept").click(function () {
        create_new_concept();
    });
}

function conceptual_model_load_views(parent_id) {
    $('#'+parent_id).load('modules/conceptual_model/view_conceptual_model.html', function () {
        OnViewLoaded();
    });
}


function populate_view() {
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