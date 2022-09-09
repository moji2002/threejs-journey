import './style.css'
import * as THREE from 'three'

const canvas = document.querySelector('#webgl')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x224433 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const SIZES = {
    width: window.innerWidth,
    height: window.innerHeight
}

const ASPECT_RATIO = SIZES.width / SIZES.height;
const FIELD_OF_VIEW = 50; //degrees

const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT_RATIO)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(SIZES.width, SIZES.height)
renderer.render(scene, camera)