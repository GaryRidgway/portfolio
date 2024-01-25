// Code initiated and modified from:
// https://www.youtube.com/watch?v=BjoM9oKOAKY
// Inspired by Daniel Shiffman
    // http://codingtra.in
    // http://patreon.com/codingtrain
import p5 from 'p5';

export default class Particle {
    constructor(sketch) {
        this.alpha = 5/255;
        this.power = 255;
        this.color = 'rgba(255,199,66,';
        this.white = 'rgba(255,255,255,';
        this.sketch = sketch;
        this.pos = this.sketch.createVector(this.sketch.random(this.sketch.width), this.sketch.random(this.sketch.height));
        this.vel = this.sketch.createVector(0, 0);
        this.acc = this.sketch.createVector(0, 0);
        this.maxspeed = 4;
        this.prevPos = this.pos.copy();
        this.launchForce = 0;
        if(sketch.debug && sketch.particles.length === 0) {
            console.log(this.color);
        }
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(vectors) {
        var x = this.sketch.floor(this.pos.x / this.sketch.scl);
        var y = this.sketch.floor(this.pos.y / this.sketch.scl);
        var index = x + y * this.sketch.cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        this.sketch.push();
        this.sketch.strokeCap(this.sketch.SQUARE);
        this.sketch.strokeWeight(0.8);
        // this.sketch.stroke(this.sketch.color(this.white + (this.alpha*.8) + ')'));
        // this.sketch.stroke(this.power, 255);
        // this.sketch.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.sketch.stroke(this.sketch.color(this.color + this.alpha + ')'));
        // this.sketch.stroke(this.power, 255);
        this.sketch.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.sketch.pop();
        this.updatePrev();
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        // Canvas edges.
        if (this.pos.x > this.sketch.width) {
            this.pos.x = 0;
            this.pos.y = this.pos.y + this.randomIntFromInterval(-10, 10);
            this.applyForce(p5.Vector.fromAngle(10, 0).mult(this.launchForce));
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = this.sketch.width;
            this.pos.y = this.pos.y + this.randomIntFromInterval(-10, 10);
            this.applyForce(p5.Vector.fromAngle(-10, 0).mult(this.launchForce));
            this.updatePrev();
        }
        if (this.pos.y > this.sketch.height) {
            this.pos.y = 0;
            this.pos.x = this.pos.x + this.randomIntFromInterval(-10, 10);
            this.applyForce(p5.Vector.fromAngle(0, 10).mult(this.launchForce));
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = this.sketch.height;
            this.pos.x = this.pos.x + this.randomIntFromInterval(-10, 10);
            this.applyForce(p5.Vector.fromAngle(0, -10).mult(this.launchForce));
            this.updatePrev();
        }

        // Clipbox edges.
        let xin = 0;
        let yin = 0;
        if (
            !(this.pos.y < this.sketch.clipbox.y ||
                this.pos.y > this.sketch.clipbox.y + this.sketch.clipbox.h) &&
            (this.pos.x > this.sketch.clipbox.x &&
                this.pos.x < this.sketch.clipbox.x + this.sketch.clipbox.w)
        ) {
            xin = this.pos.x - this.prevPos.x;
        }

        if (
            !(this.pos.x < this.sketch.clipbox.x ||
                this.pos.x > this.sketch.clipbox.x + this.sketch.clipbox.w) &&
            (this.pos.y > this.sketch.clipbox.y &&
                this.pos.y < this.sketch.clipbox.y + this.sketch.clipbox.h)
        ) {
            yin = this.pos.y - this.prevPos.y;
        }

        if (xin !== 0 || yin !== 0) {
            if (Math.abs(xin) > Math.abs(yin)) {
                const dir = Math.sign(xin);

                if (dir == 1) {
                    this.pos.x = this.sketch.clipbox.x + this.sketch.clipbox.w;
                    this.pos.y = this.pos.y + this.randomIntFromInterval(-10, 10);
                    this.applyForce(p5.Vector.fromAngle(1, 0).mult(this.launchForce));
                }
                else {
                    this.pos.x = this.sketch.clipbox.x;
                    this.pos.y = this.pos.y + this.randomIntFromInterval(-10, 10);
                    this.applyForce(p5.Vector.fromAngle(-1, 0).mult(this.launchForce));
                }
            }
            else {
                const dir = Math.sign(yin);

                if (dir == 1) {
                    this.pos.y = this.sketch.clipbox.y + this.sketch.clipbox.h;
                    this.pos.x = this.pos.x + this.randomIntFromInterval(-10, 10);
                    this.applyForce(p5.Vector.fromAngle(0, 1).mult(this.launchForce));
                }
                else {
                    this.pos.y = this.sketch.clipbox.y;
                    this.pos.x = this.pos.x + this.randomIntFromInterval(-10, 10);
                    this.applyForce(p5.Vector.fromAngle(0, -1).mult(this.launchForce));
                }
            }

            this.updatePrev();
        }
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}