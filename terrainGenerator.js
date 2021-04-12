class GenerateTerrain {

    constructor() {

        this.dropDown = [];
        this.heights = [];
        this.lastDist = 0;

        for (var i = 0; i < width; i++) {
            var x = i / 100;
            var n = noise(x);
            var s = Math.sin(x);
            var y = (n + s / 10) * height / 2;

            this.dropDown[this.dropDown.length] = { y: y, x: x };

            x = (i + 10000) / 100;
            n = noise(x);
            s = Math.sin(x);
            y = (n + s / 10) * height / 2;

            this.heights[this.heights.length] = { y: y, x: x };
        }


        noStroke();
        fill("white");

        beginShape();

        this.dropDown.forEach(function (value) {
            vertex(value.x, value.y);
        });

        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);

        beginShape();

        vertex(width, 0);
        vertex(0, 0);

        for (var i = 0; i < this.heights.length; i++) {
            vertex(i, height - this.heights[i].y);
        }

        endShape(CLOSE);

    }

    update(dist) {

        let retVal1 = 0;
        let retVal2 = 100000;
        let retVal3 = 0;
        let retVal4 = 10000;

        this.dropDown.splice(0, dist - this.lastDist);
        this.heights.splice(0, dist - this.lastDist);

        for (var i = 0; i < dist - this.lastDist; i++) {
            var x = (i + dist) / 100;
            var n = noise(x);
            var s = Math.sin(x);
            var y = (n + s / 10) * height / 2 - 100;
            this.dropDown[this.dropDown.length] = { y: y, x: x };

            x = (i + dist + 10000) / 100;
            n = noise(x);
            s = Math.sin(x);
            y = (n + s / 10) * height / 2 - 100;
            this.heights[this.heights.length] = { y: y, x: x };
        }

        for (var i = round(round(width) / 10) - 15; i < round(round(width) / 10) + 15; i++) {
            retVal1 = max(this.heights[i].y,retVal1);
            retVal2 = min(this.heights[i].y,retVal2);
        }

        for (var i = width - 15; i < width; i++) {
            retVal3 = max(retVal3,this.heights[i].y);
            retVal4 = min(retVal4,this.heights[i].y);
        }

        this.lastDist = dist;

        return { a: retVal1, b: height - retVal2, c: retVal3, d: retVal4 };

    }

    display() {

        noStroke();
        fill("white");

        beginShape();
        vertex(width, 0);
        vertex(0, 0);
        this.dropDown.forEach(function (value, index) {
            vertex(index, value.y);
        });
        endShape(CLOSE);

        beginShape();

        vertex(width, height);
        vertex(0, height);

        for (var i = 0; i < this.heights.length; i++) {
            vertex(i, height - this.heights[i].y);
        }

        endShape(CLOSE);
    }

}