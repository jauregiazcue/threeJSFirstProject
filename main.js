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
    let model = null;
    loader.load(
        path, obj => {
            model = obj;
            model.rotation.set(0,0,1.5708);
            model.position.set(5,30,0);
            scene.add(model);
        });
    return model;
}

function createCube(father, position, scale, myColor) {

    const geometry = new THREE.CircleGeometry( 5, 2 ); 
    const material = new THREE.MeshBasicMaterial( { color: myColor } ); 
    const circle = new THREE.Mesh( geometry, material ); 

    circle.position.set(position[0], position[1], position[2]);
    circle.scale.set(scale[0], scale[1], scale[2]);
    father.add(circle);
    

    return circle;
}





const scene = new THREE.Scene();

scene.background = new THREE.Color("#1B065E");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

let pressedButton = false;
document.addEventListener("keydown", (e) => {
    pressedButton = true;
});

document.addEventListener("keyup", (e) => {
    pressedButton = false;
});

const light = new THREE.PointLight(0xFF0000, 1000);
light.position.set(2.5, 7.5, 15);
scene.add(light);

camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 20;


// instantiate a loader


let entityList = [];
entityList.push(createCube(scene, [0, -30, 0], [1, 1, 1], "#FF0000"));
loadObject(entityList[0], 'ship-small.obj');
entityList[0].rotation.set(0,90,0);

function animate() {
    if (pressedButton) {
        if(entityList[0].position.y < -20) {
            entityList[0].position.y += 0.1;
        }
        
    } else {
        if(entityList[0].position.y > -30) {
            entityList[0].position.y -= 0.1;
        }
        
    }


    renderer.render(scene, camera);

}





