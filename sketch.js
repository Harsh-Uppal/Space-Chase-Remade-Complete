// JavaScript source code
let settingsImg, spaceshipMenuImg, sheildBackImg, saveImg, sheildImg, fullscreenImg, ship2Img,
    shopImg, graphImg, shareImg, starsImg, shipImg, upArrowImg, mouseImg, loginImg;
let game, state = "main";
let isMousePressed = false, startMouseDragged = false;
let settings = { msic: true, snd: true, inv: false, sens: 100 };
let database, textBoxes = [], buttons = [];
let playerHighscore = 0, allPlayers, orbs = 0, loginID = -1, playername = '';
let selectedBox = null, progressSaved = false;
let sensLHel = false;
let lastShownMousePos = window.innerHeight / 2, goingTowardsUp = true;

function preload() { loadImages(); }

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    Background.generate(1);
    game = new Game();
    database = firebase.database();
    frameRate(80);
    document.scrollingElement.scroll(50, 8);
    document.body.classList.add("stop_scroll");
    database.ref("Players").on("value", function (data) {
        allPlayers = data.val();
    });
    setNewButtons('main');
}

function setNewButtons(stateChangeTo) {
    buttons = [];

    switch (stateChangeTo) {
        case 'main':
            buttons.push(new Button(width / 6, height / 8, width / 8 * 5, height / 8 * 5, '', false, false, {}, ButtonFunctions.startGame));
            buttons.push(new Button(width / 3, height * 3 / 4, 50, 50, '', false, true, Button.createStForOnlyImg('settings.png'), ButtonFunctions.openSettings));
            buttons.push(new Button(5 * width / 12, height * 3 / 4, 50, 50, '', false, true, Button.createStForOnlyImg('login.png'), ButtonFunctions.openLoginPage));
            buttons.push(new Button(width / 2, height * 3 / 4, 50, 50, '', false, true, Button.createStForOnlyImg('saveIcon.png'), ButtonFunctions.saveGame));
            buttons.push(new Button(10, height - 60, 50, 50, '', false, true, Button.createStForOnlyImg('fullscreen.png'), ButtonFunctions.fullscreen));
            buttons.push(new Button(width * 3 / 5, height * 3 / 4, 50, 50, '', false, true,
                Button.createStForOnlyImg('Exit.png'), ButtonFunctions.exit))
            break;
        case 'gameplay':
            buttons.push(new Button(0, 0, width, height, '', false, false, {}, ButtonFunctions.gameplayStart));
            buttons.push(new Button(width / 2 - 150, height * (3 / 4), 100, 50, '', false, false, {}, () => { game.buttonPressed(); }));
            break;
        case 'settings':
            buttons.push(new Button(width / 2 + 87.5, height / (20 / 7) - 12.5, 25, 25, '', false, false, {}, () => { settings.msic = !settings.msic; }));
            buttons.push(new Button(width / 2 + 87.5, height / (20 / 9) - 12.5, 25, 25, '', false, false, {}, () => { settings.snd = !settings.snd; }));
            buttons.push(new Button(width / 2 + 87.5, round(height / 1.81) - 12.5, 25, 25, '', false, false, {}, () => { settings.inv = !settings.inv }));
            buttons.push(new Button(width / 15 - 40, height * 5 / 6 - 20, 120, 40, '', false, false, {}, ButtonFunctions.backButton));
            buttons.push(new Button(width / 2 - 30, height * 4 / 5 - 15, 60, 15, '', false, false, {}, ButtonFunctions.resetSettings));
            break;
        case 'login':
            buttons.push(new Button(width / 7 - 40, height * 5.1 / 6 - 40, 40 + width / 14, height / 10, '', false, false, {}, ButtonFunctions.backButton));
            buttons.push(new Button(width / 2 - 150, height * 4 / 5 - 40, 100, 40, '', false, false, {}, ButtonFunctions.loggedIn));
            buttons.push(new Button(width / 2 + 150, height * 4 / 5 - 40, 100, 40, '', false, false, {}, ButtonFunctions.signUp));
            break;

    }
}

function draw() {
    background(50)

    if (state == "main") {
        Background.update();
        fill("white")

        noStroke();
        textAlign(CENTER);
        textFont("MS Mincho");
        textSize(60);
        text("Space Chase", window.innerWidth / 2, window.innerHeight / 3);
        strokeWeight(.1);
        stroke(255);
        line(width / 2 - 150, height / 3 + 20, width / 2 + 150, height / 3 + 20);
        textSize(35);
        noStroke();
        text("Click To Start", width / 2, height / 2);
        image(starsImg, width - 70, 30, 40, 40);
        textSize(25);
        fill('red');
        textStyle(BOLD);
        text('Auras : ' + orbs, width - 250, 60);
        text("Highscore : " + playerHighscore, width - 250, 90);
    }
    else if (state == "settings") {
        Background.update();
        fill("white");
        textFont("Showcard Gothic");
        textAlign(CENTER);
        textSize(40);
        text("Settings", width / 2, height / 4);
        textSize(20)
        text("Music", width / 2 - 100, height / 4 + height / 10);
        textSize(20)
        text("Sound", width / 2 - 100, height / 4 + height / 5);
        textSize(20)
        text("Invert", width / 2 - 100, height / 4 + height / 5 + height / 10);
        textSize(20)
        text("Sensitivity", width / 2 - 100, height / 4 + height / 2.5);
        noFill();
        stroke("white");
        rectMode(CENTER);
        rect(width / 2 + 100, height / 4 + height / 10, 25, 25);
        rect(width / 2 + 100, height / 4 + height / 5, 25, 25);
        rect(width / 2 + 100, height / 4 + height / 10 + height / 5, 25, 25);

        noStroke();
        fill("white");
        if (settings.msic)
            rect(width / 2 + 100, height / 4 + height / 10, 15, 15);
        if (settings.snd)
            rect(width / 2 + 100, height / 4 + height / 5, 15, 15);
        if (settings.inv)
            rect(width / 2 + 100, height / 4 + height / 10 + height / 5, 15, 15);

        stroke("white");
        strokeWeight(10);
        line(width / 2 + 50, height / 4 + height / 2.5 - 7, width / 2 + 150, height / 4 + height / 2.5 - 7);
        strokeWeight(1);
        stroke("black");
        fill("white")
        ellipse(width / 2 + 50 + settings.sens, height / 4 + height / 2.5 - 7, 15, 15);
        strokeWeight(5);
        line(width / 30, height * (25 / 30), width / 20, height * (24 / 30));
        line(width / 30, height * (25 / 30), width / 20, height * (26 / 30));
        text("Back", width / 13, height * (25.5 / 30));
        text("Reset", width / 2, height * 4 / 5);
    }
    else if (state == "login") {
        Background.update();
        stroke('lime');
        strokeWeight(10);
        fill(220);
        rect(width / 10, height / 10, width / 10 * 8, height / 10 * 8);
        textSize(20)
        stroke("black");
        fill("white")
        strokeWeight(5);
        line(width / 9, height * (25 / 30), width / 7.5, height * (24 / 30));
        line(width / 9, height * (25 / 30), width / 7.5, height * (26 / 30));
        text("Back", width / 7, height * (25.5 / 30));
        textSize(30);
        textFont("Algerian");
        text("Login", width / 2 - 25, height / 5);
        textSize(25);
        textFont("Segoe Script");
        text("ID :", width / 2 - 100, height / 3);
        text("Password :", width / 2 - 200, height / 3 * 1.5);
        rect(width / 2 - 150, height - height / 5 - 40, 100, 40);
        text("Login", width / 2 - 130, height - height / 5 - 10);
        rect(width / 2 + 150, height - height / 5 - 40, 100, 40);
        textSize(22)
        text("Sign Up", width / 2 + 155, height - height / 5 - 10);
        displayTextBoxes();

    }
    else if (state == "gameplay") {
        if (startMouseDragged) {
            game.play();
        }
        else {
            showNotPressingImages();
        }
    }

    buttons.forEach(function (val) { val.display(); });

    drawSprites();
}

function loadImages() {
    starsImg = loadImage("stars.png");
    shipImg = loadImage("Spaceship.png");
    upArrowImg = loadImage("Up Arrow.png");
    mouseImg = loadImage("mouse.png");
    sheildImg = loadImage("sheild.png");
    sheildBackImg = loadImage("sheildback.png");
    ship2Img = loadImage("ship2.png");
}

function createTextBox(x, y, w, h, t) {
    textBoxes.push({ x, y, w, h, t });
}

function settingsToString() {
    let a = (b) => {
        if (b)
            return '1';
        else
            return '0';
    };
    let ret = "";

    ret += a(settings.msic);
    ret += a(settings.snd);
    ret += a(settings.inv);
    ret += settings.sens;
    return ret;
}

function mouseClicked() {
    buttons.forEach(function (val) { val.update({ x: mouseX, y: mouseY }) });

    if (state == "login") {

        stroke("grey");

        for (var i = 0; i < textBoxes.length; i++) {
            let val = textBoxes[i];
            rect(val.x - 5, val.y - 30, val.w, val.h);
            if (mouseX > val.x - 5 && mouseX < val.x - 5 + val.w) {
                if (mouseY > val.y - 30 && mouseY < val.y - 30 + val.h) {
                    selectedBox = i;
                }
            }
        }
    }

}

function displayTextBoxes() {
    fill("white");
    textSize(15);
    textBoxes.forEach(function (val) {
        stroke("grey");
        rect(val.x - 5, val.y - 30, val.w, val.h);
        stroke("black");
        text(val.t, val.x, val.y);
    });
}

function gameEnded() {
    game = new Game();
    setNewButtons('main');
    progressSaved = false;
}

function mouseDragged() {

    isMousePressed = true;

    if (state == "gameplay" && !startMouseDragged) {
        game.start();
        startMouseDragged = true;
    }

    if (state == "settings") {

        if (sensLHel) {
            if (mouseX < width / 2 + 50) {
                settings.sens = 1;
            }
            else if (mouseX > width / 2 + 150) {
                settings.sens = 100;
            }
            else {
                settings.sens = mouseX - width / 2 - 50;
            }
        }
        else if (mouseX > width / 2 + 42.5 + settings.sens && mouseX < width / 2 + 57.5 + settings.sens) {
            if (mouseY > height / 4 + height / 2.5 - 14.5 && mouseY < height / 4 + height / 2.5 + 0.5) {
                sensLHel = true;
            }
        }
    }
}

function mouseReleased() {
    sensLHel = false;
    isMousePressed = false;
    if (state == "gameplay" && startMouseDragged)
        game.onMouseReleased();
}

function showNotPressingImages() {

    angleMode(DEGREES);
    image(upArrowImg, window.innerWidth / 9 - 20, window.innerHeight / 2 - 100, 40, 40);
    push();
    translate(window.innerWidth / 9 + 20, window.innerHeight / 2 + 100);
    rotate(180);
    image(upArrowImg, 0, 0, 40, 40);
    pop();

    if (goingTowardsUp) {
        if (lastShownMousePos < window.innerHeight / 2 - 20 - window.innerHeight / 20) {
            goingTowardsUp = false;
        }
        lastShownMousePos -= 2;
    }
    else {
        if (lastShownMousePos > window.innerHeight / 2 - 20 + window.innerHeight / 20) {
            goingTowardsUp = true;
        }
        lastShownMousePos += 2;
    }

    image(mouseImg, width / 10, lastShownMousePos, 25, 40);
    push();
    translate(width / 4, lastShownMousePos);
    rotate(90);
    image(ship2Img, 0, 0, 40, 80);
    pop();
}

function keyPressed() {

    if (state == "login" && selectedBox != null) {
        if (keyCode == 8 && textBoxes[selectedBox].t.length > -1) {
            let t = textBoxes[selectedBox].t;
            textBoxes[selectedBox].t = t.slice(0, textBoxes[selectedBox].t.length - 1);
        }
        else if (keyCode > 64 && keyCode < 91 && textBoxes[selectedBox].t.length < 10) {
            textBoxes[selectedBox].t += char(keyCode);

        }
    }

    if (keyCode == 27) {
        document.exitFullscreen();
    }
}