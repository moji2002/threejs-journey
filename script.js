const canvas = document.querySelector('canvas')
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera()

const FIELD_OF_VIEW = 50 //degrees
scene.add(camera)