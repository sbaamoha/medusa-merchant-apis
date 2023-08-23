import { TransactionBaseService } from "@medusajs/medusa";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
});
// Initialize the Google API client
const merchant = google.content({
  version: "v2.1",
  auth: oAuth2Client, // Initialize the authentication
});

class GoogleMerchant extends TransactionBaseService {
  makeProduct(product) {
    return {
      title: product.title,
      offerId: product.title + product.price, // Use a unique identifier for the product
      description: product.description,
      brand: product.brand,
      availability: product.availability,
      condition: product.condition,
      imageLink: product.image_url,
      link: product.url,
      price: {
        value: product.price,
        currency: product.currency,
      },
      googleProductCategory: product.category,
    };
  }

  async insertMultiProducts(products) {
    function randomInRange(from, to) {
      let r = Math.random();
      return Math.floor(r * (to - from) + from);
    }
    const entries = products.map((product) => ({
      batchId: randomInRange(0, 999999),
      merchantId: process.env.GOOGLE_MERCHANT_ID,
      method: "insert",
      product: this.makeProduct(product),
    }));
    const req = await fetch(
      "https://shoppingcontent.googleapis.com/content/v2.1/products/batch",
      {
        method: "POST",
        body: JSON.stringify({
          entries,
          kind: "content#productsCustomBatchResponse",
        }),
      }
    );
    return req;
  }

  // async syncAllProductsToMerchantCenter(products) {
  //   try {
  //     // for (const product of products) {
  //     //   await this.syncProductToMerchantCenter(product);
  //     // }
  //     const responses = await this.batchInsertProducts(products);
  //     responses.forEach((response, index) => {
  //       if (response.data.kind === "content#productsInsertResponse") {
  //         console.log(`Product ${index + 1} inserted:`, response.data);
  //       } else {
  //         console.error(`Error inserting product ${index + 1}:`, response.data);
  //       }
  //     });
  //   } catch (error) {
  //     throw new Error("Error syncing products to Google Merchant Center");
  //   }
  // }
  async syncProductToMerchantCenter(product) {
    try {
      const response = await merchant.products.insert({
        merchantId: process.env.GOOGLE_MERCHANT_ID,
        requestBody: this.makeProduct(product),
      });
      return response.data;
    } catch (error) {
      throw new Error("Error syncing product to Google Merchant Center");
    }
  }
}

export default GoogleMerchant;
