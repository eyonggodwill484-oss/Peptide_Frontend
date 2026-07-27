// Original, procedurally generated illustration templates (no third-party assets).
// Each function returns a self-contained SVG string rendered to PNG by sharp.

const uid = (prefix) => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

export function vialSVG({
  width = 1200,
  height = 1200,
  liquidFrom,
  liquidTo,
  capColor,
  capColorDark,
  code,
  transparent = false,
  glow = true,
}) {
  const gLiquid = uid("liquid");
  const gCap = uid("cap");
  const gGlass = uid("glass");
  const gGlow = uid("glow");
  const gBg = uid("bg");
  const fShadow = uid("shadow");

  const cx = width / 2;
  const bodyW = width * 0.34;
  const bodyH = height * 0.5;
  const bodyX = cx - bodyW / 2;
  const bodyY = height * 0.32;
  const neckW = bodyW * 0.42;
  const neckH = height * 0.07;
  const neckX = cx - neckW / 2;
  const neckY = bodyY - neckH;
  const capH = height * 0.09;
  const capY = neckY - capH + height * 0.012;
  const labelH = bodyH * 0.34;
  const labelY = bodyY + bodyH * 0.3;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="${gBg}" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="${liquidFrom}" stop-opacity="${transparent ? 0 : 0.14}" />
      <stop offset="100%" stop-color="${liquidFrom}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="${gLiquid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${liquidFrom}" />
      <stop offset="100%" stop-color="${liquidTo}" />
    </linearGradient>
    <linearGradient id="${gCap}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${capColorDark}" />
      <stop offset="45%" stop-color="${capColor}" />
      <stop offset="100%" stop-color="${capColorDark}" />
    </linearGradient>
    <linearGradient id="${gGlass}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
      <stop offset="18%" stop-color="#ffffff" stop-opacity="0.06" />
      <stop offset="82%" stop-color="#ffffff" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.4" />
    </linearGradient>
    <radialGradient id="${gGlow}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${liquidFrom}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${liquidFrom}" stop-opacity="0" />
    </radialGradient>
    <filter id="${fShadow}" x="-50%" y="-20%" width="200%" height="160%">
      <feDropShadow dx="0" dy="${height * 0.018}" stdDeviation="${height * 0.018}" flood-color="#0f172a" flood-opacity="0.22" />
    </filter>
  </defs>

  ${transparent ? "" : `<rect width="${width}" height="${height}" fill="url(#${gBg})" />`}
  ${glow ? `<ellipse cx="${cx}" cy="${bodyY + bodyH * 0.55}" rx="${bodyW * 1.7}" ry="${bodyH * 0.9}" fill="url(#${gGlow})" />` : ""}

  <g filter="url(#${fShadow})">
    <rect x="${neckX - width * 0.012}" y="${capY}" width="${neckW + width * 0.024}" height="${capH}" rx="${capH * 0.28}" fill="url(#${gCap})" />
    <rect x="${neckX - width * 0.012}" y="${capY + capH * 0.32}" width="${neckW + width * 0.024}" height="${capH * 0.14}" fill="#00000022" />

    <rect x="${neckX}" y="${neckY}" width="${neckW}" height="${neckH + 4}" fill="url(#${gLiquid})" opacity="0.92" />

    <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="${bodyW * 0.16}" fill="url(#${gLiquid})" />

    <rect x="${bodyX + bodyW * 0.06}" y="${labelY}" width="${bodyW * 0.88}" height="${labelH}" rx="${bodyW * 0.05}" fill="#ffffff" opacity="0.94" />
    <rect x="${bodyX + bodyW * 0.06}" y="${labelY}" width="${bodyW * 0.88}" height="${labelH * 0.22}" fill="${liquidTo}" opacity="0.85" />
    <text x="${cx}" y="${labelY + labelH * 0.62}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${bodyW * 0.108}" font-weight="700" fill="#1e293b" letter-spacing="0.5">${code}</text>
    <text x="${cx}" y="${labelY + labelH * 0.84}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${bodyW * 0.062}" fill="#64748b" letter-spacing="1.5">RESEARCH USE ONLY</text>

    <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="${bodyW * 0.16}" fill="url(#${gGlass})" />
    <rect x="${neckX}" y="${neckY}" width="${neckW}" height="${neckH + 4}" fill="url(#${gGlass})" />
  </g>
</svg>`;
}

export function categoryTileSVG({ width = 1200, height = 800, colorFrom, colorTo, accent }) {
  const gBg = uid("bg");
  const gOrb = uid("orb");
  const rows = 5;
  const cols = 8;
  let nodes = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + 0.5) * (width / cols) + (r % 2 === 0 ? width / cols / 2 : 0);
      const y = (r + 0.5) * (height / rows);
      const rad = 3 + ((r + c) % 3) * 2;
      nodes += `<circle cx="${x}" cy="${y}" r="${rad}" fill="#ffffff" opacity="${0.05 + ((r + c) % 4) * 0.03}" />`;
      if (c < cols - 1) {
        nodes += `<line x1="${x}" y1="${y}" x2="${x + width / cols}" y2="${y}" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1.5" />`;
      }
    }
  }
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gBg}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorFrom}" />
      <stop offset="100%" stop-color="${colorTo}" />
    </linearGradient>
    <radialGradient id="${gOrb}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.55" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gBg})" />
  <g>${nodes}</g>
  <circle cx="${width * 0.78}" cy="${height * 0.28}" r="${height * 0.42}" fill="url(#${gOrb})" />
  <circle cx="${width * 0.16}" cy="${height * 0.85}" r="${height * 0.3}" fill="url(#${gOrb})" opacity="0.6" />
</svg>`;
}

export function articleCoverSVG({ width = 1600, height = 900, colorFrom, colorTo, accent }) {
  const gBg = uid("bg");
  const gWave = uid("wave");
  let waves = "";
  for (let i = 0; i < 4; i++) {
    const y = height * (0.3 + i * 0.18);
    waves += `<path d="M0 ${y} Q ${width * 0.25} ${y - 60 - i * 10}, ${width * 0.5} ${y} T ${width} ${y}" stroke="#ffffff" stroke-opacity="${0.08 + i * 0.02}" stroke-width="2" fill="none" />`;
  }
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gBg}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorFrom}" />
      <stop offset="100%" stop-color="${colorTo}" />
    </linearGradient>
    <radialGradient id="${gWave}" cx="30%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.45" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gBg})" />
  <circle cx="${width * 0.82}" cy="${height * 0.3}" r="${height * 0.5}" fill="url(#${gWave})" />
  ${waves}
</svg>`;
}

export function certificateSealSVG({ size = 600, colorFrom, colorTo, accent, label }) {
  const gBg = uid("bg");
  const gRing = uid("ring");
  const cx = size / 2;
  const cy = size / 2;
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gBg}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorFrom}" />
      <stop offset="100%" stop-color="${colorTo}" />
    </linearGradient>
    <linearGradient id="${gRing}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="${colorTo}" />
    </linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${size * 0.46}" fill="url(#${gBg})" />
  <circle cx="${cx}" cy="${cy}" r="${size * 0.46}" fill="none" stroke="url(#${gRing})" stroke-width="${size * 0.02}" />
  <circle cx="${cx}" cy="${cy}" r="${size * 0.38}" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 8" />
  <path d="M ${cx} ${cy - size * 0.16} L ${cx + size * 0.08} ${cy + size * 0.02} L ${cx} ${cy + size * 0.14} L ${cx - size * 0.08} ${cy + size * 0.02} Z" fill="#ffffff" opacity="0.92" />
  <circle cx="${cx}" cy="${cy - size * 0.02}" r="${size * 0.03}" fill="${colorFrom}" />
  <text x="${cx}" y="${cy + size * 0.28}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.052}" font-weight="700" fill="#ffffff" letter-spacing="1">${label}</text>
</svg>`;
}

export function avatarSVG({ size = 400, colorFrom, colorTo, initials }) {
  const gBg = uid("bg");
  const cx = size / 2;
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gBg}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorFrom}" />
      <stop offset="100%" stop-color="${colorTo}" />
    </linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cx}" r="${size / 2}" fill="url(#${gBg})" />
  <circle cx="${cx}" cy="${size * 0.42}" r="${size * 0.15}" fill="#ffffff" opacity="0.85" />
  <path d="M ${size * 0.22} ${size * 0.86} Q ${cx} ${size * 0.62} ${size * 0.78} ${size * 0.86} Z" fill="#ffffff" opacity="0.85" />
  <text x="${cx}" y="${size * 0.42 + size * 0.045}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.13}" font-weight="700" fill="${colorFrom}">${initials}</text>
</svg>`;
}

export function heroBackdropSVG({ width = 2400, height = 1600, colorFrom, colorTo }) {
  const gBg = uid("bg");
  const g1 = uid("orb1");
  const g2 = uid("orb2");
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gBg}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#eef2ff" />
    </linearGradient>
    <radialGradient id="${g1}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${colorFrom}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${colorFrom}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="${g2}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${colorTo}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${colorTo}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gBg})" />
  <circle cx="${width * 0.78}" cy="${height * 0.22}" r="${height * 0.55}" fill="url(#${g1})" />
  <circle cx="${width * 0.12}" cy="${height * 0.82}" r="${height * 0.5}" fill="url(#${g2})" />
</svg>`;
}
