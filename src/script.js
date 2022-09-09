import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector("#webgl");
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x224433 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.5, 1, 0.1);

const ASPECT_RATIO = SIZES.width / SIZES.height;
const FIELD_OF_VIEW = 50; //degrees
const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT_RATIO);
// camera.position.x = .5;
// camera.position.y = .5;
camera.position.z = 3;

camera.lookAt(mesh.position)

const objects = [camera, mesh, new THREE.AxesHelper()];
for (const object of objects) scene.add(object);

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(SIZES.width, SIZES.height);
renderer.render(scene, camera);
