import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Logo = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Создание сцены
    const scene = new THREE.Scene();

    // Создание камеры
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);

    // Добавление квадрата
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Функция анимации
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    // Добавление рендерера в контейнер и запуск анимации
    containerRef.current.appendChild(renderer.domElement);
    animate();

    // Обработка скроллинга
    const handleScroll = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    window.addEventListener('scroll', handleScroll);

    // Очистка обработчиков событий
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={containerRef}>hi</div>;
};

export default Logo;
