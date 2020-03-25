import { applyFilter, mishaFilter } from "../../";

function importAll(r) {
  return r.keys().map(moduleName => r(moduleName).default);
}
const IMAGES = importAll(require.context("../images/", true, /\.jpg$/));
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const filterToImg = e => {
  console.log(e.target, canvas);
  context.drawImage(
    e.target,
    0,
    0,
    e.target.naturalWidth,
    e.target.naturalHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
  applyFilter(canvas, undefined).then(result => {
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
