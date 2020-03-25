import { applyFilter, mishaFilter } from "../../";

const container = document.querySelector("#canvas");
applyFilter(container, undefined).then(result => {
  console.log("TADAAA!!");
});
