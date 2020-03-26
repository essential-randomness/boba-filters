import { Box } from "face-api.js";

const logger = require("debug")("BobaFilters");

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map(moduleName => r(moduleName).default);
}

function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

const MISHAS = importAll(require.context("./mishaPics/", true, /\.png$/));
const IMAGES: { [key: string]: HTMLImageElement } = {};

const getRandomMisha = () => {
  return "/" + MISHAS[Math.floor(Math.random() * MISHAS.length)];
};

const getCachedImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (IMAGES[src]) {
      resolve(IMAGES[src]);
      return;
    }
    const img = new Image();
    img.onload = () => {
      IMAGES[src] = img;
      resolve(img);
    };
    img.src = src;
  });
};

export default async (
  target: HTMLCanvasElement,
  faceBox: Box
): Promise<HTMLCanvasElement> => {
  const misha = await getCachedImage(getRandomMisha());
  logger(`Chosen image: ${misha.src}`);

  // Add some margin so the face is slightly bigger than the target.
  // The margin will depend on the box size. Let's say 1/5.
  const boxMarginX = faceBox.width / 5;
  const boxMarginY = faceBox.height / 5;
  const newX = faceBox.x - boxMarginX;
  const newY = faceBox.y - boxMarginY;
  const newWidth = faceBox.width + 2 * boxMarginX;
  const newHeight = faceBox.height + 2 * boxMarginY;

  // get aspect ratio of Misha within new box boundaries
  const finalRatio = calculateAspectRatioFit(
    misha.naturalWidth,
    misha.naturalHeight,
    newWidth,
    newHeight
  );

  // Figure out which offset we need so Misha is centered
  // within the new boxes boundaries.
  const offsetX = (newWidth - finalRatio.width) / 2;
  const offsetY = (newHeight - finalRatio.height) / 2;

  const context = target.getContext("2d");
  context?.drawImage(
    misha,
    newX + offsetX,
    newY + offsetY,
    finalRatio.width,
    finalRatio.height
  );

  return target;
};
