import { TransactionBaseService } from "@medusajs/medusa";
import fetch from "node-fetch";
class snapchatMerchant extends TransactionBaseService {
  snapchatAccessToken: string;
  snapchatApiUrl: string;
  constructor(props, options) {
    super(props);
    this.snapchatAccessToken =
      options?.snapchatAccessToken ||
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjkzMjMwNzQ4LCJzdWIiOiIyMDY2MWYzYS05ODBhLTQ0ZGQtYmFkMy00YTZkOGQ2MDllOTF-UFJPRFVDVElPTn43ZmFkNmJhZS04ZmRjLTQxOTgtYmZkNC1kNjYwMWQyOGQ0M2MifQ.tlH5sxvfVfdBrS3I1Yu_jCyxP7XojEDmtxHH0NClHAQ";
    this.snapchatApiUrl = "https://adsapi.snapchat.com/v1/catalogs";
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
  async addListingItem(product) {
    try {
      console.log(crypto.randomUUID());

      let newpr = {
        id: "1234567890",
        title: "Product Title",
        description: "Product Description",
        link: "https://www.example.com/product",
        image_link: "https://www.example.com/product.jpg",
        availability: "in stock",
        price: 100,
        condition: "new",
        brand: "Brand Name",
        gtin: "1234567890123",
        mpn: "MPN12345",
      };
      const res = await fetch(this.snapchatApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.snapchatAccessToken,
        },
        body: JSON.stringify(product),
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
export default snapchatMerchant;
