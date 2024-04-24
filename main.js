import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let model, renderer, scene, camera, mixer;
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

	loader.load("Showrov.glb", function (gltf) {
		model = gltf.scene;
		console.log("🚀 ~ model:", model);
		model.position.set(0, -1, -2);
		scene.add(gltf.scene);
		mixer = new THREE.AnimationMixer(model);
		let clips = gltf.animations;
		PlayAnimation(clips, "dancing2");
		animate();
	});
}
function animate() {
	renderer.setAnimationLoop(render);
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function PlayAnimation(clips, animationName) {
	console.log(clips, animationName);
	let animation = clips.find((clip) => clip.name === animationName);

	animation = mixer.clipAction(animation);
	animation.timeScale = 1.7;
	animation.play();
}
function render() {
	mixer.update(0.01);
	renderer.render(scene, camera);
}
