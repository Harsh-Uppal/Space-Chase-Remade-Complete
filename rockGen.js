let slider;
let rock;
let pointtt;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    slider = createSlider(0, 3599);
    slider.position(20, 20);
    rock = new Rock(width / 2, height / 2);
    pointtt = {x:200,y:height/2};
}

function draw() {
    background(0)
    stroke(255);
    fill(255);
    ellipse(width / 2, height / 2, rock.rad, rock.rad);
    rock.show();
    stroke("lime");
    strokeWeight(10);
    push();
    translate(width / 2, height / 2);
    point(rock.Verts[slider.value()].x, rock.Verts[slider.value()].y);
    pop();
    stroke("red")
    point(pointtt.x,pointtt.y);
    if(dist(pointtt.x,pointtt.y,rock.pos.x,rock.pos.y) < 10 + rock.rad/2)
    {
        console.log("touching");
    }
}

class Rock {

    constructor(posX, posY) {

        this.rad = 0;
        this.Verts = [];
        this.pos = { x: posX, y: posY };

        push();
        let baseRadius = round(random(10, 50));
        for (let i = 0; i < 360; i += 0.1) {
            // let xOff = cos(i);
            // let yOff = sin(i);
            let xOff = cos(i) + 1;
            let yOff = sin(i) + 1;
            let r = noise(xOff, yOff) * 50 + baseRadius;
            let x = r * cos(i);
            let y = r * sin(i);
            this.rad = max(this.rad, dist(x, y, 0, 0) * 2);
            this.Verts.push({ x, y });
        }
        pop();
    }

    show() {

        fill("grey");
        push();
        translate(this.pos.x, this.pos.y);
        beginShape();
        this.Verts.forEach((val) => {
            vertex(val.x, val.y);
        })
        endShape();
        pop();
    }

}

function keyPressed() {
    switch (keyCode) {
        case 37:pointtt.x-=5;
            break;
        case 38:pointtt.y-=5;
            break;
        case 39:pointtt.x+=5;
            break;
        case 40:pointtt.y+=5;
            break;
    }
}