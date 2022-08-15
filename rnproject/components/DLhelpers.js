import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { Base64Binary } from "../src/util";
const modelJson = require("../src/model/model.json");
const modelWeights = require("../../model/weights.bin");
// 0: channel from JPEG-encoded image
// 1: gray scale
// 3: RGB image
const BITMAP_DIMENSION = 224;
const TENSORFLOW_CHANNEL = 3;
export const getModel = async () => {
  try {
    // wait until tensorflow is ready
    await tf.ready();
    // load the trained model
    return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
  } catch (error) {
    console.log("Could not load model", error);
  }
};
export const convertBase64ToTensor = async (props) => {
  try {
    const uIntArray = Base64Binary.decode(props.base64);
    // decode a JPEG-encoded image to a 3D Tensor of dtype
    const decodedImage = decodeJpeg(uIntArray, 3);
    // reshape Tensor into a 4D array
    return decodedImage.reshape([
      1,
      BITMAP_DIMENSION,
      BITMAP_DIMENSION,
      TENSORFLOW_CHANNEL,
    ]);
  } catch (error) {
    console.log("Could not convert base64 string to tesor", error);
  }
};
export const startPrediction = async (model, tensor) => {
  try {
    // predict against the model
    const output = await model.predict(tensor);
    // return typed array
    return output.dataSync();
  } catch (error) {
    console.log("Error predicting from tesor image", error);
  }
};
export const populateData = (typedArray) => {
  const predictions = Array.from(typedArray);
  return predictions.map((item, index) => {
    return {
      number: index,
      prediction: item,
    };
  });
};