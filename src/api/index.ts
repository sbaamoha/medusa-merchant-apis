import express, { Router } from "express";

import GetProductsService from "../services/getProducts";
import fs from "fs";
import { parse } from "json2csv";
export default () => {
  const router = Router();
  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));

  router.get("/grab-products", async (req, res) => {
    try {
      const user = req.body;
      const getProductsService: GetProductsService =
        req.scope.resolve("getProductsService");
      // grab all products from database
      const jsonProducts = await getProductsService.getProducts(
        user.username || "tiktok",
      );
      const csv = parse(jsonProducts);

      fs.writeFileSync("productsCsv.csv", csv);
      res.download("productsCsv.csv", "productsCsv.csv", (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Internal Server Error");
        }
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return router;
};
