// let scene, camera, renderer;
// let cubes = [];
// let size = 4;
// let spacing = 1.2;
// let gameState;

// init();
// animate();

// function init() {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, 600/600, 0.1, 1000);
//     camera.position.set(size*spacing/2, size*spacing/2, size*spacing*2);

//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(600, 600);
//     document.getElementById('game-container').appendChild(renderer.domElement);

//     // Create grid of cubes
//     for (let x = 0; x < size; x++) {
//         cubes[x] = [];
//         for (let y = 0; y < size; y++) {
//             cubes[x][y] = [];
//             for (let z = 0; z < size; z++) {
//                 let geometry = new THREE.BoxGeometry();
//                 let material = new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: false });
//                 let cube = new THREE.Mesh(geometry, material);
//                 cube.position.set(x*spacing, y*spacing, z*spacing);
//                 scene.add(cube);
//                 cubes[x][y][z] = cube;
//             }
//         }
//     }

//     fetchState();
//     document.addEventListener('keydown', onDocumentKeyDown, false);
// }

// function fetchState() {
//     fetch('/api/state')
//         .then(response => response.json())
//         .then(state => {
//             gameState = state;
//             updateCubes();
//         });
// }

// function updateCubes() {
//     for (let x = 0; x < size; x++) {
//         for (let y = 0; y < size; y++) {
//             for (let z = 0; z < size; z++) {
//                 let val = gameState.grid[x][y][z];
//                 let cube = cubes[x][y][z];
//                 cube.material.color.setHex(val ? 0xff0000 : 0xdddddd);
//             }
//         }
//     }
// }

// function onDocumentKeyDown(event) {
//     let map = { 37: 'left', 38: 'up', 39: 'right', 40: 'down', 65: 'back', 70: 'front' };
//     let direction = map[event.keyCode];
//     if (!direction) return;
//     fetch('/api/move', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ direction: direction })
//     })
//     .then(response => response.json())
//     .then(state => {
//         gameState = state;
//         updateCubes();
//     });
// }

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
