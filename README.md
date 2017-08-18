# Credo

> Data verification platform for credit thin users

## Getting Started

To use the platform you need to register a blockstack id. Start by downloading the blockstack browser to manage your identity you can find the latest version [here](https://github.com/blockstack/blockstack-browser/releases).

You can purchase a .id domain by sending ~0.01 BTC to your address generated in the Blockstack browser. 

Once you have a domain registered, you should setup your profile with your profile picture, address, DoB etc.

You can change the dummy payment data that will be sent to you through this [Google Sheet](https://docs.google.com/spreadsheets/d/1q9gfO-IB5BdbAuZ_ef5qGGy1Ma1tBc9H0Ny3Ar4FVzE/edit?usp=sharing) which is connected to the Exelon EC2 instance. You should also change the customer information to match yours as it will be used to identify the user in the data query.

### Installing

```
git clone thisrepo
```

The current interface is designed for mobile and has only been tested on Google Chrome so you should resize your window accordingly and use the above mentioned browser.
The scraping is not activated as we are using Exelon as a default data provider. All the verifications are being sent to the same EC2 instance.

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## Built With 

* [Vue JS](https://vuejs.org/v2/guide/) - The Web Framework Used
* [Blockstack JS](https://github.com/blockstack/blockstack.js) - The digital Identity Framework
* [Plaid API](https://plaid.com/docs/api/) - The Bank Payment API

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Acknowledgements

* Thanks to Parker for his help debugging everything.

