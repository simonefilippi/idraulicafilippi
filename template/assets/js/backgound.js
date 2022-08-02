/******************************************************************
	
	
	@ Item          REFRAME - Personal One Page HTML Template
	@ Version       1.1
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Init Background
	--  2. Color Background
	--  3. Square Background
	--  4. Asteroids Background
	--  5. Circle Background
	--  6. Lines Background
	--  7. Twisted Background
 
 
 ******************************************************************/



/** 1. BACKGROUND INIT
*******************************************************************/

function init_backgrounds() {

	var error_msg = "Error! No background is set or something went wrong";

	if(is_mobile_device == true && option_hero_background_mode_mobile != "match") {
		option_hero_background_mode = option_hero_background_mode_mobile;
	}
	
	function url_var_handling() {
		let searchParams = new URLSearchParams(window.location.search);
		if(searchParams.has('bg')) option_hero_background_mode = searchParams.get('bg');
	} url_var_handling();

	switch(option_hero_background_mode) {

		case "color":colorBackground(); break;
		case "square": squareBackground(); break;
		case "twisted": twistedBackground(); break;
		case "asteroids":  asteroidsBackground(); break;
		case "circle": circleBackground(); break;
		case "lines": linesBackground(); break;
		default: alert(error_msg); console.log(error_msg); break;	
	
	}

} init_backgrounds();



/** 2. COLOR BACKGROUND
*******************************************************************/

function colorBackground() {

	$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_color_bg + '"></div>');

}



/** 3. SQUARE BACKGROUND
*******************************************************************/
	
function squareBackground() {

	$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_square_bg + '"></div>');
	$("#main").append('<ul class="bg-bubbles ' + option_hero_background_square_mode + '"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>');
	
}



/** 4. ASTERIODS BACKGROUND
*******************************************************************/

function asteroidsBackground() {

	var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = false;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.needsUpdate = true;
	renderer.domElement.id = 'canvas-asteroids';

	document.getElementById("main").appendChild( renderer.domElement );
	window.addEventListener('resize', onWindowResize, false);

	function onWindowResize() {
		
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		
	}

	var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
	var scene = new THREE.Scene();
	var cameraRange = 3;

	scene.fog = new THREE.Fog(option_hero_background_asteroids_bg_color, 2.5, 3.5);

	//-------------------------------------------------------------- SCENE

	var sceneGruop = new THREE.Object3D();
	var particularGruop = new THREE.Object3D();
	var modularGruop = new THREE.Object3D();

	function generateParticle(num) {

		var amp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

		var gmaterial = new THREE.MeshStandardMaterial({

		  color: option_hero_background_asteroids_particle_color,
		  side: THREE.DoubleSide

		});

		var gparticular = new THREE.CircleGeometry(0.2, 5);
	  
		for (var i = 1; i < num; i++) {

		  var pscale = 0.001 + Math.abs(mathRandom(0.03));
		  var particular = new THREE.Mesh(gparticular, gmaterial);
		  particular.position.set(mathRandom(amp), mathRandom(amp), mathRandom(amp));
		  particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
		  particular.scale.set(pscale, pscale, pscale);
		  particular.speedValue = mathRandom(1);
		  particularGruop.add(particular);

		}

	} generateParticle(200, 2);

	sceneGruop.add(particularGruop);
	scene.add(modularGruop);
	scene.add(sceneGruop);

	function mathRandom() {

		var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
		var setNumber = -Math.random() * num + Math.random() * num;

		return setNumber;

	}

	//------------------------------------------------------------- INIT

	function init() {

		for (var i = 0; i<30; i++) {

			var geometry = new THREE.IcosahedronGeometry(1);
			var material = new THREE.MeshStandardMaterial({flatShading :THREE.FlatShading, color:option_hero_background_asteroids_cube_color, transparent:false, opacity:1, wireframe:false});
			var cube = new THREE.Mesh(geometry, material);
			cube.speedRotation = Math.random() * 0.1;
			cube.positionX = mathRandom();
			cube.positionY = mathRandom();
			cube.positionZ = mathRandom();
			cube.castShadow = true;
			cube.receiveShadow = true;
			
			var newScaleValue = mathRandom(0.3);
			
			cube.scale.set(newScaleValue,newScaleValue,newScaleValue);
			
			cube.rotation.x = mathRandom(180 * Math.PI / 180);
			cube.rotation.y = mathRandom(180 * Math.PI / 180);
			cube.rotation.z = mathRandom(180 * Math.PI / 180);
			
			cube.position.set(cube.positionX, cube.positionY, cube.positionZ);
			modularGruop.add(cube);

		}

	}

	//------------------------------------------------------------- CAMERA

	camera.position.set(0, 0, cameraRange);

	//------------------------------------------------------------- SCENE

	var light = new THREE.SpotLight(option_hero_background_asteroids_spotlight_color, option_hero_background_asteroids_spotlight_intensity);
	light.position.set(5, 5, 2);
	light.castShadow = true;
	light.shadow.mapSize.width = 10000;
	light.shadow.mapSize.height = light.shadow.mapSize.width;
	light.penumbra = 0.5;

	var lightBack = new THREE.PointLight(option_hero_background_asteroids_pointlight_color, option_hero_background_asteroids_pointlight_intensity);
	lightBack.position.set(0, -3, -1);

	var rectLight = new THREE.RectAreaLight(option_hero_background_asteroids_rectarealight_color, option_hero_background_asteroids_rectarealight_intensity,  2, 2);
	rectLight.position.set( 0, 0, 1 );
	rectLight.lookAt( 0, 0, 0 );

	scene.add(light);
	scene.add(lightBack);
	scene.add(rectLight)


	//------------------------------------------------------------- MOUSE

	var mouse = new THREE.Vector2();

	function onMouseMove(event) {

		event.preventDefault();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	} window.addEventListener('mousemove', onMouseMove, false);


	//------------------------------------------------------------- ANIMATING

	var uSpeed = 0.01;

	function animate() {

		var time = performance.now() * 0.0003;
		requestAnimationFrame(animate);
		
		for (var i = 0, l = particularGruop.children.length; i<l; i++) {

			var newObject = particularGruop.children[i];
			newObject.rotation.x += newObject.speedValue/10;
			newObject.rotation.y += newObject.speedValue/10;
			newObject.rotation.z += newObject.speedValue/10;

		};
		
		for (var i = 0, l = modularGruop.children.length; i<l; i++) {

			var newCubes = modularGruop.children[i];
			newCubes.rotation.x += 0.008;
			newCubes.rotation.y += 0.005;
			newCubes.rotation.z += 0.003;
			
			newCubes.position.x = Math.sin(time * newCubes.positionZ) * newCubes.positionY;
			newCubes.position.y = Math.cos(time * newCubes.positionX) * newCubes.positionZ;
			newCubes.position.z = Math.sin(time * newCubes.positionY) * newCubes.positionX;

		}
		
		particularGruop.rotation.y += 0.005;
		modularGruop.rotation.y -= ((mouse.x * 4) + modularGruop.rotation.y) * uSpeed;
		modularGruop.rotation.x -= ((-mouse.y * 4) + modularGruop.rotation.x) * uSpeed;
		camera.lookAt(scene.position);
		renderer.render( scene, camera );  

	}

	animate();
	init();

	$("#canvas-asteroids").css("opacity",option_hero_background_asteroids_scene_opacity);
	$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_asteroids_bg_color + '"></div>');

}



/** 5. CIRCLE BACKGROUND
*******************************************************************/

function circleBackground() {

	var canvas = document.getElementById("main").appendChild( document.createElement( 'canvas' ) );
	var context = canvas.getContext( '2d' );
	
	var time = 0,
		velocity = 0.1,
		velocityTarget = option_hero_background_circle_speed,
		width,
		height,
		lastX,
		lastY;
	
	var MAX_OFFSET = 400;
	var SPACING = 6;
	var POINTS = MAX_OFFSET / SPACING;
	var PEAK = MAX_OFFSET * 0.25;
	var POINTS_PER_LAP = 6;
	var SHADOW_STRENGTH = 6;

	canvas.setAttribute("id", "canvas-circle");
	setup();

	$("#canvas-circle").css("opacity",option_hero_background_circle_scene_opacity);
	$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_circle_bg_color + '"></div>');

	
	function setup() {
		
		resize();
		step();
		window.addEventListener( 'resize', resize );
		
	}
	
	function resize() {
	
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		
	}
	
	function step() {
		
		time += velocity;
		velocity += ( velocityTarget - velocity ) * 0.3;
		
		clear();
		render();
		
		requestAnimationFrame( step );
		
	}
	
	function clear() {
		
		context.clearRect( 0, 0, width, height );
	
	}
	
	function render() {
		
		var x, y,
			cx = width/2,
			cy = height/2;
	
		context.globalCompositeOperation = 'lighter';
		context.strokeStyle = option_hero_background_circle_line_color
		context.shadowColor = option_hero_background_circle_line_color;
		context.lineWidth = 2;
		context.beginPath();
	
		for( var i = POINTS; i > 0; i -- ) {
		
			var value = i * SPACING + ( time % SPACING );
			
			var ax = Math.sin( value/POINTS_PER_LAP ) * Math.PI,
				ay = Math.cos( value/POINTS_PER_LAP ) * Math.PI;
		
			x = ax * value,
			y = ay * value * 0.35;
			
			var o = 1 - ( Math.min( value, PEAK ) / PEAK );
			
			y -= Math.pow( o, 2 ) * 200;
			y += 200 * value / MAX_OFFSET;
			y += x / cx * width * 0.1;
			
			context.globalAlpha = 1 - ( value / MAX_OFFSET );
			context.shadowBlur = SHADOW_STRENGTH * o;
			
			context.lineTo( cx + x, cy + y );
			context.stroke();
			
			context.beginPath();
			context.moveTo( cx + x, cy + y );
		
		}
	
		context.lineTo( cx, cy - 200 );
		context.lineTo( cx, 0 );
		context.stroke();
		
	}

}



/** 6. LINES BACKGROUND
*******************************************************************/

function linesBackground() {

	const canvas = document.getElementById("main").appendChild( document.createElement( 'canvas' ) );
	const context = canvas.getContext( '2d' );

	const lines = [];

	var step = 0,
		width = 0,
		height = 0;

	window.onresize = setup;

	canvas.setAttribute("id", "canvas-lines");

	setup();
	update();

	$("#canvas-lines").css({
		opacity: option_hero_background_lines_scene_opacity,
		transform: "translate(-50%, -50%) rotate(45deg)",
		left: "50%",
		top: "50%",
	})
	$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_lines_bg_color + '"></div>');

	function setup() {
	
		width = height = Math.sqrt(Math.pow(window.innerWidth,2) + Math.pow(window.innerHeight,2));

		lines.length = 0;
		
		let lineCount = height / 26;
		let pointCount = 14;
		let spacingH = width / pointCount;
		let spacingV = height / lineCount;
		
		for(let v = 0; v < lineCount; v++) {

			let line = { points: [], ran: 0.2 + Math.random() * 0.7 };

			for( let h = 0; h < pointCount; h++ ) {

				line.points.push({

					nx: h * spacingH,
					ny: v * spacingV

				});

			}
			
			line.points.push({

				nx: width + spacingH,
				ny: v * spacingV

			});
			
			lines.push( line );
			
		}
	
	}


	function update() {

		step += 0.8;
		
		canvas.width = width;
		canvas.height = height;

		context.clearRect( 0, 0, width, height );
		
		context.lineWidth = 2;
		context.strokeStyle = option_hero_background_lines_line_color;
		context.fillStyle = option_hero_background_lines_bg_color;
		
		lines.forEach(function (line, v) {

			context.beginPath();

			line.points.forEach(function (point, h) {

				point.x = point.nx, point.y = point.ny + Math.sin((point.x * line.ran + (step + point.ny)) / 40) * (6 + point.ny / height * 34);
			
			});

			line.points.forEach(function (point, h) {

				var nextPoint = line.points[h + 1];

				if (h === 0) {

					context.moveTo(point.x, point.y);

				} else if (nextPoint) {

					var cpx = point.x + (nextPoint.x - point.x) / 2;
					var cpy = point.y + (nextPoint.y - point.y) / 2;
					context.quadraticCurveTo(point.x, point.y, cpx, cpy);

				}

			});
			
			context.stroke();
			context.lineTo(width, height);
			context.lineTo(0, height);
			context.closePath();
			context.fill();

		});

		requestAnimationFrame(update);

	}


}



/** 7. TWISTED BACKGROUND
*******************************************************************/

function twistedBackground() {

	var canvas = document.getElementById("main").appendChild( document.createElement( 'canvas' ) ),
		context = canvas.getContext( '2d' ),

		width = window.innerWidth,
		height = window.innerHeight,

		radius = Math.min(  window.innerWidth, window.innerHeight ) * 1,

		// Number of layers
		quality = radius > 300 ? 180 : 90,

		// Layer instances
		layers = [],

		// Width/height of layers
		layerSize = radius * 0.3,

		// Layers that overlap to create the infinity illusion
		layerOverlap = Math.round( quality * 0.1 );

	canvas.setAttribute("id", "canvas-twisted");

	$("#canvas-twisted").css("opacity",option_hero_background_twisted_scene_opacity);
	$("#canvas-twisted").css("transform","translateX(" + option_hero_background_twisted_x_offset + ")");
	$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_twisted_bg_color + '"></div>');


	function initialize() {

		resize();
		update();

	}

	function resize() {

		width = window.innerWidth;
		height = window.innerHeight;

		canvas.width = width;
		canvas.height = height;

		radius = Math.min(window.innerWidth, window.innerHeight) * 1;
		layerSize = radius * 0.3;

		layerOverlap = Math.round( quality * 0.1 );

		layers = []

		for( var i = 0; i < quality; i++ ) {
			layers.push({
				x: window.innerWidth/1 + Math.sin(i / quality * 2 * Math.PI) * (radius - layerSize),
				y: window.innerHeight/2 + Math.cos(i / quality * 2 * Math.PI) * (radius - layerSize),
				r: ( i / quality ) * Math.PI
			});
		}

	} window.addEventListener("resize",resize)

	function update() {

		requestAnimationFrame( update );

		step();
		clear();
		paint();

	}

	// Takes a step in the simulation
	function step () {

		for( var i = 0, len = layers.length; i < len; i++ ) {

			layers[i].r += option_hero_background_twisted_speed;

		}

	}

	// Clears the painting
	function clear() {

		context.clearRect( 0, 0, canvas.width, canvas.height );

	}

	// Paints the current state
	function paint() {

		// Number of layers in total
		var layersLength = layers.length;

		// Draw the overlap layers
		for( var i = layersLength - layerOverlap, len = layersLength; i < len; i++ ) {

			context.save();
			context.globalCompositeOperation = 'destination-over';
			paintLayer( layers[i] );
			context.restore();

		}

		// Cut out the overflow layers using the first layer as a mask
		context.save();
		context.globalCompositeOperation = 'destination-in';
		paintLayer( layers[0], true );
		context.restore();

		// // Draw the normal layers underneath the overlap
		for( var i = 0, len = layersLength; i < len; i++ ) {

			context.save();
			context.globalCompositeOperation = 'destination-over';
			paintLayer( layers[i] );
			context.restore();

		}

	}

	// Pains one layer
	function paintLayer( layer, mask ) {

		size = layerSize + ( mask ? 10 : 0 );
		size2 = size / 2;

		context.translate( layer.x, layer.y );
		context.rotate( layer.r );

		// No stroke if this is a mask
		if( !mask ) {
			context.strokeStyle = option_hero_background_twisted_line_color;
			context.lineWidth = 1;
			context.strokeRect( -size2, -size2, size, size );
		}

		context.fillStyle = option_hero_background_twisted_fill_color;
		context.fillRect( -size2, -size2, size, size );

	}

	/* Polyfill */
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = 
				window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());

	initialize();

}