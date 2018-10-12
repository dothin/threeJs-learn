/**
 * Created with webStorm.
 * User: gaoHB
 * Date: 2018/10/9
 * Time: 下午4:36
 */

document.body.style.margin = 0;

var container, stats, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixers = [];

var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();

var SELECTED;
var objects = [];

init();
animate();

function init(){

	container = document.createElement('div');
	document.body.appendChild(container);

	scene = new THREE.Scene();
	// scene.background = new THREE.TextureLoader().load( "./models/fbx/bunny_thickness.jpg" );;
	// scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.set(-200, 120, 200);

	controls = new THREE.OrbitControls(camera);
	controls.target.set(-120, 80, 100);
	controls.update();

	light = new THREE.HemisphereLight(0xffffff, 0x444444);
	light.position.set(0, 200, 0);
	scene.add(light);

	light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 200, 100);
	light.castShadow           = true;
	light.shadow.camera.top    = 180;
	light.shadow.camera.bottom = -100;
	light.shadow.camera.left   = -120;
	light.shadow.camera.right  = 120;
	scene.add(light);

	// ground
	var mesh           = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500), new THREE.MeshPhongMaterial({
		color     : 0x333333,
		depthWrite: false,
		map       : new THREE.TextureLoader().load("./materials/ground.png")
	}));
	mesh.rotation.x    = -Math.PI / 2;
	mesh.rotation.z    = 400;
	mesh.receiveShadow = true;
	scene.add(mesh);

	var grid = new THREE.GridHelper(500, 30, 0x06a7bb, 0x06a7bb);
	// grid.position.y = - 75;
	// grid.material.transparent = true;
	// scene.add(grid);

	// model
	var loader = new THREE.FBXLoader();

	for(var i = 0; i < 3; i++){

		i === 2 && loader.load(`./models/fbx/${i}.FBX`, function(object){
			console.log(object);
			object.scale.multiplyScalar(2);
			objects.push(object);
			var materialObj = new THREE.MeshLambertMaterial({
				color      : 0x188eee,
				transparent: true,
				opacity    : 0.8
				// map: new THREE.TextureLoader().load( './materials/Blue.mat' )
			});
			object.traverse(function(child){
				if(child instanceof THREE.Mesh){
					child.material = materialObj;
				}
			});
			scene.add(object);
		});

	}

	loader.load('./models/fbx/zonghe.fbx', function(object){

		console.log(object);

		object.scale.multiplyScalar(2);
		objects.push(object);
		var materialObj = new THREE.MeshLambertMaterial({
			// map: THREE.ImageUtils.loadTexture( './materials/Blue.mat' )
			color      : (0x188eee),
			transparent: true,
			opacity    : 0.8
		});
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				child.material = materialObj;
			}
		});
		// scene.add( object );
	});

	for(var i = 1; i < 13; i++){

		loader.load(`./models/fbx/student${i}.FBX`, function(object){
			object.scale.multiplyScalar(2);
			objects.push(object);
			var materialObj = new THREE.MeshLambertMaterial({
				// map: THREE.ImageUtils.loadTexture( './materials/Blue.mat' )
				color      : (0x188eee),
				transparent: true,
				opacity    : 0.8
			});
			object.traverse(function(child){
				if(child instanceof THREE.Mesh){
					child.material = materialObj;
				}
			});
			// scene.add( object );
		});

	}

	/*for(var i = 1; i < 3; i++){

		loader.load(`./models/fbx/shitang${i}.FBX`, function(object){
			object.scale.multiplyScalar(2);
			objects.push(object);
			var materialObj = new THREE.MeshLambertMaterial({
				// map: THREE.ImageUtils.loadTexture( './materials/Blue.mat' )
				color      : (0x188eee),
				transparent: true,
				opacity    : 0.8
			});
			object.traverse(function(child){
				if(child instanceof THREE.Mesh){
					child.material = materialObj;
				}
			});
			// scene.add( object );
		});

	}*/

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

	// stats
	stats = new Stats();
	container.appendChild(stats.dom);

	window.addEventListener('mousemove', onMouseMove, false);
	window.addEventListener('click', onMouseClick, false);

}

function onMouseMove(event){
	//鼠标点的拾取-当鼠标点击效果时，放在这里
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;//threejs坐标点的标准化
	mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(objects, true);
	//拾取物体数大于0时
	if(intersects.length > 0){

		//获取第一个物体
		if(SELECTED != intersects[0].object){
			//鼠标的变换
			document.body.style.cursor = 'pointer';
			if(SELECTED) SELECTED.material.opacity = 0.8;
			SELECTED                  = intersects[0].object;
			SELECTED.material.opacity = 1;
		}
	}else{
		document.body.style.cursor = 'auto';
		if(SELECTED) SELECTED.material.opacity = 0.8;//恢复选择前的默认颜色
		SELECTED = null;
	}

}

function onMouseClick(event){

	console.log(event);

	//通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

	// 通过鼠标点的位置和当前相机的矩阵计算出raycaster
	raycaster.setFromCamera(mouse, camera);

	// 获取raycaster直线和所有模型相交的数组集合
	var intersects = raycaster.intersectObjects(objects, true);

	console.log(intersects);

	//将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
	for(var i = 0; i < intersects.length; i++){

		intersects[i].object.material.color.set(0x188333);

	}

}

function onWindowResize(){

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate(){

	requestAnimationFrame(animate);

	if(mixers.length > 0){

		for(var i = 0; i < mixers.length; i++){

			mixers[i].update(clock.getDelta());

		}

	}

	renderer.render(scene, camera);

	stats.update();

}
