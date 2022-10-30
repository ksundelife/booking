import { createArrayOfSimilarAdsNearby } from './data.js';
import { renderArrAdsContentData } from './ads.js';

const ads = createArrayOfSimilarAdsNearby(2);
renderArrAdsContentData(ads);