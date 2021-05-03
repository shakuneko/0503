import products from "../json/products.json";
import inspirations from "../json/inspirations.json";
import shop from "../json/shop.json";
import designers from "../json/designers.json";
import aboutus from "../json/about-us";




export const getJSON = (url) => {
  switch (url) {
    case "/":
      return products;
    case "/inspirations":
      return inspirations;
    case "/shop":
      return shop;
    case "/designers":
      return designers;
    case "/about-us":
      return aboutus;
    default:
      return products;
  }
};



