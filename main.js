window.addEventListener("load", function() {

    setTimeout ( function() {

        // Reveal root when window fully loaded
        document.querySelector("#root").classList.remove("hidden")


        // Parallax
        var scene = document.getElementById('root');
        var parallax = new Parallax(scene, {
            selector: '.parallax-element'
        });



        // Define DOM elements
        const settingsBtn = document.querySelector("#settings-btn")
        const settingsMenu = document.querySelector("#settings-menu")
        const setFullscreen = document.querySelector("#settings-fullscreen > input")
        const setParallax = document.querySelector("#settings-parallax > input")
        const filmGrain = document.querySelector("#film-grain")
        const vhsEffect = document.querySelector("#vhs-effect")
        const spaceCanvas = document.querySelector("#space-canvas")
        const gridCanvas = document.querySelector("#grid-canvas")
        const setGrid = document.querySelector("#settings-grid > input")
        const setSpaceWarp = document.querySelector("#settings-space-warp > input")
        const setWarpSpeed = document.querySelector("#settings-warp-speed > select")
        const setFilmGrain = document.querySelector("#settings-film-grain > input")
        const setVhsEffect = document.querySelector("#settings-vhs-effect > input")
        
        

        document.addEventListener("click", function(e) {

            // Settings menu toggle visible/hidden
            if(e.target == settingsBtn && !settingsBtn.classList.contains('active')) {
                settingsBtn.classList.toggle("active")
                settingsMenu.classList.toggle("hidden")
                return;
            }
            if(settingsBtn.classList.contains('active')) {
                if (!settingsMenu.contains(e.target)) {
                    settingsBtn.classList.toggle("active")
                    settingsMenu.classList.toggle("hidden")
                }
            }

            // Fullscreen mode
            if (e.target == setFullscreen) {

                // Check for browser fullscreen support
                if (typeof(document.body.requestFullscreen) !== 'undefined') {
                    if (setFullscreen.checked) {
                        if (!document.fullscreenElement || !document.webkitFullscreenElement) {
                            document.body.requestFullscreen();
                        }
                    } else {
                        if (document.fullscreenElement || document.webkitFullscreenElement) {
                            document.exitFullscreen();
                        }
                    }
                } else {
                    alert("Your browser does not support full screen mode")
                }
            }

            // Parallax effect
            if (e.target == setParallax) {
                if (setParallax.checked) {
                    parallax.enable()
                } else {
                    parallax.disable()
                }
            }

            // VHS effect
            if (e.target == setVhsEffect) {
                if (setVhsEffect.checked) {
                    vhsEffect.classList.add("active")
                } else {
                    vhsEffect.classList.remove("active")
                }
            }

            // Film grain effect
            if (e.target == setFilmGrain) {
                if (setFilmGrain.checked) {
                    filmGrain.classList.add("active")
                } else {
                    filmGrain.classList.remove("active")
                }
            }

            // Grid background effect
            if (e.target == setGrid) {
                if (setGrid.checked) {
                    gridCanvas.classList.remove("inactive")
                } else {
                    gridCanvas.classList.add("inactive")
                }
            }

            // Space warp background effect
            if (e.target == setSpaceWarp) {
                if (setSpaceWarp.checked) {
                    spaceCanvas.classList.remove("inactive")
                    setWarpSpeed.parentElement.classList.remove("inactive")
                } else {
                    spaceCanvas.classList.add("inactive")
                    setWarpSpeed.parentElement.classList.add("inactive")
                }
            }

        })

        



    }, 100)
})
