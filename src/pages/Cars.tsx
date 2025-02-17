
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "@/components/Navbar";
import CarFilter from "@/components/CarFilter";
import CarGrid from "@/components/CarGrid";
import { Car } from "@/types/car";
import { motion } from "framer-motion";

// Mock data for initial development
const mockCars: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "M3",
    year: 2023,
    price: 75,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
    features: ["Automatic", "Leather Seats", "GPS"],
    fuelType: "Petrol",
    seatingCapacity: 5,
    transmission: "Automatic",
  },
  {
    id: "2",
    brand: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 65,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
    features: ["Automatic", "Sunroof", "Bluetooth"],
    fuelType: "Diesel",
    seatingCapacity: 5,
    transmission: "Automatic",
  },
];

const Cars = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threeJsContainerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 400);
    threeJsContainerRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a stylized car shape
    const geometry = new THREE.BoxGeometry(2, 1, 4);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xBFA181,
      metalness: 0.9,
      roughness: 0.1,
    });
    const car = new THREE.Mesh(geometry, material);
    scene.add(car);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      car.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      if (threeJsContainerRef.current) {
        threeJsContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      
      {/* 3D Car Model Header */}
      <div 
        ref={threeJsContainerRef} 
        className="w-full h-[400px] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-dark/20 backdrop-blur-sm" />
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white text-center z-10"
        >
          Discover Luxury
        </motion.h1>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CarFilter onFilterChange={setFilteredCars} cars={mockCars} />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CarGrid cars={filteredCars} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
