import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const random_hex_color_code = () => {
    // Generate a random number and convert it to hexadecimal string representation.
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    // Return the hexadecimal color code with '#' appended.
    return '#' + n.slice(0, 6);
};

function loadObject(scene, modelPath, mtlPath) {
    const mtlLoader = new MTLLoader();
    let model;
    mtlLoader.load(
        mtlPath,
        (materials) => {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
                modelPath,
                (object) => {
                    model = object;
                    model.rotation.set(0, 0, 1.5708);
                    model.position.set(5, 0, 0);
                    model.scale.set(5, 5, 5);
                    scene.add(object);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log('An error happened')
                }
            )
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log('An error happened')
        }
    )

    return model;
}

function createCube(father, position, scale, myColor) {

    const geometry = new THREE.CircleGeometry(5, 2);
    const material = new THREE.MeshBasicMaterial({ color: myColor });
    const circle = new THREE.Mesh(geometry, material);

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

let pressedButton = 0;
document.addEventListener("keydown", (e) => {
    let keyCode = e.key;
    if (e.key === " " && pressedButton <= 0) {
        pressedButton = 10;
    }

});

document.addEventListener("keyup", (e) => {
    pressedButton = 0;
});

const light = new THREE.PointLight(0xFFFFFF, 1000);
light.position.set(2.5, 7.5, 15);
scene.add(light);

camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 20;


// instantiate a loader


let entityList = [];
entityList.push(createCube(scene, [0, 0, 0], [0.10, 0.10, 0.10], "#FF0000"));
loadObject(entityList[0], 'ship-small.obj', 'ship-small.mtl');
entityList[0].rotation.set(0, 90, 0);

let dir = 1;

const clock = new THREE.Clock();
let previousTime = 0;
let speed = 10;
function animate() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (pressedButton >= 10) {
        dir = -dir;
    }
    if(pressedButton >= 0) {
        pressedButton = pressedButton - 1.0 * deltaTime;
    }

    if ((entityList[0].position.y < 10 && dir == 1) ||
    (entityList[0].position.y > -10 && dir == -1)
    ) {
        entityList[0].position.y += speed * dir * deltaTime;
    }


    renderer.render(scene, camera);

}





