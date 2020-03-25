import * as faceapi from "face-api.js";
// @ts-ignore
import "regenerator-runtime";

export const findFace = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri(
    "https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/"
  );
  const input = document.getElementById("img") as faceapi.TNetInput;
  const detections = await faceapi.detectAllFaces(input);
  console.log(detections);
  return detections.map(detection => detection.box);
};
