import Container from "./components/Container";
import Homebanner from "./components/Homebanner";
// import Image from 'next/image'
import ProductCard from "./components/Products/ProductCard";
import { products } from "./utils/Product";
import HeroSection from "./components/HeroSection";
import ShopCategories from "./components/ShopCategories";
import getShopCategories from "@/hooks/getShopCategories";
import FeaturedProduct from "./components/FeaturedProducts";

export default async function Home() {

  
  let displayedProductsCache = null;

  //Fisher-Yates shuffle algorithm
  function randomize(values: any) {
    let index = values.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (index != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * index);
      index--;

      // And swap it with the current element.
      [values[index], values[randomIndex]] = [
        values[randomIndex],
        values[index],
      ];
    }

    return values;
  }

  const shuffledProductsssss = randomize(products);
  const displayedProducts = shuffledProductsssss.slice(0, 10);
  return (
    <>
      <HeroSection />
      <div className="p-0">
        <Container>
          <div className="mb-9">
            {/* <ShopCategories  /> */}
            <Homebanner />
          </div>
          <FeaturedProduct type="newArrival" />
          <FeaturedProduct type="mostPopular" />
          <FeaturedProduct type="featured" />

        </Container>

      </div>
    </>
  );
}
