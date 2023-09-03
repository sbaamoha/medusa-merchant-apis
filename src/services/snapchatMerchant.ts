import { TransactionBaseService } from "@medusajs/medusa";
// import fetch from "node-fetch";
import axios from "axios";
import crypto from "crypto";

class SnapchatMerchantService extends TransactionBaseService {
  snapchatAccessToken: string;
  snapchatApiUrl: string;
  constructor(props, options) {
    super(props);
    this.snapchatAccessToken =
      options?.snapchatAccessToken ||
      "eyJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuc25hcGNoYXQuY29tXC9hY2NvdW50c1wvb2F1dGgyXC90b2tlbiIsInR5cCI6IkpXVCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJhbGciOiJkaXIiLCJraWQiOiJhY2Nlc3MtdG9rZW4tYTEyOGNiYy1oczI1Ni4wIn0..pe5UEg4URP8uM3qiRrUl4g._ZjxvEb1D1Ija8WKR1vE2d8UomPP_tWfTqgwmHRxc_uNENmxwTtrHKqFJ2fxaKYSfryosVg2ZFdO26kCNWWD_uCN1xoYi33ld6Y1BsGoZnLOrnz3UANe0guNaoRgmgO6GPWPHf9bhbP2MYv7Q_TC9Mao_mfa-thPypcjZcHxvxn1UxH8EdxO8_e8BYdV9pa93RnPgN2HyGAIUcdVsw0CvJY8M2NU-Q1yQTU4nwJoPKBYJ_tJUAI-luDZIw4yMGnUENCfB5MUXcS74pDRA_PmI9kab9naz4hKPxn0uyia-PBk8EY6FR_OFWcqWHyZSmbbSGaZ1A9Si2CKJu36mH1ySb-uIShcOS_FL-WmfOltqH9COQ9LHlre4w-K8DGEeZYdqc3X2sahk2SzdaJEyNDVOX5TkBPQPY6sfsIk5wmYuSO1vlK6oUsOn7osZ0pYYIyDQIqljGu5zq6Zo4mGN_tzsdDRYV-Yyo4xqTqH3N6jqwFfEApjNbmkxcEObLGj2tqNv1u8RWzc5v3a6slcO4f9Ri_VXpGEEV6aShJoxjNf__0d9RgyQ4Dj1ZAvm4z9ctP4_209T0luT7blM7GE71Oaah3BaEVhUBCeTS3kODTKqB3xXSroZuhDm-EJhFmx6xvz3y2Y8ets0F_0ene5fUZHH-g_HN10mBqYoPv1ICN5JLnRhlY6ZqfQjJx9YV6UCkjSM_l6XsWeuKPfV3juoU-RqZgD-JOFnNJDIxRB38RayeU.NhENPSOzopx10AYTK984Ew";
    this.snapchatApiUrl = "https://adsapi.snapchat.com/v1/catalogs";
  }
  async getAccessToken() {
    try {
      // here get the refresh token from DB
      const refreshToken: string = "";
      // Here request a new access token using the refresh token
      const token = await axios.post(
        "https://accounts.snapchat.com/login/oauth2/access_token",
        {
          client_id: "",
          client_secret: "",
          grant_type: "refresh_token",
          refresh_token: refreshToken,
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
      title: product.title,
      id: crypto.randomUUID(), // Use a unique identifier for the product
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
      category: product.category,
    };
  }
  async syncProductToMerchantCenter(product) {
    try {
      const token = await this.getAccessToken();

      const res = await axios.post(
        this.snapchatApiUrl,

        product,
        {
          headers: {
            // Authorization: `Bearer  + ${token.access_token}`,
          },
        },
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }
  async insertMultiProducts(products) {
    try {
      const res = await axios.post(
        this.snapchatApiUrl,
        {
          products,
        },
        {
          headers: {
            Authorization: "Bearer " + this.snapchatAccessToken,
          },
        },
      );
      return res;
    } catch (error) {
      console.error(error.message);
    }
  }
}
export default SnapchatMerchantService;
