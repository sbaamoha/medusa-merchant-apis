import { TransactionBaseService } from "@medusajs/medusa";
import fetch from "node-fetch";

class FacebookMerchant extends TransactionBaseService {
  facebookPageAccessToken: string;
  facebookCatalogID: number;
  constructor(props, options) {
    super(props);
    this.facebookPageAccessToken = options?.facebookPageAccessToken || "";
    this.facebookCatalogID = options?.facebookCatalogID || "";
  }
  async addMultiListingProducts(products) {
    const items = products.map((product) => ({
      method: "CREATE",
      retailer_id: 1,
      data: product,
    }));

    const body = {
      access_token: this.facebookPageAccessToken,
      requests: items,
    };
    const res = await fetch(
      `https://graph.facebook.com/v17.0/${this.facebookCatalogID}/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    return res;
  }
  async syncProductToMerchantCenter(product) {
    try {
      const body = {
        access_token: this.facebookPageAccessToken,
        requests: {
          method: "CREATE",
          retailer_id: 1,
          data: product,
        },
      };
      const res = await fetch(
        `https://graph.facebook.com/v17.0/${this.facebookCatalogID}/batch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(product) {
    try {
      const body = {
        access_token: this.facebookPageAccessToken,
        requests: {
          method: "CREATE",
          retailer_id: 1,
          data: product,
        },
      };
      const res = await fetch(
        `https://graph.facebook.com/v17.0/${this.facebookCatalogID}/products/${product.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.facebookPageAccessToken}`,
          },
          body: JSON.stringify(body),
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
export default FacebookMerchant;
