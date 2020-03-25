import { Box } from "face-api.js";

const logger = require("debug")("BobaFilters");

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map(moduleName => r(moduleName).default);
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

const MARGINS = 10;

export default async (
  target: HTMLCanvasElement,
  faceBox: Box
): Promise<HTMLCanvasElement> => {
  const misha = await getCachedImage(getRandomMisha());
  logger(`Chosen image: ${misha.src}`);

  const context = target.getContext("2d");
  context?.drawImage(
    misha,
    faceBox.x - MARGINS,
    faceBox.y - MARGINS,
    faceBox.width + 2 * MARGINS,
    faceBox.height + 2 * MARGINS
  );

  return target;
};
