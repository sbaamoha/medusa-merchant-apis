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
      sku_id: 122,
      title: "product.title",
      description: "product.description",
      price: "22 SAR",
      link: "https://maroc4products.com",
      availability: "in stock",
      image_link: "https://picsum.photos/200/300",
      condition: "new",
      // currency: product.currency,
      category: "skin care",
      mpn: "G34423E",
      brand: "nike",
      // sku_id: product.sku || product.id,
      // title: product.title,
      // description: product.description,
      // price: `${product.price} ${product.currency}`,
      // link: product.link,
      // availability: product.status,
      // image_link: product.imageLink,
      // condition: product.condition,
      // // currency: product.currency,
      // category: product.category,
      // mpn: product.handle,
      // brand: product.brand,
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
      id: 122,
      title: "product.title",
      description: "product.description",
      price: "22 SAR",
      link: "https://maroc4products.com",
      availability: "in_stock",
      image_link: "https://picsum.photos/200/300",
      condition: "new",
      brand: "nike",
      // currency: product.currency,
      // category: "skin care",
      // id: product.id,
      // title: product.title,
      // description: product.description,
      // price: `${product.price} ${product.currency}`,
      // link: product.link,
      // availability: product.availability,
      // image_link: product.image_url,
      // condition: product.condition || "new",
      // // currency: product.currency,
      // category: product.category,
      mpn: "GG4343DLS2",
    };
  }
  makeFacebookProduct(product) {
    return {
      id: 122,
      title: "product.title",
      description: "product.description",
      price: "22 SAR",
      link: "https://maroc4products.com",
      availability: "in stock",
      image_link: "https://picsum.photos/200/300",
      condition: "new",
      // currency: product.currency,
      // category: "skin care",
      brand: "nike",
      // id: product.id,
      // title: product.title,
      // description: product.description,
      // price: `${product.price} ${product.currency}`,
      // link: product.link,
      // availability: product.availability,
      // image_link: product.image_url,
      // condition: product.condition || "new",
      // // currency: product.currency,
      // brand: product.brand,
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
<<<<<<< Updated upstream
        const products = [
          this.makeGoogleProduct(items[0]),
          {
            id: 23432,
            title: "product.name",
            description: "product.description",
            price: "92 SAR",
            link: "https://maroc4products.com",
            availability: "in_stock",
            image_link: "https://picsum.photos/200/300",
            condition: "new",
            brand: "nike",
            mpn: "HHGD82839S",
          },
        ];
        // const products = items.map((product) => {
        // return this.makeGoogleProduct(items[0]);
        // });
        return products;
=======
        // const products = items.map((product) => {
        //   return this.makeGoogleProduct(product);
        // });
        // return products;
        const products = [
          {
            title: "tshirt one",
            id: 1,
            description: "product description",
            brand: "nike",
            availability: "in_stock",
            condition: "new",
            targetCountry: "US",
            image_url: "https://picsum.photos/200/300",
            url: "https://maroc4products.com",
            price: 99,
            currency: "SAR",
            category: "skin",
            contentLanguage: "ar",
            channel: "online",
          },
          {
            title: "Tshirt 3",
            id: 2,
            description: "product. description",
            brand: "nike",
            availability: "in_stock",
            condition: "new",
            targetCountry: "US",
            image_url: "https://picsum.photos/200/300",
            url: "https://maroc4products.com",
            price: 209,
            currency: "SAR",
            googleProductCategory: "skin",
            contentLanguage: "ar",
            channel: "online",
          },
        ];
        return products.map((product) => this.makeGoogleProduct(product));
>>>>>>> Stashed changes
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
