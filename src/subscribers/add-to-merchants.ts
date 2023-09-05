import bingMerchantService from "../services/bingMerchant";
import facebookMerchantService from "../services/facebookMerchant";
import googleMerchantService from "../services/googleMerchant";
import yandexMerchantService from "../services/yandexMerchant";
import snapchatMerchantService from "../services/snapchatMerchant";
import tiktokMerchantService from "../services/tiktokMerchant";

class AddToMerchantApiSubscriber {
  bingMerchant: bingMerchantService;
  googleMerchant: googleMerchantService;
  yandexMerchant: yandexMerchantService;
  facebookMerchant: facebookMerchantService;
  snapchatMerchant: snapchatMerchantService;
  tiktokMerchant: tiktokMerchantService;
  // bingMerchant;
  // googleMerchant;
  // yandexMerchant;
  // facebookMerchant;
  // snapchatMerchant;
  // tiktokMerchant;
  constructor({
    eventBusService,
    bingMerchantService,
    googleMerchantService,
    facebookMerchantService,
    yandexMerchantService,
    snapchatMerchantService,
    tiktokMerchantService,
  }) {
    this.bingMerchant = bingMerchantService;
    this.googleMerchant = googleMerchantService;
    this.yandexMerchant = facebookMerchantService;
    this.facebookMerchant = yandexMerchantService;
    this.snapchatMerchant = snapchatMerchantService;
    this.tiktokMerchant = tiktokMerchantService;
    eventBusService.subscribe(
      "product.created",
      this.handleAddProductToMerchants,
    );
  }

  handleAddProductToMerchants = async (data) => {
    // HERE GET THE PRODUCT USING THEIR ID (data.id) FROM THE DATABASE AND PASS IT TO THE MERCHANTS BELOW

    // const bingProduct = await this.bingMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const googleProduct = await this.googleMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const facebookProduct =
    //   await this.facebookMerchant.syncProductToMerchantCenter(data);
    // const yandexProduct = await this.yandexMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const tiktokProduct = await this.tiktokMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const snapchatProduct =
    //   await this.snapchatMerchant.syncProductToMerchantCenter(data);

    console.log("New product: " + data.id);
  };
}

export default AddToMerchantApiSubscriber;
