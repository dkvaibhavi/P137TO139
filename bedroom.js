function setup() {
     canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

img = "";
modelStatus = "";
objects = [];

function preload() {
img = loadImage("https://i.postimg.cc/Dyc7whgn/shutterstock-1489932416-1.webp")
}

function draw() {
    image(img , 0 , 0 , 640 , 420);

    if(modelStatus != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#bd73fa");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke("#bd73fa")   
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);    
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!!!")
    modelStatus = true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

