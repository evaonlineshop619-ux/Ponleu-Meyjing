import confetti from 'canvas-confetti';

/**
 * Multi-stage grand celebration confetti explosion for Ponleu & Meyjing's ceremony
 */
export function fireGrandCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  const ceremonyColors = [
    '#0284c7', // Sky Blue
    '#38bdf8', // Light Sky
    '#93c5fd', // Soft Blue
    '#fef08a', // Champagne Light
    '#fbbf24', // Gold Amber
    '#f472b6', // Romantic Rose
    '#ffffff', // Crisp White
    '#a78bfa', // Lavender
  ];

  // Stage 1: Big initial center firework burst
  confetti({
    ...defaults,
    particleCount: 120,
    spread: 90,
    startVelocity: 45,
    colors: ceremonyColors,
    scalar: 1.1,
  });

  // Stage 2: Left corner cannon shoots upward toward the center
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 65,
      origin: { x: 0.05, y: 0.75 },
      colors: ceremonyColors,
      startVelocity: 55,
      zIndex: 9999,
    });
  }, 180);

  // Stage 3: Right corner cannon shoots upward toward the center
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 65,
      origin: { x: 0.95, y: 0.75 },
      colors: ceremonyColors,
      startVelocity: 55,
      zIndex: 9999,
    });
  }, 360);

  // Stage 4: High fountain burst with light floating glitter
  setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 120,
      origin: { x: 0.5, y: 0.55 },
      colors: ceremonyColors,
      startVelocity: 35,
      gravity: 0.8,
      ticks: 300,
      scalar: 1.2,
      zIndex: 9999,
    });
  }, 550);

  // Stage 5: Final cascading gentle shower
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.35 },
      colors: ceremonyColors,
      startVelocity: 25,
      gravity: 0.6,
      ticks: 250,
      scalar: 0.9,
      zIndex: 9999,
    });
  }, 850);
}
