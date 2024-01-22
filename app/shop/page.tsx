import React from "react";

interface Product {
  id: number;
  name: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Product 1", category: "Electronics" },
  { id: 2, name: "Product 2", category: "Clothing" },
  { id: 3, name: "Product 3", category: "Electronics" },
  { id: 4, name: "Product 4", category: "Books" },
  { id: 5, name: "Product 5", category: "Clothing" },
  { id: 6, name: "Product 6", category: "Books" },
];

const Page: React.FC = () => {
  // Group products by category
  const groupedProducts: { [key: string]: Product[] } = products.reduce(
    (acc:any, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return (
    <div>
      <h1>Welcome to our store</h1>
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {groupedProducts[category].map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Page;
