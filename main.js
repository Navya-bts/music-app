song = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;




function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreleftWrist > 0.2){

    circle(leftWrist_x, leftWrist_y, 20);
    numberleftWrist_y = Number(leftWrist_y);
    removedecimals = floor(numberleftWrist_y);
    volume = removedecimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function preload(){
    song = loadSound("music.mp3")
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
       scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist =" + scoreleftWrist);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightwrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}
