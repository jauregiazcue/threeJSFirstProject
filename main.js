import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const random_hex_color_code = () => {
    // Generate a random number and convert it to hexadecimal string representation.
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    // Return the hexadecimal color code with '#' appended.
    return '#' + n.slice(0, 6);
};

function loadObject(scene, path) {
    const loader = new OBJLoader();

    loader.load(
        // resource URL
        path,
        // called when resource is loaded
        function (object) {
            object.position.set(5, 0, 0);
            scene.add(object);

        },
        // called when loading is in progresses
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        });

}

function createCube(father, position, scale, myColor) {
    const geometry = new THREE.DodecahedronGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: myColor });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2]);
    cube.scale.set(scale[0], scale[1], scale[2]);
    father.add(cube);

    return cube;
}





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
let pressedButton = false;
document.addEventListener("keydown", (e) => {
    if (!pressedButton) console.log(e.key);
    pressedButton = true;
});

document.addEventListener("keyup", (e) => {
    if (pressedButton) console.log("released!");
    pressedButton = false;
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();



camera.position.z = 120;

// instantiate a loader
//loadObject(scene,'earth.obj');
let entityList = [];
let radius = 2;
let PI = 3.14159;
entityList.push(createCube(scene, [0, 0, 0], [10, 10, 10], "#c38a37"));
for (let angle = 0; angle <= 2 * PI; angle += 0.001) {
    radius = Math.random() * 50 + 3;
    entityList.push(createCube(
        entityList[0],
        [radius * Math.cos(angle), radius * Math.sin(angle), 0],
        [0.2, 0.2, 0.2],
        random_hex_color_code()));

}




const light = new THREE.PointLight(0xFF0000, 1000);
light.position.set(2.5, 7.5, 15);
scene.add(light);

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create an Audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('test.MP3', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});

// create an AudioAnalyser, passing in the sound and desired fftSize
const analyser = new THREE.AudioAnalyser(sound, 32);

// get the average frequency of the sound
const data = analyser.getAverageFrequency();


function animate() {
    if(pressedButton) {
        entityList[0].rotation.z += 0.1;
    }

    renderer.render(scene, camera);

}





