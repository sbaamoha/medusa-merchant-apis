import { TransactionBaseService } from "@medusajs/medusa";
import axios from "axios";
import crypto from "crypto";

class TiktokMerchantService extends TransactionBaseService {
  tiktokAccessToken: string;
  tiktokApiUrl: string;
  tiktok_bc_id: string;
  tiktokCatalogID: string;
  headers;
  constructor(props, options) {
    super(props);
    this.tiktokAccessToken =
      options?.tiktokAccessToken || "cff5162b0287f2e9e68c391115e970363d5fa01a";
    this.tiktok_bc_id = options?.tiktok_bc_id || "7147724055544610817";
    this.tiktokCatalogID = options?.tiktokCatalogID || "7147720826203260674";
    this.tiktokApiUrl =
      "https://business-api.tiktok.com/open_api/v1.3/catalog/product";
    this.headers = {
      "Content-Type": "application/json",
      "Access-Token": this.tiktokAccessToken,
    };
  }
  makeProduct(product) {
    return {
      title: product.title,
      sku_id: crypto.randomUUID(), // Use a unique identifier for the product
      description: product.description,
      brand: product.brand,
      availability: product.availability,
      product_detail: {
        condition: product.condition,
      },
      price_info: {
        price: product.price,
        currency: product.currency || "SAR",
      },
      landing_page: {
        landing_page_url: product.url,
      },
      image_url: product.image_url,
      link: product.url,
    };
  }

  async syncProductToMerchantCenter(product) {
    try {
      console.log("/////////////////// TIKTOK SERVICE");
      // console.log(this.makeProduct(product));
      const response = await axios.post(
        `${this.tiktokApiUrl}/upload`,
        {
          bc_id: this.tiktok_bc_id,
          catalog_id: this.tiktokCatalogID,
          products: [this.makeProduct(product)],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Token": this.tiktokAccessToken,
          },
        },
      );

      if (response.data.message === "OK") {
        return {
          status: 200,
          message: response.data.message,
        };
      } else {
        return {
          status: response.data.code,
          message: response.data.message,
        };
      }
    } catch (error) {
      throw new Error(
        `SERVICES ERROR: syncing product to tiktok Merchant Center ${error.message} `,
      );
    }
  }
  async insertMultiProducts(products) {
    try {
      const items = products.map((product) => this.makeProduct(product));
      const response = await axios.post(
        `${this.tiktokApiUrl}/upload`,
        {
          bc_id: this.tiktok_bc_id,
          catalog_id: this.tiktokCatalogID,
          products: items,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Token": this.tiktokAccessToken,
          },
        },
      );
      if (response.data.message === "OK") {
        return {
          status: 200,
          message: response.data.message,
        };
      } else {
        return {
          status: response.data.code,
          message: response.data.message,
        };
      }
    } catch (error) {
      throw new Error(
        `SERVICES ERROR: syncing product to tiktok Merchant Center ${error.message} `,
      );
    }
  }

  async deleteProduct(product) {
    try {
      const response = await axios.post(
        `${this.tiktokApiUrl}/delete`,
        {
          bc_id: this.tiktok_bc_id,
          catalog_id: this.tiktokCatalogID,
          sku_ids: [product.sku_id],
        },
        this.headers,
      );

      return response;
    } catch (error) {
      throw new Error(
        `SERVICES ERROR: syncing product to tiktok Merchant Center ${error.message} `,
      );
    }
  }
}
export default TiktokMerchantService;
