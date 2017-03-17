/**
 * Created by hasanm on 12/16/2016.
 */


// var AgentStates = {};
var ejs;
var backups = {}
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
    ejs = new EJS({url: 'templates/netsblox_sprite.ejs'})
});

var agents;
function loadAgents() {
    agents =
    {
        "Point Mass": {
            "name": "Point Mass",
            "elementID": "point_mass",
            "selected": false,
            "properties": {
                "Mass": {
                    "name": "Mass",
                    "elementID": "point_mass_mass",
                    "selected": false
                },
                "Position X": {
                    "name": "Position X",
                    "elementID": "point_mass_position_x",
                    "selected": false
                },
                "Position Y": {
                    "name": "Position Y",
                    "elementID": "point_mass_position_y",
                    "selected": false
                },
                "Velocity X": {
                    "name": "Velocity X",
                    "elementID": "point_mass_velocity_x",
                    "selected": false
                },
                "Velocity Y": {
                    "name": "Velocity Y",
                    "elementID": "point_mass_velocity_y",
                    "selected": false
                },"Speed": {
                    "name": "Speed",
                    "elementID": "point_mass_speed",
                    "selected": false
                },"Moving Direction": {
                    "name": "Moving Direction",
                    "elementID": "point_mass_MovingDirection",
                    "selected": false
                },"Acceleration X": {
                    "name": "Acceleration X",
                    "elementID": "point_mass_AccelerationX",
                    "selected": false
                },"Acceleration Y": {
                    "name": "Acceleration Y",
                    "elementID": "point_mass_AccelerationY",
                    "selected": false
                },"Average Velocity X": {
                    "name": "Average Velocity X",
                    "elementID": "point_mass_AverageVelocityX",
                    "selected": false
                },"Average Velocity Y": {
                    "name": "Average Velocity Y",
                    "elementID": "point_mass_AverageVelocityY",
                    "selected": false
                },"Average Speed": {
                    "name": "Average Speed",
                    "elementID": "point_mass_AverageSpeed",
                    "selected": false
                },"Average Acceleration X": {
                    "name": "Average Acceleration X",
                    "elementID": "point_mass_AverageAccelerationX",
                    "selected": false
                },"Average Acceleration Y": {
                    "name": "Average Acceleration Y",
                    "elementID": "point_mass_AverageAccelerationY",
                    "selected": false
                }
            },
            "behaviors": {
                "Update Position": {
                    "name": "Update Position",
                    "elementID": "point_mass_update_position",
                    "selected": false
                },
                "Update Velocity": {
                    "name": "Update Velocity",
                    "elementID": "point_mass_update_velocity",
                    "selected": false
                },
                "Update Acceleration": {
                    "name": "Update Acceleration",
                    "elementID": "point_mass_update_acceleration",
                    "selected": false
                },
                "Update Speed": {
                    "name": "Update Speed",
                    "elementID": "point_mass_UpdateSpeed",
                    "selected": false
                },
                "Update Moving Direction": {
                    "name": "Update Moving Direction",
                    "elementID": "point_mass_UpdateMovingDirection",
                    "selected": false
                },
                "Update Average Velocity": {
                    "name": "Update Average Velocity",
                    "elementID": "point_mass_UpdateAverageVelocity",
                    "selected": false
                },
                "Update Average Speed": {
                    "name": "Update Average Speed",
                    "elementID": "point_mass_UpdateAverageSpeed",
                    "selected": false
                },
                "Update Average Acceleration": {
                    "name": "Update Average Acceleration",
                    "elementID": "point_mass_UpdateAverageAcceleration",
                    "selected": false
                }
            }
        },
        "Agent3": {
            "name": "Agent 3",
            "elementID": "agent3",
            "selected": false,
            "properties": {
                "Agent3_prop_1": {
                    "name": "Agent 3_prop_1",
                    "elementID": "agent3p1",
                    "selected": false
                },
                "Agent3_prop_2": {
                    "name": "Agent 3_prop_2",
                    "elementID": "agent3p2",
                    "selected": false
                },
                "Agent3_prop_3": {
                    "name": "Agent 3_prop_3",
                    "elementID": "agent3p3",
                    "selected": false
                },
                "Agent3_prop_4": {
                    "name": "Agent 3_prop_4",
                    "elementID": "agent3p4",
                    "selected": false
                }
            },
            "behaviors": {
                "Agent3_behavior_1": {
                    "name": "Agent 3_behavior_1",
                    "elementID": "agent3b1",
                    "selected": false
                }
            }
        },
        "Agent7": {
            "name": "Agent 7",
            "elementID": "agent7",
            "selected": false,
            "properties": {
                "Agent7_prop_1": {
                    "name": "Agent 7_prop_1",
                    "elementID": "agent7p1",
                    "selected": true
                },
                "Agent7_prop_2": {
                    "name": "Agent 7_prop_2",
                    "elementID": "agent7p2",
                    "selected": false
                },
                "Agent7_prop_3": {
                    "name": "Agent 7_prop_3",
                    "elementID": "agent7p3",
                    "selected": false
                },
                "Agent7_prop_4": {
                    "name": "Agent 7_prop_4",
                    "elementID": "agent7p4",
                    "selected": false
                },
                "Agent7_prop_5": {
                    "name": "Agent 7_prop_5",
                    "elementID": "agent7p5",
                    "selected": false
                }
            },
            "behaviors": {
                "Agent7_behavior_1": {
                    "name": "Agent 7_behavior_1",
                    "elementID": "agent7b1",
                    "selected": false
                },
                "Agent7_behavior_2": {
                    "name": "Agent 7_behavior_2",
                    "elementID": "agent7b2",
                    "selected": false
                },
                "Agent7_behavior_3": {
                    "name": "Agent 7_behavior_3",
                    "elementID": "agent7b3",
                    "selected": false
                }
            }
        }
    }
    // agents = {};
    // for (var i = 0; i < 32; i++) {
    //     var agent = {};
    //     if (i === 0)
    //         agent.name = "Some really really really long name";
    //     else
    //         agent.name = "Agent " + (i + 1);
    //     agents[agent.name] = agent;
    //     agent.elementID = "agent" + (i + 1);
    //     agent.selected = false;
    //
    //     agent.properties = {};
    //     for (var j = 0; j < Math.random() * 10; j++) {
    //         var property = {};
    //         property.name = agent.name + "_prop_" + (j + 1);
    //         property.elementID = agent.elementID + "p" + (j + 1);
    //         property.selected = false;
    //         agent.properties[property.name.replace(/\s/g, '')] = property;
    //     }
    //     agent.behaviors = {};
    //     for (var k = 0; k < Math.random() * 10; k++) {
    //         var behavior = {};
    //         behavior.name = agent.name + "_behavior_" + (k + 1);
    //         behavior.elementID = agent.elementID + "b" + (k + 1);
    //         behavior.selected = false;
    //         agent.behaviors[behavior.name.replace(/\s/g, '')] = behavior;
    //     }
    // }
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
    // AgentStates[n.agentObject.name.replace(/\s/g, '')] = n.agentObject;
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
            // AgentStates[n.agentObject.name.replace(/\s/g, '')] = n.agentObject;
        } else {
            // the checkbox is now no longer checked
            console.log('not checked ', n.agentObject.name);
            n.agentObject.selected = false;
            // delete AgentStates[n.agentObject.name.replace(/\s/g, '')];
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
    console.log("Agents");
    console.log(agents);

    var str = document.getElementById('netsblox').contentWindow.export_project_to_xml_str();
    // console.log("str");
    // console.log(str);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(str, "text/xml");

    for (var key in agents) {
        // console.log(agents[key]);
        plugin_agent(xmlDoc, agents[key])
    }
    // console.log("convertedSTR");
    var convertedSTR = new XMLSerializer().serializeToString(xmlDoc);
    // console.log(convertedSTR);
    load_project_xml(convertedSTR);


    // console.log(JSON.stringify(AgentStates));
    // var xml = ejs.render({data: AgentStates});
    // console.log("xml: ", xml);
    // load_project_xml(xml);
}

function plugin_agent(xmlDoc, agent) {
    var agentNode = getExistingNode(xmlDoc, "sprite", "name", agent.name);
    if (agentNode === null) {
        if(agent.selected) {
            var id = agent.name;
            var bkup = null;
            if (id in backups)
                bkup = backups[id];
            if (bkup == null) {
                agentNode = xmlDoc.createElement("sprite");
                agentNode.setAttribute("name", agent.name);
                // blocks
                var blocks = xmlDoc.createElement("blocks");
                agentNode.appendChild(blocks);
                var variables = xmlDoc.createElement("variables");
                agentNode.appendChild(variables);
                var scripts = xmlDoc.createElement("scripts");
                agentNode.appendChild(scripts);
            }
            else
            {
                console.log("using bkup agent: ");
                console.log(bkup);
                agentNode = bkup;
            }
            xmlDoc.getElementsByTagName("sprites")[0].appendChild(agentNode);
        }else
            return;
    }else{
        if(agent.selected == false){
            for (var p in agent.properties){
                if (agent.properties[p].selected)
                    xml_remove_property(agent.name, agentNode, agent.properties[p].name);
            }

            for (var b in agent.behaviors){
                if (agent.behaviors[b].selected)
                    xml_remove_behavior(agent.name, agentNode, agent.behaviors[b].name);
            }
            var id = agent.name;
            backups[id] = agentNode;
            console.log("backing up, id: " + id + " agent: ");
            console.log(agentNode);
            agentNode.parentNode.removeChild(agentNode);
            return;
        }
    }
    for (var p in agent.properties)
        if (agent.properties[p].selected){
            var id = agent.name + "_p_" + p;
            var bkup = null;
            if(id in backups)
                bkup = backups[id];
            plugin_properties(xmlDoc, agentNode, agent.properties[p], bkup);
        }
        else {
            xml_remove_property(agent.name, agentNode, agent.properties[p].name);
        }
    for (var b in agent.behaviors)
        if (agent.behaviors[b].selected){
            var id = agent.name + "_b_" + b;
            var bkup = null;
            if(id in backups)
                bkup = backups[id];
            plugin_behaviors(xmlDoc, agentNode, agent.behaviors[b], bkup)
        }
        else {
            xml_remove_behavior(agent.name, agentNode, agent.behaviors[b].name);
        }
}
function xml_remove_property(agentName, agentNode, propertyName) {
    var e = getExistingNode(agentNode, "variable", "name", propertyName)
    if (!(e === null)) {
        agentNode.getElementsByTagName("variables")[0].removeChild(e);
        var id = agentName + "_p_" + propertyName;
        backups[id] = e;
        console.log("backing up, id: " + id + " property: ");
        console.log(e);
    }
}
function xml_remove_behavior(agentName, agentNode, behaviorName) {
    var e = getExistingNode(agentNode, "block-definition", "s", behaviorName);
    if (!(e === null)) {
        agentNode.getElementsByTagName("blocks")[0].removeChild(e);
        var id = agentName + "_b_" + behaviorName;
        backups[id] = e;
        console.log("backing up, id: " + id + " behavior: ");
        console.log(e);
    }
}
function plugin_properties(xmlDoc, agentNode, property, bkup) {
    var node = getExistingNode(agentNode, "variable", "name", property.name);
    if (node === null) {
        if(bkup == null){
            node = xmlDoc.createElement("variable");
            node.setAttribute("name", property.name);
            var nodeValue = xmlDoc.createElement("l");
            nodeValue.nodeValue = 0;
            node.appendChild(nodeValue);
        }else{
            console.log("using bkup property: ");
            console.log(bkup);
            node = bkup;
        }
        agentNode.getElementsByTagName("variables")[0].appendChild(node);
    }
}

function plugin_behaviors(xmlDoc, agentNode, behavior, bkup) {
    var node = getExistingNode(agentNode, "block-definition", "s", behavior.name);
    if (node === null) {
        if(bkup == null) {
            node = xmlDoc.createElement("block-definition");
            node.setAttribute("s", behavior.name);
            node.setAttribute("type", "command");
            node.setAttribute("category", "other");

            node.appendChild(xmlDoc.createElement("header"));
            node.appendChild(xmlDoc.createElement("code"));
            node.appendChild(xmlDoc.createElement("inputs"));
        }else{
            console.log("using bkup behavior: ");
            console.log(bkup);
            node = bkup;
        }
        agentNode.getElementsByTagName("blocks")[0].appendChild(node);
    }
}

function getExistingNode(xmlDoc, nodeType, attrName, attrValue) {
    var agents = xmlDoc.getElementsByTagName(nodeType);
    for (var i = 0; i < agents.length; i++)
        if (agents[i].getAttribute(attrName) === attrValue)
            return agents[i];
    return null;
}

function load_project_xml(text) {
    return document.getElementById('netsblox').contentWindow.load_project_xml(text);
}
