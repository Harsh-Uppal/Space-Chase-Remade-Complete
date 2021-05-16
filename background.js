class Background {

    static generate(res) {

        this.pixelsSetX = [];
        this.pixelsSet = [];
        this.Verts = [];
        this.offset = 0;

        this.runFromStart = true;
        this.resolution = res;

        this.createPerlinLayer(40, round(random(0, 1000000000)), 60, 0.009, 100, 10, 300);
        this.createPerlinLayer(40, round(random(0, 1000000000)), 90, 0.005, 100, 20, 400);
        this.createPerlinLayer(200, round(random(0, 1000000000)), 30, 0.001, 100, 20, 0);


        this.setStars();

        this.runFromStart = false;

        this.update();

    }

    static update(inc) {
        this.updateStars();

        this.offset += inc;

        this.createPerlinLayer(null, null, 30);
        this.createPerlinLayer(null, null, 60);
        this.createPerlinLayer(null, null, 90);

    }

    static createPerlinLayer(posY, offset, color, increment, smoothness, unSinEffect, elevation) {

        if (this.runFromStart) {
            let Verts = [];
            let off = offset;

            for (var i = -1; i < width / this.resolution + 1; i++) {

                var x = (this.resolution) * i;
                var y = noise(x / smoothness + off) * posY;
                var s = Math.sin(off);

                y += elevation;

                Verts[Verts.length] = { x: x, y: y + (map(s, -1, 1, 0, 1) / unSinEffect) };

                off += increment;

                if (this.pixelsSetX.find(element => element == x) == null ||
                    this.pixelsSet[this.pixelsSetX.find(element => element == x)] > y) {
                    this.pixelsSetX[this.pixelsSetX.length] = x;
                    this.pixelsSet[this.pixelsSet.length] = y;
                }

            }

            this.Verts[color] = Verts;
        }

        stroke(color);
        strokeWeight(3);

        fill(color);
        beginShape();
        for (var i = 0; i < this.Verts[color].length; i++) {
            vertex(this.Verts[color][i].x, this.Verts[color][i].y);
        }
        vertex(width + 5, height + 5);
        vertex(-5, height + 5);
        endShape(CLOSE);
    }

    static setStars() {

        this.stars = [];

        for (var y = 0; y < height / 2; y++) {
            for (var x = 0; x < width / this.resolution; x++) {
                if (round(random(0, 1000)) == 0) {
                    let xPos = this.pixelsSetX.find(element => element == x * this.resolution);

                    if (y < this.pixelsSet[xPos] - 10) {
                        this.stars[this.stars.length] = { pos: { x: x, y: y }, data: { goingTo: "n", isAt: round(random(150, 255)) } };
                    }
                }
            }
        }
    }

    static updateStars() {

        noStroke();

        for (var i = 0; i < this.stars.length; i++) {

            fill(this.stars[i].data.isAt);
            ellipse(this.stars[i].pos.x, this.stars[i].pos.y, 3, 3);

            if (this.stars[i].data.goingTo == "+") {
                if (this.stars[i].data.isAt > 254) {
                    this.stars[i].data.goingTo = "n";
                }
                else {
                    this.stars[i].data.isAt += 5;
                }
            }
            else if (this.stars[i].data.goingTo == "-") {
                if (this.stars[i].data.isAt < 70) {
                    this.stars[i].data.goingTo = "+";
                }
                else {
                    this.stars[i].data.isAt -= 5;
                }
            }
            else if (round(random(0, 200)) == 1) {
                this.stars[i].data.goingTo = "-";
            }

        }
    }

}