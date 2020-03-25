import { findFace } from "./face-recognition";
import misha1 from "./mishaPics/misha1.png";

findFace().then(result => {
  console.log("here is", result);
  const container = document.querySelector(".imgContainer") as HTMLElement;

  result.forEach(face => {
    const faceDiv = document.createElement("div");
    faceDiv.style.position = "absolute";
    faceDiv.style.top = face.y - 15 + "px";
    faceDiv.style.left = face.x - 15 + "px";
    faceDiv.style.width = face.width + "px";
    faceDiv.style.height = face.height + "px";
    faceDiv.style.overflow = "visible";
    const img = document.createElement("img");
    img.src = "/" + misha1;
    img.width = face.width + 20;
    faceDiv.appendChild(img);
    container.appendChild(faceDiv);
  });
});
