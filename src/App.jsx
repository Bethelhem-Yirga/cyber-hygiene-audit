// src/App.jsx
import React, { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import './index.css';

function App() {
  const [started, setStarted] = useState(false);
  const [hasExistingResponses, setHasExistingResponses] = useState(false);
  const [existingResponses, setExistingResponses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('auditResponses');
    if (saved) {
      setHasExistingResponses(true);
      setExistingResponses(JSON.parse(saved));
    }

    // Create particle network
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      createParticle(i);
    }

    // Create data stream
    for (let i = 0; i < 20; i++) {
      createDataStream(i);
    }
  }, []);

  const createParticle = (index) => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.setProperty('--angle', Math.random() * 360 + 'deg');
    document.querySelector('.particle-network')?.appendChild(particle);
  };

  const createDataStream = (index) => {
    const line = document.createElement('div');
    line.className = 'data-stream-line';
    line.style.left = Math.random() * 100 + '%';
    line.style.animationDelay = Math.random() * 3 + 's';
    line.style.animationDuration = 2 + Math.random() * 3 + 's';
    document.querySelector('.data-stream')?.appendChild(line);
  };

  const handleStart = () => {
    if (hasExistingResponses) {
      if (confirm('Initialize new security scan? Previous data will be purged.')) {
        localStorage.removeItem('auditResponses');
        setHasExistingResponses(false);
      }
    }
    setStarted(true);
  };

  if (hasExistingResponses && !started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="particle-network"></div>
        <div className="data-stream"></div>
        <div className="circuit-pattern"></div>
        
        <div className="cyber-card max-w-md w-full text-center">
          <div className="scanner-line"></div>
          <div className="text-6xl mb-4 animate-bounce">👋</div>
          <h2 className="glitch-text text-4xl mb-4">
            <span>SYSTEM</span>
            <span>SYSTEM</span>
            ACCESS
          </h2>
          <p className="text-gray-300 mb-6 terminal-text">
            Previous security scan detected. Resume or initialize new protocol?
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setStarted(true)}
              className="cyber-button"
            >
              <span className="relative z-10">LOAD SCAN</span>
            </button>
            <button
              onClick={handleStart}
              className="bg-gray-800 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all font-semibold border border-gray-600"
            >
              NEW SCAN
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (started && hasExistingResponses) {
    return <Results responses={existingResponses} />;
  }

  return (
    <div className="min-h-screen relative">
      <div className="particle-network"></div>
      <div className="data-stream"></div>
      <div className="circuit-pattern"></div>
      
      {!started ? (
        <div className="container mx-auto text-center py-20 px-4 relative z-10">
          {/* Animated title */}
          <h1 className="glitch-text text-7xl md:text-8xl mb-6">
            <span>CYBER</span>
            <span>CYBER</span>
            HYGIENE
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AUDIT PROTOCOL
          </h2>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl text-gray-300 mb-4 terminal-text">
              Initialize security assessment to analyze digital defenses
            </p>
            <div className="flex justify-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1 bg-green-500/20 rounded-full">ENCRYPTED</span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">SECURE</span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full">ANONYMOUS</span>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="cyber-button text-xl px-16 py-6 mb-20"
          >
            <span className="relative z-10">▶ INITIATE SCAN</span>
          </button>

          {/* Feature grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="cyber-category group">
              <div className="scanner-line"></div>
              <div className="text-5xl mb-4 animate-pulse">🔐</div>
              <h3 className="text-2xl font-bold mb-3 text-green-400">CRYPTOGRAPHIC</h3>
              <p className="text-gray-400">Password strength analysis & breach detection</p>
              <div className="mt-4 text-xs text-green-500/50">ENCRYPTION: AES-256</div>
            </div>
            
            <div className="cyber-category group">
              <div className="scanner-line"></div>
              <div className="text-5xl mb-4 animate-pulse" style={{ animationDelay: '0.5s' }}>📱</div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">AUTHENTICATION</h3>
              <p className="text-gray-400">2FA/MFA protocol compliance verification</p>
              <div className="mt-4 text-xs text-blue-500/50">PROTOCOL: OTP/TOTP</div>
            </div>
            
            <div className="cyber-category group">
              <div className="scanner-line"></div>
              <div className="text-5xl mb-4 animate-pulse" style={{ animationDelay: '1s' }}>🛡️</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-400">DEFENSE</h3>
              <p className="text-gray-400">Real-time threat mitigation recommendations</p>
              <div className="mt-4 text-xs text-purple-500/50">STATUS: ACTIVE</div>
            </div>
          </div>

          {/* Stats with cyber style */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="cyber-card">
              <div className="text-4xl font-bold text-green-400 mb-2">256-bit</div>
              <div className="text-gray-400">Encryption Standard</div>
            </div>
            <div className="cyber-card">
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-400">Privacy Preserved</div>
            </div>
            <div className="cyber-card">
              <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-400">Zero Cost</div>
            </div>
          </div>
        </div>
      ) : (
        <Questionnaire />
      )}
    </div>
  );
}

export default App;