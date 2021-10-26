song_1="";
song_2="";
song_play="";
leftWristy=0;
leftWristx=0;
rightWristy=0;
rightWristx=0;
leftWristScore="";
rightWristScore="";

function preload()
{
    song_1= loadSound("Believer Mp3 Imagine dragons.mp3");
    song_2= loadSound("Taki Taki Mp3 Song by DJ Snake.mp3")   
}

function setup()
{
    canvas = createCanvas(500,600);
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function modelLoaded()
{
    console.log("poseNet is initialized")
}

function gotPoses(results)
{
    console.log(results)
    leftWristy = results[0].pose.leftWrist.y
        leftWristx = results[0].pose.leftWrist.x
        rightWristy = results[0].pose.rightWrist.y
        rightWristx = results[0].pose.rightWrist.x
        console.log("leftWristx= "+leftWristx+"leftWristy= "+leftWristy);
        console.log("rightWristx= "+rightWristx+"rightWristy= "+rightWristy);
        leftWristScore = results[0].pose.keypoints[9].score
        rightWristScore = results[0].pose.keypoints[10].score
}

function draw()
{
    image(video,0,0,500,600)
    if (rightWristScore>0.2)
    {
        if (song_play == "")
        {
            song_1.play()
            song_play="song_1"   
        }

        if (song_play == "song_2")
        {
            song_2.stop()
            song_1.play()
            song_play="song_1"
        }
    }
    
    if (leftWristScore>0.2)
    {
        if (song_play == "")
        {
            song_2.play()
            song_play="song_2"
        }

        if (song_play == "song_1")
        {
            song_1.stop()
            song_2.play()
            song_play="song_2"
        }
    }
}
