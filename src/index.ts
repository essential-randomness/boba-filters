import { findFace } from "./face-recognition";
import mishaFilter from "./misha-filter";
import { Box } from "face-api.js";

const logger = require("debug")("BobaFilters");

type ImageLike =
  | string
  | HTMLCanvasElement
  | HTMLImageElement
  | HTMLVideoElement;

const copyToNewCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  const copy = document.createElement("canvas");
  copy.width = canvas.width;
  copy.height = canvas.height;
  copy.getContext("2d")?.drawImage(canvas, 0, 0);

  return copy;
};

export const applyFilter = (
  target: ImageLike,
  toApply: (target: HTMLCanvasElement, face: Box) => string
) => {
  // TODO: load this into canvas if not canvas
  const canvas = copyToNewCanvas(target as HTMLCanvasElement);
  return new Promise((resolve, _) => {
    findFace(canvas).then(result => {
      logger("Found the following face boxes:", result);
      Promise.all(
        result.map(async faceBox => {
          logger("Applying filter to :", faceBox);
          await toApply(canvas, faceBox);
        })
      ).then(() => resolve(canvas));
    });
  });
};

export { mishaFilter };
