import express, { Router } from "express";
import FacebookMerchantService from "../services/facebookMerchant";
import GoogleMerchantService from "../services/googleMerchant";
import BingMerchantService from "../services/bingMerchant";
import YandexMerchantService from "../services/yandexMerchant";
import SnapchatMerchantService from "../services/snapchatMerchant";
import TiktokMerchantService from "../services/tiktokMerchant";
export default () => {
  const router = Router();
  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));

  // add one product listing to all merchant apis : google - meta - bing - yandex
  router.post("/create-product", async (req, res) => {
    try {
      const FacebookMerchant: FacebookMerchantService = req.scope.resolve(
        "facebookMerchantService",
      );
      const GoogleMerchant: GoogleMerchantService = req.scope.resolve(
        "googleMerchantService",
      );
      const bingMerchant: BingMerchantService = req.scope.resolve(
        "bingMerchantService",
      );
      const yandexMerchant: YandexMerchantService = req.scope.resolve(
        "yandexMerchantService",
      );
      const snapchatMerchant: SnapchatMerchantService = req.scope.resolve(
        "snapchatMerchantService",
      );
      const tiktokMerchant: TiktokMerchantService = req.scope.resolve(
        "tiktokMerchantService",
      );

      const newProduct = req.body; // Assuming the request body contains user data
      if (!newProduct) {
        throw new Error("no product received");
      }

      // const googleProduct = await GoogleMerchant.syncProductToMerchantCenter(
      //   newProduct,
      // );
      // const bingProduct = await bingMerchant.syncProductToMerchantCenter(
      //   newProduct,
      // );
      // const facebookProduct =
      //   await FacebookMerchant.syncProductToMerchantCenter(newProduct);
      // const yandexProduct = await yandexMerchant.syncProductToMerchantCenter(
      //   newProduct,
      // );
      const snapchatProduct =
        await snapchatMerchant.syncProductToMerchantCenter(newProduct);
      // const tiktokProduct =
      //   await tiktokMerchant.syncProductToMerchantCenter(newProduct);
      // console.log(`///// ${facebookProduct}`);
      if (
        // !googleProduct
        // !facebookProduct
        // !bingProduct
        // !yandexProduct
        !snapchatProduct
        // !tiktokProduct
      ) {
        throw new Error(
          ` product not published in one or more merchant api ${snapchatProduct} `,
        );
      }
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json(`API ENPOINT ERROR: ${error.message} `);
    }
  });

  router.delete("/delete-product", async (req, res) => {
    try {
      const GoogleMerchant = req.scope.resolve("googleMerchantService");
      const googleRemovedItem = await GoogleMerchant.deleteProduct(req.body.id);
      if (!googleRemovedItem) {
        throw new Error(`Product not deleted: ${googleRemovedItem}`);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  // add multi products to meta
  router.post("/create-multi-products-for-meta", async (req, res) => {
    try {
      const FacebookMerchant = req.scope.resolve("facebookMerchantService");

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
      const GoogleMerchant = req.scope.resolve("googleMerchantService");

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
  // add multi products to yandex
  router.post("/create-multi-products-for-yandex", async (req, res) => {
    try {
      const yandexMerchant = req.scope.resolve("yandexMerchantService");

      const newProducts = req.body; // Assuming the request body contains user data
      const yandexProduct = await yandexMerchant.prototype.insertMultiProducts(
        newProducts,
      );

      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!yandexProduct) {
        throw new Error("product not published in yandex merchant center");
      }
      res.status(201).json(yandexProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  // add multi products to bing
  router.post("/create-multi-products-for-bing", async (req, res) => {
    try {
      const bingMerchant = req.scope.resolve("bingMerchantService");

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
  // add multi products to tiktok
  router.post("/create-multi-products-for-tiktok", async (req, res) => {
    try {
      const tiktokMerchant = req.scope.resolve("tiktokMerchantService");

      const newProducts = req.body; // Assuming the request body contains user data
      const tiktokProduct = await tiktokMerchant.prototype.insertMultiProducts(
        newProducts,
      );

      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!tiktokProduct) {
        throw new Error("product not published in tiktok merchant center");
      }
      res.status(201).json(tiktokProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  // add multi products to snapchat
  router.post("/create-multi-products-for-snapchat", async (req, res) => {
    try {
      const snapchatMerchant = req.scope.resolve("snapchatMerchantService");

      const newProducts = req.body; // Assuming the request body contains user data
      const snapchatProduct =
        await snapchatMerchant.prototype.insertMultiProducts(newProducts);

      if (!newProducts) {
        throw new Error("no product received");
      }
      if (!snapchatProduct) {
        throw new Error("product not published in snapchat merchant center");
      }
      res.status(201).json(snapchatProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return router;
};
