import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/Card";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data produk dari backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/item`); // Mengambil data dari endpoint backend
        console.log("Products fetched:", response.data.payload);
        setProducts(response.data.payload); // Menyimpan semua produk dari backend
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
      {/* Nama website */}
      <h1 className="text-4xl font-extrabold text-center mb-4">NetWorth</h1>
      {/* Search bar di tengah secara horizontal */}
      <div className="flex justify-center mb-6">
        <SearchBar placeholder="Explore more..." onSearch={handleSearch} />
      </div>
      {/* Konten utama */}
      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image_url || "/store.svg"} // Gunakan gambar default jika tidak ada
              name={product.name}
              price={`Rp${product.price}`}
              store={`Store ID: ${product.store_id}`} // Menampilkan ID toko
              stock={product.stock}
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default Home;
