import Container from "./components/Container";
import Homebanner from "./components/Homebanner";
// import Image from 'next/image'
import ProductCard from "./components/Products/ProductCard";
import { products } from "./utils/Product";
import HeroSection from "./components/HeroSection";
import ShopCategories from "./components/ShopCategories";
import getShopCategories from "@/hooks/getShopCategories";

export default async function Home() {
  let displayedProductsCache = null;
  const categories = getShopCategories();

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
          <div>
            {/* <Homebanner /> */}
            <ShopCategories categories={categories} />
          </div>
        </Container>
        <section className="mt-9 bg-teal-800 py-5 featured_product bg-opacity-40">
          <Container>
            <h1 className="text-start text-white font-semibold text-4xl mb-6">
              Featured Products
            </h1>
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {displayedProducts.map((product: any) => {
                return <ProductCard key={product.id} data={product} />;
              })}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
