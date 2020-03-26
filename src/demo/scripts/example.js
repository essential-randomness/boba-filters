import { applyFilter, mishaFilter } from "../../";

function importAll(r) {
  return r.keys().map(moduleName => r(moduleName).default);
}
const IMAGES = importAll(require.context("../images/", true, /\.jpg$/));
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const canvasContainer = document.querySelector(".canvasContainer");
const filterToImg = e => {
  canvasContainer.classList.add("loading");
  canvas.width = e.target.naturalWidth;
  canvas.height = e.target.naturalHeight;
  context.drawImage(e.target, 0, 0);
  applyFilter(canvas, mishaFilter).then(result => {
    canvasContainer.classList.remove("loading");
    console.log("TADAAA!!");
  });
};

const imgSelector = document.querySelector(".imgSelector");
IMAGES.forEach(imgSource => {
  const img = document.createElement("img");
  img.src = `/${imgSource}`;
  img.width = 100;
  img.height = 100;
  imgSelector.append(img);
  img.addEventListener("click", filterToImg);
});
