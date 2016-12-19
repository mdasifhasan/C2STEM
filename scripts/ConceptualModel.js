/**
 * Created by hasanm on 12/16/2016.
 */
$(document).ready(function () {
    loadAgents();
    for(var k in agents){
        createAgentUI(agents[k]);
    }

    $("#conceptModelButton").click(function () {
        $("#conceptModelPanel").slideToggle("slow", function () {
            if($(this).is(':hidden')){
                $("#conceptModelIcon").removeClass(".glyphicon glyphicon-collapse-down").addClass("glyphicon glyphicon-collapse-up");
            }else{
                $("#conceptModelIcon").removeClass(".glyphicon glyphicon-collapse-up").addClass("glyphicon glyphicon-collapse-down");
            }
        });
    });
});

var agents;
function loadAgents() {
    agents = {};

    for(var i = 0; i < 32; i++){
        var agent = {};
        if(i === 0)
            agent.name = "Some really really really long name";
        else
            agent.name = "Agent " + (i + 1);
        agents[agent.name] = agent;
        agent.elementID = "agent" + i;

        agent.properties = {};
        for(var j = 0; j < Math.random() * 10; j++){
            var property = {};
            property.name = agent.name + "_prop_"+(j+1);
            property.elementID = agent.elementID + "p" + j;
            agent.properties[j] = property;
        }
        agent.behaviors = {};
        for(var k = 0; k < Math.random()  * 10; k++){
            var behavior = {};
            behavior.name = agent.name + "_behavior_"+(k+1);
            behavior.elementID = agent.elementID + "b" + k;
            agent.behaviors[k] = behavior;
        }
    }
}

function createAgentUI(agent) {
    $( "#Agents" ).append( '<button type = "button" id="'+ agent.elementID +'" class="agentButton col btn btn-primary">'+ agent.name +'</button>' );
    // $( "#Agents" ).append( '<label id="'+ agent.elementID +' class="btn btn-primary"><input type="radio" name="options" id="option2" autocomplete="off"> Radio 2</label>');

    var n = document.getElementById(agent.elementID);
    n.agentObject = agent;
    n.onclick = function() {
        $("#AgentPropertyName").text("Properties: " + this.agentObject.name);
        $("#AgentBehaviorName").text("Behaviors: : " + this.agentObject.name);
        loadProperties(this.agentObject);
        loadBehaviors(this.agentObject);
    };
}

function loadProperties(agent) {
    $("#AgentProperties").html("");
    for(var p in agent.properties){
        createPropertyUI(agent.properties[p]);
    }
}

function createPropertyUI(property) {
    $( "#AgentProperties" ).append( '<button type = "button" id="'+ property.elementID +'" class="agentButton col btn btn-primary">'+ property.name +'</button>' );
}


function loadBehaviors(agent) {

}

function loadBehaviors(agent) {
    $("#AgentBehaviors").html("");
    for(var b in agent.behaviors){
        createBehaviorUI(agent.behaviors[b]);
    }
}

function createBehaviorUI(behavior) {
    $( "#AgentBehaviors" ).append( '<button type = "button" id="'+ behavior.elementID +'" class="agentButton col btn btn-primary">'+ behavior.name +'</button>' );
}