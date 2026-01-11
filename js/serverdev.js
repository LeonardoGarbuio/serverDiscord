// Import Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log("SYSTEM // DRONE CONNECTED - V_FINAL_ROTATION_FIX");

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// === 3D ENGINE SETUP ===
const container = document.getElementById('drone-container');

if (container) {
    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 0;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 20);
    spotLight.position.set(2, 5, 5);
    scene.add(spotLight);

    const rimLight = new THREE.PointLight(0xffffff, 10);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    // 4. Load Drone GLB
    const loader = new GLTFLoader();
    let drone = null;
    let mixer = null;

    loader.load(
        'medium_-_cute_robo-drone.glb',
        (gltf) => {
            drone = gltf.scene;

            // === INITIAL POSITION: RIGHT SIDE (HERO) ===
            // Start visible and safe
            drone.scale.set(1.5, 1.5, 1.5);
            drone.position.set(2.2, -0.5, 0);
            drone.rotation.set(0, -0.1, 0);

            if (gltf.animations.length) {
                mixer = new THREE.AnimationMixer(drone);
                gltf.animations.forEach(clip => mixer.clipAction(clip).play());
            }

            scene.add(drone);
            console.log("DRONE ACTIVE AND READY");

            // === SCROLL ANIMATION TIMELINE ===
            setupScrollAnimation(drone);
        },
        undefined,
        (error) => console.error('ERROR:', error)
    );

    // 5. Scroll Interaction (GSAP) - FINAL ZIG ZAG & ROTATION
    function setupScrollAnimation(model) {
        if (!model) return;

        // Force reset
        model.position.set(2.2, -0.5, 0);
        model.rotation.set(0, -0.1, 0);

        // MASTER TIMELINE
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scrolly-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });

        // 1. HERO (Right) -> VERIFICATION (Fly LEFT)
        // Sec 1 Text is Right. Drone goes LEFT.
        // Left Side needs POSITIVE rotation to look Right (Center).
        tl.to(model.position, {
            x: -2.2,  // Safe Visible Left
            y: 0.2,
            z: 0.5,
            duration: 1,
            ease: "power2.inOut"
        }, "sec1")
            .to(model.rotation, {
                y: 0.3,   // Look RIGHT (Towards Text) -> FIXED
                z: -0.1,
                duration: 1
            }, "sec1");

        // 2. VERIFICATION (Left) -> SALES (Fly RIGHT)
        // Sec 2 Text is Left. Drone goes RIGHT.
        // Right Side needs NEGATIVE rotation to look Left (Center).
        tl.to(model.position, {
            x: 2.2,   // Safe Visible Right
            y: 0,
            z: 0.5,
            duration: 1,
            ease: "power2.inOut"
        }, "sec2")
            .to(model.rotation, {
                y: -0.3,   // Look LEFT (Towards Text) -> FIXED
                z: 0.1,
                duration: 1
            }, "sec2");

        // 3. SALES (Right) -> WEBSITES (Fly LEFT)
        // Sec 3 Text is Right. Drone goes LEFT.
        // Left Side needs POSITIVE rotation.
        tl.to(model.position, {
            x: -2.2,  // Safe Visible Left
            y: 0,
            z: 0.8,
            duration: 1,
            ease: "power2.inOut"
        }, "sec3")
            .to(model.rotation, {
                y: 0.3,  // Look RIGHT (Towards Text) -> FIXED
                z: -0.1,
                duration: 1
            }, "sec3");

        // 4. WEBSITES (Left) -> PLANS (Fly Right Side - Companion)
        tl.to(model.position, {
            x: 2.2,
            y: -0.2,
            z: 1.0,
            duration: 1,
            ease: "power2.inOut"
        }, "sec4")
            .to(model.rotation, {
                y: -0.2,
                x: 0,
                z: 0,
                duration: 1
            }, "sec4");

        console.log("Timeline Setup Complete");
    }

    // 6. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
    }
    animate();

    // 7. Resize logic
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 8. Navigation Active State
    // DISABLED for Multi-Page Structure (Pages have hardcoded active states)
    /*
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.dock-icon');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active to current
                const id = entry.target.getAttribute('id');
                let targetHref = `#${id}`;

                // Map missing sections to "Serviços" (verification)
                if (id === 'sales' || id === 'websites') {
                    targetHref = '#verification';
                }

                const activeLink = document.querySelector(`.dock-icon[href="${targetHref}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    */
}
