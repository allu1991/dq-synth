window.addEventListener("load", function() {
    setTimeout ( function() {


        //GSDevTools.create();
        gsap.registerPlugin(DrawSVGPlugin);


        // THE TIMELINE
        const tl = gsap.timeline({ 
            onComplete: () => animationCompleted(),
        });



        // Define GSAP animatable assets
        const logoTriangle = document.querySelector("#logo-triangle")
        const logoDrama = document.querySelector("#logo-drama")
        const drama_paths = logoDrama.getSVGDocument().querySelectorAll('path')
        const logoQueen = document.querySelector("#logo-queen")
        const queenGloss = document.querySelector("#queen-gloss")
        const queenBlings = document.querySelector("#queen-blings")
        const logoComms = document.querySelector("#logo-comms").getSVGDocument();
        const comms_masks = logoComms.querySelectorAll('#masks mask path');
        const spaceCanvas = document.querySelector("#space-canvas")
        const gridCanvas = document.querySelector("#grid-canvas")
        


        const triangleReveal = () => {
            const tlTriangle = gsap.timeline();

            tlTriangle.add(gsap.to(logoTriangle, {autoAlpha: 1}))
            tlTriangle.add(gsap.from(logoTriangle, {
                scale: 0, rotationY: 720, rotationX: 220, ease: "power2.inOut", duration: 4.0
            }), "-=0.0");
            tlTriangle.add(gsap.to(logoTriangle, {
                filter: "drop-shadow(0px 0px 0px #ffffff) brightness(0%)", duration: 0.4
            }), "-=3.7");
            tlTriangle.add(gsap.to(logoTriangle, {
                filter: "drop-shadow(0px 0px 36px #ffffff) brightness(150%)", duration: 0.5
            }), "-=3.0");
            tlTriangle.add(gsap.to(logoTriangle, {
                filter: "drop-shadow(0px 0px 14px #a8008b) brightness(100%)", duration: 0.5
            }), "-=2.5");

            return tlTriangle
        }



        // Drama light flickering effect
        const dramaReveal = () => {

            const dramaLightsOn = "drop-shadow(0px 0px 2px rgba(255, 255, 255, 1.0)) drop-shadow(0px 0px 2px rgba(197, 91, 215, 1.0)) drop-shadow(0px 0px 3px rgba(180, 48, 215, 1.0)) drop-shadow(0px 0px 6px rgba(180, 48, 215, 1.0)) drop-shadow(-4px 4px 4px rgba(0, 0, 0, 1.0))"
            const dramaLightsOff = "drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.0)) drop-shadow(0px 0px 2px rgba(197, 91, 215, 0.0)) drop-shadow(0px 0px 3px rgba(180, 48, 215, 0.0)) drop-shadow(0px 0px 6px rgba(180, 48, 215, 0.0)) drop-shadow(-4px 4px 4px rgba(0, 0, 0, 1.0))"
  
            const tlDrama = gsap.timeline();

            tlDrama.add(gsap.to(drama_paths, {autoAlpha: 1, duration: 0.55}))

            tlDrama.add(gsap.fromTo(drama_paths, 
                {stroke: "#242a26"}, 
                {stroke: "#aaaaaa", duration: 0.2
            }), "-=0.5")
            tlDrama.add(gsap.fromTo(logoDrama, 
                {"filter": dramaLightsOff, duration: 0.2},
                {"filter": dramaLightsOn, duration: 0.2
            }), "-=0.5")

            tlDrama.add(gsap.to(drama_paths, {stroke: "#242a26", duration: 0.2}), "-=0.3")
            tlDrama.add(gsap.to(logoDrama, {"filter": dramaLightsOff, duration: 0.2}), "-=0.3")

            tlDrama.add(gsap.to(drama_paths, {stroke: "#ffffff", duration: 0.6}), "-=0.2")
            tlDrama.add(gsap.to(logoDrama, {"filter": dramaLightsOn, duration: 0.6}), "-=0.6")

            return tlDrama
        }

        

        const queenReveal = () => {
            const tlQueen = gsap.timeline();
            tlQueen.add(gsap.to(logoQueen, {autoAlpha: 1, duration: 0.4}));
            tlQueen.add(gsap.from(logoQueen, {filter: "brightness(15) drop-shadow(0px 0px 6px rgba(255, 255, 255, 1.0)) drop-shadow(0px 0px 16px rgba(255, 255, 255, 1.0))", ease: "power2.inOut", duration: 0.9}))

            // tlQueen.add(gsap.fromTo(queenGloss, 
            //     {rotation: 20, x: "0%", ease: "none", duration: 1.5},
            //     {rotation: 0, x: "-1200%", ease: "none", duration: 1.3}
            // ));
            tlQueen.add(gsap.to(queenGloss, {scaleX: 1.0, x: "-1000%", ease: "none", duration: 1.5}));
            tlQueen.add(gsap.to(queenGloss, {scaleX: 0.3, x: "0%", ease: "none", duration: 0.9}));

            // Reveal the blings
            queenBlings.classList.remove("hidden")

            return tlQueen
        }




        // Stuff to do when the entire animation is finished
        const animationCompleted = () => {
            console.log('finish')

            setTimeout(() => {
                options.classList.remove("hidden")
            }, 400);
        }

        






        
    


        // Initialize elements as hidden
        tl.add(gsap.set(gridCanvas, {autoAlpha: 0, y: 200}))
        tl.add(gsap.set(spaceCanvas, {autoAlpha: 0}))
        tl.add(gsap.set(logoTriangle, {autoAlpha: 0}))
        tl.add(gsap.set(drama_paths, {autoAlpha: 0}))
        tl.add(gsap.set(logoQueen, {autoAlpha: 0}))
        tl.add(gsap.set(comms_masks, {autoAlpha: 0}))




        // START ANIMATION
        tl.add(gsap.to(spaceCanvas, {autoAlpha: 1, duration: 1.0}), "-=0.0")
        tl.add(gsap.to(gridCanvas, {y: 0, autoAlpha: 1, duration: 1.5}), "+=0.2")

        tl.add(gsap.from('#star', {scale: 0, duration: 0.7}), "-=0.2")
        tl.add(gsap.to('#star', {scale: 0, duration: 0.3}))

        tl.add(triangleReveal, "-=1.0");
        tl.add(dramaReveal, "+=3.0");
        tl.add(queenReveal, "+=0.7");

        // "Comms" mask paths
        tl.add(gsap.to(comms_masks, {autoAlpha: 1, duration: 0.0}));
        tl.add(gsap.from(comms_masks[0], 0.5, { drawSVG: 0, delay: 1.0 }))
        tl.add(gsap.from(comms_masks[1], 1.5, { drawSVG: 0, delay: 0.0 }))
        tl.add(gsap.from(comms_masks[2], 0.5, { drawSVG: 0, delay: 0.0 }))

        tl.add(gsap.to(logoTriangle, {
            filter: "drop-shadow(0px 0px 18px #ffffff) brightness(100%)", duration: 0.3
        }), "+=0.2")
        tl.add(gsap.to(logoTriangle, {
            filter: "drop-shadow(0px 0px 14px #a8008b) brightness(100%)", duration: 0.4
        }), "+=0.0")
        





        // Replay button
        const options = document.querySelector("#options")
        const replayBtn = document.querySelector("#replay-btn")

        document.addEventListener("click", function(e) {

            // Replay entire animation
            if (e.target == replayBtn) {
                options.classList.add("hidden")
                queenBlings.classList.add("hidden")
                gsap.to(gridCanvas, {autoAlpha: 0, duration: 0.3})
                gsap.to(spaceCanvas, {autoAlpha: 0, duration: 0.3})
                gsap.to(logoTriangle, {autoAlpha: 0, duration: 0.3})
                gsap.to(drama_paths, {autoAlpha: 0, duration: 0.3})
                gsap.to(logoQueen, {autoAlpha: 0, duration: 0.3})
                gsap.to(comms_masks, {autoAlpha: 0, duration: 0.3})

                setTimeout(() => {
                    tl.play(0);
                }, 500);
            }
            
        })


        


        // for (var i = 0; i < comms_paths.length; i++) {
        //     // gsap.from(comms_paths[i], 2.5, {ease: Power2.easeOut, drawSVG: 0, delay: 1.4});
        //     gsap.from(comms_paths[i], 2.5, {autoAlpha: 0, ease: Power2.easeOut, delay: 0.4, stagger: 0.2});
        // }





        /*
        // Reveal chat wrapper or window load. Hidden by default
        chat_messages_wrapper.style.display = "initial";

        gsap.registerPlugin(TextPlugin);
        gsap.registerPlugin(SplitText);

        //GSDevTools.create();

        
        function messageRevealHide() {
            chatbar_txt.textContent = "No kun";
            var mySplitText = new SplitText("#chatbar_txt", {type:"chars,words, lines"});
            var tlChat = gsap.timeline({repeat:1, yoyo:true, repeatDelay:0.8});
            tlChat.staggerFrom(mySplitText.chars, 0.01, {opacity:0}, 0.04);
        }
        function messageRevealHide2() {
            chatbar_txt.textContent = "Eilen oltiin";
            var mySplitText = new SplitText("#chatbar_txt", {type:"chars,words, lines"});
            var tlChat = gsap.timeline({repeat:1, yoyo:true, repeatDelay:0.8});
            tlChat.staggerFrom(mySplitText.chars, 0.01, {opacity:0}, 0.04);
        }
        function messageRevealHide3() {
            chatbar_txt.textContent = "Kato kun";
            var mySplitText = new SplitText("#chatbar_txt", {type:"chars,words, lines"});
            var tlChat = gsap.timeline({repeat:1, yoyo:true, repeatDelay:3.7});
            tlChat.staggerFrom(mySplitText.chars, 0.01, {opacity:0}, 0.04);
        }
        

        var tl = gsap.timeline({repeat:5, repeatDelay:2.0});

        tl.add(gsap.to('#start_bg', { autoAlpha: 0, duration: 0.4, delay: 0.1}));
        tl.add(gsap.from('#chat_message_one', {autoAlpha: 0, translateY: 5, duration: 0.4, delay: 0.3}));
        tl.add(messageRevealHide, "+=0.8");
        tl.add(messageRevealHide2, "+=1.8");
        tl.add(messageRevealHide3, "+=2.2");
        // tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.5, text: "No kun"}), "+=1.2");
        // tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.3, text: ""}), "+=1.4");
        // tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.6, text: "Eilen oltiin"}), "+=0.5");
        // tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.3, text: ""}), "+=1.0");
        // tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.5, text: "Kato kun"}), "+=0.6");

        tl.add(gsap.to('#is_notification_bg', { autoAlpha: 1, duration: 0.5}), "+=0.8");
        tl.add(gsap.from('#notification_wrapper', { autoAlpha: 0, translateY: -20, duration: 0.3}), "-=0.3");
        tl.add(gsap.to('#is_notification_bg', { autoAlpha: 0, duration: 0.3}), "+=2.0");
        tl.add(gsap.to('#notification_wrapper', { autoAlpha: 0, translateY: -20, duration: 0.3}), "-=0.4");

        //tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.4, text: ""}), "+=0.2");
        tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 1.4, text: "Hei, ootko muuten seurannut noita USA:n vaaleja?"}), "+=0.7");
        tl.add(gsap.to('#chatbar_txt', { ease:SteppedEase.config(30), duration: 0.7, translateX: -155}), "-=0.7");
        tl.add(gsap.to('#chatbar_txt', { ease: "none", duration: 0.0, text: ""}), "+=0.4");

        tl.add(gsap.to('#chat_messages_wrapper', {translateY: 60, duration: 0.3}), "-=0.0");
        tl.add(gsap.from('#chat_message_two', {autoAlpha: 0, translateY: 5, duration: 0.4}), "+=0.0");
        tl.add(gsap.to('#chat_messages_wrapper', {translateY: 30, duration: 0.3}), "+=1.0");
        tl.add(gsap.from('#chat_message_four', {autoAlpha: 0, translateY: 5, duration: 0.4}), "-=0.1");

        tl.add(gsap.to('#view_end', {translateY: '0%', duration: 0.8}), "+=0.8");



        // Endview text reveal animations
        // tl.add(gsap.to('#endview_txt', { ease: "none", duration: 1.4, text: "Puheenaiheita <br>tilanteeseen kuin <br>tilanteeseen."}), "-=0.2");
        // tl.add(gsap.from('#endview_tagline', {autoAlpha: 0, translateY: -10, duration: 0.4}), "-=0.3");

        */



    }, 100)
})
