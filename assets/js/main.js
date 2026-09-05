document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle"),
    nav = document.querySelector(".nav");
  if (toggle && nav)
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  document
    .querySelectorAll(".nav a")
    .forEach((a) =>
      a.addEventListener("click", () => nav?.classList.remove("open")),
    );
  const pre = document.querySelector(".preloader");
  if (pre) setTimeout(() => pre.classList.add("hide"), 450);

  if (document.getElementById("hero-canvas") && typeof THREE !== "undefined") {
    const canvas = document.getElementById("hero-canvas"),
      scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      innerWidth / innerHeight,
      0.1,
      100,
    );
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(innerWidth, innerHeight);
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.IcosahedronGeometry(2.15, 2);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: 0xcfcfcb,
        roughness: 0.22,
        metalness: 0.85,
      }),
    );
    group.add(mesh);
    const goldRing = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.45, 0.12, 160, 16, 2, 3),
      new THREE.MeshStandardMaterial({
        color: 0xd6a52f,
        roughness: 0.2,
        metalness: 0.9,
      }),
    );
    goldRing.rotation.x = 1.1;
    group.add(goldRing);
    group.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.14,
        }),
      ),
    );
    const light = new THREE.PointLight(0xffffff, 3, 20);
    light.position.set(3, 4, 6);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    let mx = 0,
      my = 0;
    addEventListener("pointermove", (e) => {
      mx = (e.clientX / innerWidth - 0.5) * 0.8;
      my = (e.clientY / innerHeight - 0.5) * 0.5;
    });
    function resize() {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }
    addEventListener("resize", resize);
    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.0025;
      group.rotation.x += 0.001;
      group.position.x +=
        mx - group.position.x * 0.12 - group.position.x * 0.03;
      group.position.y +=
        -my - group.position.y * 0.12 - group.position.y * 0.03;
      renderer.render(scene, camera);
    }
    animate();
  }
});
