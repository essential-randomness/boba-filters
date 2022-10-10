import mishaFilter from "./misha-filter";
import { Box } from "face-api.js";
declare type ImageLike = string | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
export declare const applyFilter: (target: ImageLike, toApply: (target: HTMLCanvasElement, face: Box) => string) => Promise<unknown>;
export { mishaFilter };
