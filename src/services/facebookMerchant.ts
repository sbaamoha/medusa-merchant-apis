import { TransactionBaseService } from "@medusajs/medusa";
import { FacebookAdsApi, ProductCatalog } from "facebook-nodejs-business-sdk";

import axios from "axios";
class FacebookMerchantService extends TransactionBaseService {
  facebookPageAccessToken: string;
  facebookCatalogID: number;
  constructor(props, options) {
    super(props);

    this.facebookCatalogID = options?.facebookCatalogID || 489393746048538;

    this.facebookPageAccessToken =
      options?.facebookPageAccessToken ||
      "EAAC4WOLdXJcBO9hZCmVkRCuKQ0TxLnLrj9gzXPyfKe16UFrxCEEZA51nOKvV2jR0JHLkrANqKTdH0JJvA74vnQzeFoxA2uNpGzClsSJGjN9I2ckx768CFfQTIMfJ6emEOsI8jGQDuwGl8DZBMDzsTz1culEi54gCpQYHBn8umwKZBXIbOItZCSdI49MSTOXkZD";
  }
  makeFacebookProduct(product) {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      url: product.url,
      availability: product.availability,
      image_url: product.imageURL,
      condition: product.condition,
      currency: product.currency,
      category: product.category,
    };
  }
  async addMultiListingProducts(products) {
    const items = products.map((product) => ({
      method: "CREATE",
      retailer_id: 1,
      data: this.makeFacebookProduct(product),
    }));

    const body = {
      access_token: this.facebookPageAccessToken,
      requests: items,
    };
    const res = await axios.post(
      `https://graph.facebook.com/v17.0/${this.facebookCatalogID}/batch`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res;
  }
  async syncProductToMerchantCenter(product) {
    try {
      const body = {
        access_token: this.facebookPageAccessToken,
        requests: [
          {
            method: "CREATE",
            retailer_id: 1,
            data: this.makeFacebookProduct(product),
          },
        ],
      };
      const res = await axios.post(
        `https://graph.facebook.com/v17.0/${this.facebookCatalogID}/batch`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Product added successfully:", res);
      return res;
    } catch (error) {
      console.error(`SERVICE ERR: ${error.message}`);
    }
  }

  async deleteProduct(product) {
    try {
      const res = await axios.delete(
        `https://graph.facebook.com/v17.0/${this.facebookCatalogID}/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.facebookPageAccessToken}`,
          },
        },
      );
      if (res.status === 200) {
        return {
          success: true,
          message: "Product deleted successfully.",
        };
      } else {
        return {
          success: false,
          message: `Error deleting product: ${res.status}`,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export default FacebookMerchantService;
