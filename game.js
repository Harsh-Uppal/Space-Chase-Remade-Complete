class Game {

    start() {

        this.neardeathscore = 0;

        this.rockscore = 0;

        this.gameEnded = false;

        this.maxLastPoses = 25;

        this.orbscore = 0;

        this.rocks = [];

        this.sheilds = [];

        this.spaceship = {
            x: width / 10, y: window.innerHeight / 2 - 35, hasSheild: 0,
            goingTo: height / 2 - 35, agility: 9, speed: 0, lastPositions: [], distance: 0
        };

        this.mousePositions = { start: null };

        this.terrain = new GenerateTerrain();

        this.orbs = [];

        this.realStivity = 10 - settings.sens / 10;

        if (this.realStivity < 1)
            this.realStivity = 1;
    }

    play() {

        let abc;
        if (!this.gameEnded)
            abc = this.terrain.update(this.spaceship.distance);

        this.terrain.display();

        if (!this.gameEnded) {
            this.updateShip(abc);
            fill("white");
            this.updateOrbs();
            this.updateRocks();
            this.updateSheilds();
            this.randomTick(abc);
        }
        else {
            this.onlydisplay();
            this.enddisplay();
        }

        // stroke("black")
        // line(width/10 - 15,abc.a,width/10 + 15,abc.a);
        // line(width/10 - 15,abc.b,width/10 + 15,abc.b);
        // line(width/10 - 15,this.spaceship.y + 30,width/10 + 15,this.spaceship.y + 30)

    }

    onMouseReleased() {
        this.mousePositions.start = null;
    }

    randomTick(abc) {
        if (round(random(0, 40)) == 0) {
            let centerr = random(abc.c, height - abc.d);
            this.orbs.push({ x: width, y: centerr });
            this.orbs.push({ x: width, y: centerr - 20 });
            this.orbs.push({ x: width, y: centerr + 20 });
            this.orbs.push({ x: width - 20, y: centerr - 10 });
            this.orbs.push({ x: width + 20, y: centerr - 10 });
            this.orbs.push({ x: width - 20, y: centerr + 10 });
            this.orbs.push({ x: width + 20, y: centerr + 10 });
        }

        if (round(random(0, 20)) == 0) {
            this.rocks.push(new Rock(width + 150, round(random(abc.c + 50, height - abc.d - 50))));
        }

        if (round(random(0, 100)) == 0) {
            this.sheilds.push({ x: width + 20, y: random(abc.a + 40, abc.b - 40) });
        }
    }

    end() {
        this.gameEnded = true;
        this.highScoreMore = false;
        orbs += this.orbscore;
    }

    updateRocks() {
        for (var i = 0; i < this.rocks.length; i++) {

            let val = this.rocks[i];
            val.show();
            val.pos.x -= 15;

            if (val.pos.x < 0) {
                this.rocks.splice(0, 1);
                i--;
            }

            if (dist(this.spaceship.x, this.spaceship.y, val.pos.x, val.pos.y) < val.rad + 15) {
                if (this.spaceship.hasSheild < 0)
                    this.end();
                else {
                    this.rockscore++;
                    this.rocks.splice(i, 1);
                    i--;
                }
            }
        }
    }

    updateOrbs() {
        for (var i = 0; i < this.orbs.length; i++) {
            ellipse(this.orbs[i].x, this.orbs[i].y, 10, 10);
            this.orbs[i].x -= 15;
            if (this.orbs[i].x < 0) {
                this.orbs.splice(i, 1);
                i--;
            }
            else {
                if (dist(this.orbs[i].x, this.orbs[i].y, this.spaceship.x, this.spaceship.y) < 16) {
                    this.orbs.splice(i, 1);
                    this.orbscore++;
                    i--;
                }
            }
        }
    }

    updateSheilds() {
        
        for(var i = 0;i < this.sheilds.length;i++){
            let val = this.sheilds[i];
            imageMode(CENTER);
            image(sheildImg, val.x, val.y, 35,35);
            this.sheilds[i].x-= 15;
            if(val.x < -10)
            {
                this.sheilds.splice(i,1);
                i--;
            }

            if(dist(val.x,val.y,this.spaceship.x,this.spaceship.y) < 60)
            {
                this.spaceship.hasSheild += 500;
                this.sheilds.splice(i,1);
                i--;
            }
        }

        this.spaceship.hasSheild--;
    }

    updateShip(abc) {
        if (isMousePressed) {
            if (!this.mousePositions.start)
                this.mousePositions.start = mouseY;

            if (!settings.inv)
                this.spaceship.goingTo += (mouseY - this.mousePositions.start) / this.realStivity;
            else
                this.spaceship.goingTo -= (mouseY - this.mousePositions.start) / this.realStivity;
        }

        fill("white");
        noStroke();

        for (var i = 0; i < this.spaceship.lastPositions.length; i++) {
            var scale = (70 + this.spaceship.lastPositions[i].x - width / 10);
            this.spaceship.lastPositions[i].x -= 3;
            ellipse(this.spaceship.lastPositions[i].x, this.spaceship.lastPositions[i].y, scale / 10, scale / 10);
        }

        push();
        translate(this.spaceship.x, this.spaceship.y);
        rotate(max(-45, min(45, this.spaceship.goingTo - this.spaceship.y)));
        image(shipImg, 0, 0, 30, 30);
        pop();

        if(this.spaceship.hasSheild > 0)
            image(sheildBackImg,this.spaceship.x - 10,this.spaceship.y - 5,40,40);

        if (this.spaceship.goingTo < this.spaceship.y)
            this.spaceship.y -= this.spaceship.agility;
        else if (this.spaceship.goingTo > this.spaceship.y)
            this.spaceship.y += this.spaceship.agility;

        if (Math.abs(this.spaceship.goingTo - this.spaceship.y) < this.spaceship.agility)
            this.spaceship.y = this.spaceship.goingTo;

        this.mousePositions.start = mouseY;

        this.spaceship.lastPositions[this.spaceship.lastPositions.length] =
            { x: this.spaceship.x, y: this.spaceship.y + 15 };

        if (this.spaceship.lastPositions.length >= this.maxLastPoses)
            this.spaceship.lastPositions.splice(0, this.spaceship.lastPositions.length - this.maxLastPoses);

        this.spaceship.distance += 15;

        if (this.spaceship.y <= abc.a || this.spaceship.y + 30 >= abc.b)
            this.end();
    }

    onlydisplay() {

        fill("white");
        this.orbs.forEach(function (vl) {
            ellipse(vl.x, vl.y, 10, 10);
        });
        this.rocks.forEach(function (vl) {
            vl.show();
        });
    }

    enddisplay() {
        fill("red")
        textSize(40);
        textStyle("bold")
        textAlign(CENTER);
        text("Game Over", width / 2, height / 5);
        textSize(15);
        if (playerHighscore < this.spaceship.distance || this.highScoreMore) {
            this.highScoreMore = true;
            text("New Best", width / 2, height / 5 + 20);
            playerHighscore = this.spaceship.distance;
        }
        textSize(35);
        text(this.spaceship.distance, width / 2, height / 3);
        textSize(18);
        textStyle(NORMAL);
        text("Auras : " + this.orbscore, width / 2, height / 3 + 40);
        text("Missiles : " + 0, width / 2, height / 3 + 60);
        text("Rocks : " + this.rockscore, width / 2, height / 3 + 80);
        text("Near deaths : " + this.neardeathscore, width / 2, height / 3 + 100);
        fill("white");
        stroke('grey');
        rect(width/2 - 150,height * (3/4),100,50);
        fill("grey")
        textStyle("normal");
        strokeWeight(1);
        text("Back",width/2 - 100,height * (3/4) + 30)
    }

    buttonPressed(){
        if(this.gameEnded){
            state = 'main';
            gameEnded();
            startMouseDragged = false;
        }
    }

}