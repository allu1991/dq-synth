
// Initialize scenes, camera, renderer and meshes
let sceneStars, camera, rendererStars, rendererGrid, star, stars, starGeo, gridMesh;


// Create star particles. Used for updating instances through settings manu as well
function createStars(starVelocity, starAcceleration) {
    for(let i = 0; i < 3000; i++) {
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        star.velocity = starVelocity;
        star.acceleration = starAcceleration;
        starGeo.vertices.push(star);
    }
}


// Initialize Stars scene
function initStars() {

    sceneStars = new THREE.Scene();

    sceneStars.fog = new THREE.Fog( 0x3c017f, 30, 250 );

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 5, 300);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    let canvasStars = document.querySelector("#space-canvas")
    

    rendererStars = new THREE.WebGLRenderer({ alpha: true, canvas: canvasStars });
    rendererStars.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(rendererStars.domElement);
    
    starGeo = new THREE.Geometry();
    
    createStars(0.45, 0.005)

    let sprite = new THREE.TextureLoader().load( '../images/star-particle.png' );
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.8,
        map: sprite,
        transparent: true,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    sceneStars.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animateStars();
}


// Initialize Grid scene
function initGrid() {

    sceneGrid = new THREE.Scene();

    sceneGrid.fog = new THREE.Fog( 0x3c017f, 30, 150 );

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 5, 300);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    let canvasGrid = document.querySelector("#grid-canvas")
        
    rendererGrid = new THREE.WebGLRenderer({ alpha: true, canvas: canvasGrid });
    rendererGrid.setSize(window.innerWidth, window.innerHeight);


    // Create the grid mesh
    let planeW = 200; // pixels
    let planeH = 200; // pixels 
    let numW = 10; // how many wide (50*50 = 2500 pixels wide)
    let numH = 10; // how many tall (50*50 = 2500 pixels tall)
    let gridTexture = new THREE.TextureLoader().load('../images/bg-grid.png');
    gridTexture.wrapS = THREE.RepeatWrapping;
    gridTexture.wrapT = THREE.RepeatWrapping;
    gridTexture.repeat.set( 160, 160 );
    gridMesh = new THREE.Mesh(
        new THREE.PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ),
        new THREE.MeshBasicMaterial( {
            color: 0x343eff,
            map: gridTexture,
            transparent: true,
            
        } )
    );
    gridMesh.position.set(100, 0, -20);
    
    sceneGrid.add(gridMesh);

    window.addEventListener("resize", onWindowResize, false);

    animateGrid()
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererStars.setSize(window.innerWidth, window.innerHeight);
    rendererGrid.setSize(window.innerWidth, window.innerHeight);
}

function animateStars() {

    // Stars animation
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity;
    
        if (p.y < -200) {
            p.y = 200;
            p.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y +=0.000;


    rendererStars.render(sceneStars, camera);
    requestAnimationFrame(animateStars);

}

function animateGrid() {

    // Grid animation
    gridMesh.position.y -=0.400;
    if (gridMesh.position.y < -112.0) {
        gridMesh.position.y = 0;
    }

    rendererGrid.render(sceneGrid, camera);
    requestAnimationFrame(animateGrid);

}



initStars(0.45, 0.005);
initGrid()



const setWarpSpeed = document.querySelector("#settings-warp-speed > select")

setWarpSpeed.addEventListener("change", function(e) {
    switch (e.target.value) {
        case "speed-1":
            createStars(0.45, 0.005)
            // animate(); 
            break;
        case "speed-2":
            createStars(0.85, 0.010)
            // animate(); 
            break;
        case "speed-3":
            createStars(1.25, 0.020)
            // animate();
            break;
        case "speed-4":
            createStars(2.00, 0.040)
            // animate();
            break;
        default:
            createStars(0.45, 0.005)
            // animate(); 
            break;
    }
})