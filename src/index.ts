import { findFace } from "./face-recognition";
import mishaFilter from "./misha-filter";

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
      console.log("here is", result);
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
