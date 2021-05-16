class Thread {

    constructor(frameRate) {
        this.fps = frameRate;
    }

    run() {

        setInterval(this.code, this.fps);

    }

    code() {

    }

}