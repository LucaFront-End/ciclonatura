"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  RotateCw, 
  Clock, 
  CheckCircle2, 
  X, 
  MessageSquare,
  FileCheck,
  ChevronRight,
  Layers
} from "lucide-react";
import confetti from "canvas-confetti";

// Color presets for vehicle paint
const PAINT_COLORS = [
  { name: "Blanco Perla", hex: 0xf5f7fa, css: "#f5f7fa", textColor: "#0f172a" },
  { name: "Verde Ciclonatura", hex: 0x9be524, css: "#9be524", textColor: "#051021" },
  { name: "Azul SEMOVI", hex: 0x0284c7, css: "#0284c7", textColor: "#ffffff" },
  { name: "Plata Titanio", hex: 0x94a3b8, css: "#94a3b8", textColor: "#ffffff" },
  { name: "Negro Obsidiana", hex: 0x0f172a, css: "#0f172a", textColor: "#ffffff" },
];

// Interactive 3D hotspots linked to 3D coordinates
const HOTSPOTS = [
  {
    id: "placas",
    title: "Alta de Placas CDMX",
    category: "SEMOVI Oficial",
    time: "24-48 hrs",
    desc: "Emisión de placas nuevas para autos particulares y de empresa sin citas previas.",
    pos: new THREE.Vector3(0, 0.45, 2.2), // Front bumper
    badge: "Sin Citas"
  },
  {
    id: "verificacion",
    title: "Verificación Vehicular",
    category: "Holograma 00 / 0",
    time: "Mismo día",
    desc: "Aprobación de emisiones ambientales para circular todos los días sin multas.",
    pos: new THREE.Vector3(0, 0.95, 0.3), // Windshield
    badge: "100% Legal"
  },
  {
    id: "tarjeta",
    title: "Tarjeta de Circulación con Chip",
    category: "Reposición & Renovación",
    time: "48 hrs",
    desc: "Documento oficial indispensable para circular en CDMX, Edomex y Morelos.",
    pos: new THREE.Vector3(-0.75, 0.85, -0.4), // Driver cabin
    badge: "Oficial"
  },
  {
    id: "refrendo",
    title: "Refrendo & Tenencia al Día",
    category: "Regularización",
    time: "Inmediato",
    desc: "Eliminamos recargos y multas atrasadas directamente en el sistema estatal.",
    pos: new THREE.Vector3(-0.95, 0.35, -1.4), // Rear wheel
    badge: "Ahorro"
  }
];

export default function Minimalist3DHero({ onOpenSiteMap }: { onOpenSiteMap?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(PAINT_COLORS[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<typeof HOTSPOTS[0] | null>(null);
  const [screenCoords, setScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});
  const [modelLoading, setModelLoading] = useState(true);

  // References to three objects for interaction
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent canvas on top of light CSS gradient

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 1.8, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't go below floor
    controls.minPolarAngle = Math.PI / 6;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;

    // --- Lighting (Clean Automotive Studio Light Mode) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd9f99d, 1.2); // Soft lime tint fill
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4); // Clean cyan rim
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    // --- Shadow Ground Plane ---
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle reflective circle pad under car
    const padGeo = new THREE.CircleGeometry(2.8, 64);
    const padMat = new THREE.MeshBasicMaterial({ 
      color: 0x84cc16, 
      transparent: true, 
      opacity: 0.06 
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.rotation.x = -Math.PI / 2;
    pad.position.y = 0.005;
    scene.add(pad);

    // --- GLTF Loader with Draco ---
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/car.glb",
      (gltf) => {
        const car = gltf.scene;
        car.position.set(0, 0, 0);
        car.rotation.y = Math.PI / 4; // Nice dynamic angle
        car.scale.set(1.15, 1.15, 1.15);

        // Enhance materials
        car.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat && mat.name === "Body_Color") {
              // Create custom luxury car paint
              bodyMaterialRef.current = new THREE.MeshStandardMaterial({
                color: selectedColor.hex,
                metalness: 0.85,
                roughness: 0.18,
                envMapIntensity: 1.2
              });
              mesh.material = bodyMaterialRef.current;
            }
          }
        });

        scene.add(car);
        setModelLoading(false);
      },
      undefined,
      (err) => {
        console.error("Error loading car.glb:", err);
        setModelLoading(false);
      }
    );

    // --- Animation & Hotspot Projection Loop ---
    let animationFrameId: number;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);

      // Project 3D hotspots to 2D screen positions
      const newCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {};
      HOTSPOTS.forEach((spot) => {
        tempVec.copy(spot.pos);
        tempVec.project(camera);

        const x = (tempVec.x * 0.5 + 0.5) * width;
        const y = (-(tempVec.y * 0.5) + 0.5) * height;
        const visible = tempVec.z < 1; // In front of camera

        newCoords[spot.id] = { x, y, visible };
      });
      setScreenCoords(newCoords);
    };

    animate();

    // --- Resize Handler ---
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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update paint color dynamically
  const handleColorChange = (colorObj: typeof PAINT_COLORS[0]) => {
    setSelectedColor(colorObj);
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.setHex(colorObj.hex);
    }
  };

  // Toggle auto-rotation
  const toggleAutoRotate = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = next;
    }
  };

  const handleHotspotClick = (spot: typeof HOTSPOTS[0]) => {
    setActiveHotspot(spot);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#84cc16", "#0284c7", "#0f172a"]
    });
  };

  return (
    <section className="relative min-h-[92vh] w-full max-w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 flex flex-col justify-center pt-24 pb-12 select-none">
      
      {/* Background Decorative Rings in Light Mode */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-slate-200/80 -z-10" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-dashed border-slate-200/50 -z-10" />
      <div className="pointer-events-none absolute top-20 right-1/4 w-80 h-80 rounded-full bg-lime-100/40 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl -z-10" />

      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Minimalist Typography & Pitch */}
        <div className="lg:col-span-5 flex flex-col items-start z-10">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-heading">
              Gestoría Vehicular Digital • 100% Oficial
            </span>
          </motion.div>

          {/* Clean Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]"
          >
            Tu vehículo en regla,{" "}
            <span className="bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              sin filas
            </span>{" "}
            ni riesgos.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed max-w-lg"
          >
            Regularizamos placas, verificación y refrendo en <strong className="text-slate-900">CDMX, Edomex y Morelos</strong> 80% más rápido. Procesos 100% oficiales ante las autoridades, cero coyotes y seguimiento en tiempo real vía WhatsApp.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 mt-7"
          >
            <a
              href="https://wa.me/525548116379?text=Hola%20Ciclonatura,%20quiero%20iniciar%20mi%20trámite%20vehicular"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-slate-950/15 transition-all hover:-translate-y-0.5"
            >
              <span>Comenzar mi trámite</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="https://wa.me/525548116379?text=Hola%20Ciclonatura,%20deseo%20asesoría%20con%20un%20ejecutivo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-heading font-semibold text-sm px-5 py-3.5 rounded-full border border-slate-200 shadow-xs transition-all hover:-translate-y-0.5"
            >
              <MessageSquare size={16} className="text-emerald-600" />
              <span>Cotizar por WhatsApp</span>
            </a>

            {onOpenSiteMap && (
              <button
                onClick={onOpenSiteMap}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-2 px-3 cursor-pointer"
              >
                <Layers size={14} />
                <span>Mapa de secciones</span>
              </button>
            )}
          </motion.div>

          {/* Color Switcher Widget */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 w-full max-w-md">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
              <span>Personalizar acabado 3D del auto:</span>
              <span className="font-bold text-slate-800 font-heading">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {PAINT_COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleColorChange(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                    selectedColor.name === c.name 
                      ? "border-slate-950 scale-110 shadow-sm" 
                      : "border-slate-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.css }}
                  title={c.name}
                >
                  {selectedColor.name === c.name && (
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: c.textColor }} 
                    />
                  )}
                </button>
              ))}

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <button
                onClick={toggleAutoRotate}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                  autoRotate 
                    ? "bg-slate-900 text-white border-slate-900" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <RotateCw size={11} className={autoRotate ? "animate-spin" : ""} />
                <span>Auto-giro</span>
              </button>
            </div>
          </div>

          {/* Trust Counters */}
          <div className="grid grid-cols-4 gap-4 mt-7 pt-5 border-t border-slate-200/80 w-full max-w-md">
            {[
              { val: "+1,000", label: "Trámites" },
              { val: "80%", label: "Más rápido", highlight: true },
              { val: "100%", label: "Oficial" },
              { val: "99%", label: "Satisfacción" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className={`font-heading text-lg font-extrabold ${stat.highlight ? 'text-lime-600' : 'text-slate-900'}`}>
                  {stat.val}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Interactive 3D Model Canvas */}
        <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] w-full flex items-center justify-center">
          
          {/* Loading Indicator */}
          {modelLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-slate-50/60 backdrop-blur-xs">
              <div className="w-10 h-10 border-3 border-slate-200 border-t-lime-500 rounded-full animate-spin" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Cargando modelo 3D del vehículo...
              </span>
            </div>
          )}

          {/* Three.js Canvas Container */}
          <div 
            ref={mountRef} 
            className="w-full h-full cursor-grab active:cursor-grabbing relative"
            title="Arrastra con el mouse para girar el auto 360°"
          />

          {/* Interactive Floating Hotspots Overlay (Projected from 3D space) */}
          {!modelLoading && HOTSPOTS.map((spot) => {
            const coords = screenCoords[spot.id];
            if (!coords || !coords.visible) return null;

            return (
              <div
                key={spot.id}
                style={{
                  position: "absolute",
                  left: `${coords.x}px`,
                  top: `${coords.y}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 25,
                  pointerEvents: "auto"
                }}
              >
                <button
                  onClick={() => handleHotspotClick(spot)}
                  className="group relative flex items-center gap-2 bg-white/95 hover:bg-white text-slate-900 px-3 py-1.5 rounded-full border border-slate-200/90 shadow-lg shadow-slate-900/10 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-lime-500/80 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse" />
                  <span className="text-xs font-bold font-heading whitespace-nowrap">
                    {spot.title}
                  </span>
                  <span className="text-[10px] font-semibold text-lime-800 bg-lime-100 px-1.5 py-0.5 rounded">
                    {spot.badge}
                  </span>
                </button>
              </div>
            );
          })}

          {/* Hint Overlay (Bottom of 3D Canvas) */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-[11px] font-mono tracking-wider text-slate-400 bg-white/80 border border-slate-200/70 px-3 py-1 rounded-full shadow-xs backdrop-blur-xs">
            Arrastra para rotar en 3D
          </div>

        </div>

      </div>

      {/* Hotspot Detail Modal */}
      <AnimatePresence>
        {activeHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full border border-lime-200 font-heading">
                  {activeHotspot.category}
                </span>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <h3 className="font-heading text-xl font-bold text-slate-900">
                {activeHotspot.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 mb-3">
                <Clock size={13} className="text-lime-600" />
                <span>Tiempo de entrega: <strong>{activeHotspot.time}</strong></span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {activeHotspot.desc} Gestión directa ante dependencias oficiales, sin filas, con comprobante fiscal y validez ante cualquier autoridad de tránsito.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/525548116379?text=Hola%20Ciclonatura,%20quiero%20cotizar%20${encodeURIComponent(activeHotspot.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all"
                >
                  Cotizar por WhatsApp
                </a>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
