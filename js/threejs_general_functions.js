
function set_camera_defaults() {
	camera.position.set(0,0,500);
	/*camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 250;*/
}

function set_controls_defaults() {
	controls.movementSpeed = 150;
	controls.lookSpeed = 0.1;
	controls.lat = 0;
	controls.lon = -80;
	//controls.activeLook = false;
}
function set_renderer_defaults() {
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;

	renderer.shadowCameraNear = 3;
	renderer.shadowCameraFar = camera.far;
	renderer.shadowCameraFov = 50;

	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = 1024;
	renderer.shadowMapHeight = 1024;
}

function set_light_defaults() {
	directionalLight.position.set(100,100,500);
	directionalLight.castShadow = true;
	directionalLight.shadowCameraVisible = true;

	Preproom_addTo(light);
	Preproom_addTo(directionalLight);
}

function TestParticle_addTo(ref_obj) {
	test_particle.push(ref_obj);
}

function TestParticle_loadup() {
	for (var i=0; i < test_particle.length; i++) {
		prep_room.push(test_particle[i]);
	}
}

function Preproom_addTo(ref_obj) {
	prep_room.push(ref_obj); 
}

function Preproom_loadup() {
	for (var i=0; i < prep_room.length; i++) {
		backstage.push(prep_room[i]);
	}
}

function Backstage_loadup() {
	for (var i=0; i < backstage.length; i++) {
		//console.log(backstage[i]);
		scene.add(backstage[i]);
	}
}

function create_particle_system(color, size, particle_map, particleCount) {
	var particleCount = particleCount,
		particles = new THREE.Geometry(),
		pMaterial = new THREE.ParticleBasicMaterial({
			color: color,
			size: size,
			map: THREE.ImageUtils.loadTexture(
				particle_map
			),
			blending: THREE.AdditiveBlending,
			transparent: true,
			opacity: 0.7,
		})

	for (var i = 0; i < particleCount; i++) {
		var spread = 500,
			pX = Math.random() * spread - (spread/2),
			pY = Math.random() * spread - (spread/2),
			pZ = Math.random() * spread - (spread/2),
			particle = new THREE.Vector3(
				new THREE.Vector3(pX, pY, pZ)
			);

		particle.animating = true;
		particle.animated = true;

		particle.velocity = new THREE.Vector3(0,-Math.random(),0);
		particle.velocity_die_interval = 0;
		particles.vertices.push(particle);
	}

	var particleSystem = new THREE.ParticleSystem(
	    particles,
	    pMaterial);

	particleSystem.animating = false;
	particleSystem.animate_time = 0;
	particleSystem.animated = false;

	particleSystem.spread = 500;
	particleSystem.particle = particles;
	particleSystem.particleCount = particleCount;
	particleSystem.sortParticles = true;
	particleSystem.verticesNeedUpdate = true;

	prep_room.push(particleSystem);

	return particleSystem;
}

function create_particle_system_firework(color, size, particle_map, particleCount,prev_position) {
	var particleCount = particleCount,
		particles = new THREE.Geometry(),
		pMaterial = new THREE.ParticleBasicMaterial({
			color: color,
			size: size,
			map: THREE.ImageUtils.loadTexture(
				particle_map
			),
			blending: THREE.AdditiveBlending,
			transparent: true,
			opacity: 0.7,
		})

	for (var i = 0; i < particleCount; i++) {
		var pX = prev_position[0],//Math.random() * spread - (spread/2),
			pY = prev_position[1],//Math.random() * spread - (spread/2),
			pZ = prev_position[2],//Math.random() * spread - (spread/2),
			particle = new THREE.Vertex(
				new THREE.Vector3(pX, pY, pZ)
			);

		particle.rotation = new THREE.Euler( 0, 0, 0, 'XYZ' );
		particle.velocity = new THREE.Vector3((-Math.random()*3-4),0,0);
		particle.velocity_die_interval = 0;
		particles.vertices.push(particle);
	}

	var particleSystem = new THREE.ParticleSystem(
	    particles,
	    pMaterial);

	particleSystem.particle = particles;
	particleSystem.particleCount = particleCount;
	particleSystem.sortParticles = true;
	particleSystem.verticesNeedUpdate = true;

	TestParticle_addTo(particleSystem);
	TestParticle_loadup();

	return particleSystem;
}