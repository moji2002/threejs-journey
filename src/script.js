import "./style.css";
import * as THREE from "three";
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import toggleFullscreen from "./helpers/toggleFullscreen";
import GUI from "lil-gui";

const gui = new GUI();
gui.close();

const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: "rgb(255, 111, 0)",
  wireframe: true,
});
const mesh = new THREE.Mesh(boxGeometry, material);

const FIELD_OF_VIEW = 75; //degrees
const camera = new THREE.PerspectiveCamera(
  FIELD_OF_VIEW,
  window.innerWidth / window.innerHeight
);

camera.position.z = 3;

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

const objects = [camera, mesh];

for (const object of objects) {
  scene.add(object);
}

const renderer = new THREE.WebGLRenderer({ canvas });

const update = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
  renderer.render(scene, camera);
};

update();

window.addEventListener("dblclick", () => toggleFullscreen(canvas));
window.addEventListener("resize", update);
canvas.addEventListener("click", () => gui.close());

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

gui.addColor(mesh.material, "color");
gui.add(mesh.material, "wireframe");
const position = gui.addFolder("position");
position.add(camera.position, "x", -5, 5);
position.add(camera.position, "y", -5, 5);
position.add(camera.position, "z", -5, 5);
const scale = gui.addFolder("scale");
scale.add(mesh.scale, "x", 0, 5);
scale.add(mesh.scale, "y", 0, 5);
scale.add(mesh.scale, "z", 0, 5);

let time = Date.now();

const tick = () => {
  // calculate delta time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  stats.update();
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
