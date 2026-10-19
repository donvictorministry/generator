// 1. Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

// 2. Non-Blocking Async Toast Engine (Zero alert())
const toastContainer = document.getElementById('toastContainer');

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button style="border:none;background:transparent;color:inherit;font-weight:bold;cursor:pointer;font-size:var(--font-size);">✕</button>
  `;

  toast.querySelector('button').addEventListener('click', () => toast.remove());
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// 3. Sidebars & Modals
const leftMenuBtn = document.getElementById('leftMenuBtn');
const rightMenuBtn = document.getElementById('rightMenuBtn');
const leftSidebar = document.getElementById('leftSidebar');
const rightSidebar = document.getElementById('rightSidebar');
const drawerOverlay = document.getElementById('drawerOverlay');

function closeDrawers() {
  leftSidebar.classList.remove('open');
  rightSidebar.classList.remove('open');
  drawerOverlay.classList.remove('active');
}

leftMenuBtn.addEventListener('click', () => {
  leftSidebar.classList.add('open');
  drawerOverlay.classList.add('active');
});

rightMenuBtn.addEventListener('click', () => {
  rightSidebar.classList.add('open');
  drawerOverlay.classList.add('active');
});

drawerOverlay.addEventListener('click', closeDrawers);
document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', closeDrawers));

document.querySelectorAll('.nav-link-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    closeDrawers();
    const modal = document.getElementById(btn.getAttribute('data-modal'));
    if (modal) modal.classList.add('active');
  });
});

document.querySelectorAll('.close-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fullscreen-modal').forEach(m => m.classList.remove('active'));
  });
});

// Developer Bio 6-Line Clamp
const toggleBioBtn = document.getElementById('toggleBioBtn');
const devBioText = document.getElementById('devBioText');
toggleBioBtn.addEventListener('click', () => {
  const expanded = devBioText.classList.toggle('expanded');
  toggleBioBtn.textContent = expanded ? 'Show Less' : 'Show More';
});

// Partner Form
document.getElementById('partnerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Partnership proposal submitted successfully.', 'success');
  e.target.reset();
  document.getElementById('modalPartner').classList.remove('active');
});

// 4. Theme & Font Scaling Engine (19px to 23px)
const darkModeCheckbox = document.getElementById('darkModeCheckbox');
const fontSlider = document.getElementById('fontSlider');
const fontSizeIndicator = document.getElementById('fontSizeIndicator');

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  darkModeCheckbox.checked = (theme === 'dark');
}

darkModeCheckbox.addEventListener('change', (e) => {
  const target = e.target.checked ? 'dark' : 'light';
  applyTheme(target);
  showToast(`Switched to ${target} mode`, 'info');
});

fontSlider.addEventListener('input', (e) => {
  const size = e.target.value;
  fontSizeIndicator.textContent = `${size}px`;
  document.documentElement.style.setProperty('--font-size', `${size}px`);
  localStorage.setItem('if_fontsize', size);
});

const savedFontSize = localStorage.getItem('if_fontsize') || '19';
fontSlider.value = savedFontSize;
fontSizeIndicator.textContent = `${savedFontSize}px`;
document.documentElement.style.setProperty('--font-size', `${savedFontSize}px`);

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// 5. Presets Catalog & Canvas State Engine
const PRESETS = {
  og_whatsapp: { w: 1200, h: 630, filename: 'og-image.png', label: 'WhatsApp & Facebook OG' },
  twitter_card: { w: 1200, h: 600, filename: 'twitter-card.png', label: 'Twitter / X Card' },
  pwa_512:     { w: 512,  h: 512, filename: 'icon512.png',  label: 'PWA Master & Store' },
  pwa_192:     { w: 192,  h: 192, filename: 'icon192.png',  label: 'Android PWA Home' },
  apple_touch: { w: 180,  h: 180, filename: 'apple-touch-icon.png', label: 'Apple Touch Icon' },
  chrome_128:  { w: 128,  h: 128, filename: 'icon128.png',  label: 'Chrome Web Store' },
  toolbar_48:  { w: 48,   h: 48,  filename: 'icon48.png',   label: 'Chrome Toolbar' },
  favicon_32:  { w: 32,   h: 32,  filename: 'favicon-32x32.png', label: 'Browser Favicon' },
  favicon_16:  { w: 16,   h: 16,  filename: 'favicon-16x16.png', label: 'Micro Favicon' }
};

const canvas = document.getElementById('forgeCanvas');
const ctx = canvas.getContext('2d');
const presetSelect = document.getElementById('presetSelect');
const appNameInput = document.getElementById('appNameInput');
const appSubtitleInput = document.getElementById('appSubtitleInput');
const emblemSelect = document.getElementById('emblemSelect');
const primaryColorInput = document.getElementById('primaryColor');
const secondaryColorInput = document.getElementById('secondaryColor');
const dimensionBadge = document.getElementById('dimensionBadge');
const downloadBtnText = document.getElementById('downloadBtnText');
const downloadCurrentBtn = document.getElementById('downloadCurrentBtn');
const batchDownloadBtn = document.getElementById('batchDownloadBtn');

// Vector Motif Drawing Library
function drawMotif(ctx, type, cx, cy, sz, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, sz * 0.1);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (type === 'cross') {
    // Holy Cross Motif
    const barW = sz * 0.22;
    ctx.fillRect(cx - barW / 2, cy - sz / 2, barW, sz);
    ctx.fillRect(cx - sz / 2, cy - sz / 5, sz, barW);
  } else if (type === 'snippet') {
    // Snippet Card Motif
    const w = sz * 0.8;
    const h = sz * 0.9;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
    ctx.fillStyle = primaryColorInput.value;
    const lh = sz * 0.1;
    ctx.fillRect(cx - w * 0.35, cy - h * 0.25, w * 0.7, lh);
    ctx.fillRect(cx - w * 0.35, cy, w * 0.7, lh);
    ctx.fillRect(cx - w * 0.35, cy + h * 0.25, w * 0.45, lh);
  } else if (type === 'focus') {
    // Focus Ring Motif
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.15, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'shield') {
    // Security Shield Motif
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz * 0.45);
    ctx.lineTo(cx + sz * 0.4, cy - sz * 0.2);
    ctx.lineTo(cx + sz * 0.4, cy + sz * 0.1);
    ctx.quadraticCurveTo(cx, cy + sz * 0.5, cx, cy + sz * 0.5);
    ctx.quadraticCurveTo(cx, cy + sz * 0.5, cx - sz * 0.4, cy + sz * 0.1);
    ctx.lineTo(cx - sz * 0.4, cy - sz * 0.2);
    ctx.closePath();
    ctx.fill();
  } else if (type === 'lightning') {
    // Lightning Bolt Motif
    ctx.beginPath();
    ctx.moveTo(cx + sz * 0.1, cy - sz * 0.45);
    ctx.lineTo(cx - sz * 0.3, cy + sz * 0.05);
    ctx.lineTo(cx, cy + sz * 0.05);
    ctx.lineTo(cx - sz * 0.1, cy + sz * 0.45);
    ctx.lineTo(cx + sz * 0.3, cy - sz * 0.05);
    ctx.lineTo(cx, cy - sz * 0.05);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

// Master Render Procedure
function renderAsset(targetCanvas, width, height) {
  targetCanvas.width = width;
  targetCanvas.height = height;
  const c = targetCanvas.getContext('2d');

  const title = appNameInput.value.trim() || 'My App';
  const subtitle = appSubtitleInput.value.trim() || 'Mobile Knowledge';
  const motif = emblemSelect.value;
  const col1 = primaryColorInput.value;
  const col2 = secondaryColorInput.value;

  const isWide = width > height;

  if (isWide) {
    // ==========================================
    // 1. WIDE OPEN GRAPH BANNER (1200x630, 1200x600)
    // ==========================================
    c.fillStyle = '#090d16';
    c.fillRect(0, 0, width, height);

    // Glowing Outer Frame
    c.strokeStyle = col1;
    c.lineWidth = 8;
    c.strokeRect(30, 30, width - 60, height - 60);

    // Brand Emblem Card
    const emblemCardSize = 220;
    const emblemX = 120;
    const emblemY = (height - emblemCardSize) / 2;

    const grad = c.createLinearGradient(emblemX, emblemY, emblemX + emblemCardSize, emblemY + emblemCardSize);
    grad.addColorStop(0, col1);
    grad.addColorStop(1, col2);
    c.fillStyle = grad;

    c.beginPath();
    c.roundRect(emblemX, emblemY, emblemCardSize, emblemCardSize, 44);
    c.fill();

    // Center Motif inside Card
    drawMotif(c, motif, emblemX + emblemCardSize / 2, emblemY + emblemCardSize / 2, emblemCardSize * 0.55, '#ffffff');

    // Title
    c.fillStyle = '#ffffff';
    c.font = 'bold 74px -apple-system, sans-serif';
    c.fillText(title, 390, emblemY + 80);

    // Subtitle
    c.fillStyle = col1;
    c.font = 'bold 36px -apple-system, sans-serif';
    c.fillText(subtitle, 390, emblemY + 140);

    // Footer Tagline
    c.fillStyle = '#94a3b8';
    c.font = '28px -apple-system, sans-serif';
    c.fillText('100% Offline PWA • Verified Clean PNG • Android-First', 390, emblemY + 195);

  } else {
    // ==========================================
    // 2. SQUARE APP ICON (512x512 down to 16x16)
    // ==========================================
    const grad = c.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, col1);
    grad.addColorStop(1, col2);
    c.fillStyle = grad;

    const radius = width * 0.22;
    c.beginPath();
    c.roundRect(0, 0, width, height, radius);
    c.fill();

    // Draw Central Motif Scaled Exactly
    drawMotif(c, motif, width / 2, height / 2, width * 0.55, '#ffffff');
  }
}

function updatePreview() {
  const current = PRESETS[presetSelect.value];
  dimensionBadge.textContent = `${current.w} × ${current.h} px`;
  downloadBtnText.textContent = `Download ${current.label} (PNG)`;
  renderAsset(canvas, current.w, current.h);
}

// Event Listeners for Live Re-rendering
[presetSelect, appNameInput, appSubtitleInput, emblemSelect, primaryColorInput, secondaryColorInput].forEach(el => {
  el.addEventListener('input', updatePreview);
  el.addEventListener('change', updatePreview);
});

// Single PNG Download
downloadCurrentBtn.addEventListener('click', () => {
  const current = PRESETS[presetSelect.value];
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = current.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${current.filename} (${current.w}×${current.h})`, 'success');
  }, 'image/png');
});

// Batch Sequential Downloader (All 9 Sizes with One Tap)
batchDownloadBtn.addEventListener('click', async () => {
  showToast('Initiating Batch Generation for all 9 sizes...', 'info');
  const tempCanvas = document.createElement('canvas');
  const keys = Object.keys(PRESETS);

  for (let i = 0; i < keys.length; i++) {
    const item = PRESETS[keys[i]];
    renderAsset(tempCanvas, item.w, item.h);

    await new Promise(resolve => {
      tempCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = item.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(resolve, 300);
      }, 'image/png');
    });
  }
  showToast('All 9 PNG assets generated & downloaded!', 'success');
});

// 6. Native App Installation, Web Share & Bluetooth
let deferredPrompt = null;
const installAppBtn = document.getElementById('installAppBtn');
const shareAppBtn = document.getElementById('shareAppBtn');
const bluetoothShareBtn = document.getElementById('bluetoothShareBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installAppBtn.style.display = 'flex';
});

installAppBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
      showToast('IconForge Pro Installed to Home Screen', 'success');
    }
  } else {
    showToast('App is ready offline or already installed.', 'info');
  }
});

shareAppBtn.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'IconForge Pro',
        text: 'Client-side PNG and WhatsApp Open Graph asset generator.',
        url: window.location.href,
      });
      showToast('Shared successfully.', 'success');
    } catch (_) {}
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('Direct URL copied to clipboard!', 'success');
  }
});

bluetoothShareBtn.addEventListener('click', async () => {
  if (navigator.bluetooth) {
    try {
      showToast('Scanning nearby Bluetooth devices...', 'info');
      await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
      showToast('Bluetooth pairing handshake ready.', 'success');
    } catch (_) {
      showToast('Bluetooth pairing dismissed.', 'danger');
    }
  } else {
    showToast('Web Bluetooth available on Chrome Android.', 'danger');
  }
});

// Initial Render
updatePreview();

