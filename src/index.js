/**
 * Created with webStorm.
 * User: gaoHB
 * Date: 2018/10/9
 * Time: 下午4:36
 */

console.log(THREE);

document.body.style.margin = 0;

var container, stats, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixers = [];

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 100, 200, 300 );

	controls = new THREE.OrbitControls( camera );
	controls.target.set( 0, 100, 100 );
	controls.update();

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

	light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	light.position.set( 0, 200, 0 );
	scene.add( light );

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 200, 100 );
	light.castShadow = true;
	light.shadow.camera.top = 180;
	light.shadow.camera.bottom = -100;
	light.shadow.camera.left = -120;
	light.shadow.camera.right = 120;
	scene.add( light );

	// scene.add( new THREE.CameraHelper( light.shadow.camera ) );

	// ground
	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add( grid );

	// model
	var loader = new THREE.FBXLoader();
	loader.load( './models/fbx/zonghe.fbx', function ( object ) {
		console.log(object);
		object.scale.multiplyScalar(2);
		scene.add( object );
	} );

	for(var i = 0; i < 12; i++) {

		loader.load( `./models/fbx/student${i}.FBX`, function ( object ) {
			console.log(object);
			object.scale.multiplyScalar(2);
			scene.add( object );
		} );

	}
    /*
	for(var i = 0; i < 4; i++) {

		loader.load( `./models/fbx/${i}.FBX`, function ( object ) {
			console.log(object);
			object.scale.multiplyScalar(2);
			scene.add( object );
		} );

	}*/

	for(var i = 0; i < 3; i++) {

		loader.load( `./models/fbx/shitang${i}.FBX`, function ( object ) {
			console.log(object);
			object.scale.multiplyScalar(2);
			scene.add( object );
		} );

	}

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

	// stats
	stats = new Stats();
	container.appendChild( stats.dom );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	if ( mixers.length > 0 ) {

		for ( var i = 0; i < mixers.length; i ++ ) {

			mixers[ i ].update( clock.getDelta() );

		}

	}

	renderer.render( scene, camera );

	stats.update();

}
