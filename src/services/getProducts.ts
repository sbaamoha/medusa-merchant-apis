import { TransactionBaseService } from "@medusajs/medusa";
import { ProductService } from "@medusajs/medusa";
class GetProductsService extends TransactionBaseService {
  private productService: ProductService;
  constructor(container) {
    super(container);
    this.productService = container.productService;
  }
  makeTiktokProduct(product) {
    return {
      sku_id: product.sku || product.id,
      title: product.title,
      description: product.description,
      price: `${product.price} ${product.currency}`,
      link: product.link,
      availability: product.status,
      image_link: product.imageLink,
      condition: product.condition,
      // currency: product.currency,
      category: product.category,
      mpn: product.handle,
      brand: product.brand,
    };
  }
  makeYandexProduct(product) {
    return {
      ID: product.id,
      Title: product.title,
      Description: product.description,
      Price: product.price,
      URL: product.link,
      Image: product.image_url,
      Currency: "USD",
    };
  }
  makeGoogleProduct(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: `${product.price} ${product.currency}`,
      link: product.link,
      availability: product.availability,
      image_link: product.image_url,
      condition: product.condition || "new",
      // currency: product.currency,
      category: product.category,
      mpn: product.handle,
    };
  }
  makeFacebookProduct(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: `${product.price} ${product.currency}`,
      link: product.link,
      availability: product.availability,
      image_url: product.image_url,
      condition: product.condition || "new",
      // currency: product.currency,
      category: product.category,
    };
  }

  async getProducts(platform) {
    try {
      // fetch products here and name them items
      const items = await this.productService.list({});
      // const items = [
      //   {
      //     id: 1,
      //     title: "product 2",
      //     description: " a good desc",
      //     brand: "nike",
      //     price: 15,
      //     currency: "SAR",
      //     link: "https://google.com",
      //     image_url: "http://www.example.com/image1.jpg",
      //     condition: "new",
      //     availability: "in_stock",
      //     category: "skin care",
      //     mpn: "GO12345OOGLE",
      //   },
      //   {
      //     title: "testing product",
      //     id: 2,
      //     brand: "nike",
      //     description: " a good desc",
      //     price: 13,
      //     mpn: "GO12345OOGLE",
      //     currency: "SAR",
      //     link: "https://google.com",
      //     image_url: "http://www.example.com/image1.jpg",
      //     condition: "new",
      //     availability: "in_stock",
      //     category: "skin care",
      //   },
      // ];

      if (platform === "meta") {
        const products = items.map((product) => {
          return this.makeFacebookProduct(product);
        });
        return products;
      }
      if (platform === "google") {
        const products = items.map((product) => {
          return this.makeGoogleProduct(product);
        });
        return products;
      }
      if (platform === "bing") {
        const products = items.map((product) => {
          return this.makeGoogleProduct(product);
        });
        return products;
      }
      if (platform === "snapchat") {
        const products = items.map((product) => {
          return this.makeGoogleProduct(product);
        });
        return products;
      }
      if (platform === "tiktok") {
        const products = items.map((product) => {
          return this.makeTiktokProduct(product);
        });
        return products;
      }
      if (platform === "yandex") {
        const products = items.map((product) => {
          return this.makeYandexProduct(product);
        });
        return products;
      }
      // this.eventBusService_.
    } catch (error) {}
  }
}

export default GetProductsService;
