import { applyFilter, mishaFilter } from "../../";

function importAll(r) {
  return r.keys().map(moduleName => r(moduleName).default);
}
const IMAGES = importAll(require.context("../images/", true, /\.jpg$/));
let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

const canvasContainer = document.querySelector(".canvasContainer");
const filterToImg = img => {
  canvasContainer.classList.add("loading");
  canvasContainer.classList.remove("empty");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  context.drawImage(img, 0, 0);
  applyFilter(canvas, mishaFilter).then(result => {
    canvasContainer.removeChild(canvas);
    canvasContainer.append(result);
    canvas = result;
    context = result.getContext("2d");
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
      "Failed to load the image. This is most likely due to limitations of the server it's hosted on." +
        " Sorry! Hint: try copy/pasting the picture instead."
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

document.body.addEventListener(
  "dragstart",
  () => {
    canvasContainer.classList.add("dragging");
  },
  false
);
document.body.addEventListener(
  "dragend",
  () => canvasContainer.classList.remove("dragging"),
  false
);

canvasContainer.addEventListener(
  "dragenter",
  () => canvasContainer.classList.add("enter"),
  false
);
canvasContainer.addEventListener(
  "dragleave",
  () => {
    canvasContainer.classList.remove("enter");
  },
  false
);
canvasContainer.addEventListener(
  "dragover",
  e => {
    e.preventDefault();
    e.stopPropagation();
  },
  false
);

canvasContainer.addEventListener(
  "drop",
  e => {
    console.log(e);
    console.log(e.dataTransfer.files);
    /*for (let i = 0; i < e.dataTransfer.items.length; i++) {
      console.log(e.dataTransfer.items[i]);
    }*/

    console.log(e.dataTransfer.getData("text/html"));
    e.preventDefault();
    canvasContainer.classList.remove("enter");
    canvasContainer.classList.remove("dragging");

    if (e.dataTransfer.files.length > 0) {
      const fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        const newImage = document.createElement("img");
        newImage.onload = () => filterToImg(newImage);
        newImage.src = fileLoadedEvent.target.result;
      };
      fileReader.readAsDataURL(e.dataTransfer.files[0]);
    }
  },
  false
);

const imageTypes = ["image/png", "image/gif", "image/bmp", "image/jpg"];
document.addEventListener("paste", e => {
  console.log(e);
  console.log(e.clipboardData.items);
  console.log(JSON.stringify(e.clipboardData.items));
  console.log("paste action initiated");

  const items = e.clipboardData.items;

  for (let i = 0; i < items.length; i++) {
    if (imageTypes.includes(items[i].type)) {
      const fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        const newImage = document.createElement("img");
        newImage.onload = () => filterToImg(newImage);
        newImage.src = fileLoadedEvent.target.result;
      };
      fileReader.readAsDataURL(items[i].getAsFile());
    }
  }

  e.preventDefault();
});
