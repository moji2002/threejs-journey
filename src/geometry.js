import "./style.css";
import * as THREE from "three";
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";

const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

// prettier-ignore
// const verticesPositions = new Float32Array([
//   0,0,1, // first vertex
//   0,1,0, // second vertex
//   1,0,0, // third vertex
// ])

const count = 30;

const positionArr = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionArr[i] = Math.random() - 0.5;
}
const positionAttributes = new THREE.BufferAttribute(positionArr, 3);

const randomGeometry = new THREE.BufferGeometry();
randomGeometry.setAttribute("position", positionAttributes);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: "rgb(255, 111, 0)",
  wireframe: true,
});
const mesh = new THREE.Mesh(randomGeometry, material);
// mesh.position.set(0.5, 1, 0.1);

const FIELD_OF_VIEW = 75; //degrees
const camera = new THREE.PerspectiveCamera(
  FIELD_OF_VIEW,
  window.innerWidth / window.innerHeight
);

camera.position.z = 3;

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
// camera.lookAt(mesh.position);

const objects = [
  camera,
  mesh,

  // new THREE.AxesHelper()
];

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

const toggleFullscreen = (element) => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else {
      element.webkitRequestFullscreen();
    }
  }
};

window.addEventListener("dblclick", () => toggleFullscreen(canvas));
window.addEventListener("resize", update);

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

let time = Date.now();

// gsap.to(mesh.position, { x: 2, yoyo: true, repeat: -1 });

const cursor = {
  x: 0,
  y: 0,
};

// window.addEventListener("mousemove", (e) => {
//   // console.lo(cursor);

//   cursor.x = e.clientX / window.innerWidth - 0.5;
//   cursor.y = e.clientY / window.innerHeight - 0.5;
// });

const tick = () => {
  // calculate delta time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // camera.position.x = cursor.x
  // camera.position.y = -cursor.y

  // mesh.rotation.y += 0.002 * deltaTime;
  stats.update();
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
