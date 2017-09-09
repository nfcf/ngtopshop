// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: 'AIzaSyCTxP3Oyjh3Qnoe9N_-07eKTcAuYaEoKDk',
    authDomain: 'ngtopshop.firebaseapp.com',
    databaseURL: 'https://ngtopshop.firebaseio.com',
    projectId: 'ngtopshop',
    storageBucket: '',
    messagingSenderId: '449063369106'
  },
  stripe: {
    apiKey: 'pk_test_es8mju5aGwxTaVp1qJhBD6cE',
    checkoutImage: 'https://stripe.com/img/documentation/checkout/marketplace.png'
  }
};
