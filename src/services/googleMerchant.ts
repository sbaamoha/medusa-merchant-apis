import { TransactionBaseService } from "@medusajs/medusa";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
class GoogleMerchant extends TransactionBaseService {
  oAuth2Client;
  merchant;
  googleMerchantID;
  constructor(props, options) {
    super(props);
    this.oAuth2Client = new OAuth2Client({
      clientId:
        options?.googleClientID ||
        "273388557916-m0mu72kq8cj9i1iteqf3panmmnmthsrv.apps.googleusercontent.com",
      clientSecret:
        options?.googleSecret || "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",
    });
    this.merchant = google.content({
      version: "v2.1",
      auth: this.oAuth2Client || "", // Initialize the authentication
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
    };
  }

  async insertMultiProducts(products) {
    const entries = products.map((product) => ({
      batchId: crypto.randomUUID(),
      merchantId: this.googleMerchantID,
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
      },
    );
    return req;
  }

  async syncProductToMerchantCenter(product) {
    // this.merchant.delete()
    try {
      const response = await this.merchant.products.insert({
        merchantId: this.googleMerchantID,
        requestBody: this.makeProduct(product),
      });
      return response.data;
    } catch (error) {
      throw new Error("Error syncing product to Google Merchant Center");
    }
  }

  async deleteProduct(product) {
    try {
      const response = await this.merchant.products.delete({
        name: product.id,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error syncing product to Google Merchant Center");
    }
  }
}

export default GoogleMerchant;
