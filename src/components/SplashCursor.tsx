"use client";

import React, { useEffect, useRef, useState } from 'react';

interface SplashCursorProps {
  className?: string;
}

const SplashCursor: React.FC<SplashCursorProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const clickIntensityRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_position * 0.5 + 0.5;
    }
  `;

  // Enhanced fragment shader for futuristic effects
  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_clickIntensity;
    varying vec2 v_texCoord;
    
    // Advanced noise functions
    float hash(float n) { return fract(sin(n) * 43758.5453123); }
    
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    // 3D noise for more complexity
    float noise3d(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    }
    
    // Smooth noise with better interpolation
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // Improved smoothstep
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // Enhanced fractal noise for organic textures
    float fractalNoise(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 6; i++) {
        value += amplitude * smoothNoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    // Voronoi-like cellular pattern for futuristic grid effect
    float voronoi(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      
      float minDist = 1.0;
      for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
          vec2 neighbor = vec2(float(x), float(y));
          vec2 point = neighbor + vec2(noise(i + neighbor), noise(i + neighbor + vec2(1.0, 1.0)));
          float dist = length(f - point);
          minDist = min(minDist, dist);
        }
      }
      
      return minDist;
    }
    
    // Electric arc effect
    float electricArc(vec2 p, vec2 start, vec2 end, float time) {
      vec2 line = end - start;
      float t = clamp(dot(p - start, line) / dot(line, line), 0.0, 1.0);
      vec2 projection = start + t * line;
      float dist = distance(p, projection);
      
      // Add electrical noise
      float electricNoise = fractalNoise(p * 20.0 + time * 5.0) * 0.1;
      dist += electricNoise;
      
      return 1.0 / (1.0 + dist * 100.0);
    }
    
    void main() {
      vec2 uv = v_texCoord;
      vec2 mouseNorm = u_mouse / u_resolution;
      vec2 prevMouseNorm = u_prevMouse / u_resolution;
      
      // Calculate distance and velocity
      float dist = distance(uv, mouseNorm);
      vec2 velocity = mouseNorm - prevMouseNorm;
      float speed = length(velocity) * 50.0;
      
      // Time-based animations
      float slowTime = u_time * 0.3;
      float fastTime = u_time * 2.0;
      
      // === FUTURISTIC EFFECTS ===
      
      // 1. Holographic Grid
      vec2 gridUV = uv * 30.0;
      float grid = abs(fract(gridUV.x - slowTime) - 0.5) / fwidth(gridUV.x) + 
                   abs(fract(gridUV.y - slowTime * 0.7) - 0.5) / fwidth(gridUV.y);
      grid = 1.0 - min(grid, 1.0);
      
      // 2. Energy Particles
      vec2 particleUV = uv * 15.0 + vec2(slowTime, slowTime * 0.8);
      float particles = 0.0;
      for(int i = 0; i < 5; i++) {
        vec2 particlePos = vec2(
          noise(vec2(float(i) * 12.34, slowTime * 0.5)) * 2.0 - 1.0,
          noise(vec2(float(i) * 23.45, slowTime * 0.3)) * 2.0 - 1.0
        );
        float particleDist = distance(uv, mouseNorm + particlePos * 0.3);
        particles += 1.0 / (1.0 + particleDist * 20.0);
      }
      
      // 3. Plasma Field
      vec2 plasmaUV = uv * 8.0;
      float plasma = sin(plasmaUV.x + fastTime) + 
                     sin(plasmaUV.y + fastTime * 1.3) + 
                     sin((plasmaUV.x + plasmaUV.y) * 0.5 + fastTime * 0.7) +
                     sin(sqrt(plasmaUV.x * plasmaUV.x + plasmaUV.y * plasmaUV.y) + fastTime * 1.5);
      plasma = plasma * 0.25 + 0.5;
      
      // 4. Neural Network Lines
      float neuralLines = 0.0;
      vec2 center = mouseNorm;
      for(int i = 0; i < 8; i++) {
        float angle = float(i) * 0.785398 + slowTime; // 45 degrees * i + time
        vec2 lineEnd = center + vec2(cos(angle), sin(angle)) * 0.3;
        neuralLines += electricArc(uv, center, lineEnd, fastTime) * 0.3;
      }
      
      // 5. Quantum Interference
      float quantumField = 0.0;
      for(int i = 0; i < 4; i++) {
        vec2 waveCenter = vec2(
          sin(slowTime * 0.7 + float(i) * 1.57) * 0.3,
          cos(slowTime * 0.5 + float(i) * 1.57) * 0.3
        ) + mouseNorm;
        float waveDist = distance(uv, waveCenter);
        quantumField += sin(waveDist * 25.0 - fastTime * 3.0) * exp(-waveDist * 5.0) * 0.3;
      }
      
      // 6. Velocity Trails
      float trail = 0.0;
      if(speed > 0.1) {
        vec2 trailDir = normalize(velocity);
        for(float t = 0.0; t < 1.0; t += 0.1) {
          vec2 trailPos = mouseNorm - trailDir * t * 0.2;
          float trailDist = distance(uv, trailPos);
          trail += (1.0 - t) * exp(-trailDist * 15.0) * speed;
        }
      }
      
      // 7. Voronoi Crystal Pattern
      vec2 crystalUV = uv * 12.0 + slowTime * 0.5;
      float crystal = voronoi(crystalUV);
      crystal = smoothstep(0.1, 0.9, crystal);
      
      // === COLOR COMPOSITION ===
      
      // Futuristic color palette
      vec3 cyan = vec3(0.0, 1.0, 1.0);
      vec3 magenta = vec3(1.0, 0.0, 1.0);
      vec3 electric = vec3(0.3, 0.8, 1.0);
      vec3 neon = vec3(1.0, 0.2, 0.8);
      vec3 quantum = vec3(0.5, 1.0, 0.3);
      vec3 plasma_color = vec3(0.8, 0.4, 1.0);
      
      // Dynamic color mixing based on effects
      vec3 baseColor = mix(cyan, electric, sin(slowTime) * 0.5 + 0.5);
      baseColor = mix(baseColor, neon, plasma);
      baseColor = mix(baseColor, quantum, sin(fastTime * 0.7) * 0.5 + 0.5);
      
      // Layer effects with different colors
      vec3 finalColor = vec3(0.0);
      
      // Grid contribution
      finalColor += grid * cyan * 0.8;
      
      // Particle contribution
      finalColor += particles * neon * 1.2;
      
      // Plasma contribution
      finalColor += plasma * 0.3 * plasma_color;
      
      // Neural lines contribution
      finalColor += neuralLines * electric * 2.0;
      
      // Quantum field contribution
      finalColor += quantumField * quantum * 0.8;
      
      // Velocity trail contribution
      finalColor += trail * magenta * 1.5;
      
      // Crystal pattern contribution
      finalColor += crystal * 0.2 * baseColor;
      
      // Mouse proximity enhancement
      float mouseInfluence = smoothstep(0.4, 0.0, dist);
      finalColor *= (1.0 + mouseInfluence * 2.0);
      
      // Click intensity boost
      finalColor *= (1.0 + u_clickIntensity * 1.5);
      
      // Overall intensity control
      float overallIntensity = (particles + neuralLines + quantumField + trail + mouseInfluence) * 0.3;
      overallIntensity = clamp(overallIntensity, 0.1, 1.0);
      
      // Final alpha with breathing effect
      float alpha = overallIntensity * (0.6 + 0.4 * sin(slowTime * 2.0));
      alpha *= smoothstep(0.6, 0.0, dist); // Fade from cursor
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const createShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };

  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  };

  const initWebGL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      setIsWebGLSupported(false);
      return false;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      setIsWebGLSupported(false);
      return false;
    }

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      setIsWebGLSupported(false);
      return false;
    }

    programRef.current = program;

    // Create vertex buffer for full-screen quad
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return true;
  };

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to fill viewport with performance cap
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Ensure canvas display size matches viewport
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    
    const gl = glRef.current;
    if (gl) {
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  };

  const render = (time: number) => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    
    if (!gl || !program || !canvas) return;

    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use program
    gl.useProgram(program);

    // Set uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const prevMouseLocation = gl.getUniformLocation(program, 'u_prevMouse');
    const clickIntensityLocation = gl.getUniformLocation(program, 'u_clickIntensity');

    // Update click intensity decay
    const currentTime = Date.now();
    const timeSinceClick = currentTime - lastClickTimeRef.current;
    clickIntensityRef.current = Math.max(0, clickIntensityRef.current - timeSinceClick * 0.003);

    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
    gl.uniform2f(prevMouseLocation, mouseRef.current.prevX, mouseRef.current.prevY);
    gl.uniform1f(clickIntensityLocation, clickIntensityRef.current);

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    animationFrameRef.current = requestAnimationFrame(render);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;
    mouseRef.current.x = (event.clientX - rect.left) * window.devicePixelRatio;
    mouseRef.current.y = (rect.height - (event.clientY - rect.top)) * window.devicePixelRatio;
  };

  const handleClick = (event: MouseEvent) => {
    clickIntensityRef.current = 1.0; // Maximum intensity on click
    lastClickTimeRef.current = Date.now();
  };

  useEffect(() => {
    if (!initWebGL()) {
      return;
    }

    resize();
    animationFrameRef.current = requestAnimationFrame(render);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!isWebGLSupported) {
    return (
      <div className={`pointer-events-none fixed inset-0 z-30 w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`splash-cursor-canvas ${className}`}
    />
  );
};

export default SplashCursor;

