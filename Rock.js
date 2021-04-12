class Rock {
    constructor(x, y) {
        this.rad = 0;
        this.Verts = [];
        this.pos = { x:x, y:y };

        let offset = random(0,9999999);

        let baseRadius = round(random(1, 5));

        for (let i = 0; i < 360; i += 0.1) {
            // let xOff = cos(i);
            // let yOff = sin(i);
            let xOff = cos(i) + 1;
            let yOff = sin(i) + 1;
            let r = noise(xOff + offset, yOff + offset) * 50 + baseRadius;
            let x = r * cos(i);
            let y = r * sin(i);
            this.rad = max(this.rad, dist(x, y, 0, 0) * 2);
            this.Verts.push({ x, y });
        }
    }

    show(){
        fill("grey");
        push();
        translate(this.pos.x,this.pos.y);
        beginShape();
        this.Verts.forEach((val) => {
            vertex(val.x,val.y);
        });
        endShape();
        pop();
    }

    isTouchingShip(shipPos){
        
    }
}