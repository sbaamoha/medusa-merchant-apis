import { TransactionBaseService } from "@medusajs/medusa";
import axios from "axios";
import crypto from "crypto";
const token =
  "eyJ0eXAiOiJKV1QiLCJub25jZSI6InhZNmJzX0VKenZ2a2xjcWwyYkhIY0NlV2Q1OFB3QmRHNnZOaUNWMW5Kb1UiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mOGNkZWYzMS1hMzFlLTRiNGEtOTNlNC01ZjU3MWU5MTI1NWEvIiwiaWF0IjoxNjkzNDc2OTc3LCJuYmYiOjE2OTM0NzY5NzcsImV4cCI6MTY5MzU2MzY3NywiYWlvIjoiRTJGZ1lPQUxXSlY2MWFMMFRma1htejBiS2w5TkJRQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJtYXJvYyBmb3IgcHJvZHVjdHMiLCJhcHBpZCI6IjQwOTc0OTE4LTUwY2ItNGYyOS05Yzc3LWI1YzA2OWQyMDM5MyIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Y4Y2RlZjMxLWEzMWUtNGI0YS05M2U0LTVmNTcxZTkxMjU1YS8iLCJpZHR5cCI6ImFwcCIsInJoIjoiMC5BUjhBTWVfTi1CNmpTa3VUNUY5WEhwRWxXZ01BQUFBQUFBQUF3QUFBQUFBQUFBQUJBQUEuIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IldXIiwidGlkIjoiZjhjZGVmMzEtYTMxZS00YjRhLTkzZTQtNWY1NzFlOTEyNTVhIiwidXRpIjoiekVGeC1yLUVQMGFoSTFreTRkQkdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc190Y2R0IjoxMzM4MzM2Njg1fQ.nt1G62bxsamMNw2JSaLdNS7Zl60r3mOTXXAExPY7yYu2MqiULjfa3w7itZ7u46ZYkPdEEy6KIZcVKasQPKSZMJGguK2jO69Hm6YZ7TK53BpiMJXtm021D5uyRpQLdAYWIk-1b5NlL65uGPLDza9v4NlstA3U49o_d8nf0JQKSFp_hnWSIJ1_0078PxUF2Hpxira2ITw-yJo7gh5BGDHnoSmbkj0pVRKdFpBfTSouOQrEPUsf2B1yKUFsXlQa8FFP1UkEM89FhU0E4-hGzuIZaT9Vt45PfUOy7cq9VF7g9ObDhT6k6kwChIhTcC3tdKqzt-fwWiXSONyn0qmyfiTz0Q";
class BingMerchantService extends TransactionBaseService {
  bingMerchantID: number;
  bingDeveloperToken: string;
  bingAccessToken: string;
  bingApiUrl: string;
  bingTenant;
  bingClientID;
  bingClientSecret;
  constructor(container, options) {
    super(container);
    this.bingClientID = options?.bingClientID || "";
    this.bingClientSecret = options?.bingClientSecret || "";

    this.bingTenant =
      options?.bingTenant || "f8cdef31-a31e-4b4a-93e4-5f571e91255a";
    this.bingMerchantID = options?.bingMerchantID || 3475240;
    this.bingDeveloperToken = options?.bingDeveloperToken || "1206GD6U0Z312373";
    this.bingAccessToken = options?.bingAccessToken || token;
    // If options is not provided, use default values
    this.bingMerchantID = 3475240;
    this.bingDeveloperToken = "1206GD6U0Z312373";
    this.bingAccessToken = token;
    this.bingApiUrl =
      `https://content.api.bingads.microsoft.com/shopping/v9.1/bmc/${this.bingMerchantID}/products` ||
      "";
  }
  async getAccessToken() {
    try {
      // here get the refresh token from DB
      const refreshToken: string = "";
      // Here request a new access token using the refresh token
      const token = await axios.post(
        `https://login.microsoftonline.com/${this.bingTenant}/oauth2/v2.0/token`,
        {
          client_id: this.bingClientID,
          client_secret: this.bingClientSecret,
          grant_type: "refresh_token",
          scope: "https%3A%2F%2Fads.microsoft.com%2Fmsads.manage",
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      // here save the token.refresh_token to the database

      // return access token
      return token;
    } catch (error) {
      console.error(error.message);
    }
  }
  makeProduct(product) {
    return {
      title: product.name,
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
    const req = await axios.post(
      `${this.bingApiUrl}/batch`,
      {
        entries,
      },
      {
        headers: {
          DeveloperToken: this.bingDeveloperToken,
          AuthenticationToken: this.bingAccessToken,
        },
      },
    );
    return req;
  }

  async syncProductToMerchantCenter(product) {
    try {
      const token = await this.getAccessToken();
      // console.log(this.makeProduct(product));
      // console.log(this.bingAccessToken);
      // console.log(this.bingMerchantID);
      // console.log(this.bingApiUrl);

      const req = await axios.post(
        this.bingApiUrl,
        {
          product: this.makeProduct(product),
        },
        {
          headers: {
            DeveloperToken: this.bingDeveloperToken,
            // AuthenticationToken: token?.access_token,
          },
        },
      );
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
      const req = await axios.delete(`${this.bingApiUrl}/${product.id} `, {
        headers: {
          DeveloperToken: this.bingDeveloperToken,
          AuthenticationToken: this.bingAccessToken,
        },
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

export default BingMerchantService;
