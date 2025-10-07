'use client';
import { useEffect, useState, useRef } from 'react';
import { redirect } from "next/navigation";
import * as THREE from 'three';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere distribution
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Gradient colors (purple to pink to blue)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.58;     // R
        colors[i + 1] = 0.29; // G
        colors[i + 2] = 0.98; // B (purple)
      } else if (colorChoice < 0.66) {
        colors[i] = 0.98;     // R
        colors[i + 1] = 0.29; // G
        colors[i + 2] = 0.64; // B (pink)
      } else {
        colors[i] = 0.29;     // R
        colors[i + 1] = 0.59; // G
        colors[i + 2] = 0.98; // B (blue)
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 25;

    // Animation
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.15;
      particles.rotation.x = elapsedTime * 0.1;

      // Pulsating effect
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
      particles.scale.set(scale, scale, scale);

      // Wave motion
      const positionsArray = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount * 3; i += 3) {
        const x = positionsArray[i];
        const y = positionsArray[i + 1];
        const z = positionsArray[i + 2];
        
        positionsArray[i + 1] = y + Math.sin(elapsedTime + x * 0.5) * 0.02;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const minDisplayTime = 2000;
      const startTime = Date.now();

      const getStoredToken = () => {
        try {
          const authData = JSON.parse(localStorage.getItem("authData"));
          if (!authData) return null;

          const now = new Date().getTime();
          if (now > authData.expiry) {
            localStorage.removeItem("authData");
            return null;
          }

          return authData?.user?.isVerified;
        } catch (error) {
          return null;
        }
      };

      const isVerified = getStoredToken();
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      await new Promise(resolve => setTimeout(resolve, remainingTime));

      if (isVerified) {
        console.log("✅ You are Verifed Successfully, redirecting to dashboard");
        redirect("/dashboard");
      } else {
        console.log("❌ Your are not Verified, redirecting to auth");
        redirect("/auth");
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
          <div className="text-center">
            {/* Animated Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-10 h-10 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              Welcome
            </h1>
            
            <p className="text-xl text-white/90 mb-8 font-light">
              Preparing your experience
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Bottom hint text */}
        <p className="mt-12 text-white/60 text-sm animate-pulse">
          Loading assets and checking authentication...
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}