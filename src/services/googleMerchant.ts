import { TransactionBaseService } from "@medusajs/medusa";
import { google } from "googleapis";
import crypto from "crypto";

class GoogleMerchantService extends TransactionBaseService {
  auth;
  merchant;
  googleMerchantID;
  constructor(props, options) {
    super(props);
    this.auth = new google.auth.GoogleAuth({
      credentials:
        JSON.parse(process.env.SERVICE_ACCOUNT_KEY) ||
        JSON.parse(options?.googleServiceKey),
      scopes: ["https://www.googleapis.com/auth/content"],
    });
    this.merchant = google.content({
      version: "v2.1",
      auth: this.auth,
    });
    this.googleMerchantID = options.googleMerchantID || 5077196742;
  }

  makeProduct(product) {
    return {
      title: product.title,
      offerId: crypto.randomUUID(), // Use a unique identifier for the product
      description: product.description,
      brand: product.brand,
      availability: product.availability,
      condition: product.condition,
      targetCountry: product.targetCountry,
      imageLink: product.image_url,
      link: product.url,
      price: {
        value: product.price,
        currency: product.currency,
      },
      googleProductCategory: product.category,
      contentLanguage: "ar",
      channel: "online",
    };
  }

  async insertMultiProducts(products) {
    try {
      this.merchant = google.content({
        version: "v2.1",
        auth: this.auth, // Initialize the authentication
      });
      const entries = products.map((product) => ({
        batchId: crypto.randomUUID(),
        merchantId: this.googleMerchantID,
        method: "insert",
        product: this.makeProduct(product),
      }));
      const response = await this.merchant.products.insert({
        merchantId: this.googleMerchantID,
        requestBody: entries,
      });
      // const req = await axios.post(
      //   "https://shoppingcontent.googleapis.com/content/v2.1/products/batch",
      //   {
      //     entries,
      //     kind: "content#productsCustomBatchResponse",
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${this.googleAccessToken}`,
      //     },
      //   },
      // );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async syncProductToMerchantCenter(product) {
    try {
      const response = await this.merchant.products.insert({
        merchantId: this.googleMerchantID,
        requestBody: this.makeProduct(product),
      });
      console.log("Product added successfully:", response.data);
      return response;
    } catch (error) {
      throw new Error(
        `SERVICES ERROR: syncing product to Google Merchant Center ${error.message} `,
      );
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await this.merchant.products.delete({
        merchantId: this.googleMerchantID,
        productId,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `SERVICES ERROR: deleting product from Google Merchant Center ${error.message} `,
      );
    }
  }
}

export default GoogleMerchantService;
