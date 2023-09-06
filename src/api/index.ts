import express, { Router } from "express";
import GoogleMerchantService from "../services/googleMerchant";

import GetProductsService from "../services/getProducts";
import fs from "fs";
import { parse } from "json2csv";
<<<<<<< Updated upstream
import { json2xml, js2xml } from "xml-js";

// import { xml2js } from "xml2js";
// const jsonfeedToRSS = require("jsonfeed-to-rss");
=======
import { js2xml } from "xml-js";
>>>>>>> Stashed changes
export default () => {
  const router = Router();
  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));

  router.get("/grab-products-google", async (req, res) => {
    try {
      // here im grabing the username as the name of the service to
      // built the object according to it so its service name not username
      const user = req.body;
      const getProductsService: GetProductsService =
        req.scope.resolve("getProductsService");
      // grab all products from database
      const jsonProducts = await getProductsService.getProducts(
        user.username || "google",
      );
      // const products =
      console.log(jsonProducts);
      const xml = js2xml(jsonProducts, { compact: true, spaces: 4 });

      let edits = `<?xml version="1.0"?> \n <rss xmlns:g="http://base.google.com/ns/1.0"> \n <channel> \n <title>متجر المنتجات المغربية</title>
      <link>https://maroc4products.com/ar</link>
      <description>اكتشف المنتجات المغربية الأصيلة في متجرنا! نحن نقدم مجموعة متنوعة من العناصر بما في ذلك منتجات العناية الشخصية والمواد الغذائية والعسل المغربي والأملو والأعشاب. ستساعدك مجموعة منتجاتنا الفريدة</description>
      ${xml} \n </channel> \n </rss>`;

      fs.writeFileSync("productsXml.xml", edits);
      res.download("productsXml.xml", "productsXml.xml", (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Internal Server Error");
        }
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  router.get("/grab-products", async (req, res) => {
    try {
      // here im grabing the username as the name of the service to
      // built the object according to it so its service name not username
      const user = req.body;
      const getProductsService: GetProductsService =
        req.scope.resolve("getProductsService");
      // grab all products from database
      const jsonProducts = await getProductsService.getProducts(
        user.username || "bing",
      );
      const csv = parse(jsonProducts as any);

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
  router.get("/grab-products-google", async (req, res) => {
    try {
      const getProductsService: GetProductsService =
        req.scope.resolve("getProductsService");
      // grab all products from database
      const jsonProducts = await getProductsService.getProducts("google");
      const csv = parse(jsonProducts as any);
      console.log(csv);
      // const json = JSON.stringify(jsonProducts);

      // const xml = js2xml(jsonProducts, {
      //   compact: true,
      //   spaces: 4,
      //   ignoreComment: true,
      // });
      // const xml = xml2js.parse(jsonProducts);
      function csvToXml(csvString, csvHeaders) {
        const csv = csvString.split("\n")[0];
        const csvRows = csv.split(",");
        console.log(csv);
        let xml = `<products>`;

        for (const row of csvRows) {
          const product = {};

          for (let i = 0; i < csvHeaders.length; i++) {
            product[csvHeaders[i]] = row[i];
          }

          xml += `<product>`;
          for (const key in product) {
            xml += `<${key}>${product[key]}</${key}>`;
          }
          xml += `</product>`;
        }

        xml += `</products>`;

        return xml;
      }

      fs.writeFileSync(
        "products.xml",
        csvToXml(csv, Object.keys(jsonProducts[0])),
      );
      res.download("products.xml", "products.xml", (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Internal Server Error");
        }
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  router.post("/create-multi-products-for-google", async (req, res) => {
    try {
      const GoogleMerchant: GoogleMerchantService = req.scope.resolve(
        "googleMerchantService",
      );

<<<<<<< Updated upstream
      const newProducts = req.body; // Assuming the request body contains user data
      const googleProduct = await GoogleMerchant.insertMultiProducts(
        newProducts,
      );
=======
      const { products } = req.body; // Assuming the request body contains user data
      const googleProduct = await GoogleMerchant.insertMultiProducts(products);
      // const googleProduct = await GoogleMerchant.syncProductToMerchantCenter(
      //   products[0],
      // );
>>>>>>> Stashed changes

      if (!products) {
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
  return router;
};
