// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html
import Particle from './particle';
import p5 from 'p5';


const s1 = function (sketch) {
    sketch.inc = 0.1;
    sketch.zinc = 0.00005;
    sketch.scl = 10;
    sketch.bg = 13;
    sketch.bga = 0.4;
    sketch.transparencyMult = 1;
    sketch.numPar = function() {
        const sketchArea = sketch.windowWidth * sketch.windowHeight;
        const refArea = 360000;
        const refParticles = 500;
        const newParticleCount = (refParticles*sketchArea) / refArea;
        return Math.min(newParticleCount, 1500);
    }();
    sketch.cols = 0;
    sketch.rows = 0;

    sketch.makeClipBox = function(lr = 100, tb = 50) {
        // const maxWidth = parseInt(getComputedStyle(document.body).getPropertyValue('--content-max-width'));
        // const lrSpacing = Math.max((sketch.windowWidth - maxWidth - 2*lr)/2, lr);

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
    // sketch.fr = '';
    // sketch.al = '';

    sketch.setup = function () {
        sketch.noiseSeed('Alan');
        sketch.frameRate(20);
        const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        if (document.getElementById(document.flowSketchId)) {
            canvas.parent(document.getElementById(document.flowSketchId));
        }
        sketch.cols = sketch.floor(sketch.width / sketch.scl);
        sketch.rows = sketch.floor(sketch.height / sketch.scl);
        // sketch.fr = sketch.createP('');
        // sketch.al = sketch.createP('');
        sketch.flowfield = new Array(sketch.cols * sketch.rows);

        for (var i = 0; i < sketch.numPar; i++) {
            sketch.particles[i] = new Particle(sketch);
        }
        sketch.background(sketch.bg);
    }

    sketch.draw = function () {
        let alFun = Math.max((100 * sketch.sin((sketch.zoff * 1.5) + 2)) - 95, sketch.bga)
        sketch.background(sketch.bg, alFun);
        var yoff = 0;
        for (var y = 0; y < sketch.rows; y++) {
            var xoff = 0;
            for (var x = 0; x < sketch.cols; x++) {
                var index = x + y * sketch.cols;
                var angle = sketch.noise(xoff, yoff, sketch.zoff) * sketch.TWO_PI * 4;
                var v = p5.Vector.fromAngle(angle);
                // console.log(v);
                v.setMag(1);
                sketch.flowfield[index] = v;
                xoff += sketch.inc;
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

        // sketch.fill(100);
        // sketch.rect(sketch.clipbox.x, sketch.clipbox.y, sketch.clipbox.w, sketch.clipbox.h);

        // sketch.fr.html(sketch.floor(sketch.frameRate()));
        // sketch.al.html(alFun);
    }

    sketch.windowResized = function() {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.clipbox = sketch.makeClipBox();
        sketch.background(sketch.bg);
    }
};

export default s1;