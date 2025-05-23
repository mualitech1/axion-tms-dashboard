import { useEffect, useRef } from 'react';

const SpaceSettingsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Stars array - defined before it's used
    const stars: {x: number; y: number; radius: number; color: string; speed: number; pulse: number}[] = [];
    // Add a collection for cosmic anomalies (larger particles)
    const anomalies: {x: number; y: number; radius: number; color: string; pulse: number}[] = [];
    
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
        // Using more purple/indigo hues for the settings theme
        const color = `rgba(${colorValue - 20}, ${colorValue - 40}, ${colorValue + 30}, ${0.5 + brightness * 0.5})`;
        const speed = 0.03 + Math.random() * 0.08;
        const pulse = Math.random() * 2;
        
        stars.push({ x, y, radius, color, speed, pulse });
      }
      
      // Create cosmic anomalies - larger glowing particles
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 5 + Math.random() * 10;
        const hue = Math.floor(240 + Math.random() * 60); // Purple to blue hues
        const color = `hsla(${hue}, 80%, 60%, 0.2)`;
        const pulse = Math.random() * 2;
        
        anomalies.push({ x, y, radius, color, pulse });
      }
    }
    
    // Draw stars on canvas
    function drawStars() {
      if (!ctx || !canvas) return;
      
      // Create a night sky gradient - deeper purple for settings
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f0729');   // Deep purple at top
      gradient.addColorStop(0.5, '#160d42');  // Middle blue/purple
      gradient.addColorStop(1, '#0e0e36');   // Darker blue at bottom
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // If stars array is empty, create stars
      if (stars.length === 0) {
        createStars();
      }
      
      // Draw cosmic anomalies with glow
      anomalies.forEach(anomaly => {
        // Pulsing glow effect
        const currentRadius = anomaly.radius * (1 + 0.3 * Math.sin(anomaly.pulse));
        
        // Create glow
        const glow = ctx.createRadialGradient(
          anomaly.x, anomaly.y, 0,
          anomaly.x, anomaly.y, currentRadius * 4
        );
        glow.addColorStop(0, anomaly.color.replace('0.2', '0.4'));
        glow.addColorStop(1, 'rgba(0, 0, 60, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(anomaly.x, anomaly.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core
        ctx.fillStyle = anomaly.color.replace('0.2', '0.8');
        ctx.beginPath();
        ctx.arc(anomaly.x, anomaly.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update pulse
        anomaly.pulse += 0.01;
      });
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
      
      // Add subtle horizontal wormhole/data transfer lines in various places
      for (let i = 0; i < 3; i++) {
        const y = Math.random() * canvas.height;
        const width = 100 + Math.random() * 300;
        const x = Math.random() * (canvas.width - width);
        
        const lineGradient = ctx.createLinearGradient(x, y, x + width, y);
        lineGradient.addColorStop(0, 'rgba(100, 70, 255, 0)');
        lineGradient.addColorStop(0.5, `rgba(100, 70, 255, ${0.1 + Math.random() * 0.2})`);
        lineGradient.addColorStop(1, 'rgba(100, 70, 255, 0)');
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
      }
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
        
        // Diagonal movement for settings theme, from top-right to bottom-left
        star.x -= star.speed * 0.5;
        star.y += star.speed;
        
        // Reset star position if it goes off screen
        if (star.y > canvas.height + 5 || star.x < -5) {
          star.y = -5;
          star.x = Math.random() * canvas.width + canvas.width * 0.2;
        }
        
        // Update pulse
        star.pulse += 0.05;
      });
      
      // Move anomalies very slowly
      anomalies.forEach(anomaly => {
        anomaly.x -= 0.05;
        anomaly.y += 0.05;
        
        // Reset position if off screen
        if (anomaly.y > canvas.height + 20 || anomaly.x < -20) {
          anomaly.y = -20;
          anomaly.x = Math.random() * canvas.width + 20;
        }
      });
      
      requestAnimationFrame(animateStars);
    }
    
    // Add cosmic nebula effect
    function drawNebula() {
      if (!ctx || !canvas) return;
      
      for (let i = 0; i < 4; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 120 + Math.random() * 250;
        
        const colors = [
          'rgba(70, 0, 120, 0.03)',  // Deep Purple
          'rgba(120, 0, 150, 0.02)',  // Purple
          'rgba(20, 0, 120, 0.02)',   // Blue
          'rgba(70, 20, 150, 0.02)'   // Indigo
        ];
        
        const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, colors[i]);
        grd.addColorStop(1, 'rgba(0, 0, 40, 0)');
        
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

export default SpaceSettingsBackground; 