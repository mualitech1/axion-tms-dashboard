import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Stars array - moved before handleResize to fix the reference error
    const stars: {x: number; y: number; radius: number; color: string; speed: number}[] = [];
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create stars
    function createStars() {
      const starCount = Math.floor(canvas.width * canvas.height / 1000);
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const brightness = Math.random();
        const colorValue = Math.floor(190 + brightness * 65);
        const color = `rgba(${colorValue}, ${colorValue}, ${colorValue + 20}, ${0.5 + brightness * 0.5})`;
        const speed = 0.05 + Math.random() * 0.1;
        
        stars.push({ x, y, radius, color, speed });
      }
    }
    
    // Draw stars on canvas
    function drawStars() {
      if (!ctx || !canvas) return;
      
      // Create a night sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1029');   // Deep space blue at top
      gradient.addColorStop(0.5, '#0c1650');  // Middle blue/purple
      gradient.addColorStop(1, '#0f0f36');   // Darker blue at bottom
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // If stars array is empty, create stars
      if (stars.length === 0) {
        createStars();
      }
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
    }
    
    // Animate stars
    function animateStars() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStars();
      
      // Move stars
      stars.forEach(star => {
        // Subtle twinkling effect
        star.radius = Math.max(0.1, star.radius + (Math.random() > 0.5 ? 0.01 : -0.01));
        
        // Slow movement across the sky
        star.y -= star.speed;
        
        // Reset star position if it goes off screen
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animateStars);
    }
    
    // Add cosmic nebula effect
    function drawNebula() {
      if (!ctx || !canvas) return;
      
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 100 + Math.random() * 200;
        
        const colors = [
          'rgba(63, 0, 100, 0.03)',  // Purple
          'rgba(0, 30, 100, 0.03)',  // Blue
          'rgba(0, 50, 100, 0.02)'   // Light blue
        ];
        
        const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, colors[i]);
        grd.addColorStop(1, 'rgba(0, 0, 30, 0)');
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    drawStars();
    drawNebula();
    animateStars();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SpaceBackground; 