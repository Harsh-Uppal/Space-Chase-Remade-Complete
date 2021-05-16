class Button {
    constructor(x, y, w, h, text, displayRect, displayImg, style, onPress) {
        this.settings = { x: x, y: y, w: w, h: h, r: style.r, t: text, dI: displayImg, dR: displayRect };
        if (style.img != null) {
            this.settings.img = loadImage(style.img);
        }
        this.style = style;
        this.onPressed = onPress;
    }

    display() {
        stroke(this.style.stroke);
        fill(this.style.fill);
        strokeWeight(this.style.textWidth);
        fontSize(this.style.textSize);
        text(this.settings.t, this.settings.x + this.settings.w / 2, this.settings.y);
        strokeWeight(this.style.strW);
        if (this.settings.dR)
            rect(this.settings.x, this.settings.y, this.settings.w, this.settings.h, this.settings.r);
        if (this.settings.dI)
            image(this.settings.img, this.settings.x, this.setting.y, this.settings.w, this.settings.h);
    }

    update(mousePos) {
        let x = mousePos.x, y = mousePos.y;
        let mX = this.settings.x, mY = this.settings.y;
        if (x > mX && x < mX + this.settings.w && y > mY && y < mY + this.settings.h) {
            this.onPressed();
        }
    }

    static createStyle(strok, fil, txtWdth, txtSize, strWeght) {
        return { stroke: strok, fill: fil, textWidth: txtWdth, textSize: txtSize, strW: strWeght };
    }
}

class ButtonFunctions {
    static startGame() {
        setNewButtons('gameplay');
        state = 'gameplay';
    }
    static openSettings() {
        setNewButtons('settings');
        state = 'settings';
    }
    static openLoginPage() {
        state = "login";
        setNewButtons('login');
        createTextBox(width / 2, height / 3, width / 10, height / 14, "");
        createTextBox(width / 2, height / 2, width / 10, height / 14, "");
    }
    static gameplayStart() {
        if (!startMouseDragged) {
            game.start();
            startMouseDragged = true;
        }
    }
    static saveGame() {
        if (loginID > -1) {
            alert("Progress Saved");
            database.ref('Players').on('value', (val) => { allPlayers = val.val() })
            allPlayers[loginID] = [playerName, playerHighscore, orbs, allPlayers[loginID][3], settingsToString()];
            database.ref('Players').update(allPlayers);
        }
        else {
            alert("Login Please");
        }
    }
    static fullscreen() {
        alert("Feature needs debugging ... try again later.");
        return;
        document.getElementById("defaultCanvas0").requestFullscreen();
        createCanvas(window.outerWidth, window.outerHeight);
    }
    static backButton() {
        state = 'main';
        setNewButtons('main');
        textBoxes = [];
    }
    static resetSettings() {
        settings.msic = true;
        settings.snd = true;
        settings.inv = false;
        settings.sens = 100;
    }
    static loggedIn() {
        let ind = allPlayers.find((val) => val[0] == (textBoxes[0].t));

        if (ind[0]) {
            if (textBoxes[1].t == ind[3]) {
                playerHighscore = ind[1];
                orbs = ind[2];
                loginID = allPlayers.findIndex(val => val == ind);
                playername = ind[0];
                if (ind[4][0] == '1')
                    settings.msic = true;
                else
                    settings.msic = false;
                if (ind[4][1] == '1')
                    settings.snd = true;
                else
                    settings.snd = false; settings.inv = ind[4][0];
                if (ind[4][2] == '1')
                    settings.inv = true;
                else
                    settings.inv = false;
                settings.sens = parseInt(ind[4].slice(3));
                state = 'main'
                setNewButtons('main');
                alert('Logged In');
            }
            else
                alert('Wrong password or username');
        }
        else
            alert('Wrong password or username');
    }
    static signUp(){
        if (allPlayers.find(val => val[0] == textBoxes[0].t)) {
            alert("Player name already used");
        }
        else {
            database.ref('Players').on('value', (val) => { allPlayers = val.val() })
            this.resetSettings();
            orbs = 0;
            playerHighscore = 0; 
            allPlayers.push([textBoxes[0].t, playerHighscore, orbs, textBoxes[1].t, settingsToString()]);
            database.ref('Players').update(allPlayers);
            loginID = allPlayers.length - 1;
            alert("Signed Up");
            state = "main";
        }
    }
}
