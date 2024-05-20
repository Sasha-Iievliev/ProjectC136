status = ""
objects=[];

function preload(){
}

function setup(){
 canvas = createCanvas(530, 380)
 canvas.center();
 video = createCapture(VIDEO);
 video.hide();

}
 
function draw(){
image(video , 0, 0, 530, 380)
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";
    object_name = document.getElementById("input_1").value;
}

function modelloaded(){
    console.log("modelloaded");
    status = true;
}

function gotResults(error, results){
   if(error){
    console.log(error);
   }
   else{
       console.log(results);

       objects = results;

   }
}
function draw(){
   image(video, 0, 0, 480, 380);
   if(status != ""){
       objectDetector.detect(video, gotResults);
   for(i = 0; i < objects.length; i++){
       percent = floor(objects[i].confidence *100);
       fill("red");
       text(objects[i].label +" "+percent+"%",objects[i].x , objects[i].y);
       noFill();
       stroke("red")
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

       if(objects[i].label == object_name){
        video.stop();
       document.getElementById("object_status").innerHTML = object_name + " Found";
       var synth =window.speechSynthesis;
       var utterthis = new SpeechSynthesisUtterance("object found");
       synth.speak(utterthis);
       }
   }
   }
   

}