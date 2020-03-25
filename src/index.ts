import { findFace } from "./face-recognition";
import mishaFilter from "./misha-filter";

const logger = require("debug")("BobaFilters");
logger.enabled = true;

type ImageLike =
  | string
  | HTMLCanvasElement
  | HTMLImageElement
  | HTMLVideoElement;

const applyFilter = (
  target: ImageLike,
  filterType: (_: ImageLike) => string
) => {
  return new Promise((resolve, reject) => {
    findFace(target).then(result => {
      logger("here is", result);
      const container = document.querySelector(".imgContainer") as HTMLElement;

      result.forEach(faceBox => {
        const faceDiv = mishaFilter(faceBox);
        container.appendChild(faceDiv);
      });
      resolve(result);
    });
  });
};

export { applyFilter, mishaFilter };
