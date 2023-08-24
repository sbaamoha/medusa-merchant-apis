const GoogleMerchant = require("../../../services/googleMerchant");
const FacebookMerchant = require("../../../services/FacebookMerchant");
const bingMerchant = require("../../../services/bingMerchant");
import { Router } from "express";
// import bingMerchant from "../services/bingMerchant";

export default (rootDirectory) => {
  const router = Router();

  // add one product listing to all merchant apis : google - meta - bing
  router.post("/create-product", async (req, res) => {
    try {
      const newProduct = req.body; // Assuming the request body contains user data
      const googleProduct = await GoogleMerchant.syncProductToMerchantCenter(
        newProduct
      );
      const bingProduct = await bingMerchant.syncProductToMerchantCenter(
        newProduct
      );
      const facebookProduct = await FacebookMerchant.addListingItem(newProduct);
      if (!newProduct) {
        throw new Error("no product received");
      }
      if (!googleProduct || !facebookProduct || !bingProduct) {
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

      const metaProduct = await FacebookMerchant.addMultiListingProducts(
        newProducts
      );
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
      const googleProduct = await GoogleMerchant.insertMultiProducts(
        newProducts
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
      const bingProduct = await bingMerchant.insertMultiProducts(newProducts);

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
