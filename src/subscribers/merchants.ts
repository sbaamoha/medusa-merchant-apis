import bingMerchant from "../services/bingMerchant";
import FacebookMerchant from "../services/facebookMerchant";
import GoogleMerchant from "../services/googleMerchant";
import yandexMerchant from "../services/yandexMerchant";

class merchantApisSubscriber {
  bingMerchant: bingMerchant;
  googleMerchant: GoogleMerchant;
  yandexMerchant: yandexMerchant;
  facebookMerchant: FacebookMerchant;
  constructor({
    eventBusService,
    bingMerchant,
    googleMerchant,
    facebookMerchant,
    yandexMerchant,
  }) {
    this.bingMerchant = bingMerchant;
    this.googleMerchant = googleMerchant;
    this.yandexMerchant = yandexMerchant;
    this.facebookMerchant = facebookMerchant;
    eventBusService.subscribe("addProductToMerchant", this.handleAddProduct);
  }

  async handleAddProduct(data) {
    const bingProduct = await this.bingMerchant.syncProductToMerchantCenter(
      data,
    );
    const googleProduct = await this.googleMerchant.syncProductToMerchantCenter(
      data,
    );
    const facebookProduct =
      await this.facebookMerchant.syncProductToMerchantCenter(data);
    const yandexProduct = await this.yandexMerchant.syncProductToMerchantCenter(
      data,
    );

    // console.log("New product: " + data.id);
  }
}

export default merchantApisSubscriber;
