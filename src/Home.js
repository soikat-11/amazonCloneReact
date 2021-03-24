import React from "react";

import ImageSlider from "./ImageSlider";
import { ImageSliderData } from "./ImageSliderData";
import Product from "./Product";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <ImageSlider slides={ImageSliderData} />

        <div className="home__row">
          <Product
            id="131431543"
            title="Harry Potter Box Set: The Complete Collection (Children’s Paperback) (Set of 7 Volumes)"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/816m9xtqsML.jpg"
            rating={5}
          />

          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, 
            Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={235.0}
            rating={4}
            image="https://www.noelleeming.co.nz/shop/render-image/products/192/192331.530.556.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="4596516"
            title="Fitbit Charge 4 Fitness and Activity Tracker with Built-in GPS, Heart Rate, Sleep & Swim Tracking (Rosewood)"
            price={799.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/91au8g2DhML.jpg"
          />

          <Product
            id="41465534"
            title="Amazon Echo Dot (4th Gen) Smart Speaker with improved bass, LED display and Alexa (Blue)"
            price={98.99}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/61u0y9ADElL._SL1000_.jpg"
          />

          <Product
            id="513446844"
            title="Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Space Grey (4th Generation)"
            price={1299.99}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/811aBwuSuIL._SL1500_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="4596516"
            title="Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SL1000_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
