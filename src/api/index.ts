// const GoogleMerchant = require("../../../services/googleMerchant");
// const FacebookMerchant = require("../../../services/FacebookMerchant");
// const bingMerchant = require("../../../services/bingMerchant");
// const yandexMerchant = require("../../../services/");
import { Router } from "express";
import yandexMerchant from "../services/yandexMerchant";
import bingMerchant from "../services/bingMerchant";
import FacebookMerchant from "../services/facebookMerchant";
import GoogleMerchant from "../services/googleMerchant";

export default () => {
  const router = Router();

  // add one product listing to all merchant apis : google - meta - bing - yandex
  router.post("/create-product", async (req, res) => {
    try {
      const newProduct = req.body; // Assuming the request body contains user data
      const googleProduct =
        await GoogleMerchant.prototype.syncProductToMerchantCenter(newProduct);
      const bingProduct =
        await bingMerchant.prototype.syncProductToMerchantCenter(newProduct);
      const facebookProduct =
        await FacebookMerchant.prototype.syncProductToMerchantCenter(
          newProduct,
        );
      const yandexProduct =
        await yandexMerchant.prototype.syncProductToMerchantCenter(newProduct);

      if (!newProduct) {
        throw new Error("no product received");
      }
      if (
        !googleProduct ||
        !facebookProduct ||
        !bingProduct ||
        !yandexProduct
      ) {
        throw new Error("product not published in one or more merchant api");
      }
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  // add multi products to meta
  router.post("/create-multi-products-for-meta", async (req, res) => {
    try {
      const newProducts = req.body; // Assuming the request body contains user data

      const metaProduct =
        await FacebookMerchant.prototype.addMultiListingProducts(newProducts);
      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!metaProduct) {
        throw new Error("product not published in meta merchant api");
      }
      res.status(201).json(metaProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  // add multi products to google
  router.post("/create-multi-products-for-google", async (req, res) => {
    try {
      const newProducts = req.body; // Assuming the request body contains user data
      const googleProduct = await GoogleMerchant.prototype.insertMultiProducts(
        newProducts,
      );

      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!googleProduct) {
        throw new Error("product not published in google merchant center");
      }
      res.status(201).json(googleProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  // add multi products to bing
  router.post("/create-multi-products-for-bing", async (req, res) => {
    try {
      const newProducts = req.body; // Assuming the request body contains user data
      const bingProduct = await bingMerchant.prototype.insertMultiProducts(
        newProducts,
      );

      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!bingProduct) {
        throw new Error("product not published in bing merchant center");
      }
      res.status(201).json(bingProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return router;
};
