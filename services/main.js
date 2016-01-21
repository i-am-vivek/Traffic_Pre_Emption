
var mqtt    = require('mqtt');
var DF=require("./distance_finder");
var Ambulances=[];
var Main=function(B){
    var broker=B||'mqtt://test.mosquitto.org';
    var client  = mqtt.connect(broker);
    client.on('connect', function () {
        client.subscribe('vivek/amal/iot/latlon');
    });
    client.on('message', function (topic, message) {
        switch(topic){
            case "vivek/amal/iot/latlon":
                DF.find(JSON.parse(message),function(DistanceObject){
                    //console.log(DistanceObject);
                    var meter=DistanceObject.distance*100;
                    client.publish('vivek/amal/iot/throwdistanceSD',meter.toString());
                    if(meter<=10 && meter>2){
                        client.publish('vivek/amal/iot/throwdistanceS',"on");
                        //Ambulances.push(DistanceObject);
                    }
                    else{
                        client.publish('vivek/amal/iot/throwdistanceS',"off");
                    }
                    //if(Ambulances.length){
                    //client.publish('vivek/amal/iot/throwdistance',JSON.stringify(Ambulances[0]));
                    // }
                });
        }
    });

}
module.exports =Main;