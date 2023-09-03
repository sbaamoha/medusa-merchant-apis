import { TransactionBaseService } from "@medusajs/medusa";
// import fetch from "node-fetch";
import axios from "axios";
import crypto from "crypto";

class YandexMerchantService extends TransactionBaseService {
  businessId;
  accessToken: string;
  yandexApiUrl: string;

  constructor(props, options) {
    super(props);
    this.businessId = options?.yandexBusinessId || 3947629582;
    this.accessToken =
      options?.yandexAccessToken ||
      "y0_AgAAAABwXE-oAApmfwAAAADrTAwOetToDygyRnGtuW28azN81BDt7bY";
    this.yandexApiUrl = `https://api.partner.market.yandex.ru/businesses/${this.businessId}/offer-mappings`;
  }

  makeProduct(product) {
    return {
      name: product.title,
      offerId: crypto.randomUUID(), // Use a unique identifier for the product
      description: product.description,
      condition: product.condition,
      pictures: [product.image_url],
      purchasePrice: {
        value: product.price,
        currencyId: product.currency,
      },
      category: product.category,
      vendor: "maroc4products",
    };
  }
  async syncProductToMerchantCenter(productData) {
    try {
      let body = {
        offerMappings: [
          {
            offer: this.makeProduct(productData),
            mapping: {
              marketSku: 0,
            },
          },
        ],
      };
      // console.log(this.accessToken);
      const response = await axios.post(
        `${this.yandexApiUrl}/update`,
        {
          body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error("Error adding product:", error.message);
      throw new Error(error.message);
    }
  }
  async insertMultiProducts(products) {
    try {
      let items = products.map((product) => ({
        offer: this.makeProduct(product),
        mapping: {
          marketSku: 0,
        },
      }));
      let body = {
        offerMappings: items,
      };
      const response = await axios.post(
        `${this.yandexApiUrl}/update`,
        {
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      );
      return response;
    } catch (error) {}
  }

  async deleteProduct(offerId) {
    try {
      const response = await axios.post(
        `${this.yandexApiUrl}/delete`,
        {
          offerIds: [offerId],
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      );
      return response;
    } catch (error) {
      console.error("Error removing product:", error.response.data);

      throw new Error(error);
    }
  }
}

export default YandexMerchantService;
