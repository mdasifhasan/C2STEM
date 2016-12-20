/**
 * Created by hasanm on 12/16/2016.
 */


var selectedAgents = [];

$(document).ready(function () {
    loadAgents();
    for (var k in agents) {
        createAgentUI(agents[k]);
    }

    $("#conceptModelButton").click(function () {
        $("#conceptModelPanel").slideToggle("slow", function () {
            if ($(this).is(':hidden')) {
                $("#conceptModelIcon").removeClass(".glyphicon glyphicon-collapse-down").addClass("glyphicon glyphicon-collapse-up");
            } else {
                $("#conceptModelIcon").removeClass(".glyphicon glyphicon-collapse-up").addClass("glyphicon glyphicon-collapse-down");
            }
        });
    });

    $("#btn_convert").click(function () {
        updateComputationalModel();
    });
});

var agents;
function loadAgents() {
    agents = {};

    for (var i = 0; i < 32; i++) {
        var agent = {};
        if (i === 0)
            agent.name = "Some really really really long name";
        else
            agent.name = "Agent " + (i + 1);
        agents[agent.name] = agent;
        agent.elementID = "agent" + (i + 1);
        agent.selected = false;

        agent.properties = {};
        for (var j = 0; j < Math.random() * 10; j++) {
            var property = {};
            property.name = agent.name + "_prop_" + (j + 1);
            property.elementID = agent.elementID + "p" + (j + 1);
            property.selected = false;
            agent.properties[j] = property;
        }
        agent.behaviors = {};
        for (var k = 0; k < Math.random() * 10; k++) {
            var behavior = {};
            behavior.name = agent.name + "_behavior_" + (k + 1);
            behavior.elementID = agent.elementID + "b" + (k + 1);
            behavior.selected = false;
            agent.behaviors[k] = behavior;
        }
    }
}

function createAgentUI(agent) {

    if (agent.selected)
        $("#Agents").append('<button type = "button" id="' + agent.elementID + '" class="agentButton col btn btn-primary"><input type="checkbox" checked >' + agent.name + '</button>');
    else
        $("#Agents").append('<button type = "button" id="' + agent.elementID + '" class="agentButton col btn btn-primary"><input type="checkbox">' + agent.name + '</button>');

    // if (agent.selected)
    //     $("#Agents").append('<button type = "button" id="' + agent.elementID + '" class="agentButton col btn btn-primary"><input id="chk_' + agent.elementID + '" type="checkbox" checked> <label for="chk_' + agent.elementID + '" >' + agent.name + '</label></button>');
    // else
    //     $("#Agents").append('<button type = "button" id="' + agent.elementID + '" class="agentButton col btn btn-primary"><input id="chk_' + agent.elementID + '" type="checkbox"> <label for="chk_' + agent.elementID + '" >' + agent.name + '</label></button>');
    var n = document.getElementById(agent.elementID);
    n.agentObject = agent;
    n.onclick = function () {
        $("#AgentPropertyName").text("Properties: " + this.agentObject.name);
        $("#AgentBehaviorName").text("Behaviors: : " + this.agentObject.name);
        loadProperties(this.agentObject);
        loadBehaviors(this.agentObject);
    };

    var checkBox = $("#" + agent.elementID + " > input");
    checkBox.change(function () {
        // this will contain a reference to the checkbox
        if (this.checked) {
            // the checkbox is now checked
            console.log('checked ', n.agentObject.name);
            n.agentObject.selected = true;
            selectedAgents.push(n.agentObject);
        } else {
            // the checkbox is now no longer checked
            console.log('not checked ', n.agentObject.name);
            n.agentObject.selected = false;
            selectedAgents.splice(selectedAgents.indexOf(n.agentObject),1);
        }
    });
}

function loadProperties(agent) {
    $("#AgentProperties").html("");
    for (var p in agent.properties) {
        createPropertyUI(agent.properties[p]);
    }
}

function createPropertyUI(property) {
    if (property.selected)
        $("#AgentProperties").append('<span id="' + property.elementID + '" class="agentButton col btn btn-primary"> <input type="checkbox" checked >' + property.name + '</span>');
    else
        $("#AgentProperties").append('<span id="' + property.elementID + '" class="agentButton col btn btn-primary"> <input type="checkbox" >' + property.name + '</span>');
    var checkBox = $("#" + property.elementID + " > input");
    checkBox.change(function () {
        // this will contain a reference to the checkbox
        if (this.checked) {
            // the checkbox is now checked
            console.log('checked ', property.name);
            property.selected = true;
        } else {
            // the checkbox is now no longer checked
            console.log('not checked ', property.name);
            property.selected = false;
        }
    });
}


function loadBehaviors(agent) {

}

function loadBehaviors(agent) {
    $("#AgentBehaviors").html("");
    for (var b in agent.behaviors) {
        createBehaviorUI(agent.behaviors[b]);
    }
}

function createBehaviorUI(behavior) {
    if (behavior.selected)
        $("#AgentBehaviors").append('<span id="' + behavior.elementID + '" class="agentButton col btn btn-primary"> <input type="checkbox" checked>' + behavior.name + '</span>');
    else
        $("#AgentBehaviors").append('<span id="' + behavior.elementID + '" class="agentButton col btn btn-primary"> <input type="checkbox" >' + behavior.name + '</span>');
    var checkBox = $("#" + behavior.elementID + " > input");
    checkBox.change(function () {
        // this will contain a reference to the checkbox
        if (this.checked) {
            // the checkbox is now checked
            console.log('checked ', behavior.name);
            behavior.selected = true;
        } else {
            // the checkbox is now no longer checked
            console.log('not checked ', behavior.name);
            behavior.selected = false;
        }
    });
}


function updateComputationalModel() {
    console.log("selectedAgents: ", selectedAgents);
    var xml = jsonxml(selectedAgents,{escape:true, removeIllegalNameCharacters:true});
    console.log("xml: ", xml);
}