import { findFace } from "./face-recognition";
import mishaFilter from "./misha-filter";
import { Box } from "face-api.js";

const logger = require("debug")("BobaFilters");
logger.enabled = true;

type ImageLike =
  | string
  | HTMLCanvasElement
  | HTMLImageElement
  | HTMLVideoElement;

const applyFilter = (
  target: ImageLike,
  toApply: (target: HTMLCanvasElement, face: Box) => string
) => {
  // TODO: load this into canvas if not canvas
  return new Promise((resolve, _) => {
    findFace(target).then(result => {
      logger("Found the following face boxes:", result);
      const container = document.querySelector(".imgContainer") as HTMLElement;

      result.forEach(faceBox => {
        logger("Applying filter to :", faceBox);
        toApply(target as HTMLCanvasElement, faceBox);
      });
      resolve(result);
    });
  });
};

export { applyFilter, mishaFilter };
