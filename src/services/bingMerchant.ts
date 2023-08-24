import { TransactionBaseService } from "@medusajs/medusa";
import fetch from "node-fetch";

class bingMerchant extends TransactionBaseService {
  makeProduct(product) {
    return {
      title: product.title,
      description: product.description,
      offerId: product.title + product.price, // Use a unique identifier for the product
      brand: product.brand,
      availability: product.availability,
      condition: product.condition,
      imageLink: product.image_url,
      link: product.url,
      price: {
        value: product.price,
        currency: product.currency,
      },
      productType: product.category,
      additionalImageLinks: [product.image_url],
      targetCountry: product.targetCountry,
    };
  }

  async insertMultiProducts(products) {
    function randomInRange(from, to) {
      let r = Math.random();
      return Math.floor(r * (to - from) + from);
    }
    const entries = products.map((product) => ({
      batchId: randomInRange(0, 999999),
      merchantId: process.env.BING_MERCHANT_ID,
      method: "insert",
      product: this.makeProduct(product),
    }));
    const req = await fetch(
      `https://content.api.bingads.microsoft.com/shopping/v9.1/bmc/${process.env.BING_MERCHANT_ID}/products/batch`,
      {
        method: "POST",
        body: JSON.stringify({
          entries,
        }),
      }
    );
    return req;
  }

  async syncProductToMerchantCenter(product) {
    try {
      const req = await fetch(
        `https://content.api.bingads.microsoft.com/shopping/v9.1/bmc/${process.env.BING_MERCHANT_ID}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            DeveloperToken: process.env.BING_DEVELOPER_TOKEN,
            AuthenticationToken: process.env.BING_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            product: this.makeProduct(product),
          }),
        }
      );
      if (req.status === 201 || req.status === 200) {
        return req;
      } else {
        throw new Error(
          `Error while adding product to bing merchant center. STATUS CODE : ${req.status} `
        );
      }
    } catch (error) {
      throw new Error(
        `Error syncing product to Google Merchant Center ${error.message}`
      );
    }
  }
}

export default bingMerchant;
