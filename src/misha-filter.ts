import { Box } from "face-api.js";

const logger = require("debug")("BobaFilters");

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map(moduleName => r(moduleName).default);
}

const MISHAS = importAll(require.context("./mishaPics/", true, /\.png$/));

const getRandomMisha = () => {
  return MISHAS[Math.floor(Math.random() * MISHAS.length)];
};

export default (faceBox: Box) => {
  const faceDiv = document.createElement("div");
  faceDiv.style.position = "absolute";
  faceDiv.style.top = faceBox.y - 15 + "px";
  faceDiv.style.left = faceBox.x - 15 + "px";
  faceDiv.style.width = faceBox.width + "px";
  faceDiv.style.height = faceBox.height + "px";
  faceDiv.style.overflow = "visible";
  const img = document.createElement("img");
  img.src = "/" + getRandomMisha();
  logger("Chosen image: ", img.src);
  img.width = faceBox.width + 20;
  faceDiv.appendChild(img);

  return faceDiv;
};
