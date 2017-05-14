/**
 * Created by hasanm on 5/9/2017.
 */

function conceptual_model_load_data(){
    dao_conceptual_model();
}

function create_new_concept() {
    var selected_concept_key = $('#cm_concepts').val();
    console.log("selected_concept_key:",selected_concept_key);
    var selected_concept = null;
    if( selected_concept_key in concepts.environment ){
        selected_concept = concepts.environment[selected_concept_key];
    }else if( selected_concept_key in concepts.agents ){
        selected_concept = concepts.agents[selected_concept_key];
    }
    console.log("selected_concept",selected_concept);
    if(selected_concept !== null){
        selected_concept.seleted = true;
        console.log("creating new concept: " + selected_concept.name);
        data = {};
        data.concept = selected_concept;
        var html = new EJS({url: 'modules/conceptual_model/template_concept.ejs'}).render(data);
        var $concept_container = $('#concept_container');
        $concept_container.append(html);
        $("#cm_concepts option[value='"+ selected_concept_key +"']").hide();
        $("#cm_concepts option[value='']").prop('selected', true);
        $("#delete_"+selected_concept.elementID).click(function () {
            console.log("clicked");
            $("#"+selected_concept.elementID).remove();
            $("#cm_concepts option[value='"+ selected_concept_key +"']").show();
            selected_concept.seleted = false;
            console.log("selected_concept",selected_concept);
        });

        $("#sel_prop_"+selected_concept.elementID).change(function () {
            var selected_prop_key = $("#sel_prop_"+selected_concept.elementID).val();
            var selected_property = selected_concept.properties[selected_prop_key];
            $("#sel_prop_" + selected_concept.elementID + " option[value='"+ selected_prop_key +"']").hide();
            $("#sel_prop_" + selected_concept.elementID + " option[value='']").prop('selected', true);
            // add prop row
            // check prop delete handler
            // upon delete make prop reappear in the list and delete prop row
            var $container_prop_row = $("#row_prop_"+selected_concept.elementID);
            var html = new EJS({url: 'modules/conceptual_model/template_prop_row.ejs'}).render(selected_property);
            $container_prop_row.append(html);
            selected_property.seleted = true;
            $("#delete_"+selected_property.elementID).click(function () {
                console.log("clicked");
                $("#"+selected_property.elementID).remove();
                $("#sel_prop_" + selected_concept.elementID + " option[value='"+ selected_prop_key +"']").show();
                selected_property.seleted = false;
                console.log("selected_property",selected_property);
            });
        });


        $("#sel_be_"+selected_concept.elementID).change(function () {
            var selected_behavior_key = $("#sel_be_"+selected_concept.elementID).val();
            var selected_behavior = selected_concept.behaviors[selected_behavior_key];
            $("#sel_be_" + selected_concept.elementID + " option[value='"+ selected_behavior_key +"']").hide();
            $("#sel_be_" + selected_concept.elementID + " option[value='']").prop('selected', true);
            // add prop row
            // check prop delete handler
            // upon delete make prop reappear in the list and delete prop row
            var $container_be_row = $("#row_be_"+selected_concept.elementID);
            var html = new EJS({url: 'modules/conceptual_model/template_prop_row.ejs'}).render(selected_behavior);
            $container_be_row.append(html);
            selected_behavior.seleted = true;
            $("#delete_"+selected_behavior.elementID).click(function () {
                console.log("clicked");
                $("#"+selected_behavior.elementID).remove();
                $("#sel_be_" + selected_concept.elementID + " option[value='"+ selected_behavior_key +"']").show();
                selected_behavior.seleted = false;
                console.log("selected_behavior",selected_behavior);
            });
        });
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


function create_new_agent_view() {

}