import './api.js';
import './map.js';
import './map-filter.js';
import './form-validate.js';
import './form-slider.js';
import './form-images.js';
import {getData} from './api.js';
import {deactivateAdsPage, activateAdsPage} from './form-activity.js';
import {insertBalloonsOnMap} from './ads.js';
import {sendAdFormData, resetAll} from './form-validate.js';
import {ADS_COUNT} from './const.js';
import {setFilterAdsContent} from './map-filter.js';

deactivateAdsPage();
getData(
  (ads) => {
    activateAdsPage();
    insertBalloonsOnMap(ads.slice(0, ADS_COUNT));
    setFilterAdsContent(ads);
    resetAll(ads.slice(0, ADS_COUNT));
    sendAdFormData(ads.slice(0, ADS_COUNT));
  }
);
