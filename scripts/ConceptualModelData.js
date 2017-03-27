/**
 * Created by hasanm on 3/27/2017.
 */

var agents;
var environment;
var rules;
function loadAgents() {
    environment =
        {
            "Time": {
                "name": "Time",
                "elementID": "env_time",
                "selected": false,
                "properties": {
                    "environment_DeltaTime": {
                        "name": "DeltaTime",
                        "elementID": "environment_DeltaTime",
                        "selected": false
                    },
                    "environment_TimeFromStart": {
                        "name": "TimeFromStart",
                        "elementID": "environment_TimeFromStart",
                        "selected": false
                    }
                }
            },
            "Physics": {
                "name": "Physics",
                "elementID": "env_physics",
                "selected": false,
                "properties": {
                    "environment_GravityX": {
                        "name": "Gravity",
                        "elementID": "environment_GravityX",
                        "selected": false
                    }
                }
            }
        }
    agents =
        {
            "Point Mass": {
                "name": "Point Mass",
                "elementID": "point_mass",
                "selected": false,
                "properties": {
                    "point_mass_mass": {
                        "name": "Mass",
                        "elementID": "point_mass_mass",
                        "selected": false
                    },
                    "point_mass_position_x": {
                        "name": "Position X",
                        "elementID": "point_mass_position_x",
                        "selected": false
                    },
                    "point_mass_position_y": {
                        "name": "Position Y",
                        "elementID": "point_mass_position_y",
                        "selected": false
                    },
                    "Vpoint_mass_velocity_x": {
                        "name": "Velocity X",
                        "elementID": "point_mass_velocity_x",
                        "selected": false
                    },
                    "point_mass_velocity_y": {
                        "name": "Velocity Y",
                        "elementID": "point_mass_velocity_y",
                        "selected": false
                    }, "point_mass_speed": {
                        "name": "Speed",
                        "elementID": "point_mass_speed",
                        "selected": false
                    }, "point_mass_MovingDirection": {
                        "name": "Moving Direction",
                        "elementID": "point_mass_MovingDirection",
                        "selected": false
                    }, "point_mass_AccelerationX": {
                        "name": "Acceleration X",
                        "elementID": "point_mass_AccelerationX",
                        "selected": false
                    }, "point_mass_AccelerationY": {
                        "name": "Acceleration Y",
                        "elementID": "point_mass_AccelerationY",
                        "selected": false
                    }, "point_mass_AverageVelocityX": {
                        "name": "Average Velocity X",
                        "elementID": "point_mass_AverageVelocityX",
                        "selected": false
                    }, "point_mass_AverageVelocityY": {
                        "name": "Average Velocity Y",
                        "elementID": "point_mass_AverageVelocityY",
                        "selected": false
                    }, "point_mass_AverageSpeed": {
                        "name": "Average Speed",
                        "elementID": "point_mass_AverageSpeed",
                        "selected": false
                    }, "point_mass_AverageAccelerationX": {
                        "name": "Average Acceleration X",
                        "elementID": "point_mass_AverageAccelerationX",
                        "selected": false
                    }, "point_mass_AverageAccelerationY": {
                        "name": "Average Acceleration Y",
                        "elementID": "point_mass_AverageAccelerationY",
                        "selected": false
                    }
                },
                "behaviors": {
                    "point_mass_update_position": {
                        "name": "Update Position",
                        "elementID": "point_mass_update_position",
                        "selected": false
                    },
                    "point_mass_update_velocity": {
                        "name": "Update Velocity",
                        "elementID": "point_mass_update_velocity",
                        "selected": false
                    },
                    "point_mass_update_acceleration": {
                        "name": "Update Acceleration",
                        "elementID": "point_mass_update_acceleration",
                        "selected": false
                    },
                    "point_mass_UpdateSpeed": {
                        "name": "Update Speed",
                        "elementID": "point_mass_UpdateSpeed",
                        "selected": false
                    },
                    "point_mass_UpdateMovingDirection": {
                        "name": "Update Moving Direction",
                        "elementID": "point_mass_UpdateMovingDirection",
                        "selected": false
                    },
                    "point_mass_UpdateAverageVelocity": {
                        "name": "Update Average Velocity",
                        "elementID": "point_mass_UpdateAverageVelocity",
                        "selected": false
                    },
                    "point_mass_UpdateAverageSpeed": {
                        "name": "Update Average Speed",
                        "elementID": "point_mass_UpdateAverageSpeed",
                        "selected": false
                    },
                    "point_mass_UpdateAverageAcceleration": {
                        "name": "Update Average Acceleration",
                        "elementID": "point_mass_UpdateAverageAcceleration",
                        "selected": false
                    }
                }
            }
        }

    rules =
        [
            {
                "Required": [
                    "point_mass_mass"
                ],
                "GeneratedConstructs": [
                    {label: "Mass", type: "Variable", defaultValue: '5'},
                    {label: "setMass", type: "Method", params: [{label: "mass", "type": "Number"}], return_type: "void"}
                ]
            },
            {
                "Required": [
                    "point_mass_speed", "point_mass_UpdateSpeed"
                ],
                "GeneratedConstructs": [
                    {
                        label: "setSpeed",
                        type: "Method",
                        params: [{label: "speed", "type": "Number"}],
                        return_type: "void"
                    },
                    {
                        label: "changeSpeed",
                        type: "Method",
                        params: [{label: "speed", "type": "Number"}],
                        return_type: "void"
                    }
                ]
            }
        ]

    // var rules =
    //     [
    //         {
    //             "Required": [
    //                 "Construct_id_1", "Construct_id_2"
    //             ],
    //             "GeneratedConstructs":[
    //                 { label: "", type: "Variable", defaultValue: ''},
    //                 { label: "", type: "Method", params: ["p1", "p2"], return_type: "void"},
    //                 { label: "", type: "Method", params: ["p1", "p2"], return_type: "var"}
    //             ]
    //         }
    //     ]


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
