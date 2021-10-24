const BACK_IMPORT = 'https://fean705lq7.execute-api.eu-west-1.amazonaws.com/dev';
const BACK_PRODUCTS = 'https://rw2tmg22s4.execute-api.eu-west-1.amazonaws.com/dev';

const API_PATHS = {
  bff: '/bff',
  product: BACK_PRODUCTS + '/products',
  order: BACK_PRODUCTS + '/order',
  import: BACK_IMPORT,
  cart: '/cart',
};

export default API_PATHS;
