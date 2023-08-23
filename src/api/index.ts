const GoogleMerchant = require("../../../services/googleMerchant");
const FacebookMerchant = require("../../../services/facebook/FacebookMerchant");
import { Router } from "express";

export default (rootDirectory) => {
  const router = Router();
  // router.get("/create-product", async (req, res) => {
  //   try {
  //     res.status(201).json("hello");
  //   } catch (error) {
  //     res.status(500).json({ error: "An error occurred" });
  //   }
  // });
  router.post("/create-product", async (req, res) => {
    try {
      const newProduct = req.body; // Assuming the request body contains user data
      const googleProduct = await GoogleMerchant.syncProductToMerchantCenter(
        newProduct
      );
      const facebookProduct = await FacebookMerchant.addListingItem(newProduct);
      if (!newProduct) {
        throw new Error("no product received");
      }
      if (!googleProduct || !facebookProduct) {
        throw new Error("product not published in one or more merchant api");
      }
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  router.post("/create-multi-products", async (req, res) => {
    try {
      const newProducts = req.body; // Assuming the request body contains user data
      const googleProduct = await GoogleMerchant.insertMultiProducts(
        newProducts
      );
      const facebookProduct = await FacebookMerchant.addMultiListingProducts(
        newProducts
      );
      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!googleProduct || !facebookProduct) {
        throw new Error("product not published in one or more merchant api");
      }
      res.status(201).json(newProducts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return router;
};
