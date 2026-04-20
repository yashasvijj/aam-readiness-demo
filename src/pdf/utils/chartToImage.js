/**
 * chartToImage.js
 * Renders a Chart.js config to a base64 PNG string via an off-screen canvas.
 * Must be called in a browser context (document available).
 *
 * Usage:
 *   const png = await chartToImage(config, 560, 280);
 *   // png is a data:image/png;base64,... string — pass directly to <Image src={png} />
 */

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

/**
 * @param {object} config   - Complete Chart.js config object
 * @param {number} width    - Logical width in pixels (output will be 2× for retina)
 * @param {number} height   - Logical height in pixels
 * @returns {Promise<string>} base64 PNG data URL
 */
export default async function chartToImage(config, width = 560, height = 280) {
  const canvas = document.createElement('canvas');
  // 2× pixel ratio for sharp rendering in PDF
  canvas.width  = width  * 2;
  canvas.height = height * 2;

  // Merge in required overrides — no animation, fixed size, 2× DPR
  const mergedConfig = {
    ...config,
    options: {
      ...config.options,
      responsive:       false,
      animation:        false,
      devicePixelRatio: 2,
    },
  };

  const chart = new Chart(canvas, mergedConfig);

  // Wait one animation frame for the chart to fully paint
  await new Promise(resolve => requestAnimationFrame(resolve));

  const dataURL = canvas.toDataURL('image/png');
  chart.destroy();
  return dataURL;
}
