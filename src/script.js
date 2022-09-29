import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

const gui = new dat.GUI({
  width: 400,
});

const parameters = {
  color: "#00aaff",
  spin: () => {
    gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2 });
  },
};

const loadingManager = new THREE.LoadingManager();

// loadingManager.onProgress = (filePath, index, total) => {
//   console.log(filePath, index, total);
// };
const textureLoader = new THREE.TextureLoader(loadingManager);

const textures = [
  "/textures/door/color.jpg",
  "/textures/door/alpha.jpg",
  "/textures/door/ambientOcclusion.jpg",
  "/textures/door/height.jpg",
  "/textures/door/metalness.jpg",
  "/textures/door/normal.jpg",
  "/textures/door/roughness.jpg",
];

const [
  colorTexture,
  alphaTexture,
  ambientOcclusionTexture,
  heightTexture,
  metalnessTexture,
  normalTexture,
  roughnessTexture,
] = textures.map((url) => textureLoader.load(url));

const canvas = document.querySelector("canvas.webgl");



gui.add(colorTexture, "rotation", 0, Math.PI * 2);

// change the pivot point
colorTexture.center.x = .5
colorTexture.center.y = .5

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));

gui.close();
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");

const tick = () => {
  if (document.hidden) return;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
