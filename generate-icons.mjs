import fs from 'fs';
import { createCanvas } from 'canvas';

const sizes = [192, 512];

sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#3b82f6');

    // Draw rounded rectangle background
    const cornerRadius = size * 0.215; // ~110px for 512px
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.lineTo(size - cornerRadius, 0);
    ctx.quadraticCurveTo(size, 0, size, cornerRadius);
    ctx.lineTo(size, size - cornerRadius);
    ctx.quadraticCurveTo(size, size, size - cornerRadius, size);
    ctx.lineTo(cornerRadius, size);
    ctx.quadraticCurveTo(0, size, 0, size - cornerRadius);
    ctx.lineTo(0, cornerRadius);
    ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
    ctx.closePath();
    ctx.fill();

    // Draw contact book icon
    const scale = size / 512;
    const offsetX = 100 * scale;
    const offsetY = 80 * scale;

    // Book cover
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(offsetX + 40 * scale, offsetY, 280 * scale, 352 * scale, 20 * scale);
    ctx.fill();

    // Tabs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const tabPositions = [60, 130, 200, 270];
    tabPositions.forEach(y => {
        ctx.beginPath();
        ctx.roundRect(offsetX, offsetY + y * scale, 40 * scale, 50 * scale, 8 * scale);
        ctx.fill();
    });

    // Person icon
    ctx.fillStyle = '#2563eb';

    // Head
    ctx.beginPath();
    ctx.arc(offsetX + 180 * scale, offsetY + 120 * scale, 35 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(offsetX + 180 * scale, offsetY + 165 * scale);
    ctx.quadraticCurveTo(offsetX + 140 * scale, offsetY + 165 * scale, offsetX + 120 * scale, offsetY + 190 * scale);
    ctx.lineTo(offsetX + 120 * scale, offsetY + 220 * scale);
    ctx.lineTo(offsetX + 240 * scale, offsetY + 220 * scale);
    ctx.lineTo(offsetX + 240 * scale, offsetY + 190 * scale);
    ctx.quadraticCurveTo(offsetX + 220 * scale, offsetY + 165 * scale, offsetX + 180 * scale, offsetY + 165 * scale);
    ctx.fill();

    // Contact lines
    const lines = [
        { y: 250, w: 180, color: '#94a3b8' },
        { y: 280, w: 140, color: '#cbd5e1' },
        { y: 310, w: 160, color: '#cbd5e1' }
    ];

    lines.forEach(line => {
        ctx.fillStyle = line.color;
        ctx.beginPath();
        ctx.roundRect(offsetX + 90 * scale, offsetY + line.y * scale, line.w * scale, 12 * scale, 6 * scale);
        ctx.fill();
    });

    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./public/icon-${size}x${size}.png`, buffer);
    console.log(`✓ Generated icon-${size}x${size}.png`);
});

console.log('✓ All icons generated successfully!');
