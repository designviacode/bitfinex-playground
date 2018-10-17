import deepExtend from "deep-extend";

const env = process.env.NODE_ENV || "development";
const configs = {
  /*-----------------------------------
   * Global variables for all environments
   *-----------------------------------*/
  global: {
    environment: env,
    env,
    platformName: "BitFinex",
    platformUrl: "bitfinex.com",
    platformFavicon: "",
    platformLogo: "",
    platformLogoWhite: "",
    baseUrl: process.env.WEB_APPLICATION_URL,
    apiUrl: process.env.API_URL,
    googleMapApiKey: "",
    googleCAPTCHAKey: "",
    api: {
      register: "",
      login: ""
    }
  },

  /*-----------------------------------
   * Development environment variables
   * that override the global settings
   *-----------------------------------*/
  development: {
    apiUrl: "http://localhost:8000",
    baseUrl: "http://localhost:3000"
  },

  /*-----------------------------------
   * Production environment variables
   * that override the global settings
   *-----------------------------------*/
  production: {
    // hard code the URL for now as webpack doesn't load the ENV variable when it is building
    apiUrl: "",
    baseUrl: ""
  }
};

const output = deepExtend(configs.global, configs[env]);

// concatenate api path with api url
Object.keys(output.api).forEach(key => {
  output.api[key] = `${output.apiUrl}${output.api[key]}`;
});
export default output;
