import Container from "./components/Container";
import Homebanner from "./components/Homebanner";
// import Image from 'next/image'
import ProductCard from "./components/Products/ProductCard";
import Slides from "./components/slider/Slides";
import { products } from "./utils/Product";

export default function Home() {
  return (
    <>
      <Slides />
      <div className="p-8">
        <Container>
          <div>
            <Homebanner />
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {products.map((product: any) => {
                return <ProductCard key={product.id} data={product} />;
              })}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
