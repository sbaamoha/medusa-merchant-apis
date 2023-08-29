import { TransactionBaseService } from "@medusajs/medusa";
import fetch from "node-fetch";

class yandexMerchant extends TransactionBaseService {
  businessId;
  accessToken: string;
  yandexApiUrl: string;

  constructor(props, options) {
    super(props);
    this.businessId = options?.yandexBusinessId || "";
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
      // brand: product.brand,
      // availability: product.availability,
      condition: product.condition,
      pictures: [product.image_url],
      // link: product.url,
      purchasePrice: {
        value: product.price,
        currencyId: product.currency,
      },
      category: product.category,
    };
  }
  async syncProductToMerchantCenter(productData) {
    try {
      let body;
      if (productData.length > 1) {
        let products = productData.map((product) => ({
          offer: this.makeProduct(product),
          mapping: {
            marketSku: 0,
          },
        }));
        body = {
          offerMappings: products,
        };
      } else {
        body = {
          offerMappings: [
            {
              offer: {
                offerId: productData.handle,
                name: productData.title,
                category: productData.category,
                pictures: [productData.image_url],
                //   "videos": [
                //     "string"
                //   ],
                //   "vendor": "LEVENHUK",
                //   "barcodes": [
                //     46012300000000
                //   ],
                description: productData.description,
                //   "manufacturerCountries": [
                //     "Россия"
                //   ],
                //   "vendorCode": "VNDR-0005A",
                //   "tags": [
                //     "до 500 рублей"
                //   ],

                //   "customsCommodityCode": 8517610008,
                //   "certificates": [
                //     "string"
                //   ],
                //   "boxCount": 0,
                condition: {
                  // "type": "PREOWNED",
                  quality: productData.condition,
                  // "reason": "string"
                },
                //   "type": "DEFAULT",
                //   "downloadable": false,
                //   "adult": false,
                //   "age": {
                //     "value": 0,
                //     "ageUnit": "YEAR"
                //   },
                //   "params": [
                //     {
                //       "name": "Wi-Fi",
                //       "value": "есть"
                //     }
                //   ],
                purchasePrice: {
                  value: productData.price,
                  currencyId: productData.currency,
                },
                //   "additionalExpenses": {
                //     "value": 0,
                //     "currencyId": "RUR"
                //   },
                //   "cofinancePrice": {
                //     "value": 0,
                //     "currencyId": "RUR"
                //   }
              },
              mapping: {
                marketSku: 0,
              },
            },
          ],
        };
      }
      const response = await fetch(`${this.yandexApiUrl}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (error) {
      console.error("Error adding product:", error.response.data);
      throw error;
    }
  }

  async deleteProduct(offerId) {
    try {
      const response = await fetch(`${this.yandexApiUrl}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({ offerIds: [offerId] }),
      });
      return response;
    } catch (error) {
      console.error("Error removing product:", error.response.data);

      throw error;
    }
  }
}

export default yandexMerchant;
