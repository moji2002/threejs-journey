import "./style.css";
import * as THREE from "three";
import Stats from "stats.js";
// import gsap from "gsap";

const canvas = document.querySelector("#webgl");
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "rgb(255, 111, 0)" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.5, 1, 0.1);

const ASPECT_RATIO = SIZES.width / SIZES.height;
const FIELD_OF_VIEW = 75; //degrees
const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT_RATIO);

camera.position.z = 3;

camera.lookAt(mesh.position);

const objects = [
  camera,
  mesh,
  // new THREE.AxesHelper()
];

for (const object of objects) {
  scene.add(object);
}

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(SIZES.width, SIZES.height);

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

let time = Date.now();

// gsap.to(mesh.position, { x: 2, yoyo: true, repeat: -1 });

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  // console.lo(cursor);

  cursor.x = e.clientX / window.innerWidth - 0.5;
  cursor.y = e.clientY / window.innerHeight - 0.5;
});

const tick = () => {
  // calculate delta time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // camera.position.x = cursor.x
  // camera.position.y = -cursor.y

  mesh.rotation.y += 0.002 * deltaTime;
  stats.update();
  renderer.render(scene, camera);
  // requestAnimationFrame(tick);
};

tick();
