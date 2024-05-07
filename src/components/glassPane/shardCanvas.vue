<template>
    <div :id="'glassCanvas-' + idPrefix + canvas_no" class="glass-break-canvas"></div>
</template>

<script>
    import p5 from 'p5';

    export default {
        name: 'shardCanvas',
        props: {
            canvas_no: Number,
            canvas_id: String,
            idPrefix: {
                type: String,
                default: ''
            },
            shard_cnt: Number,
            shard_size: Number,
            countdown: Number,
            plays_audio: Boolean,
            use_custom_shards: Boolean
        },
        data() {
            return {
                canvasedSketch : "",
            }
        },
        mounted() {
            let shardCounter = 0;
            let chaffMultiplier = 3.5;

            let style_rules = getComputedStyle(document.body);
            let $props = this.$props;
            let $data = this.$data;
            let glass_color = style_rules.getPropertyValue("--clear-glass-light");
            // let crack_offset = {
            //     x: -8,
            //     y: -9
            // };
            let crack_offset = {
                x: 0,
                y: 0
            };
            let canvas_dims = {
                x: 400,
                y: 1000
            };
            let canvas_offset = 100;
            let canvasShards = [];

            // Example for creating multiple p5 canvases.
            // https://editor.p5js.org/caminofarol/sketches/r609C2cs

            p5.disableFriendlyErrors = true;

            // Set up the canvas.
            this.canvasedSketch = new p5(function(sketch) {
                let canvas_data_id = $props.canvas_id;
                let canvas_data_parent = 'glassCanvas-' + $props.idPrefix + $props.canvas_no;
                let canvas_data_shard_cnt = $props.shard_cnt;
                let canvas_data_shard_size = $props.shard_size;
                let fill_c = sketch.color(glass_color);
                let plays_audio = $props.plays_audio;
                let canvasElement;
                let distFromTop = 0;
                // Programatically get this some day.
                let lowerBound = canvas_dims.y;

                // We use both these variables to make sure the audio plays
                let groundAudioTriggers = 0;
                let groundAudioHasPlayed = false;
                let paneHeight = 325;
                
                sketch.clicks = 0;
                sketch.chaffSize = 3;
                sketch.triggerMakeShards = false;
                sketch.mousePos = [];
                sketch.mouseYPos = 0;
                sketch.clipAxisOffset = 189;
                sketch.canvas_offset = canvas_offset;
                sketch.countdown = $props.countdown;
                sketch.paneRect = null;
                sketch.canvasRelPos = {
                    x: 0,
                    y: 0
                };
                sketch.bounds = {
                    x: 786,
                    y: 136
                };

                sketch.setup = function () {
                    let glassCanvas = sketch.createCanvas(canvas_dims.x, canvas_dims.y);
                    glassCanvas.id(canvas_data_id);
                    glassCanvas.parent(canvas_data_parent);
                    canvasElement = document.querySelector("#" + canvas_data_parent + " .canvas");
                };

                sketch.draw = function () {
                    if (sketch.triggerMakeShards) {
                        sketch.makeShards()
                        sketch.triggerMakeShards = false;
                    }

                    if(groundAudioTriggers > 0 && groundAudioHasPlayed != true && plays_audio) {
                        // Make sure the user has clicked the dom and is intending to interact with the element that makes this sound.
                        if (sketch.clicks > 0) {
                            let groundHit = new Audio(
                                "src/assets/audio/GlassGroundHit.mp3"
                            );
                            groundHit.volume = 0.1;
                            // groundHit.play();
                        }

                        groundAudioHasPlayed = true;
                    }

                    sketch.clear();
                    sketch.fill(fill_c);
                    sketch.strokeWeight(1);
                    sketch.stroke(sketch.color("rgba(255,255,255,0.2)"));

                    // DEBUG: show cursor click position.
                    // sketch.circle(canvas_dims.x/2, canvas_offset, 20)
                    if (canvasShards.length > 0) {

                        // We invert the array to stop jittering.
                        canvasShards.reverse().forEach(function (element, SHindex) {
                            if (element.deletable) {
                                canvasShards.splice(SHindex, 1);

                                // On the first deletion, trigger the ground hit audio to play.
                                groundAudioTriggers++;
                            }
                        });

                        canvasShards.forEach(function (element, SHindex) {
                            element.update(lowerBound);
                            element.display(sketch);
                        });
                    }
                    else {

                        // When we dont need to draw, we should end the loop.
                        // https://p5js.org/reference/#/p5/loop
                        sketch.noLoop();
                    }
                };

                sketch.makeShards = function () {
                    // Reset the ground audio play var so we can hear the ground audio again.
                    groundAudioTriggers = 0;
                    groundAudioHasPlayed = false;

                    // Preliminary lower bound for the canvas.
                    canvasElement = document.querySelector("#" + canvas_data_parent + " canvas");
                    distFromTop = window.scrollY + canvasElement.getBoundingClientRect().top;
                    lowerBound = window.innerHeight - distFromTop + $props.shard_size;

                    // if the lower bound is greater than the canvas has height...
                    if (lowerBound > canvas_dims.y) {
                        lowerBound = canvas_dims.y + $props.shard_size;
                    }

                    let determinativeCustomShards   = $props.use_custom_shards ? myCustomVertices : null;
                    let determinativeClipAxisOffset = $props.use_custom_shards ? sketch.clipAxisOffset + sketch.mouseYPos : null;
                    let determinativePaneHeight     = $props.use_custom_shards ? paneHeight : null;

                    canvasShards = shardsCreate(
                        canvas_data_shard_cnt,
                        canvas_data_shard_size,
                        lowerBound,
                        determinativeCustomShards,
                        determinativeClipAxisOffset,
                        determinativePaneHeight,
                        sketch.countdown
                    );
                };
            });

            function shardsCreate(shard_cnt, shard_size, lowerBound, customShards = null, shardsClipAxisOffset = null,  paneHeight = null, countdown = 50) {
                let shards = [];
                let chaff = $data.canvasedSketch.chaffSize >= shard_size;
                if (customShards !== null) {
                    for (let i = 0; i < customShards.length; i++) {
                        let adjShard = [];
                        let posX = customShards[i][0][0];
                        let posY = customShards[i][0][1];
                        customShards[i].forEach(function(vertices, verticesIndex) {
                            adjShard[verticesIndex] = [];
                            adjShard[verticesIndex][0] = customShards[i][verticesIndex][0] - customShards[i][0][0];
                            adjShard[verticesIndex][1] = customShards[i][verticesIndex][1] - customShards[i][0][1];
                        });
                        
                        shards.push(
                            new Shard(
                                posX,
                                posY,
                                100,
                                lowerBound,
                                adjShard,
                                false,
                                countdown
                            )
                        );
                    }
                }
                else {
                    if(!chaff) {
                        for (let i = 0; i < shard_cnt; i++) {
                            let ranposX = Math.floor(Math.random() * 50) - 25;
                            let ranposY = Math.floor(Math.random() * 50) - 50;
                            shards.push(
                                new Shard(
                                    canvas_dims.x / 2 + ranposX - 10,
                                    canvas_offset + ranposY,
                                    shard_size,
                                    lowerBound,
                                    null,
                                    false,
                                    countdown
                                )
                            );
                        }
                    }
                    for (let i = 0; i < shard_cnt * chaffMultiplier; i++) {
                        let ranposX = Math.floor(Math.random() * 50) - 25;
                        let ranposY = Math.floor(Math.random() * 50) - 50;
                        let chaffX = canvas_dims.x / 2 + ranposX - 10;
                        let chaffY = canvas_offset + ranposY;
                        let trueChaffPos = adjustPoint([0, 0], {x:chaffX, y:chaffY});
                        let inBounds = isInBounds({x: 786, y: 136}, trueChaffPos);

                        // Only generate chaff if it is in bounds.
                        if(inBounds) {
                            shards.push(
                                new Shard(
                                    chaffX,
                                    chaffY,
                                    null,
                                    lowerBound,
                                    null,
                                    false,
                                    countdown
                                )
                            );
                        }
                    }
                }

                return shards;
            }

            // https://www.w3schools.com/js/js_object_constructors.asp
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
            function Shard(iPosX, iPosY, size, lowerBound, customVertices = null, panePoly = false, countdown=50) {
                
                // Variables.
                let chaffSize = 3;
                let variance = 20;
                // Max preset horizontal velocity.
                let MPH_velocity = 4;
                // Max preset horizontal velocity.
                let MPV_velocity = 0.6;
                let g_acceleration = 0.5;
                let maxVelocity = 13;
                let varianceMult = 5;
                this.pos = {
                    x: iPosX,
                    y: iPosY
                };
                this.countDown = countdown;

                // This chooses a weighted selection for the shards of glass and increses their countdown based on it.
                if (this.countDown > 0) {
                    let weights = [
                        1,
                        2, 2, 2, 2, 
                    ];
                    let weightedSelection = Math.floor(Math.random() * weights.length)
                    this.countDown += Math.floor(Math.random() * varianceMult * weights[weightedSelection]);
                }

                this.id = shardCounter;
                shardCounter++;
                this.vertices = [];
                this.edges = [];

                this.hasCustomVertices = customVertices !== null ? true : false;

                this.chaff = true;
                if (size !== null && size > chaffSize) {
                    this.chaff = false;
                }
                else if (size === null) {
                    this.chaff = false;
                }

                this.lowerBound = lowerBound

                // Maximum rotation speed.
                // this.MR_speed = 3;
                // Rotation per frame.
                // this.rpf =
                //     Math.floor(Math.random() * (this.MR_speed * 2 + 1)) - this.MR_speed;
                // Current rotation.
                // this.rotation = 0;
                this.deletable = false;

                if (this.hasCustomVertices) {
                    this.vertices = [];

                    // Truncate the polygon if it is too big for its position.
                    // This vvvv needs to be refactored, we need to be passing a reference to the sketch.
                    // The position here is from the left of an initial image measured as 800px/530px.
                    let measuredWidth = 800;
                    let measuredHeight = 530;
                    let sketchWidth = 400

                    // This takes the position measured off the original 800w position
                    // and then changes it to be measured off the current sketch width.
                    let widthDiff = (measuredWidth - sketchWidth) / 2;

                    // Then, use the position of the point measured off the canas width
                    // And adjust it using our diff and custom offset.
                    let offsetX = this.pos.x - widthDiff + myCustomOffset[0];
                    let offsetY = this.pos.y + myCustomOffset[1];

                    // The new position is the vertex's point to be drawn in the canvas.
                    // NOTE: This is NOT relative to the pane of glass.
                    this.pos = {
                        x: offsetX,
                        y: offsetY
                    };
                    this.vertices[0] = customVertices;
                    this.vertices[1] = myCustomOffset;
                }
                else if (panePoly) {
                    this.vertices[0] = [
                        [0, 0],
                        [$data.canvasedSketch.bounds.x, 0],
                        [$data.canvasedSketch.bounds.x, $data.canvasedSketch.bounds.y],
                        [0, $data.canvasedSketch.bounds.y],
                    ]; 
                    this.vertices[1] = [$data.canvasedSketch.paneRect.x, $data.canvasedSketch.paneRect.y];
                    this.id = -1;
                }
                else {
                    this.shard_variance = Math.floor(Math.random() * variance) - variance / 2;

                    // https://www.w3schools.com/js/js_random.asp
                    this.vertices_cnt = Math.floor(Math.random() * 3) + 3;
                    if (this.chaff === true) {
                        this.vertices = sortPoints(
                            randomPoints(this.vertices_cnt, chaffSize, chaffSize),
                            chaffSize,
                            chaffSize
                        );
                    } else {
                        this.vertices = sortPoints(
                            randomPoints(
                                this.vertices_cnt,
                                size + this.shard_variance,
                                size + this.shard_variance
                            ),
                            size,
                            size
                        );
                    }
                }
                
                this.horizontalVelocity = Math.random() * MPH_velocity - MPH_velocity / 2;
                this.verticalVelocity = Math.random() * MPV_velocity - MPV_velocity / 2;

                this.truePosVerts = function() {
                    let relativeVertices = this.vertices;
                    let trueVertices = [];
                    let localPos = this.pos;

                    if(this.hasCustomVertices) {
                        relativeVertices[0].forEach(function(vertex) {
                            let RtoPaneVertexPos = adjustPoint(vertex, localPos);
                            trueVertices.push([RtoPaneVertexPos.x, RtoPaneVertexPos.y]);
                        });

                        return trueVertices;
                    }

                    else if (this.chaff) {
                        relativeVertices[0].forEach(function(vertex) {
                            let RtoPaneVertexPos = adjustPoint(vertex, localPos);
                            trueVertices.push([RtoPaneVertexPos.x, RtoPaneVertexPos.y]);
                        });

                        return trueVertices;
                    }

                    else if (panePoly) {
                        return relativeVertices[0];
                    }

                    return null;
                }

                this.localPosVerts = function(vertices) {
                    let trueVertices = vertices;
                    let relativeVertices = [];
                    let localPos = this.pos;

                    if(this.hasCustomVertices) {
                        trueVertices.forEach(function(vertex) {
                            let RtoPosVertexPos = {
                                x: vertex[0] - ($data.canvasedSketch.canvasRelPos.x + localPos.x),
                                y: vertex[1] - ($data.canvasedSketch.canvasRelPos.y + localPos.y),
                            }
                            relativeVertices.push([RtoPosVertexPos.x, RtoPosVertexPos.y]);
                        });

                        return relativeVertices;
                    }
                    else if (panePoly) {
                        return trueVertices;
                    }

                    return null;

                }

                this.makeEdges = function() {
                    this.newEdges = []
                    this.correctedVerts;
                    if (panePoly) {

                    }

                    for (let n = 0; n < this.truePosVerts().length; n++) {
                        let coord = {x: this.truePosVerts()[n][0], y:this.truePosVerts()[n][1]}
                        let nextCoord = {
                            x: this.truePosVerts()[(n + 1) % this.truePosVerts().length][0],
                            y: this.truePosVerts()[(n + 1) % this.truePosVerts().length][1]
                        }

                        this.edges.push(new makeLine(coord, nextCoord))
                    }
                }

                this.collisionCheck = function(otherPoly) {
                    let collisionArea = []

                    if(this.id == otherPoly.id){
                        return collisionArea
                    }

                    let intersection = false
                    for (let n = 0; n < this.edges.length; n++) {
                        let currLine = this.edges[n]

                        for (let k = 0; k < otherPoly.edges.length; k++) {
                            let otherLine = otherPoly.edges[k];
                            let check = currLine.intersects(otherLine);
                            if (check) {
                                collisionArea.push(check);
                                intersection = true;
                            }
                        }
                    }
                    return collisionArea
                }

                this.checkIfPointWithin = function(p){
                    // ray-casting algorithm based on
                    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

                    let x = p[0];
                    let y = p[1];

                    var inside = false;
                    let vs = this.truePosVerts();
                    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                
                        var xi = vs[i][0], yi = vs[i][1];
                        var xj = vs[j][0], yj = vs[j][1];

                        var intersect = ((yi > y) != (yj > y))
                            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                        if (intersect) inside = !inside;
                    }

                    return inside;
                }


                this.getIntersectionArea = function(otherPoly) {
                    let intersectionPoints = this.collisionCheck(otherPoly);

                    if (intersectionPoints.length == 0) {
                        return false
                    }

                    // Find points of other rectangle contained within this rectangle
                    let otherPointsWithinThis = otherPoly.truePosVerts().filter(v => this.checkIfPointWithin(v));
                    otherPointsWithinThis.forEach(function(point, index) {
                        otherPointsWithinThis[index] = {
                            x: point[0],
                            y: point[1]
                        };
                    })

                    // Find points of this rectangle contained within the other rectangle
                    let thisPointsWithinOther = this.truePosVerts().filter(v => otherPoly.checkIfPointWithin(v));
                    thisPointsWithinOther.forEach(function(point, index) {
                        thisPointsWithinOther[index] = {
                            x: point[0],
                            y: point[1]
                        };
                    })

                    let allPoints = [
                        ...intersectionPoints,
                        ...otherPointsWithinThis,
                        ...thisPointsWithinOther
                    ]

                    let N = allPoints.length
                    let centerX = allPoints.reduce( (p, c) => p + c.x, 0)/N
                    let centerY = allPoints.reduce( (p, c) => p + c.y, 0)/N

                    let pointsAndAngs = allPoints.map( p => ({p: p, ang: Math.atan2(centerY - p.y, centerX - p.x)}))

                    pointsAndAngs.sort((a, b) => a.ang - b.ang)

                    return pointsAndAngs
                }

                // Functions.
                this.update = function () {
                    if (this.countDown > 0) {
                        this.countDown--;
                    }
                    else {
                        this.verticalVelocity += g_acceleration;
                        if (this.verticalVelocity >= maxVelocity) {
                            this.verticalVelocity = maxVelocity;
                        }
                        // this.rotation += this.rpf;

                        this.pos = {
                            x: this.pos.x + this.horizontalVelocity,
                            y: this.pos.y + this.verticalVelocity
                        };

                        if (this.pos.y + this.vertices[1][1] > this.lowerBound) {
                            this.deletable = true;
                        }
                    }
                };

                this.display = function (sketch) {

                    sketch.push();

                    // sketch.angleMode(sketch.DEGREES);

                    // DEBUG::SHOWS ROTATION CENTER.
                    // circle(0, 0, 10);
                    // sketch.rotate(this.rotation);
                    if (!this.hasCustomVertices) {
                        sketch.translate(
                            this.vertices[1][0] + this.pos.x + crack_offset.x,
                            this.vertices[1][1] + this.pos.y + crack_offset.y
                        );
                        sketch.translate(-this.vertices[1][0], -this.vertices[1][1]);
                    }
                    else {
                        sketch.translate(
                            this.pos.x,
                            this.pos.y
                        );
                    }

                    sketch.beginShape();
                    for (let i = 0; i < this.vertices[0].length; i++) {
                        sketch.vertex(this.vertices[0][i][0], this.vertices[0][i][1]);
                    }
                    sketch.endShape(sketch.CLOSE);
                    sketch.pop();
                };
                
                if (this.hasCustomVertices || panePoly) {
                    this.makeEdges();
                }
                if (this.hasCustomVertices) {
                    this.vertices[0] = bindPolygon([786, 136], this);
                }
            }

            // `bounds` is an array of two items, width and height of the bounding box (Ex. [300, 100]).
            // `mousePos` is an array of two items, the x and y of the mouse's position in the bounding box (Ex. [200, 50]).
            //
            // The fingerprints of the below sources are all over this project, but this is the most relevant spot to list them.
            // https://math.libretexts.org/Courses/Monroe_Community_College/MTH_220_Discrete_Math/4%3A_Sets/4.3%3A_Unions_and_Intersections
            // https://gorillasun.de/blog/an-algorithm-for-polygon-intersections
            function bindPolygon(bounds, InitialPolygon) {
                let newPolygon = [];
                let mousePos = $data.canvasedSketch.mousePos;
                let boundsO = {
                    x: bounds[0],
                    y: bounds[1]
                }
                let mouseO = {
                    x: mousePos[0],
                    y: mousePos[1]
                }
                let pane = null;

                // Check if the mouse is within the bounds.
                let inBounds = isInBounds(boundsO, mouseO);

                // If it is...
                if (inBounds) {
                    let currP = InitialPolygon;

                    // This next portion checks if the entire poly is OOB.
                    let somePolyInBounds = false;
                    InitialPolygon.truePosVerts().forEach(function(vertex) {
                        let vertexO = {
                            x: vertex[0],
                            y: vertex[1]
                        };
                        somePolyInBounds = somePolyInBounds || isInBounds(boundsO, vertexO);
                    });

                    // If it is, simply return an empty array.
                    if (!somePolyInBounds) {
                        return [];
                    }

                    pane = new Shard(null, null, null, null, null, true);
                    let otherP = pane;
                    for (let n = 0; n < 1; n++) {

                        if(currP.id != otherP.id){
                            let check = currP.getIntersectionArea(otherP);

                            if(check){
                                check.forEach(v => newPolygon.push([v.p.x, v.p.y]));

                                return InitialPolygon.localPosVerts(newPolygon);
                            }
                            
                            return InitialPolygon.vertices[0];
                        }
                    }
                }

                // Else...
                else {

                    // No need to truncate polygons, we aren't in the bounding box!
                    return InitialPolygon.vertices[0];
                }
            }

            // Return true if point in bounds.
            // bounds is an object with an x and a y.
            // point is an object with an x and a y.
            function isInBounds(bounds, point) {

                // If in bounds return true.
                if(
                    0 < point.x && 
                    point.x < bounds.x &&
                    0 < point.y && 
                    point.y < bounds.y
                ) {
                    return true;
                }

                // If not in bounds return false
                return false;
            }

            // BIG $props.
            // https://observablehq.com/@tarte0/generate-random-simple-polygon
            function randomPoints(n, width, height) {
            const points = [];
            for (let i = 0; i < n; i++) {
                points.push([Math.random() * width, Math.random() * height]);
            }
            return points;
            }

            function sortPoints(points, width, height) {
                const centerPoint = [width / 2, height / 2];
                const sorted = points.slice(0);
                let angleFromCenter;

                const sortByAngle = (p1, p2) => {
                    return (
                    (Math.atan2(p1[1] - centerPoint[1], p1[0] - centerPoint[0]) * 180) /
                        Math.PI -
                    (Math.atan2(p2[1] - centerPoint[1], p2[0] - centerPoint[0]) * 180) /
                        Math.PI
                    );
                };

                sorted.sort(sortByAngle);
                return [sorted, centerPoint];
            }

            // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
            // Determine the intersection point of two line segments
            // Return FALSE if the lines don't intersect
            function intersect(line1, line2) {
                let x1 = line1.p1.x
                let y1 = line1.p1.y

                let x2 = line1.p2.x
                let y2 = line1.p2.y

                let x3 = line2.p1.x
                let y3 = line2.p1.y

                let x4 = line2.p2.x
                let y4 = line2.p2.y

                // Check if none of the lines are of length 0
                if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
                    return false
                }

                let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

                // Lines are parallel
                if (denominator === 0) {
                    return false
                }

                let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
                let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

                // is the intersection along the segments
                if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
                    return false
                }

                // Return an object with the x and y coordinates of the intersection
                let x = x1 + ua * (x2 - x1)
                let y = y1 + ua * (y2 - y1)

                return {
                    x,
                    y
                }
            }

            function makeLine(p1, p2) {
                this.p1 = p1
                this.p2 = p2

                this.intersects = function(otherLine) {
                    return intersect(this, otherLine)
                }
            }

            function adjustPoint(vertex, localPosition) {
                return {
                        x: $data.canvasedSketch.canvasRelPos.x + localPosition.x + vertex[0],
                        y: $data.canvasedSketch.canvasRelPos.y + localPosition.y + vertex[1],
                    }
            }
        },
        methods: {
            makeShards(clicks, mousePos, canvasRelPos, paneRect) {
                this.canvasedSketch.mousePos = mousePos;
                this.canvasedSketch.mouseYPos = mousePos[1];
                this.canvasedSketch.canvasRelPos = canvasRelPos;
                this.canvasedSketch.triggerMakeShards = true;
                this.canvasedSketch.paneRect = paneRect;
                this.canvasedSketch.clicks = clicks;
                this.canvasedSketch.loop();
            }
        }
    }

    let myCustomOffset = [27, -225];
    let myCustomVertices = [
        [ 
            [363.2, 338.14], 
            [369.6, 333.9], 
            [373.6, 328.6], 
        ], 
        [ 
            [369.6, 333.9], 
            [371.2, 334.96], 
            [373.6, 328.6], 
        ], 
        [ 
            [371.2, 334.96], 
            [372.8, 340.26], 
            [373.6, 328.6], 
        ], 
        [ 
            [372.8, 340.26], 
            [376, 341.32], 
            [373.6, 328.6], 
        ], 
        [ 
            [376, 341.32], 
            [374.4, 352.45000000000005], 
            [373.6, 328.6], 
        ], 
        [ 
            [374.4, 352.45000000000005], 
            [378.8, 350.86], 
            [373.6, 328.6], 
        ], 
        [ 
            [378.8, 350.86], 
            [379.84, 345.56], 
            [373.6, 328.6], 
        ], 
        [ 
            [379.84, 345.56], 
            [385.6, 345.56], 
            [373.6, 328.6], 
        ], 
        [ 
            [385.6, 345.56], 
            [387.2, 340.26], 
            [373.6, 328.6], 
        ], 
        [ 
            [387.2, 340.26], 
            [399.2, 332.84], 
            [373.6, 328.6], 
        ], 
        [ 
            [399.2, 332.84], 
            [400, 327.54], 
            [373.6, 328.6], 
        ], 
        [ 
            [400, 327.54], 
            [401.6, 324.36], 
            [373.6, 328.6], 
        ], 
        [ 
            [401.6, 324.36], 
            [401.99999999999994, 322.24], 
            [373.6, 328.6], 
        ], 
        [ 
            [401.99999999999994, 322.24], 
            [395.2, 319.59], 
            [373.6, 328.6], 
        ], 
        [ 
            [395.2, 319.59], 
            [390.8, 316.40999999999997], 
            [373.6, 328.6], 
        ], 
        [ 
            [390.8, 316.40999999999997], 
            [388, 323.3], 
            [373.6, 328.6], 
        ], 
        [ 
            [388, 323.3], 
            [381.6, 321.18], 
            [373.6, 328.6], 
        ], 
        [ 
            [381.6, 321.18], 
            [375.2, 322.24], 
            [373.6, 328.6], 
        ], 
        [ 
            [375.2, 322.24], 
            [367.2, 301.03999999999996], 
            [373.6, 328.6], 
        ], 
        [ 
            [367.2, 301.03999999999996], 
            [361.6, 283.55], 
            [373.6, 328.6], 
        ], 
        [ 
            [361.6, 283.55], 
            [357.6, 282.48999999999995], 
            [373.6, 328.6], 
        ], 
        [ 
            [357.6, 282.48999999999995], 
            [347.2, 287.949], 
            [373.6, 328.6], 
        ], 
        [ 
            [347.2, 287.949], 
            [344, 289.645], 
            [373.6, 328.6], 
        ], 
        [ 
            [344, 289.645], 
            [340.8, 287.26000000000005], 
            [373.6, 328.6], 
        ], 
        [ 
            [340.8, 287.26000000000005], 
            [333.6, 291.5], 
            [373.6, 328.6], 
        ], 
        [ 
            [333.6, 291.5], 
            [347.6, 302.63000000000005], 
            [373.6, 328.6], 
        ], 
        [ 
            [347.6, 302.63000000000005], 
            [347.6, 306.34], 
            [373.6, 328.6], 
        ], 
        [ 
            [347.6, 306.34], 
            [343.2, 312.16999999999996], 
            [373.6, 328.6], 
        ], 
        [ 
            [343.2, 312.16999999999996], 
            [345.6, 313.76000000000005], 
            [373.6, 328.6], 
        ], 
        [ 
            [345.6, 313.76000000000005], 
            [350.08, 324.89], 
            [373.6, 328.6], 
        ], 
        [ 
            [350.08, 324.89], 
            [351.2, 325.95], 
            [373.6, 328.6], 
        ], 
        [ 
            [351.2, 325.95], 
            [351.6, 329.66], 
            [373.6, 328.6], 
        ], 
        [ 
            [351.6, 329.66], 
            [354.4, 334.96], 
            [373.6, 328.6], 
        ], 
        [ 
            [354.4, 334.96], 
            [356, 336.02], 
            [373.6, 328.6], 
        ], 
        [ 
            [356, 336.02], 
            [363.2, 344.5], 
            [373.6, 328.6], 
        ], 
        [ 
            [363.2, 344.5], 
            [363.2, 338.14], 
            [373.6, 328.6], 
        ], 
    ] 
</script>

<style lang="scss">
    div[id^="glassCanvas"] {
        position: fixed;
        pointer-events: none;
        width: 100vw;
        height: 100vh;
        // This feels wrong...
        // left: -120px;
        left: 0;
        // top: -407px;
        top: 0;
        // transform: translate(calc(-1 * var(--gPosX)), calc(-1 * var(--gPosY)));
        // animation: glassPush 0.3s ease-in-out forwards;

        canvas {
            position: absolute;
            pointer-events: none;
            filter: drop-shadow(10px 3px 10px rgba(0, 0, 0, 0.6))
                drop-shadow(-10px -3px 10px rgba(0, 0, 0, 0.6));
            opacity: 0;
            filter: drop-shadow(10px 3px 10px rgba(0, 0, 0, 0.6))
                drop-shadow(-10px -3px 10px rgba(0, 0, 0, 0.6));

            &.cracked {
                opacity: 1;
            }
        }
    }

    // @keyframes glassPush {
    //     0% { transform: translateZ(0px); }
    //     100% { transform: translateZ(200px);}
    // }
</style>