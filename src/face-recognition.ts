// @ts-ignore
import "regenerator-runtime";

import * as faceapi from "face-api.js";

const logger = require("debug")("BobaFilters");

export const findFace = async (input: faceapi.TNetInput) => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("weights/");
  const detections = await faceapi.detectAllFaces(input);

  logger(detections);
  return detections.map((detection) => detection.box);
};
