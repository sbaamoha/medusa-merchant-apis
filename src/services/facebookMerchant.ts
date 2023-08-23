import { TransactionBaseService } from "@medusajs/medusa";
class FacebookMerchant extends TransactionBaseService {
  async addMultiListingProducts(products) {
    const items = products.map((product) => ({
      method: "CREATE",
      retailer_id: 1,
      data: product,
    }));

    const body = {
      access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      requests: items,
    };
    const res = await fetch(
      // `https://graph.facebook.com/v17.0/${product.catalogId}/batch?requests=${requests}`,
      `https://graph.facebook.com/v17.0/${process.env.FACEBOOK_CATALOG_ID}/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return res;
  }
  async addListingItem(product) {
    const body = {
      access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      requests: {
        method: "CREATE",
        retailer_id: 1,
        data: product,
      },
    };
    const res = await fetch(
      // `https://graph.facebook.com/v17.0/${product.catalogId}/batch?requests=${requests}`,
      `https://graph.facebook.com/v17.0/${process.env.FACEBOOK_CATALOG_ID}/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return res;
  }
}
export default FacebookMerchant;
