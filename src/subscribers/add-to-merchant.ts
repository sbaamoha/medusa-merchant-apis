import { ProductService } from "@medusajs/medusa";
import GoogleMerchant from "../services/googleMerchant";

class merchantApisSubscriber {
  googleMerchantService: GoogleMerchant;
  productService: ProductService;
  constructor({ eventBusService, googleMerchantService, productService }) {
    this.googleMerchantService = googleMerchantService;
    this.productService = productService;
    eventBusService.subscribe("product.created", this.handleAddProduct);
  }

  handleAddProduct = async (data) => {
    const product = await this.productService.retrieve(data.id);
    const googleProduct =
      await this.googleMerchantService.syncProductToMerchantCenter({
        id: 122,
        title: "product.title",
        description: "product.description",
        price: "22 SAR",
        link: "https://maroc4products.com",
        availability: "in_stock",
        image_link: "https://picsum.photos/200/300",
        condition: "new",
        brand: "nike",
        mpn: "GG4343DLS2",
      });

    console.log("New product: " + googleProduct);
    return googleProduct;
  };
}

export default merchantApisSubscriber;
