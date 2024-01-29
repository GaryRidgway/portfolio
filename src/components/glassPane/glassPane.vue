<script setup>
import shardCanvas from './shardCanvas.vue';
import p5 from 'p5';
</script>
<template>
    <div class="fullglass">
        <shard-canvas
            ref = "shard-canvas-1"
            :canvas_no = "1"
            canvas_id = "back_blast"
            :shard_cnt = 7
            :shard_size = 35
            :countdown = 1
            :plays_audio = true
            :use_custom_shards = true
        />
      <div class="pane-clip-brace">
        <div class="shadow-pane">
          <div class="positioning-pixel">
            <div class="faux-crack">
              <div class="faux-crack-bg-positioner">
                <div class="faux-crack-bg"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="glass-pane">
          <div class="positioning-pixel">
            <div class="clip-brace">
              <div class="nameplate-positioner">
                <div class="nameplate">
                  <div class="wave-fade-pane"></div>
                  <h1 id="portfolio-name" class="modern">
                    <div class="underlay"></div>
                    <span class="title-holder noselect">
                      <span>{{text}}</span>
                    </span>
                  </h1>
                </div>
              </div>
              <img class="crack-5 center" src="/src/assets/images/glasscrackINV2.png" />
            </div>
            <img class="crack-1" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-2" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-3" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-4" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-6" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-7" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-8" src="/src/assets/images/glasscrackINV2.png" />
            <img class="crack-9" src="/src/assets/images/glasscrackINV2.png" />
          </div>
        </div>
      </div>
      
      <shard-canvas
            ref = "shard-canvas-2"
            :canvas_no = "2"
            canvas_id = "front_blast"
            :shard_cnt = 7
            :shard_size = 3
            :countdown = 0
            :plays_audio = false
            :use_custom_shards = false
        />
      <div id="tamp">
        <div class="tamp--positioner">
            <div class="circle-indicator circle-indicator-0">
                <div class="inner-circle"></div>
            </div>
            <div class="circle-indicator circle-indicator-1">
                <div class="inner-circle"></div>
            </div>
            <div class="circle-indicator circle-indicator-2">
                <div class="inner-circle"></div>
            </div>
            <div class="circle-indicator circle-indicator-3">
                <div class="inner-circle"></div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'glassPane',
        props: {
            text: String
        },
        components: {
            shardCanvas,
        },
        data() {
            return {
            count: 0
            }
        },
        // https://stackoverflow.com/questions/56411378/how-to-add-vanilla-javascript-to-vue-js-project
        mounted() {
            let panes = document.querySelectorAll(".glass-pane, .shadow-pane");
            let glass_pane = panes[1];
            let clicks = 0;

            // Custom stylesheet creation
            let stylesheets = {};
            let style_element_index = 0;
            let canvas_dims = {
                x: 400,
                y: 1000
            };
            let canvas_offset = 100;

            let refs = this.$refs;
            let bounds = {
                x: 786,
                y: 136
            }

            // https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
            glass_pane.addEventListener("click", function (e) {

                // The next bit is a mixture of these.
                // https://www.codegrepper.com/code-examples/javascript/javascript+get+mouse+position+relative+to+element
                // https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
                // e = Mouse click event.
                let rect = glass_pane.getBoundingClientRect();
                let x = e.pageX - rect.left; //x position within the element.
                let y = e.pageY - rect.top; //y position within the element.

                let inBounds = 
                    0 < x && 
                    x < bounds.x &&
                    0 < y && 
                    y < bounds.y
                ;

                let canvasRelPos = {
                    x: 0,
                    y: 0
                }

                if (inBounds) {

                
                    // Increase clicks.
                    clicks++;

                    // https://pixabay.com/sound-effects/glass-bottle-shatter-13847/
                    // https://stackoverflow.com/questions/9419263/how-to-play-audio
                    let audioFile = "GlassCrack.mp3";
                    if (Math.floor(Math.random() * 100) === 0) {
                        audioFile = "Poof.mp3";
                    }
                    let audio = new Audio(
                        "src/assets/audio/" + audioFile
                    );
                    audio.volume = 0.4;
                    audio.play();
                    panes.forEach(function (pane) {
                        pane.classList.add("cracked");
                    });

                    // https://www.w3schools.com/js/js_htmldom_css.asp
                    let crack_rotation = Math.floor(Math.random() * 360);

                    // ++++++++++__rulestring__++++++++++ //
                    // I have removed the rotations because they are horrifically un-performant.

                    let positioning_pixel_rule = "";
                    let plate_crack_rule = "";
                    let plate_crack_bg_positioner_rule = "";

                    positioning_pixel_rule = ".positioning-pixel {";
                    positioning_pixel_rule += "left: " + x + "px !important;";
                    positioning_pixel_rule += "top: " + y + "px !important;";
                    // positioning_pixel_rule +=
                    //   "transform: rotate(" + crack_rotation + "deg) !important;";
                    positioning_pixel_rule += "}";

                    plate_crack_rule =
                        ".positioning-pixel .nameplate, .positioning-pixel .faux-crack-bg {";
                    plate_crack_rule += "left: -" + x + "px !important;";
                    plate_crack_rule += "top: -" + y + "px !important;";
                    plate_crack_rule += "}";

                    // plate_crack_bg_positioner_rule =
                    //     ".positioning-pixel .nameplate-positioner, .positioning-pixel .faux-crack-bg-positioner {";
                    // plate_crack_bg_positioner_rule +=
                    //   "transform: rotate(-" + crack_rotation + "deg) !important;";
                    // plate_crack_bg_positioner_rule += "}";

                    // Okay, so I know this looks stupid, but hear me out.
                    // Because the styles are being overridden so often, and there are so many, repaint flickering can occur.
                    // To solve this, I am creating custom stylesheets in the dom.
                    // When one already exists, we create a new one beneath it, cascading to give it control over the styles.
                    // After this, we wait for a repaint of the browser window to make sure no flickering occurs.
                    // Then, after that repaint, we remove the old stylesheet.
                    // Sadly, this still only works MOST of the time. Users probably wont notice it.
                    // If you are reading this, you are probably not `Users`.
                    // If you are not `Users`, then I hope your day is going well!
                    // Sorry, I know this is bonkers.
                    // Also, if you meet a `User`, tell them to have a good day as well! Pass on some joy :D .

                    // Get the other style element index.
                    let other_style_element_index = (style_element_index + 1) % 2;
                    let other_style_element = document.querySelector(
                        "style.click-styles-" + other_style_element_index
                    );

                    // Create a new stylesheet, and append it to the `head` element.
                    stylesheets["click_style_element_" + style_element_index] = document.createElement("style");
                    stylesheets["click_style_element_" + style_element_index].classList.add("click-styles-" + style_element_index);
                    document.head.appendChild(stylesheets["click_style_element_" + style_element_index]);

                    // Then, add the styles to the new dome element.
                    stylesheets["click_style_element_" + style_element_index].innerHTML = positioning_pixel_rule + plate_crack_rule + plate_crack_bg_positioner_rule;

                    // Then, wait for the next repaint...
                    // https://stackoverflow.com/questions/23253976/how-to-properly-wait-for-browser-reflow-repaint-to-finish
                    window.requestAnimationFrame(function () {
                        // And then remove all old artifacts, resetting for the next click.
                        if (other_style_element) {
                            other_style_element.remove();
                        }
                        if (stylesheets["click_style_element_" + other_style_element_index]) {
                            // https://www.w3schools.com/howto/howto_js_remove_property_object.asp
                            delete stylesheets["click_style_element_" + other_style_element_index];
                        }
                        style_element_index = other_style_element_index;
                    });

                    // ++++++++__end_rulestring__++++++++ //

                    // The canvas doesnt really have the same flickering problems that the rest of the styles do.
                    let glass_canvases = document.querySelectorAll(".glass-break-canvas canvas");
                    glass_canvases.forEach(function (glass_canvas, Cindex) {
                        glass_canvas.classList.add("cracked");

                        // We store these positions so that we can pass them later to the shard canvas.
                        let canvasPosX = e.pageX - canvas_dims.x / 2;
                        let canvasPosY = e.pageY - canvas_offset;
                        glass_canvas.style.left = canvasPosX + "px";
                        glass_canvas.style.top = canvasPosY + "px";
                        canvasRelPos.x = canvasPosX - glass_pane.getBoundingClientRect().x;
                        canvasRelPos.y = canvasPosY - glass_pane.getBoundingClientRect().y;

                        if (Object.keys(refs)[Cindex]) {
                            refs[Object.keys(refs)[Cindex]].makeShards(
                                clicks,
                                [x, y],
                                canvasRelPos,
                                glass_pane.getBoundingClientRect()
                            );
                        }
                    });

                    let circle = document.querySelector("#tamp .tamp--positioner");
                    circle.classList.remove("display");
                    circle.style.left = e.pageX + "px";
                    circle.style.top = e.pageY + "px";

                    // Pretty neat trick to trigger reflow and trick browser in to restarting animation.
                    // https://css-tricks.com/restart-css-animation/#update-another-javascript-method-to-restart-a-css-animation
                    void circle.offsetWidth;
                    circle.classList.add("display");

                    tampClassWait(clicks, circle);
                }
            });

            // This basically checks to see if there have been more clicks since this function was called, and if not, do cleanup.
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
            async function tampClassWait(clicksCount, circle) {
                // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
                setTimeout(function (click = clicksCount) {
                    if (click === clicks) {
                    circle.classList.remove("display");
                    }
                }, 8000);
            }
        }
    }
</script>

// https://webdevetc.com/programming-tricks/vue3/vue3-guides/vue-3-global-scss-sass-variables/
<style lang="scss">
    .fullglass {
        position: absolute;
        left: -88px;
        top: -119px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        pointer-events: none;

        div[id^="glassCanvas"] {
            position: fixed;
            pointer-events: none;
            width: 100vw;
            height: 100vh;
            left: 0;
            top: 0;

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

        .pane-clip-brace {
            width: 800px;
            height: 560px;
            display: flex;
            align-items: center;
            pointer-events: none;

            .positioning-pixel {
                position: absolute;
            }

            .shadow-pane {
                position: absolute;
                width: 786px;
                height: 136px;
                overflow: hidden;
                filter: drop-shadow(1px 2px 6px #000000) drop-shadow(1px 2px 6px #000000);

                .faux-crack {
                    position: absolute;
                    left: -373px;
                    top: -324px;
                    width: 800px;
                    height: 530px;

                    &-bg {
                        background-color: var(--glass-undertone);
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 786px;
                        height: 136px;

                        &-positioner {
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        left: 373px;
                        top: 324px;
                        }
                    }
                }
            }

            .shadow-pane,
            .glass-pane {
                &.cracked .positioning-pixel {
                    img {
                        opacity: 0.8;
                    }

                    .clip-brace,
                    .faux-crack {
                        clip-path: var(--crack-path);
                    }

                    .wave-fade-pane {
                        opacity: 0;
                    }
                }
            }
            .glass-pane {
                position: relative;
                width: 786px;
                height: 136px;
                cursor: pointer;
                pointer-events: all;
                // box-shadow: 5px 5px 12px 5px rgb(0 0 0 / 35%);
                // filter: drop-shadow(10px 3px 10px rgba(0, 0, 0, 0.6))
                //   drop-shadow(-10px -3px 10px rgba(0, 0, 0, 0.6));

                overflow: hidden;

                .wave-fade-pane {
                    position: absolute;
                    width: 786px;
                    height: 136px;
                    left: 0;
                    top: 0;
                    animation: wave-fade 5s infinite;
                    background-color: var(--soft-white);

                    &:before {
                        top: 0px;
                        left: 0px;
                        content: "";
                        position: absolute;
                        height: 100%;
                        width: 50%;
                        background: rgb(243, 243, 243);
                        background: linear-gradient(
                            90deg,
                            rgba(243, 243, 243, 0) 0%,
                            rgba(243, 243, 243, 1) 25%,
                            rgba(243, 243, 243, 1) 35%,
                            rgba(243, 243, 243, 0) 100%
                        );
                    }
                    
                    &:after {
                        top: 0px;
                        right: 0px;
                        content: "";
                        position: absolute;
                        height: 100%;
                        width: 50%;
                        background: rgb(243, 243, 243);
                        background: linear-gradient(
                            90deg,
                            rgba(243, 243, 243, 0) 0%,
                            rgba(243, 243, 243, 1) 65%,
                            rgba(243, 243, 243, 1) 75%,
                            rgba(243, 243, 243, 0) 100%
                        );
                    }
                }

                .positioning-pixel {
                    width: 1px;
                    height: 1px;
                    top: 0px;
                    left: 0px;
                    position: relative;

                    .clip-brace {
                        position: absolute;
                        left: -373px;
                        top: -324px;
                        width: 800px;
                        height: 530px;

                        .nameplate-positioner {
                            position: absolute;
                            width: 1px;
                            height: 1px;
                            left: 373px;
                            top: 324px;

                            .nameplate {
                                position: absolute;
                                left: 0px;
                                top: 0px;

                                #portfolio-name {
                                    margin: 0;
                                    position: relative;
                                    letter-spacing: 20px;
                                    -webkit-font-smoothing: antialiased;
                                    display: flex;
                                    width: 786px;
                                    height: 136px;
                                    justify-content: center;
                                    align-items: center;
                                    font-family: "Cinzel Decorative", sans-serif;
                                    font-weight: 100;
                                    font-size: clamp(3rem, calc(3.3684vw + 1.2632rem), 5rem);
                                    -webkit-backdrop-filter: blur(15px); /*Safari 9+ */
                                    backdrop-filter: blur(15px); /* Chrome and Opera */
                                    border-radius: 2px;
                                    background-color: var(--clear-glass);

                                    &.modern {
                                        background-color: var(--clear-glass-light);
                                        font-family: "Roboto", sans-serif;
                                        text-transform: uppercase;

                                        .title-holder {
                                            color: white;
                                            width: calc(100% - 2px);
                                            height: calc(100% - 2px);
                                            filter: drop-shadow(0px 0px 9px var(--soft-white));
                                            border-top: 2px solid rgba(225, 225, 225, 0.3);
                                            border-left: 1px solid rgba(225, 225, 225, 0.2);
                                            border-right: 1px solid rgba(225, 225, 225, 0.4);

                                            // inset shadow got from here: https://codepen.io/adambundy/pen/AvYvQG
                                            // padding: 2rem 9.2rem 1.5rem 10.3rem;
                                            // color: transparent;
                                            background-color: var(--sunken-grey);
                                            // filter: drop-shadow(0px 0px 9px var(--glass-edge-white));
                                            text-shadow: 2px 2px 3px var(--soft-white-T);
                                            -webkit-background-clip: text;
                                            -moz-background-clip: text;
                                            background-clip: text;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;

                                            .word-body {
                                                font-size: clamp(2.5rem, calc(3.3684vw + 0.7632rem), 4.5rem);
                                                margin-left: -7px;
                                            }

                                            span.first-letter:not(:first-child) {
                                                padding-left: 2rem;
                                            }

                                            &:before {
                                                position: absolute;
                                                content: "";
                                                width: 70%;
                                                height: 2px;
                                                background: white;
                                                text-align: center;
                                                left: 15%;
                                                bottom: 20px;
                                                filter: drop-shadow(0px 0px 9px white);
                                            }
                                        }

                                        .word-body {
                                        font-size: inherit;
                                        margin: 0;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    img {
                        position: absolute;
                        width: 800px;
                        height: auto;
                        pointer-events: none;
                        opacity: 0;

                        &.crack- {
                            &5 {
                                filter: drop-shadow(
                                var(--crack-shadow-horizontal-offset)
                                    var(--crack-shadow-vertical-offset) var(--crack-shadow-spread)
                                    black
                                );
                            }

                            &4,
                            &6 {
                                filter: drop-shadow(
                                calc(var(--crack-shadow-horizontal-offset) * -1)
                                    var(--crack-shadow-vertical-offset) var(--crack-shadow-spread)
                                    black
                                );
                            }

                            &2,
                            &8 {
                                filter: drop-shadow(
                                var(--crack-shadow-horizontal-offset)
                                    calc(var(--crack-shadow-vertical-offset) * -1)
                                    var(--crack-shadow-spread) black
                                );
                            }

                            &1,
                            &3,
                            &7,
                            &9 {
                                filter: drop-shadow(
                                calc(var(--crack-shadow-horizontal-offset) * -1)
                                    calc(var(--crack-shadow-vertical-offset) * -1)
                                    var(--crack-shadow-spread) black
                                );
                            }

                            &1 {
                                left: -1171px;
                                top: -852px;

                                transform: scale(-1, -1);
                            }

                            &2 {
                                left: -372px;
                                top: -852px;

                                transform: scale(1, -1);
                            }

                            &3 {
                                left: 426px;
                                top: -852px;

                                transform: scale(-1, -1);
                            }

                            &4 {
                                left: -1171px;
                                top: -324px;

                                transform: scale(-1, 1);
                            }

                            &5 {
                                // left: -373px;
                                // top: -324px;
                                left: 0;
                                top: 0;
                                position: absolute;
                            }

                            &6 {
                                left: 426px;
                                top: -324px;

                                transform: scale(-1, 1);
                            }

                            &7 {
                                left: -1171px;
                                // Should be mathematically 206, but adjusted for view.
                                top: 191px;

                                transform: scale(-1, -1);
                            }

                            &8 {
                                left: -373px;
                                // Should be mathematically 206, but adjusted for view.
                                top: 191px;

                                transform: scale(1, -1);
                            }

                            &9 {
                                left: 426px;
                                // Should be mathematically 206, but adjusted for view.
                                top: 191px;

                                transform: scale(-1, -1);
                            }
                        }
                    }
                }
            }
        }

        #tamp {
            position: fixed;
            pointer-events: none;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vw;

            .tamp--positioner {
                position: absolute;
                left: 0;
                top: 0;

                &.display {
                    .circle-indicator {
                        &-0 {
                            animation: tamp-wave 0.1s normal;
                        }
                        &-1 {
                            animation: tamp-wave 0.3s normal;
                        }
                        &-2 {
                            animation: tamp-wave 0.5s normal;
                        }
                        &-3 {
                            animation: tamp-wave 0.7s normal;
                        }
                    }
                }
            }

            

            .circle-indicator {
                position: absolute;
                transform: translate(calc(-50% - 5px), calc(-50% - 5px));
                height: 100px;
                width: 100px;
                border-radius: 50%;
                backdrop-filter: blur(50px);
                box-shadow: 0px 0px 20px #ffffff66;
                animation-iteration-count: 1;
                opacity: 0;

                .inner-circle {
                    width: 100%;
                    height: 100%;
                    // border: 3px solid black;
                    border-radius: 50%;
                    box-shadow: 0px 0px 20px #ffffff66;
                }
            }
        }
    }

    @keyframes wave-fade {
        0% {
            transform: scale(0.05, 1);
            filter: opacity(0);
        }
        33% {
            filter: opacity(0.4);
        }
        40% {
            background-color: transparent;
        }
        66% {
            transform: scale(1.3, 1);
            filter: opacity(0);
        }
        100% {
            transform: scale(1, 1);
            filter: opacity(0);
            background-color: transparent;
        }
    }

    @keyframes tamp-wave {
        0% {
            width: 20px;
            height: 20px;
            opacity: 0;
            // backdrop-filter: blur(15px);
        }
        40% {
            opacity: 0.2;
            // backdrop-filter: blur(15px);
        }
        70% {
            opacity: 0.04;
            // backdrop-filter: blur(15px);
            width: 80px;
            height: 80px;
        }
        90% {
            opacity: 0;
        }
        100% {
            width: 200px;
            height: 200px;
            // backdrop-filter: blur(30px);
            opacity: 0;
        }
    }

    :root {
    --matrix-grey: #272727;
    // --matrix-grey: #343434;
    --sunken-grey: #141414;
    --melancholy-red: #b7482f;
    --florea: #0f4785;
    --cvijet: #041e3b;
    --somber-umber: #5d0505;
    --soft-white: #f3f3f3;
    --soft-white-T: rgba(159, 159, 159, 0.31);
    --clear-glass: rgba(156, 209, 220, 0.2);
    --clear-glass-light: rgba(0, 215, 255, 0.1);
    --glass-undertone: rgba(111, 206, 255, 0.13);
    --glass-edge-white: rgba(255, 255, 255, 0.33);
  
    // Crack shadow variables.
    --crack-shadow-horizontal-offset: 4px;
    --crack-shadow-vertical-offset: 4px;
    --crack-shadow-spread: 2px;
  
    // font-family: 'Cinzel Decorative', cursive;
    // font-family: 'Roboto', sans-serif;
    --crack-path: polygon(
      -400% -400%,
      500% 0%,
      500% 500%,
      -400% 500%,
      45.4% 63.8%,
      46.2% 63%,
      46.4% 63.2%,
      46.6% 64.2%,
      47% 64.4%,
      46.8% 66.5%,
      47.35% 66.2%,
      47.48% 65.2%,
      48.2% 65.2%,
      48.4% 64.2%,
      49.9% 62.8%,
      50% 61.8%,
      50.2% 61.2%,
      50.25% 60.8%,
      49.4% 60.3%,
      48.85% 59.7%,
      48.5% 61%,
      47.7% 60.6%,
      46.9% 60.8%,
      45.9% 56.8%,
      45.2% 53.5%,
      44.7% 53.3%,
      43.4% 54.33%,
      43% 54.65%,
      42.6% 54.2%,
      41.7% 55%,
      43.45% 57.1%,
      43.45% 57.8%,
      42.9% 58.9%,
      43.2% 59.2%,
      43.76% 61.3%,
      43.9% 61.5%,
      43.95% 62.2%,
      44.3% 63.2%,
      44.5% 63.4%,
      45.4% 65%,
      -400% 500%
    );
  }
</style>