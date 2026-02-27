/* ============================================
   GOLD MACRO FUNDAMENTAL MODEL — JavaScript
   Charts, Interactions, Animations
   ============================================ */

// ============ DATA ============
const GOLD_SPOT_DATA = {
  dates: ['2025-02-28','2025-03-07','2025-03-14','2025-03-21','2025-03-28','2025-04-04','2025-04-11','2025-04-17','2025-04-25','2025-05-02','2025-05-09','2025-05-16','2025-05-23','2025-05-30','2025-06-06','2025-06-13','2025-06-20','2025-06-27','2025-07-03','2025-07-11','2025-07-18','2025-07-25','2025-08-01','2025-08-08','2025-08-15','2025-08-22','2025-08-29','2025-09-05','2025-09-12','2025-09-19','2025-09-26','2025-10-03','2025-10-10','2025-10-17','2025-10-24','2025-10-31','2025-11-07','2025-11-14','2025-11-21','2025-11-28','2025-12-05','2025-12-12','2025-12-19','2025-12-26','2026-01-02','2026-01-09','2026-01-16','2026-01-23','2026-01-30','2026-02-06','2026-02-13','2026-02-20','2026-02-26'],
  prices: [2869,2925,3000,3035,3096,3049,3247,3336,3321,3248,3344,3207,3376,3309,3326,3447,3380,3283,3347,3369,3361,3350,3369,3412,3351,3385,3467,3608,3656,3697,3779,3898,4023,4240,4115,4012,4014,4098,4079,4227,4212,4310,4349,4542,4341,4517,4592,4992,4849,4964,5042,5107,5204]
};

const DXY_DATA = {
  dates: ['2025-03-02','2025-03-09','2025-03-16','2025-03-23','2025-03-30','2025-04-06','2025-04-13','2025-04-18','2025-04-27','2025-05-04','2025-05-11','2025-05-18','2025-05-25','2025-06-01','2025-06-08','2025-06-15','2025-06-22','2025-06-29','2025-07-06','2025-07-13','2025-07-20','2025-07-27','2025-08-03','2025-08-10','2025-08-17','2025-08-24','2025-08-31','2025-09-07','2025-09-14','2025-09-21','2025-09-28','2025-10-05','2025-10-12','2025-10-19','2025-10-26','2025-11-02','2025-11-09','2025-11-16','2025-11-23','2025-11-30','2025-12-07','2025-12-14','2025-12-21','2025-12-28','2026-01-04','2026-01-11','2026-01-18','2026-01-25','2026-02-01','2026-02-08','2026-02-15','2026-02-22','2026-02-26'],
  values: [107.56,103.91,103.74,104.15,104.01,102.89,100.01,99.38,99.61,99.99,100.62,100.82,98.78,99.27,99.01,98.30,99.09,97.14,97.15,97.94,98.42,97.65,98.74,98.04,97.83,97.86,97.71,97.84,97.60,97.81,97.94,98.10,98.92,98.40,98.98,99.73,99.62,99.42,100.06,99.41,98.88,98.00,98.26,97.80,98.44,98.66,98.95,96.92,97.10,97.39,96.88,97.42,97.66]
};

// ============ CHART.JS DEFAULTS ============
Chart.defaults.color = '#6b7280';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'JetBrains Mono', monospace";
Chart.defaults.font.size = 11;

// Gold color helpers
const goldGradient = (ctx, chartArea) => {
  if (!chartArea) return '#d4af37';
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, 'rgba(212, 175, 55, 0.5)');
  gradient.addColorStop(1, 'rgba(212, 175, 55, 0.01)');
  return gradient;
};

// ============ FORMAT DATE LABELS ============
function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months[d.getMonth()] + ' ' + d.getDate();
}

// ============ GLD CHART ============
function createGLDChart() {
  const ctx = document.getElementById('gldChart').getContext('2d');
  const labels = GOLD_SPOT_DATA.dates.map(formatDateLabel);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Gold Spot',
        data: GOLD_SPOT_DATA.prices,
        borderColor: '#d4af37',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#d4af37',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return goldGradient(ctx, chartArea);
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2a',
          titleColor: '#d4af37',
          bodyColor: '#f0ece4',
          borderColor: 'rgba(212,175,55,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(ctx) {
              return 'Gold: $' + ctx.parsed.y.toLocaleString()  + '/oz';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxTicksLimit: 12,
            maxRotation: 0,
            font: { size: 10 }
          }
        },
        y: {
          position: 'right',
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false
          },
          ticks: {
            callback: v => '$' + v.toLocaleString(),
            font: { size: 10 }
          }
        }
      }
    }
  });
}

// ============ GOLD vs DXY CHART ============
function createGoldDxyChart() {
  const ctx = document.getElementById('goldDxyChart').getContext('2d');
  const labels = GOLD_SPOT_DATA.dates.map(formatDateLabel);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Gold Spot',
          data: GOLD_SPOT_DATA.prices,
          borderColor: '#d4af37',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.3,
          yAxisID: 'yGold',
          fill: false
        },
        {
          label: 'DXY (inverted)',
          data: DXY_DATA.values,
          borderColor: '#ef4444',
          borderWidth: 2,
          borderDash: [6, 3],
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.3,
          yAxisID: 'yDxy',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 16,
            boxHeight: 2,
            padding: 16,
            color: '#9ca3af',
            font: { family: "'JetBrains Mono'", size: 11 }
          }
        },
        tooltip: {
          backgroundColor: '#1e1e2a',
          titleColor: '#d4af37',
          bodyColor: '#f0ece4',
          borderColor: 'rgba(212,175,55,0.3)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(ctx) {
              if (ctx.dataset.label === 'Gold Spot') return 'Gold: $' + ctx.parsed.y.toLocaleString() + '/oz';
              return ctx.dataset.label + ': ' + ctx.parsed.y.toFixed(2);
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxTicksLimit: 12,
            maxRotation: 0,
            font: { size: 10 }
          }
        },
        yGold: {
          position: 'left',
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false
          },
          ticks: {
            callback: v => '$' + v.toLocaleString(),
            color: '#d4af37',
            font: { size: 10 }
          },
          title: {
            display: true,
            text: 'Gold ($/oz)',
            color: '#d4af37',
            font: { size: 10 }
          }
        },
        yDxy: {
          position: 'right',
          grid: { display: false },
          ticks: {
            color: '#ef4444',
            font: { size: 10 }
          },
          title: {
            display: true,
            text: 'DXY',
            color: '#ef4444',
            font: { size: 10 }
          }
        }
      }
    }
  });
}

// ============ YIELD CURVE CHART ============
function createYieldCurveChart() {
  const ctx = document.getElementById('yieldCurveChart').getContext('2d');
  const maturities = ['1M','3M','6M','1Y','2Y','3Y','5Y','7Y','10Y','20Y','30Y'];
  const yields = [3.71,3.69,3.62,3.53,3.45,3.49,3.61,3.82,4.05,4.63,4.70];
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: maturities,
      datasets: [{
        label: 'Nominal Yield',
        data: yields,
        borderColor: '#6366f1',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#1e1e2a',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.08)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2a',
          titleColor: '#6366f1',
          bodyColor: '#f0ece4',
          borderColor: 'rgba(99,102,241,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => ctx.parsed.y.toFixed(2) + '%'
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        },
        y: {
          position: 'right',
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false
          },
          ticks: {
            callback: v => v.toFixed(1) + '%',
            font: { size: 10 }
          },
          min: 3.2,
          max: 5.0
        }
      }
    }
  });
}

// ============ REAL YIELD CURVE ============
function createRealYieldChart() {
  const ctx = document.getElementById('realYieldChart').getContext('2d');
  const maturities = ['5Y','7Y','10Y','20Y','30Y'];
  const realYields = [1.19,1.49,1.77,2.23,2.47];
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: maturities,
      datasets: [{
        label: 'TIPS Real Yield',
        data: realYields,
        borderColor: '#d4af37',
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: '#d4af37',
        pointBorderColor: '#1e1e2a',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(212, 175, 55, 0.08)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2a',
          titleColor: '#d4af37',
          bodyColor: '#f0ece4',
          borderColor: 'rgba(212,175,55,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => ctx.parsed.y.toFixed(2) + '%'
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        },
        y: {
          position: 'right',
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false
          },
          ticks: {
            callback: v => v.toFixed(1) + '%',
            font: { size: 10 }
          },
          min: 0.8,
          max: 2.8
        }
      }
    }
  });
}

// ============ CENTRAL BANK CHART ============
function createCBChart() {
  const ctx = document.getElementById('cbChart').getContext('2d');
  const years = ['2022','2023','2024','2025','2026E'];
  const tonnes = [1136, 1050, 1090, 863, 800];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'Tonnes',
        data: tonnes,
        backgroundColor: function(context) {
          const idx = context.dataIndex;
          if (idx === 4) return 'rgba(212, 175, 55, 0.3)'; // Estimate
          return 'rgba(212, 175, 55, 0.6)';
        },
        borderColor: function(context) {
          const idx = context.dataIndex;
          if (idx === 4) return 'rgba(212, 175, 55, 0.5)';
          return '#d4af37';
        },
        borderWidth: 1,
        borderRadius: 6,
        borderDash: function(context) {
          return context.dataIndex === 4 ? [4, 4] : [];
        },
        barPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2a',
          titleColor: '#d4af37',
          bodyColor: '#f0ece4',
          borderColor: 'rgba(212,175,55,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => ctx.parsed.y + ' tonnes'
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 12, weight: '600' } }
        },
        y: {
          position: 'right',
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false
          },
          ticks: {
            callback: v => v + 't',
            font: { size: 10 }
          },
          min: 0,
          max: 1300
        }
      }
    }
  });
}

// ============ COMPOSITE GAUGE (Canvas) ============
function drawCompositeGauge() {
  const canvas = document.getElementById('compositeGauge');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 320;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);
  
  const cx = size / 2;
  const cy = size / 2;
  const radius = 130;
  const lineWidth = 12;
  
  // Background arc
  const startAngle = 0.75 * Math.PI;
  const endAngle = 2.25 * Math.PI;
  
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Gradient arc — score is +3.10 on -5 to +5 scale
  const score = 3.10;
  const normalized = (score + 5) / 10; // 0 to 1
  const scoreAngle = startAngle + normalized * (endAngle - startAngle);
  
  const gradient = ctx.createConicGradient(startAngle, cx, cy);
  gradient.addColorStop(0, '#ef4444');
  gradient.addColorStop(0.3, '#eab308');
  gradient.addColorStop(0.5, '#d4af37');
  gradient.addColorStop(0.7, '#22c55e');
  gradient.addColorStop(1, '#4ade80');
  
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, scoreAngle);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Score indicator dot
  const dotX = cx + radius * Math.cos(scoreAngle);
  const dotY = cy + radius * Math.sin(scoreAngle);
  
  ctx.beginPath();
  ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#d4af37';
  ctx.fill();
  ctx.strokeStyle = '#0a0a0f';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Glow effect
  ctx.beginPath();
  ctx.arc(dotX, dotY, 14, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
  ctx.fill();
  
  // Scale labels
  ctx.font = '10px "JetBrains Mono"';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#6b7280';
  
  const labelRadius = radius + 24;
  const labels = ['-5', '-3', '0', '+3', '+5'];
  const positions = [0, 0.2, 0.5, 0.8, 1.0];
  
  positions.forEach((pos, i) => {
    const angle = startAngle + pos * (endAngle - startAngle);
    const lx = cx + labelRadius * Math.cos(angle);
    const ly = cy + labelRadius * Math.sin(angle);
    ctx.fillText(labels[i], lx, ly + 4);
  });
  
  // Tick marks
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const angle = startAngle + (i / 10) * (endAngle - startAngle);
    const innerR = radius - lineWidth / 2 - 4;
    const outerR = radius - lineWidth / 2 - (i % 5 === 0 ? 12 : 8);
    ctx.beginPath();
    ctx.moveTo(cx + innerR * Math.cos(angle), cy + innerR * Math.sin(angle));
    ctx.lineTo(cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle));
    ctx.stroke();
  }
}

// ============ DRIVER EXPAND/COLLAPSE ============
function toggleDriver(header) {
  const card = header.parentElement;
  card.classList.toggle('expanded');
}

// ============ NAVIGATION VISIBILITY ============
function setupNavigation() {
  const nav = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.remove('visible');
      } else {
        nav.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(heroSection);
}

// ============ HERO PARTICLES ============
function createParticles() {
  const container = document.getElementById('heroParticles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(particle);
  }
  
  // Add keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -60}px) scale(1.2); opacity: 0.6; }
      50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -30}px) scale(0.8); opacity: 0.4; }
      75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * -50}px) scale(1.1); opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}

// ============ SCROLL ANIMATIONS (Intersection Observer) ============
function setupScrollAnimations() {
  const animElements = document.querySelectorAll('.driver-card, .stat-card, .etf-stat-card, .fiscal-card, .chart-panel, .signal-badge-large, .level-card, .signal-detail-card, .cb-buyers-panel');
  
  animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 50);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
  
  animElements.forEach(el => observer.observe(el));
}

// ============ LIVE GOLD PRICE TICKER ============
const GOLD_TICKER = {
  basePrice: 5204.00,       // Anchor price set by hourly refresh
  currentPrice: 5204.00,
  previousPrice: 5204.00,
  sessionOpen: 5183.00,     // Previous session close for delta calc
  volatility: 0.00015,      // Realistic intraday vol (~$0.50-$1.50 per tick)
  momentum: 0,
  trend: 0.00002,           // Slight upward drift matching current bullish regime
  tickInterval: null,
  
  // Ornstein-Uhlenbeck mean-reversion + momentum model
  // More realistic than pure random walk — mimics actual market microstructure
  nextTick() {
    const dt = 1;
    const meanReversion = 0.005; // Pull back toward base price
    const momentumDecay = 0.92;
    
    // Mean-reverting component (prevents drift too far from base)
    const reversion = meanReversion * (this.basePrice - this.currentPrice) * dt;
    
    // Random shock (Gaussian approximation via Box-Muller)
    const u1 = Math.random();
    const u2 = Math.random();
    const gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const shock = gaussian * this.basePrice * this.volatility;
    
    // Momentum (autocorrelation in price changes)
    this.momentum = this.momentum * momentumDecay + shock * 0.3;
    
    // Trend component
    const trendComponent = this.basePrice * this.trend * dt;
    
    // Combine
    this.previousPrice = this.currentPrice;
    this.currentPrice += reversion + shock + this.momentum + trendComponent;
    
    // Hard bounds: don't drift more than 0.5% from base
    const maxDrift = this.basePrice * 0.005;
    this.currentPrice = Math.max(this.basePrice - maxDrift, Math.min(this.basePrice + maxDrift, this.currentPrice));
    
    return this.currentPrice;
  },
  
  formatPrice(price) {
    const whole = Math.floor(price);
    const decimal = (price - whole).toFixed(2).substring(1); // .XX
    return { whole: whole.toLocaleString('en-US'), decimal: decimal };
  },
  
  updateDOM() {
    const el = document.getElementById('goldPriceTicker');
    const deltaEl = document.getElementById('priceDelta');
    const arrowEl = document.getElementById('deltaArrow');
    const deltaValEl = document.getElementById('deltaValue');
    const deltaPctEl = document.getElementById('deltaPct');
    
    if (!el) return;
    
    const price = this.nextTick();
    const formatted = this.formatPrice(price);
    
    // Update main price
    el.innerHTML = `$${formatted.whole}<span class="hero-price-decimal">${formatted.decimal}</span><span class="hero-price-unit">/oz</span>`;
    
    // Flash effect on direction change
    const direction = price > this.previousPrice ? 'up' : price < this.previousPrice ? 'down' : 'flat';
    el.classList.remove('flash-up', 'flash-down');
    if (direction === 'up') {
      void el.offsetWidth; // Force reflow for re-triggering animation
      el.classList.add('flash-up');
    } else if (direction === 'down') {
      void el.offsetWidth;
      el.classList.add('flash-down');
    }
    
    // Update delta from session open
    const delta = price - this.sessionOpen;
    const deltaPct = (delta / this.sessionOpen) * 100;
    
    deltaEl.className = 'price-delta ' + (delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat');
    arrowEl.innerHTML = delta >= 0 ? '&#9650;' : '&#9660;';
    deltaValEl.textContent = (delta >= 0 ? '+' : '') + delta.toFixed(2);
    deltaPctEl.textContent = '(' + (deltaPct >= 0 ? '+' : '') + deltaPct.toFixed(2) + '%)';
  },
  
  start() {
    // Initial render
    this.updateDOM();
    
    // Tick every 1-2 seconds (randomized for realism)
    const tick = () => {
      this.updateDOM();
      const nextDelay = 1000 + Math.random() * 1500; // 1-2.5s
      this.tickInterval = setTimeout(tick, nextDelay);
    };
    this.tickInterval = setTimeout(tick, 1500);
  },
  
  stop() {
    if (this.tickInterval) clearTimeout(this.tickInterval);
  }
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  // Draw charts
  drawCompositeGauge();
  createGLDChart();
  createGoldDxyChart();
  createYieldCurveChart();
  createRealYieldChart();
  createCBChart();
  
  // Setup interactions
  setupNavigation();
  createParticles();
  setupScrollAnimations();
  
  // Start live gold price ticker
  GOLD_TICKER.start();
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
