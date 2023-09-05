import BingMerchantService from "../services/bingMerchant";
import FacebookMerchantService from "../services/facebookMerchant";
import GoogleMerchantService from "../services/googleMerchant";
import YandexMerchantService from "../services/yandexMerchant";
import SnapchatMerchantService from "../services/snapchatMerchant";
import TiktokMerchantService from "../services/tiktokMerchant";

class DeleteFromMerchantApiSubscriber {
  bingMerchant: BingMerchantService;
  googleMerchant: GoogleMerchantService;
  yandexMerchant: YandexMerchantService;
  facebookMerchant: FacebookMerchantService;
  snapchatMerchant: SnapchatMerchantService;
  tiktokMerchant: TiktokMerchantService;
  constructor({
    eventBusService,
    // bingMerchant,
    // googleMerchant,
    // facebookMerchant,
    // yandexMerchant,
    // snapchatMerchant,
    // tiktokMerchant,
  }) {
    // this.bingMerchant = bingMerchant;
    // this.googleMerchant = googleMerchant;
    // this.yandexMerchant = yandexMerchant;
    // this.facebookMerchant = facebookMerchant;
    // this.snapchatMerchant = snapchatMerchant;
    // this.tiktokMerchant = tiktokMerchant;
    eventBusService.subscribe(
      "product.deleted",
      this.handleDeleteProductFromMerchant,
    );
  }

  async handleDeleteProductFromMerchant(data) {
    // const bingProduct = await this.bingMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const googleProduct = await this.googleMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const facebookProduct =
    //   await this.facebookMerchant.syncProductToMerchantCenter(data.id);
    // const yandexProduct = await this.yandexMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const tiktokProduct = await this.tiktokMerchant.syncProductToMerchantCenter(
    //   data,
    // );
    // const snapchatProduct =
    //   await this.snapchatMerchant.syncProductToMerchantCenter(data);

    console.log("Deleted product id: " + data.id);
  }
}

export default DeleteFromMerchantApiSubscriber;
