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

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href")
        if (target === "Sprites") {
            $("#Agents").html("");
            for (var k in agents) {
                createAgentUI(agents[k]);
            }
            console.log("filling in with sprites");
        } else if (target === "Environment") {
            $("#Agents").html("");
            for (var k in environment) {
                createAgentUI(environment[k]);
            }
            console.log("filling in with environment");
        }
    });


    $("#btn_convert").click(function () {
        updateComputationalModel();
    });
    ejs = new EJS({url: 'templates/netsblox_sprite.ejs'})
});


function plugin_constructs_by_rules(xmlDoc, agent, agnetNode) {
    console.log("plugin_constructs_by_rules", rules);
    for (var r in rules) {
        var rule = rules[r]
        console.log("rule:", rule);
        if (isRuleSatisfied(rule, agent)) {
            generate_constructs_of_rule(xmlDoc, agnetNode, rule, null);
        }
    }
}

function generate_constructs_of_rule(xmlDoc, agentNode, rule, bkup) {
    console.log("generate_constructs_of_rule: ", rule);
    for (var cid in rule.GeneratedConstructs) {
        var c = rule.GeneratedConstructs[cid];
        switch (c.type) {
            case "Method":
                console.log("generating method: ", c);
                var node = getExistingNode(agentNode, "block-definition", "s", c.label);
                if (node === null) {
                    if (bkup == null) {
                        node = xmlDoc.createElement("block-definition");
                        var label = c.label;
                        for (var p in c.params) {
                            var param = c.params[p];
                            label= label + " %&apos;" + param.label + "&apos; ";
                        }
                        node.setAttribute("s", label);
                        node.setAttribute("type", "command");
                        node.setAttribute("category", "other");

                        node.appendChild(xmlDoc.createElement("header"));
                        node.appendChild(xmlDoc.createElement("code"));
                        var inputs = xmlDoc.createElement("inputs");
                        node.appendChild(inputs);

                        for (var p in c.params) {
                            var param = c.params[p];
                            var input = xmlDoc.createElement("input");
                            if (param.type === "Number")
                                input.setAttribute("type", "%n");
                            else
                                input.setAttribute("type", "%s");
                            inputs.appendChild(input);
                        }
                    } else {
                        console.log("using bkup behavior: ");
                        console.log(bkup);
                        node = bkup;
                    }
                    agentNode.getElementsByTagName("blocks")[0].appendChild(node);
                }
                break;
            case "Variable":
                break;
            default:
                console.log("generate_constructs_of_rule: rule has unrecognized construct type", rule);
        }
    }
}

function isRuleSatisfied(rule, agent) {
    var pass = true;
    var found = false;
    for (var q in rule.Required) {
        var rq = rule.Required[q];
        console.log("checking Required", rq, (rq in agent.properties));
        if (rq in agent.behaviors) {
            found = true;
            if (!agent.behaviors[rq].selected) {
                pass = false;
            }
        } else if (rq in agent.properties) {
            found = true;
            if (!agent.properties[rq].selected) {
                pass = false;
            }else
                console.log("pass is ", pass);
        } else {
            for (var e in environment) {
                if (environment[e].selected) {
                    var a = environment[e]
                    if (rq in a.behaviors) {
                        found = true;
                        if (!a.behaviors[rq].selected) {
                            pass = false;
                        }
                    } else if (rq in a.properties) {
                        found = true;
                        if (!a.properties[rq].selected) {
                            pass = false;
                        }
                    }
                }
            }
            console.log("rule reburies constructs which is not present in the agent or environment");
        }
        if (!found)
            pass = false;
    }
    console.log("checking rule", rule, "result:", pass);

    return pass;
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
    plugin_environment_variables(xmlDoc);
    console.log("convertedSTR");
    var convertedSTR = new XMLSerializer().serializeToString(xmlDoc);
    console.log(convertedSTR);
    load_project_xml(convertedSTR);


    // console.log(JSON.stringify(AgentStates));
    // var xml = ejs.render({data: AgentStates});
    // console.log("xml: ", xml);
    // load_project_xml(xml);
}
function plugin_environment_variables(xmlDoc) {
    var parentNode = xmlDoc.getElementsByTagName("project")[0];
    // console.log("plugin_environment_variables, parentNode: ", parentNode);
    var parent = getChildByTag(xmlDoc.getElementsByTagName("project")[0], "variables");
    for (var key in environment) {
        var e = environment[key];
        console.log("e: ", e);
        if (e.selected) {
            for (var p in e.properties) {
                if (e.properties[p].selected) {
                    var id = e.name + "_p_" + p;
                    var bkup = null;
                    if (id in backups)
                        bkup = backups[id];
                    console.log("plugin_properties: ", e.properties[p]);
                    plugin_properties_direct(xmlDoc, parent, e.properties[p], bkup);
                }
                else {
                    console.log("xml_remove_property: ", e.properties[p]);
                    // xml_remove_property(e.name, parentNode, e.properties[p].name);
                    xml_remove_property_direct(e.name, parent, e.properties[p].name)
                }
            }
        }
        else if (e.selected == false) {
            for (var p in e.properties) {
                xml_remove_property_direct(e.name, parent, e.properties[p].name)
            }
        }
    }
}

function plugin_agent(xmlDoc, agent) {
    var agentNode = getExistingNode(xmlDoc, "sprite", "name", agent.name);
    if (agentNode === null) {
        if (agent.selected) {
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
            else {
                console.log("using bkup agent: ");
                console.log(bkup);
                agentNode = bkup;
            }
            xmlDoc.getElementsByTagName("sprites")[0].appendChild(agentNode);
        } else
            return;
    } else {
        if (agent.selected == false) {
            for (var p in agent.properties) {
                // if (agent.properties[p].selected)
                xml_remove_property(agent.name, agentNode, agent.properties[p].name);
            }

            for (var b in agent.behaviors) {
                // if (agent.behaviors[b].selected)
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

    plugin_constructs_by_rules(xmlDoc, agent, agentNode);
    for (var p in agent.properties)
        if (agent.properties[p].selected) {
            var id = agent.name + "_p_" + p;
            var bkup = null;
            if (id in backups)
                bkup = backups[id];
            plugin_properties(xmlDoc, agentNode, agent.properties[p], bkup);
        }
        else {
            xml_remove_property(agent.name, agentNode, agent.properties[p].name);
        }
    for (var b in agent.behaviors)
        if (agent.behaviors[b].selected) {
            var id = agent.name + "_b_" + b;
            var bkup = null;
            if (id in backups)
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

function xml_remove_property_direct(agentName, parent, propertyName) {
    var e = getChildByName(parent, propertyName);
    console.log(parent, "xml_remove_property_direct", propertyName, e);
    // var e = getExistingNode(parent, "variable", "name", propertyName)
    if (!(e === null)) {
        // parent.getElementsByTagName("variables")[0].removeChild(e);
        parent.removeChild(e);
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
        if (bkup == null) {
            node = xmlDoc.createElement("variable");
            node.setAttribute("name", property.name);
            var nodeValue = xmlDoc.createElement("l");
            nodeValue.nodeValue = 0;
            node.appendChild(nodeValue);
        } else {
            console.log("using bkup property: ");
            console.log(bkup);
            node = bkup;
        }
        agentNode.getElementsByTagName("variables")[0].appendChild(node);
    }
}
function getChildByTag(parent, tag) {
    var x = parent.childNodes;
    for (var i = 0; i < x.length; i++) {
        if (x[i].tagName === tag)
            return x[i];
    }
    return null;
}
function getChildByName(parent, name) {
    var x = parent.childNodes;
    for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute("name") === name)
            return x[i];
    }
    return null;
}
function plugin_properties_direct(xmlDoc, parent, property, bkup) {
    var node = getChildByName(parent, property.name);
    if (node === null) {
        if (bkup == null) {
            node = xmlDoc.createElement("variable");
            node.setAttribute("name", property.name);
            var nodeValue = xmlDoc.createElement("l");
            nodeValue.nodeValue = 0;
            node.appendChild(nodeValue);
        } else {
            console.log("using bkup property: ");
            console.log(bkup);
            node = bkup;
        }
        parent.appendChild(node);
    }
}


function plugin_behaviors(xmlDoc, agentNode, behavior, bkup) {
    var node = getExistingNode(agentNode, "block-definition", "s", behavior.name);
    if (node === null) {
        if (bkup == null) {
            node = xmlDoc.createElement("block-definition");
            node.setAttribute("s", behavior.name);
            node.setAttribute("type", "command");
            node.setAttribute("category", "other");

            node.appendChild(xmlDoc.createElement("header"));
            node.appendChild(xmlDoc.createElement("code"));
            node.appendChild(xmlDoc.createElement("inputs"));
        } else {
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
