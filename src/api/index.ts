import express, { Router } from "express";
// import GoogleMerchantService from "../services/googleMerchant";
import GetProductsService from "../services/getProducts";
import fs from "fs";
import { parse } from "json2csv";
import xml2js from "xml2js";
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
      const builder = new xml2js.Builder({
        headless: false,
        cdata: true,
        renderOpts: {
          pretty: true,
          indent: " ",
          newline: "\n",
        },
      });
      const xmlData = {
        rss: {
          $: {
            "xmlns:g": "http://base.google.com/ns/1.0",
            version: "2.0",
          },
          channel: {
            title: "متجر المنتجات المغربية",
            link: "https://maroc4products.com/ar",
            description:
              "اكتشف المنتجات المغربية الأصيلة في متجرنا! نحن نقدم مجموعة متنوعة من العناصر بما في ذلك منتجات العناية الشخصية والمواد الغذائية والعسل المغربي والأملو والأعشاب. ستساعدك مجموعة منتجاتنا الفريدة",
            item: jsonProducts.map((product) => ({
              "g:id": product.id,
              "g:title": product.title,
              "g:description": product.description,
              "g:link": product.link,
              "g:image_link": product.image_link,
              "g:condition": product.condition,
              "g:price": product.price,
              "g:availability": product.availability,
              "g:category": product.category,
            })),
          },
        },
      };

      const xml = builder.buildObject(xmlData);
      fs.writeFileSync("productsXml.xml", xml);
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
  // router.post("/create-multi-products-for-google", async (req, res) => {
  //   try {
  //     const GoogleMerchant: GoogleMerchantService = req.scope.resolve(
  //       "googleMerchantService",
  //     );

  //     const { products } = req.body; // Assuming the request body contains user data
  //     const googleProduct = await GoogleMerchant.insertMultiProducts(products);
  //     // const googleProduct = await GoogleMerchant.syncProductToMerchantCenter(
  //     //   products[0],
  //     // );

  //     if (!products) {
  //       throw new Error("no product received");
  //     }
  //     if (!googleProduct) {
  //       throw new Error("product not published in google merchant center");
  //     }
  //     res.status(201).json(googleProduct);
  //   } catch (error) {
  //     res.status(500).json(error.message);
  //   }
  // });
  return router;
};
