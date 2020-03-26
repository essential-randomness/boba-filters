import { applyFilter, mishaFilter } from "../../";

function importAll(r) {
  return r.keys().map(moduleName => r(moduleName).default);
}
const IMAGES = importAll(require.context("../images/", true, /\.jpg$/));
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const canvasContainer = document.querySelector(".canvasContainer");
const filterToImg = img => {
  canvasContainer.classList.add("loading");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  context.drawImage(img, 0, 0);
  applyFilter(canvas, mishaFilter).then(result => {
    canvasContainer.classList.remove("loading");
    console.log("TADAAA!!");
  });
};

const imgSelector = document.querySelector(".imgSelector");
IMAGES.forEach(imgSource => {
  const selector = document.createElement("div");
  selector.classList.add("selector");
  const img = document.createElement("img");
  img.src = `/${imgSource}`;
  selector.append(img);
  imgSelector.append(selector);
  img.addEventListener("click", e => filterToImg(e.target));
});

const urlSelector = document.querySelector(".selector.url");
urlSelector.addEventListener("click", () => {
  const url = prompt("gimme a url");
  if (!url) {
    return;
  }
  const img = new Image();
  img.crossOrigin = "";
  img.onload = () => {
    filterToImg(img);
  };
  img.onerror = () => {
    alert(
      "Failed to load the image. This is most likely due to limitations of the server it's hosted on. Sorry! Try uploading it from disk instead."
    );
  };
  img.src = url;
});

const fileSelector = document.querySelector(".selector.upload");
const fileInput = document.querySelector("#fileLoad");
fileSelector.addEventListener("click", () => {
  fileInput.click();
});
fileInput.addEventListener("change", e => {
  const filesSelected = e.target.files;
  if (filesSelected.length == 0) {
    return;
  }

  const fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent) {
    const newImage = document.createElement("img");
    newImage.onload = () => filterToImg(newImage);
    newImage.src = fileLoadedEvent.target.result;
  };
  fileReader.readAsDataURL(filesSelected[0]);
});
