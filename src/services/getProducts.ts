import { Product, TransactionBaseService } from "@medusajs/medusa";
import { ProductService } from "@medusajs/medusa";
class GetProductsService extends TransactionBaseService {
  private productService: ProductService;
  constructor(container) {
    super(container);
    this.productService = container.productService;
  }
  makeTiktokProduct(product) {
    return {
      sku_id: product.variants[0].sku ,
      title: product.title_ar,
      description: product.description_ar,
      price: `${product.variants[0].prices[0].amount/100} ${product.variants[0].prices[0].currency_code}`,
      link: `https://maroc4products.com/ar/products/${product.handle}`,
      availability: "in stock",
      image_link: product.thumbnail,
      condition: "new",
      category: product.categories[0],
      mpn: product.mid_code,
      brand: "maroc4products",
    };
  }
  makeYandexProduct(product) {
    return {
      ID: product.id,
      Title: product.title_ar,
      Description: product.description_ar,
      Price: product.variants[0].amount,
      URL: `https://maroc4products.com/ar/products/${product.handle}`,
      Image: product.thumbnail,
      Currency: "USD", // default
    };
  }
  makeGoogleProduct(product) {
    return {
      id: product.id,
      title: product.title_ar,
      description: product.description_ar,
      price: `${product.variants[0].prices[0].amount/100} ${product.variants[0].prices[0].currency_code}`,
      link: `https://maroc4products.com/ar/products/${product.handle}`,
      availability: "in stock",
      image_link: product.thumbnail,
      condition: "new",
      category: product.categories[0],
      mpn: product.mid_code,
    };
  }
  makeFacebookProduct(product) {
    return {
      id: product.id,
      title: product.title_ar,
      description: product.description_ar,
      price: `${product.variants[0].prices[0].amount/100} ${product.variants[0].prices[0].currency_code}`,
      link: `https://maroc4products.com/ar/products/${product.handle}`,
      availability: "in stock",
      image_link: product.thumbnail,
      condition: "new",
      brand: "maroc4products",
    };
  }

   getProducts= async (platform) => {
    try {
      
      // fetch products here and name them items
      const items = await this.productService.list({});
      // console.log(items[0])
      if (platform === "meta") {
        const products = items.map((product) => {
          return this.makeFacebookProduct(product);
        });
        return products;
      }
      if (platform === "google") {
        const products = items.map((product) => {
          console.log(this.makeGoogleProduct(product))
          return this.makeGoogleProduct(product);
        });
        console.log("***************")
        console.log(products[0])
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
