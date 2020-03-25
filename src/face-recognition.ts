import * as faceapi from "face-api.js";
// @ts-ignore
import "regenerator-runtime";

const logger = require("debug")("BobaFilters");

export const findFace = async (input: faceapi.TNetInput) => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri(
    "https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/"
  );
  const detections = await faceapi.detectAllFaces(input);
  logger(detections);
  return detections.map(detection => detection.box);
};
