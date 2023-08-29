import { TransactionBaseService } from "@medusajs/medusa";
import fetch from "node-fetch";
// import crypto from "crypto"
class bingMerchant extends TransactionBaseService {
  bingMerchantID: number;
  bingDeveloperToken: string;
  bingAccessToken: string;
  bingApiUrl: string;
  constructor(props, options) {
    super(props);
    this.bingMerchantID = options?.bingMerchantID || "";
    this.bingDeveloperToken = options?.bingDeveloperToken || "";
    this.bingAccessToken = options?.bingAccessToken || "";
    this.bingApiUrl =
      `https://content.api.bingads.microsoft.com/shopping/v9.1/bmc/${this.bingMerchantID}/products` ||
      "";
  }
  makeProduct(product) {
    return {
      title: product.title,
      description: product.description,
      offerId: crypto.randomUUID(), // Use a unique identifier for the product
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
    const entries = products.map((product) => ({
      batchId: crypto.randomUUID(),
      merchantId: this.bingMerchantID,
      method: "insert",
      product: this.makeProduct(product),
    }));
    const req = await fetch(`${this.bingApiUrl}/batch`, {
      method: "POST",
      body: JSON.stringify({
        entries,
      }),
    });
    return req;
  }

  async syncProductToMerchantCenter(product) {
    try {
      const req = await fetch(this.bingApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DeveloperToken: this.bingDeveloperToken,
          AuthenticationToken: this.bingAccessToken,
        },
        body: JSON.stringify({
          product: this.makeProduct(product),
        }),
      });
      if (req.status === 201 || req.status === 200) {
        return req;
      } else {
        throw new Error(
          `Error while adding product to bing merchant center. STATUS CODE : ${req.status} `,
        );
      }
    } catch (error) {
      throw new Error(
        `Error syncing product to bing Merchant Center ${error.message}`,
      );
    }
  }
  async deleteProduct(product) {
    try {
      const req = await fetch(`${this.bingApiUrl}/${product.id} `, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          DeveloperToken: this.bingDeveloperToken,
          AuthenticationToken: this.bingAccessToken,
        },
        body: JSON.stringify({
          product: this.makeProduct(product),
        }),
      });
      if (req.status === 201 || req.status === 200) {
        return req;
      } else {
        throw new Error(
          `Error while DELETING product to bing merchant center. STATUS CODE : ${req.status} `,
        );
      }
    } catch (error) {
      throw new Error(
        `Error DELETING product to bing Merchant Center ${error.message}`,
      );
    }
  }
}

export default bingMerchant;
