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
      "eyJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuc25hcGNoYXQuY29tXC9hY2NvdW50c1wvb2F1dGgyXC90b2tlbiIsInR5cCI6IkpXVCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJhbGciOiJkaXIiLCJraWQiOiJhY2Nlc3MtdG9rZW4tYTEyOGNiYy1oczI1Ni4wIn0..iPlHHonV-bIPEZFMkaFP_w.0qqE7xhCQ4bJx4-Ow91mIfe81t8WsoLPjVLPRGZbRZGJ7AjHZqIg3-SCDajJuELnb2G2FTnWm_UDfbR1x1qIJNQHMveQ_O0hhwlj8BDtUjywnXzSm5JxMi60gt2EVr7cBAW6jP-fbE4XcOCi0CFhKVg3Gg2lxfojurI_BjkRWmojzEHaf1M6xhtUFE7D9xoS2hZMF2fzZP03-yznSU9HwxYSeeXxt5QCRedFk5do5OFnHBWrZ_ZMqV1k61Gp-IFNOWIzuuBBIns_IPo9Ebm7KkPvcwPeIK5oL18oEeMDOXMPGeZ8x7HtVXzZUmmtdcrpJzIs-lIX7OkriE2pqquH_cn7X1RE6m9gdUVo68FHnA_K60fUWyE9cntZXvzplZ1Nds48Fr27rf8QZcx3iS4D_XmJi3MTjM9LrH1ul3Od2RmXylWxuDMrs321u3dSIbtAlzth2EAZUOAtsNs5523Fp2xl1_bcTfICLEt6gpPqGn4vF_2YKvxIbSEapSBVlEFzAz6YO78MGMqEA21AJP_SWfnNdhcdhKHFBa216X7Hb_LRm9vOOlc-zn17wc_Z5iJSsxetWgmqPcCpwg0bvKlfnmZ2CXcv3jhecHXMo79xltK9h3JHcFIBvThY6j2Y3Ncja8KQa5ftVNULboFdsEXqO6xvvWRLYBAZQOiGoQzovsCgw1k6vQd_f3TsqlaP79qEyvNW6SYV34TJi4Nv4KhLS-PhMySTexyDBlixDoTa7W8.ScJWXyySGkMXB3U2w9k36A";
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
      // const token = await this.getAccessToken();

      const res = await axios.post(this.snapchatApiUrl, product, {
        headers: {
          Authorization: `Bearer ${this.snapchatAccessToken}`,
        },
      });
      console.log(res.status);
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
