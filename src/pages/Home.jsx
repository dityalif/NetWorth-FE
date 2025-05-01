import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/Card";
import SkeletonCard from "@/components/SkeletonCard"; 

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/item`); 
        console.log("Products fetched:", response.data.payload);
        setProducts(response.data.payload); 
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full p-6">
      <h1 className="text-4xl font-extrabold text-center mb-4">NetWorth</h1>
      <div className="flex justify-center mb-6">
        <SearchBar placeholder="Explore more..." onSearch={handleSearch} />
      </div>
      {loading ? (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </main>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image_url || "/store.svg"} 
              name={product.name}
              price={`Rp${product.price}`}
              store={`Store ID: ${product.store_id}`} 
              stock={product.stock}
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default Home;
