// JavaScript source code
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//All Variables
let gameState = "play",game;
let shipImg,upArrowImg,circleImg,mouseImg;
let isMousePressed = false,startMouseDragged = false;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 4);

    game = new Game();

    loadImages();
}

function draw() {
    background(100);

    //display objects
    if(gameState == "play")
    {
        if(startMouseDragged)
        {
            game.play();
        }
        else
        {
            showNotPressingImages();
        }
    }

    drawSprites();
}

function loadImages(){

    shipImg = loadImage("Images/Spaceship.png");
    upArrowImg = loadImage("Images/Up Arrow.png");
    circleImg = loadImage("Images/Circle.png");
    mouseImg = loadImage("Images/mouse.png");

}

function mouseClicked() {
    if(!startMouseDragged)
    {
        startMouseDragged = true;
        game.start();
    }
}

function mouseDragged()
{
    isMousePressed = true;
    if(!startMouseDragged)
    {
        startMouseDragged = true;
        game.start();
    }
}

function mouseReleased(){isMousePressed = false;game.onMouseReleased();}

function fullScreen() {

    if (isInFullscreenMode) {
        document.exitFullscreen();
        createCanvas(window.innerWidth, window.innerHeight - 120);
        isInFullscreenMode = false;
        return;
    }
    else
    {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }

        createCanvas(window.outerWidth, window.outerHeight + 36.0155)
    }
}

let lastShownMousePos = window.innerHeight / 2;
let goingTowards = "up";

function showNotPressingImages(){

    angleMode(DEGREES);

    image(upArrowImg,window.innerWidth/9 - 20,window.innerHeight/2 - 100,40,40);

    push();
    translate(window.innerWidth/9 + 20,window.innerHeight/2 + 100);
    rotate(180);
    image(upArrowImg,0,0,40,40);
    pop();

    if(goingTowards == "up")
    {
        if(lastShownMousePos < window.innerHeight/2 - 20 - window.innerHeight /20)
        {
            goingTowards = "down";
        }

        image(mouseImg,window.innerWidth / 10,lastShownMousePos - 2,25,40);
        lastShownMousePos -= 2;
    }
    else if(goingTowards == "down")
    {
        if(lastShownMousePos > window.innerHeight/2 - 20 + window.innerHeight /20)
        {
            goingTowards = "up";
        }

        image(mouseImg,window.innerWidth / 10,lastShownMousePos + 2,25,40);
        lastShownMousePos += 2;
    }

}