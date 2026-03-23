// src/components/Results.jsx
import React, { useMemo, useEffect, useRef, useState } from 'react';

const Results = ({ responses }) => {
  const canvasRef = useRef(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const scoreData = useMemo(() => {
    const totalScore = responses.reduce((sum, r) => sum + r.score, 0);
    const maxScore = responses.length * 10;
    const percentage = Math.round((totalScore / maxScore) * 100);

    const categories = {};
    responses.forEach(r => {
      if (!categories[r.category]) {
        categories[r.category] = { total: 0, count: 0 };
      }
      categories[r.category].total += r.score;
      categories[r.category].count += 1;
    });

    const categoryScores = {};
    Object.keys(categories).forEach(cat => {
      categoryScores[cat] = Math.round((categories[cat].total / (categories[cat].count * 10)) * 100);
    });

    const recommendations = [];
    
    if (categoryScores.passwords < 70) {
      recommendations.push({
        icon: '🔐',
        title: 'PASSWORD PROTOCOL BREACH',
        text: 'Initialize password manager deployment immediately',
        severity: 'CRITICAL',
        color: 'red',
        action: 'Deploy Bitwarden/1Password'
      });
    }
    if (categoryScores['2fa'] < 70) {
      recommendations.push({
        icon: '📱',
        title: '2FA ABSENT',
        text: 'Enable Two-Factor Authentication on all primary accounts',
        severity: 'HIGH',
        color: 'orange',
        action: 'Enable 2FA Now'
      });
    }
    if (categoryScores.updates < 70) {
      recommendations.push({
        icon: '🔄',
        title: 'UPDATE PROTOCOL FAILURE',
        text: 'Activate automatic updates across all devices',
        severity: 'MEDIUM',
        color: 'yellow',
        action: 'Configure Updates'
      });
    }
    if (categoryScores.backups < 70) {
      recommendations.push({
        icon: '💾',
        title: 'BACKUP ABSENT',
        text: 'Implement 3-2-1 backup strategy immediately',
        severity: 'HIGH',
        color: 'orange',
        action: 'Setup Backups'
      });
    }
    if (categoryScores.phishing < 70) {
      recommendations.push({
        icon: '🎣',
        title: 'PHISHING VULNERABILITY',
        text: 'Complete security awareness training required',
        severity: 'CRITICAL',
        color: 'red',
        action: 'Start Training'
      });
    }
    if (categoryScores.wifi < 70) {
      recommendations.push({
        icon: '🌐',
        title: 'NETWORK EXPOSURE',
        text: 'Deploy VPN solution for public Wi-Fi',
        severity: 'MEDIUM',
        color: 'yellow',
        action: 'Get VPN'
      });
    }

    return { percentage, categoryScores, recommendations };
  }, [responses]);

  // Animated score circle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    let progress = 0;
    const animate = () => {
      if (progress < scoreData.percentage / 100) {
        progress += 0.01;
        requestAnimationFrame(animate);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background with glow effect
      ctx.shadowColor = '#00ff9d';
      ctx.shadowBlur = 20;
      
      // Background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(0, 255, 157, 0.1)';
      ctx.lineWidth = 12;
      ctx.stroke();

      // Progress circle
      const gradient = ctx.createConicGradient(0, centerX, centerY);
      gradient.addColorStop(0, '#00ff9d');
      gradient.addColorStop(0.5, '#0066ff');
      gradient.addColorStop(1, '#ff00aa');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * progress));
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Inner glow
      ctx.shadowBlur = 40;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    };

    animate();
  }, [scoreData.percentage]);

  const getSecurityLevel = (score) => {
    if (score >= 80) return { level: 'SECURE', color: 'text-green-400', icon: '🛡️' };
    if (score >= 60) return { level: 'ELEVATED RISK', color: 'text-yellow-400', icon: '⚠️' };
    return { level: 'CRITICAL', color: 'text-red-400', icon: '💀' };
  };

  const resetQuiz = () => {
    const btn = document.activeElement;
    btn.classList.add('scale-95');
    setTimeout(() => {
      localStorage.removeItem('auditResponses');
      window.location.reload();
    }, 200);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create fancy export
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({
      score: scoreData.percentage,
      categories: scoreData.categoryScores,
      timestamp: new Date().toISOString(),
      recommendations: scoreData.recommendations
    }, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `security-scan-${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    
    setIsExporting(false);
  };

  const shareResults = (platform) => {
    const text = `My security score is ${scoreData.percentage}% - ${getSecurityLevel(scoreData.percentage).level}`;
    const url = window.location.href;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="particle-network"></div>
      <div className="data-stream"></div>
      <div className="circuit-pattern"></div>
      
      {/* Animated orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with Cyber Style */}
          <div className="text-center mb-12 relative">
            <div className="cyber-badge inline-block mb-4">
              <span className="relative z-10">SCAN COMPLETE</span>
            </div>
            <h1 className="glitch-text text-5xl md:text-6xl mb-4">
              <span>SECURITY</span>
              <span>SECURITY</span>
              REPORT
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mx-auto rounded-full"></div>
            
            {/* Timestamp */}
            <div className="mt-4 font-mono text-sm text-gray-500">
              {new Date().toLocaleString()} UTC
            </div>
          </div>

          {/* Main Score Card with 3D Effect */}
          <div className="cyber-card mb-8 text-center relative overflow-hidden">
            <div className="scanner-line"></div>
            
            {/* Floating orbs around score */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.3
                  }}
                ></div>
              ))}
            </div>

            <div className="score-crystal">
              <canvas 
                ref={canvasRef} 
                width="200" 
                height="200" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              ></canvas>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-black z-20">
                <span className={`${getSecurityLevel(scoreData.percentage).color}`}>
                  {scoreData.percentage}%
                </span>
              </div>
            </div>
            
            <div className="mt-32">
              <div className={`text-3xl font-bold mb-2 ${getSecurityLevel(scoreData.percentage).color}`}>
                {getSecurityLevel(scoreData.percentage).icon} {getSecurityLevel(scoreData.percentage).level}
              </div>
              <p className="text-gray-400 font-mono text-sm">
                SECURITY POSTURE ASSESSMENT COMPLETE
              </p>
            </div>
          </div>

          {/* Category Scores Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {Object.entries(scoreData.categoryScores).map(([category, score], index) => {
              const colors = score >= 80 ? 'from-green-400 to-green-500' : 
                            score >= 60 ? 'from-yellow-400 to-yellow-500' : 
                            'from-red-400 to-red-500';
              
              return (
                <div 
                  key={category} 
                  className="cyber-category group"
                  style={{ animation: `slideIn 0.5s ease ${index * 0.1}s both` }}
                >
                  <div className="scanner-line"></div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                      {category}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold bg-gradient-to-r ${colors} bg-clip-text text-transparent`}>
                        {score}%
                      </span>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        score >= 80 ? 'bg-green-400' : 
                        score >= 60 ? 'bg-yellow-400' : 
                        'bg-red-400'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="cyber-progress">
                    <div 
                      className={`cyber-progress-fill bg-gradient-to-r ${colors}`}
                      style={{ width: `${score}%` }}
                    >
                      <div className="scanner-line"></div>
                    </div>
                  </div>

                  {/* Category stats */}
                  <div className="mt-3 flex justify-between text-xs font-mono">
                    <span className="text-gray-500">STATUS:</span>
                    <span className={score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                      {score >= 80 ? 'SECURE' : score >= 60 ? 'ATTENTION' : 'BREACHED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations Section */}
          {scoreData.recommendations.length > 0 && (
            <div className="cyber-card mb-8">
              <div className="scanner-line"></div>
              
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SECURITY PROTOCOLS
                </span>
              </h2>
              
              <div className="space-y-4">
                {scoreData.recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className={`holo-recommendation border-l-4 ${
                      rec.color === 'red' ? 'border-l-red-500' :
                      rec.color === 'orange' ? 'border-l-orange-500' :
                      'border-l-yellow-500'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl animate-pulse">{rec.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{rec.title}</h3>
                          <span className={`text-xs font-mono px-2 py-1 rounded ${
                            rec.color === 'red' ? 'bg-red-500/20 text-red-400' :
                            rec.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {rec.severity}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{rec.text}</p>
                        
                        {/* Action button */}
                        <button className="option-button">
                          <span className="w-0 group-hover:w-4 h-px bg-green-400 transition-all duration-300"></span>
                          {rec.action} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EPIC BUTTONS SECTION */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            {/* Primary Cyber Button - New Scan */}
            <button
              onClick={resetQuiz}
              className="cyber-button group relative overflow-hidden px-8 py-4 min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">⟲</span>
                <span className="font-mono">NEW SCAN</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* Secondary Cyber Button - Export Data */}
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="cyber-button-secondary group relative overflow-hidden px-8 py-4 min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-mono">EXPORTING...</span>
                  </>
                ) : (
                <button className="action-button primary">
  <span>📊</span> EXPORT DATA
</button>
                )}
              </span>
            </button>

            {/* Tertiary Cyber Button - Share Menu */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="cyber-button-tertiary group relative overflow-hidden px-8 py-4 min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-2xl group-hover:rotate-12 transition-transform">📤</span>
                  <span className="font-mono">SHARE</span>
                </span>
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 cyber-card p-2 animate-fadeIn">
                  <button
                    onClick={() => shareResults('twitter')}
                    className="w-full text-left p-3 hover:bg-green-500/10 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <span className="text-xl">𝕏</span>
                    <span className="font-mono">Twitter</span>
                  </button>
                  <button
                    onClick={() => shareResults('facebook')}
                    className="w-full text-left p-3 hover:bg-blue-500/10 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <span className="text-xl">f</span>
                    <span className="font-mono">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareResults('linkedin')}
                    className="w-full text-left p-3 hover:bg-blue-500/10 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <span className="text-xl">in</span>
                    <span className="font-mono">LinkedIn</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Action Buttons Row */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="action-button secondary">
             <span className="text-xl group-hover:scale-110 transition-transform">🖨️</span>
              <span className="font-mono text-sm">PRINT REPORT</span>
            </button>

            {/* Download PDF Button */}
            <button
  className="action-button secondary">            
              <span className="text-xl group-hover:translate-y-1 transition-transform">📎</span>
              <span className="font-mono text-sm">PDF EXPORT</span>
            </button>

            {/* Copy Link Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="action-button secondary"
            >
              <span className="text-xl group-hover:rotate-12 transition-transform">🔗</span>
              <span className="font-mono text-sm">COPY LINK</span>
            </button>
          </div>

          {/* Security Badge */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-gray-400">
                SECURE CONNECTION • END-TO-END ENCRYPTED
              </span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Results;