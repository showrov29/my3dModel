import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let model, renderer, scene, camera;
init();
function init() {
	const loader = new GLTFLoader();
	scene = new THREE.Scene();
	const light = new THREE.AmbientLight(0xffffff, 1.5);
	scene.add(light);
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({ color: "red" });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	// scene.background = new THREE.Color(0xffffff);
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	loader.load("Showrov3D.glb", function (gltf) {
		model = gltf.scene;
		console.log("🚀 ~ model:", model);
		model.position.set(0, -1, -2);
		scene.add(gltf.scene);
	});
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		controls.update();
	}
	animate();
}
