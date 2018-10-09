/**
 * Created with webStorm.
 * User: gaoHB
 * Date: 2018/10/9
 * Time: 下午4:36
 */

import * as THREE from 'three/build/three.module.js';

console.log(THREE);

document.body.style.margin = 0;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

scene.add( cube );

camera.position.z = 5;
// camera.position.set( 0, 0, 100 );
camera.lookAt(0,0,0);

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();
