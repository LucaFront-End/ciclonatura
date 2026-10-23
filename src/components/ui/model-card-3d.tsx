"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Shared Draco Loader instance
let cachedDracoLoader: DRACOLoader | null = null;
function getDracoLoader() {
  if (!cachedDracoLoader) {
    cachedDracoLoader = new DRACOLoader();
    cachedDracoLoader.setDecoderPath("/draco/");
  }
  return cachedDracoLoader;
}

// Helper to auto-fit and center any 3D model
function fitModelToBox(object: THREE.Object3D, targetSize: number = 2.3) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.x -= center.x;
  object.position.y -= center.y;
  object.position.z -= center.z;

  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = targetSize / maxDim;
    object.scale.setScalar(scale);
  }
}

// Procedural 3D Automotive Sport Wheel & Ventilated Brake Caliper
function createSportWheelGroup(): THREE.Group {
  const group = new THREE.Group();

  // 1. Rubber Sport Tire
  const tireGeo = new THREE.TorusGeometry(1.0, 0.32, 28, 60);
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.9,
    metalness: 0.05,
  });
  const tireMesh = new THREE.Mesh(tireGeo, tireMat);
  group.add(tireMesh);

  // 2. Alloy Wheel Rim
  const rimGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.45, 36, 1, true);
  rimGeo.rotateX(Math.PI / 2);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.16,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  group.add(rimMesh);

  // 3. Center Hub
  const hubGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.5, 24);
  hubGeo.rotateX(Math.PI / 2);
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xAFF94F, // Ciclonatura lime emblem
    metalness: 0.85,
    roughness: 0.2,
  });
  const hubMesh = new THREE.Mesh(hubGeo, hubMat);
  group.add(hubMesh);

  // 4. 5 Sport Spokes
  const spokeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.14,
  });
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5;
    const spokeGeo = new THREE.BoxGeometry(0.13, 0.72, 0.16);
    const spoke = new THREE.Mesh(spokeGeo, spokeMat);
    spoke.position.set(Math.cos(angle) * 0.44, Math.sin(angle) * 0.44, 0.08);
    spoke.rotation.z = angle - Math.PI / 2;
    group.add(spoke);
  }

  // 5. Ventilated Brake Disc (Rotor)
  const discGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.04, 32);
  discGeo.rotateX(Math.PI / 2);
  const discMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.95,
    roughness: 0.3,
  });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discMesh.position.z = -0.06;
  group.add(discMesh);

  // 6. Red/Lime Sport Brembo-style Caliper
  const caliperGeo = new THREE.BoxGeometry(0.26, 0.42, 0.16);
  const caliperMat = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Red sport caliper
    metalness: 0.6,
    roughness: 0.2,
  });
  const caliperMesh = new THREE.Mesh(caliperGeo, caliperMat);
  caliperMesh.position.set(0.48, 0.28, -0.02);
  caliperMesh.rotation.z = -0.4;
  group.add(caliperMesh);

  return group;
}

// Procedural 3D Security Shield
function createShieldGroup(): THREE.Group {
  const group = new THREE.Group();

  const shape = new THREE.Shape();
  shape.moveTo(0, 1.25);
  shape.lineTo(0.95, 0.82);
  shape.lineTo(0.78, -0.32);
  shape.quadraticCurveTo(0, -1.15, 0, -1.25);
  shape.quadraticCurveTo(0, -1.15, -0.78, -0.32);
  shape.lineTo(-0.95, 0.82);
  shape.closePath();

  const extrudeSettings = {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  };
  const shieldGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  shieldGeo.center();

  // Emerald/Lime metallic body
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0xAFF94F,
    metalness: 0.85,
    roughness: 0.22,
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  group.add(shieldMesh);

  // Raised 3D Chrome Checkmark
  const checkShape = new THREE.Shape();
  checkShape.moveTo(-0.4, 0.0);
  checkShape.lineTo(-0.15, -0.32);
  checkShape.lineTo(0.42, 0.35);
  checkShape.lineTo(0.3, 0.45);
  checkShape.lineTo(-0.15, -0.15);
  checkShape.lineTo(-0.3, 0.1);
  checkShape.closePath();

  const checkGeo = new THREE.ExtrudeGeometry(checkShape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  checkGeo.center();
  const checkMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.95,
    roughness: 0.12,
  });
  const checkMesh = new THREE.Mesh(checkGeo, checkMat);
  checkMesh.position.z = 0.18;
  group.add(checkMesh);

  return group;
}

import { MotionValue } from "framer-motion";

export type ModelType = "car-white" | "car-lime" | "gears" | "shield" | "watch" | "wheel";

interface ModelCard3DProps {
  type: ModelType;
  progress?: MotionValue<number>;
}

export default function ModelCard3D({ type, progress }: ModelCard3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.25, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Studio Lighting for photorealistic floating metallic surfaces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Dynamic Lime Rim Light to enhance floating silhouette in space
    const rimLight = new THREE.DirectionalLight(0xa3e635, 1.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.1);
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let isDisposed = false;
    const loader = new GLTFLoader();
    loader.setDRACOLoader(getDracoLoader());

    // --- Load or construct specific 3D Model ---
    if (type === "car-white" || type === "car-lime") {
      loader.load(
        "/models/car.glb",
        (gltf) => {
          if (isDisposed) return;
          const car = gltf.scene;
          fitModelToBox(car, 2.5);

          const paintColor = type === "car-lime" ? 0xAFF94F : 0xf8fafc;
          car.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat && mat.name === "Body_Color") {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: paintColor,
                  metalness: 0.88,
                  roughness: 0.16,
                  clearcoat: 1.0,
                  clearcoatRoughness: 0.1,
                });
              }
            }
          });

          modelGroup.add(car);
        },
        undefined,
        (err) => console.error("Error loading car GLTF:", err)
      );
    } else if (type === "gears") {
      loader.load(
        "/models/gears.glb",
        (gltf) => {
          if (isDisposed) return;
          const gears = gltf.scene;
          fitModelToBox(gears, 2.3);

          gears.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x94a3b8,
                metalness: 0.95,
                roughness: 0.2,
              });
            }
          });

          modelGroup.add(gears);
        },
        undefined,
        (err) => console.error("Error loading gears GLTF:", err)
      );
    } else if (type === "watch") {
      loader.load(
        "/models/watch.glb",
        (gltf) => {
          if (isDisposed) return;
          const watch = gltf.scene;
          fitModelToBox(watch, 2.3);
          modelGroup.add(watch);
        },
        undefined,
        (err) => console.error("Error loading watch GLTF:", err)
      );
    } else if (type === "wheel") {
      const wheel = createSportWheelGroup();
      fitModelToBox(wheel, 2.3);
      modelGroup.add(wheel);
    } else if (type === "shield") {
      const shield = createShieldGroup();
      fitModelToBox(shield, 2.3);
      modelGroup.add(shield);
    }

    // Subtle pointer interactivity
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetPointerX = x * 0.25;
      targetPointerY = -y * 0.25;
    };

    const onPointerLeave = () => {
      targetPointerX = 0;
      targetPointerY = 0;
    };

    // Attach to window or container for smooth tracking
    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseleave", onPointerLeave);

    // --- Animation loop: STRICTLY SCROLL-DRIVEN ROTATION (NO constant spin) ---
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Current local progress (0 = far tunnel entrance, 1 = passed camera)
      // When progress is static, p is static => ZERO auto-rotation
      const p = progress ? progress.get() : 0.5;

      // Mouse interactive tilt (smooth lerp)
      currentPointerX += (targetPointerX - currentPointerX) * 0.08;
      currentPointerY += (targetPointerY - currentPointerY) * 0.08;

      // Dynamic rotation as the model advances forward:
      if (type === "car-white") {
        // Enters at 3/4 front angle, smoothly turns 140deg as it flies forward, revealing profile and alloy wheels
        modelGroup.rotation.y = -0.45 + p * 2.3 + currentPointerX;
        modelGroup.rotation.z = Math.sin(p * Math.PI) * 0.12;
        modelGroup.rotation.x = 0.08 + Math.sin(p * Math.PI) * 0.04 + currentPointerY;
        modelGroup.position.y = -0.04 + Math.sin(p * Math.PI) * 0.14;
      } else if (type === "car-lime") {
        // Opposite side banking for lime sports car
        modelGroup.rotation.y = 0.45 - p * 2.3 + currentPointerX;
        modelGroup.rotation.z = -Math.sin(p * Math.PI) * 0.12;
        modelGroup.rotation.x = 0.08 + Math.sin(p * Math.PI) * 0.04 + currentPointerY;
        modelGroup.position.y = -0.04 + Math.sin(p * Math.PI) * 0.14;
      } else if (type === "gears") {
        // Gear teeth rotate in exact unison with scroll forward
        modelGroup.rotation.z = p * Math.PI * 3.5;
        modelGroup.rotation.y = 0.35 + p * 0.7 + currentPointerX;
        modelGroup.rotation.x = 0.18 + currentPointerY;
        modelGroup.position.y = Math.sin(p * Math.PI) * 0.1;
      } else if (type === "shield") {
        // Enters angled, rotates to face camera at peak, bevel reflects light
        modelGroup.rotation.y = -0.7 + p * 1.4 + currentPointerX;
        modelGroup.rotation.x = Math.sin(p * Math.PI) * 0.14 + currentPointerY;
        modelGroup.rotation.z = Math.sin(p * Math.PI * 2) * 0.06;
        modelGroup.position.y = Math.sin(p * Math.PI) * 0.12;
      } else if (type === "watch") {
        // Chronograph turns showing bezel, dial and metal links
        modelGroup.rotation.y = 0.8 - p * 1.8 + currentPointerX;
        modelGroup.rotation.x = 0.22 + Math.sin(p * Math.PI) * 0.16 + currentPointerY;
        modelGroup.rotation.z = Math.sin(p * Math.PI) * 0.06;
        modelGroup.position.y = Math.sin(p * Math.PI) * 0.1;
      } else if (type === "wheel") {
        // Sport wheel rolls forward on tread as user scrolls down!
        modelGroup.rotation.x = p * Math.PI * 3.8 + currentPointerY;
        modelGroup.rotation.y = 0.32 + Math.sin(p * Math.PI) * 0.22 + currentPointerX;
        modelGroup.rotation.z = 0;
        modelGroup.position.y = Math.sin(p * Math.PI) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type, progress]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full flex items-center justify-center pointer-events-none select-none bg-transparent"
    />
  );
}
