"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Cached Draco Loader
let cachedDracoLoader: DRACOLoader | null = null;
function getDracoLoader() {
  if (!cachedDracoLoader) {
    cachedDracoLoader = new DRACOLoader();
    cachedDracoLoader.setDecoderPath("/draco/");
  }
  return cachedDracoLoader;
}

// Auto-fit model inside target bounding box
function fitModel(object: THREE.Object3D, targetSize: number = 2.4) {
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

export type IsometricSceneType =
  | "inspection-dyno"
  | "legal-gears"
  | "express-chronos"
  | "security-vault";

interface IsometricSceneProps {
  type: IsometricSceneType;
  className?: string;
}

export default function IsometricScene({ type, className = "" }: IsometricSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    // --- 1. Scene & True Isometric Orthographic Camera ---
    const scene = new THREE.Scene();

    // Exact 30-degree isometric projection (Orthographic, no perspective distortion)
    const aspect = width / height;
    const frustumSize = 4.2;
    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      100
    );

    // Standard true isometric camera position: 45deg azimuth, ~35.264deg elevation (atan(1/sqrt(2)))
    const isoDist = 20;
    camera.position.set(isoDist, isoDist * 0.8165, isoDist);
    camera.lookAt(0, 0, 0);

    // --- 2. WebGL Renderer with High Performance & Alpha ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- 3. Studio Lighting & Ambient Occlusion ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(12, 18, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Signature Ciclonatura Lime Rim Light
    const limeRimLight = new THREE.DirectionalLight(0x84cc16, 1.8);
    limeRimLight.position.set(-10, 8, -12);
    scene.add(limeRimLight);

    // Soft sky fill light
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    fillLight.position.set(4, 5, -8);
    scene.add(fillLight);

    // Root group for the scene
    const sceneRoot = new THREE.Group();
    scene.add(sceneRoot);

    let isDisposed = false;
    const loader = new GLTFLoader();
    loader.setDRACOLoader(getDracoLoader());

    // Update function callback array for continuous looping animations
    const animationCallbacks: ((elapsed: number) => void)[] = [];

    // --- Helper: Isometric Platform Base ---
    const createPlatformBase = (color = 0xf8fafc, accentColor = 0x84cc16) => {
      const baseGroup = new THREE.Group();

      // Chamfered circular/pill pedestal
      const pedGeo = new THREE.CylinderGeometry(2.1, 2.2, 0.22, 36);
      const pedMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.1,
      });
      const pedMesh = new THREE.Mesh(pedGeo, pedMat);
      pedMesh.position.y = -0.55;
      pedMesh.receiveShadow = true;
      baseGroup.add(pedMesh);

      // Neon accent perimeter ring
      const ringGeo = new THREE.TorusGeometry(2.18, 0.035, 16, 64);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = -0.44;
      baseGroup.add(ringMesh);

      // Soft ground shadow disc
      const shadowGeo = new THREE.CircleGeometry(2.35, 32);
      shadowGeo.rotateX(-Math.PI / 2);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.08,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.y = -0.66;
      baseGroup.add(shadowMesh);

      return baseGroup;
    };

    // ==========================================
    // SCENE 1: Inspection & Dyno Verification Station
    // ==========================================
    if (type === "inspection-dyno") {
      sceneRoot.add(createPlatformBase(0xffffff, 0x84cc16));

      // Dyno Roller Cylinders (animated rotation)
      const rollerGroup = new THREE.Group();
      const rollerGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.4, 24);
      rollerGeo.rotateZ(Math.PI / 2);
      const rollerMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.25,
      });

      const roller1 = new THREE.Mesh(rollerGeo, rollerMat);
      roller1.position.set(0, -0.4, 0.7);
      const roller2 = new THREE.Mesh(rollerGeo, rollerMat);
      roller2.position.set(0, -0.4, -0.7);
      rollerGroup.add(roller1, roller2);
      sceneRoot.add(rollerGroup);

      // Car on the inspection dyno
      const carGroup = new THREE.Group();
      sceneRoot.add(carGroup);

      loader.load(
        "/models/car.glb",
        (gltf) => {
          if (isDisposed) return;
          const car = gltf.scene;
          fitModel(car, 2.2);

          car.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat && mat.name === "Body_Color") {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xf8fafc,
                  metalness: 0.85,
                  roughness: 0.18,
                  clearcoat: 1.0,
                });
              }
            }
          });

          // Orient car along the dyno axis
          car.position.set(0, -0.15, 0);
          car.rotation.y = Math.PI / 4;
          carGroup.add(car);
        },
        undefined,
        (err) => console.error("Error loading car in dyno:", err)
      );

      // Laser Scanner Beam (sweeps continuously back and forth)
      const laserArch = new THREE.Group();
      const archGeo = new THREE.TorusGeometry(1.6, 0.05, 12, 32, Math.PI);
      const archMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.2,
      });
      const archMesh = new THREE.Mesh(archGeo, archMat);
      laserArch.add(archMesh);

      // Holographic laser fan
      const laserPlaneGeo = new THREE.PlaneGeometry(3.0, 1.4);
      const laserPlaneMat = new THREE.MeshBasicMaterial({
        color: 0x84cc16,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const laserPlane = new THREE.Mesh(laserPlaneGeo, laserPlaneMat);
      laserPlane.position.y = -0.7;
      laserArch.add(laserPlane);

      // Laser emitter bar
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.1, 16);
      barGeo.rotateZ(Math.PI / 2);
      const barMat = new THREE.MeshBasicMaterial({ color: 0xa3e635 });
      const barMesh = new THREE.Mesh(barGeo, barMat);
      laserArch.add(barMesh);

      laserArch.rotation.y = Math.PI / 4;
      sceneRoot.add(laserArch);

      // Continuous loop animation: dyno rollers spinning + laser beam sweeping
      animationCallbacks.push((elapsed) => {
        roller1.rotation.x = elapsed * 6;
        roller2.rotation.x = elapsed * 6;
        // Sweep laser along the car length
        const sweep = Math.sin(elapsed * 2.2) * 0.9;
        laserArch.position.set(sweep * 0.707, 0.3, sweep * 0.707);
        // Subtle car suspension oscillation
        carGroup.position.y = Math.sin(elapsed * 12) * 0.015;
      });
    }

    // ==========================================
    // SCENE 2: Legal Gears & Official Cotejo
    // ==========================================
    else if (type === "legal-gears") {
      sceneRoot.add(createPlatformBase(0xffffff, 0x0284c7));

      const gearsContainer = new THREE.Group();
      sceneRoot.add(gearsContainer);

      loader.load(
        "/models/gears.glb",
        (gltf) => {
          if (isDisposed) return;
          const gears = gltf.scene;
          fitModel(gears, 2.2);

          gears.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.material = new THREE.MeshStandardMaterial({
                color: 0x94a3b8,
                metalness: 0.95,
                roughness: 0.18,
              });
            }
          });

          gears.position.set(0, 0.1, 0);
          gearsContainer.add(gears);
        },
        undefined,
        (err) => console.error("Error loading gears in bento:", err)
      );

      // Holographic Security Cotejo Rings
      const ring1Geo = new THREE.TorusGeometry(1.6, 0.025, 16, 48);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.75,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 2.5;

      const ring2Geo = new THREE.TorusGeometry(1.9, 0.02, 16, 48);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x84cc16,
        transparent: true,
        opacity: 0.65,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 3;

      sceneRoot.add(ring1, ring2);

      // Floating 3D Checkmark Tablet
      const docShape = new THREE.Shape();
      docShape.moveTo(-0.45, -0.6);
      docShape.lineTo(0.45, -0.6);
      docShape.lineTo(0.45, 0.6);
      docShape.lineTo(-0.45, 0.6);
      docShape.closePath();
      const docGeo = new THREE.ExtrudeGeometry(docShape, {
        depth: 0.06,
        bevelEnabled: true,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      });
      const docMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
      });
      const docMesh = new THREE.Mesh(docGeo, docMat);
      docMesh.position.set(0.9, 0.5, -0.5);
      docMesh.rotation.set(-0.2, -0.4, 0.1);
      sceneRoot.add(docMesh);

      // Continuous loop animation: gears turning + rings spinning + doc levitation
      animationCallbacks.push((elapsed) => {
        gearsContainer.rotation.z = elapsed * 0.9;
        gearsContainer.position.y = Math.sin(elapsed * 2.0) * 0.06;
        ring1.rotation.z = elapsed * 0.7;
        ring2.rotation.x = -elapsed * 0.5;
        docMesh.position.y = 0.5 + Math.sin(elapsed * 2.5) * 0.08;
      });
    }

    // ==========================================
    // SCENE 3: Express 24h & Precision Chronos
    // ==========================================
    else if (type === "express-chronos") {
      sceneRoot.add(createPlatformBase(0xffffff, 0x84cc16));

      const watchContainer = new THREE.Group();
      sceneRoot.add(watchContainer);

      loader.load(
        "/models/watch.glb",
        (gltf) => {
          if (isDisposed) return;
          const watch = gltf.scene;
          fitModel(watch, 2.2);
          watch.position.set(0, 0.1, 0);
          watchContainer.add(watch);
        },
        undefined,
        (err) => console.error("Error loading watch in bento:", err)
      );

      // Pulsing Radar / Speed Wave Rings
      const waveGeo = new THREE.RingGeometry(0.8, 0.88, 36);
      waveGeo.rotateX(-Math.PI / 2);
      const waveMat = new THREE.MeshBasicMaterial({
        color: 0x84cc16,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const wave1 = new THREE.Mesh(waveGeo, waveMat);
      wave1.position.y = -0.45;
      sceneRoot.add(wave1);

      const wave2 = wave1.clone();
      sceneRoot.add(wave2);

      // Continuous loop animation: watch rotating & bobbing + radar waves expanding
      animationCallbacks.push((elapsed) => {
        watchContainer.rotation.y = elapsed * 0.7;
        watchContainer.position.y = Math.sin(elapsed * 2.2) * 0.1;

        // Expanding radar rings
        const scale1 = ((elapsed * 0.8) % 1) * 2.2 + 0.6;
        wave1.scale.set(scale1, scale1, scale1);
        (wave1.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (scale1 - 0.6) / 2.2);

        const scale2 = (((elapsed * 0.8) + 0.5) % 1) * 2.2 + 0.6;
        wave2.scale.set(scale2, scale2, scale2);
        (wave2.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (scale2 - 0.6) / 2.2);
      });
    }

    // ==========================================
    // SCENE 4: Security Vault & Official Shield
    // ==========================================
    else if (type === "security-vault") {
      sceneRoot.add(createPlatformBase(0xffffff, 0x10b981));

      // Isometric Vault Chamber / Security Cube
      const vaultGroup = new THREE.Group();
      sceneRoot.add(vaultGroup);

      // Extruded 3D Security Shield
      const shape = new THREE.Shape();
      shape.moveTo(0, 1.15);
      shape.lineTo(0.85, 0.75);
      shape.lineTo(0.7, -0.28);
      shape.quadraticCurveTo(0, -1.05, 0, -1.15);
      shape.quadraticCurveTo(0, -1.05, -0.7, -0.28);
      shape.lineTo(-0.85, 0.75);
      shape.closePath();

      const shieldGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.08,
        bevelThickness: 0.08,
      });
      shieldGeo.center();

      const shieldMat = new THREE.MeshStandardMaterial({
        color: 0x84cc16,
        metalness: 0.9,
        roughness: 0.16,
      });
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
      vaultGroup.add(shieldMesh);

      // Raised Chrome 3D Checkmark
      const checkShape = new THREE.Shape();
      checkShape.moveTo(-0.35, 0.0);
      checkShape.lineTo(-0.12, -0.28);
      checkShape.lineTo(0.38, 0.32);
      checkShape.lineTo(0.26, 0.42);
      checkShape.lineTo(-0.12, -0.12);
      checkShape.lineTo(-0.25, 0.1);
      checkShape.closePath();

      const checkGeo = new THREE.ExtrudeGeometry(checkShape, {
        depth: 0.1,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      });
      checkGeo.center();

      const checkMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.96,
        roughness: 0.08,
      });
      const checkMesh = new THREE.Mesh(checkGeo, checkMat);
      checkMesh.position.z = 0.22;
      vaultGroup.add(checkMesh);

      // Rotating Biometric Vault Locking Ring
      const dialGeo = new THREE.TorusGeometry(1.4, 0.06, 16, 48);
      const dialMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.12,
      });
      const dialMesh = new THREE.Mesh(dialGeo, dialMat);
      vaultGroup.add(dialMesh);

      // 4 Laser Security Nodes
      for (let i = 0; i < 4; i++) {
        const nodeAngle = (i * Math.PI) / 2;
        const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(nodeAngle) * 1.4, Math.sin(nodeAngle) * 1.4, 0.08);
        vaultGroup.add(node);
      }

      // Continuous loop animation: vault group floating + biometric dial rotating
      animationCallbacks.push((elapsed) => {
        vaultGroup.position.y = Math.sin(elapsed * 2.0) * 0.09;
        vaultGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.18;
        dialMesh.rotation.z = elapsed * 1.5;
      });
    }

    // --- 4. Main Animation Loop: Always Continuous 60fps ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Trigger all registered procedural continuous animations
      for (const cb of animationCallbacks) {
        cb(elapsed);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 5. Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const currentAspect = w / h;
      camera.left = (-frustumSize * currentAspect) / 2;
      camera.right = (frustumSize * currentAspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full flex items-center justify-center select-none pointer-events-none bg-transparent ${className}`}
    />
  );
}
