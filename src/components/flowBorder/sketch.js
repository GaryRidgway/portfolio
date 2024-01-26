// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html
import Particle from './particle';
import p5 from 'p5';


const s1 = function (sketch) {
    sketch.inc = 0.1;
    sketch.zinc = 0.00005;
    sketch.scl = 15;
    sketch.bg = 'rgba(24,72,120,';
    sketch.bg = 'rgba(24, 35, 52,';
    sketch.bga = 0;
    sketch.transparencyMult = 1;
    sketch.numPar = function() {
        const sketchArea = sketch.windowWidth * sketch.windowHeight;
        const refArea = 360000;
        const refParticles = 700;
        const newParticleCount = (refParticles*sketchArea) / refArea;
        return Math.min(newParticleCount, 1500);
    }();
    sketch.debug = false;
    sketch.cols = 0;
    sketch.rows = 0;

    sketch.makeClipBox = function(lr = 100, tb = 50) {
        // https://stackoverflow.com/questions/7610974/detect-distance-of-html-element-from-to-top-and-to-left
        const measurer = document.getElementById('measurer').getBoundingClientRect();
        const docEl = document.documentElement;
        return {
            x: measurer.left + (window.scrollX || docEl.scrollLeft || 0),
            y: measurer.top + (window.scrollY || docEl.scrollTop || 0),
            w: measurer.width,
            h: measurer.height
        }
    }

    sketch.clipbox = sketch.makeClipBox();

    sketch.makeClipBox();



    sketch.zoff = 0;
    sketch.particles = [];
    sketch.flowfield = [];
    if (sketch.debug) {
        sketch.fr = '';
        sketch.al = '';
    }

    sketch.setup = function () {
        sketch.noiseSeed('Alan');
        sketch.frameRate(20);
        const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        if (document.getElementById(document.flowSketchId)) {
            canvas.parent(document.getElementById(document.flowSketchId));
        }
        sketch.cols = sketch.floor(sketch.width / sketch.scl)+1;
        sketch.rows = sketch.floor(sketch.height / sketch.scl)+1;

        if (sketch.debug) {
            sketch.fr = sketch.createP('');
            sketch.al = sketch.createP('');
            // console.log(sketch.bg + '1)');
            console.log(sketch.width === sketch.windowWidth);
            console.log(sketch.height === sketch.windowHeight);
        }
        sketch.flowfield = new Array(sketch.cols * sketch.rows);

        for (var i = 0; i < sketch.numPar; i++) {
            sketch.particles[i] = new Particle(sketch);
        }
        sketch.background(sketch.color(sketch.bg + '1)'));
    }

    sketch.draw = function () {
        let alFun = Math.max((120 * sketch.sin((sketch.zoff * 1.5) + 2)) - 100, sketch.bga)/255;
        if (alFun > 0) {
            sketch.background(sketch.color(sketch.bg + alFun + ')'));
        }
        let trueColWidth = sketch.width/sketch.cols;
        let trueRowHeight = sketch.height/sketch.rows;
        var yoff = 0;
        for (var y = 0; y < sketch.rows; y++) {
            var xoff = 0;
            for (var x = 0; x < sketch.cols; x++) {
                var index = x + y * sketch.cols;
                var angle = sketch.noise(xoff, yoff, sketch.zoff) * sketch.TWO_PI * 4;
                var v = p5.Vector.fromAngle(angle);
                v.setMag(1);
                sketch.flowfield[index] = v;
                xoff += sketch.inc;
                if (sketch.debug && false) {
                    sketch.push();
                    sketch.stroke(255);
                    sketch.translate(x*trueColWidth, y*trueRowHeight);
                    sketch.line(0,0,v.x*10,v.y*10);
                    sketch.pop();
                }
            }
            yoff += sketch.inc;

            sketch.zoff += sketch.zinc;
        }

        for (var i = 0; i < sketch.particles.length; i++) {
            sketch.particles[i].follow(sketch.flowfield);
            sketch.particles[i].update();
            sketch.particles[i].edges();
            sketch.particles[i].show();
        }

        if (sketch.debug) {
            sketch.fr.html(sketch.floor(sketch.frameRate()));
            sketch.al.html(alFun);
        }
    }

    sketch.windowResized = function() {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.clipbox = sketch.makeClipBox();
        sketch.background(sketch.color(sketch.bg + '1)'));
    }
};

export default s1;