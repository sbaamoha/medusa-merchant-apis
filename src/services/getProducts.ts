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
      Currency: "USD", // default
    };
  }
  makeGoogleProduct(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: `${product.price} ${product.currency}`,
      link: product.url,
      availability: product.availability,
      image_link: product.image_url,
      condition: product.condition || "new",
      category: product.category,
      mpn: product.mpn,
    };
  }
  makeFacebookProduct(product) {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: `${product.price} ${product.currency}`,
      link: product.url,
      availability: product.availability,
      image_link: product.image_url,
      condition: product.condition || "new",
      brand: product.brand,
    };
  }

  async getProducts(platform) {
    try {
      // fetch products here and name them items
      const items = await this.productService.list({});

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
