import { findFace } from "./face-recognition";
import mishaFilter from "./misha-filter";

findFace().then(result => {
  console.log("here is", result);
  const container = document.querySelector(".imgContainer") as HTMLElement;

  result.forEach(faceBox => {
    const faceDiv = mishaFilter(faceBox);
    container.appendChild(faceDiv);
  });
});
