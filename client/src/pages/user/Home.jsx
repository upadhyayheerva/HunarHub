import { useState, useEffect } from "react";

import Hero from "../../components/home/Hero";
import CategorySection from "../../components/home/CategorySection";
import EntrepreneurSection from "../../components/home/EntrepreneurSection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Footer from "../../components/layout/Footer";

import { getEntrepreneurs } from "../../services/entrepreneurService";
import { getFeaturedProducts } from "../../services/productService";
import API from "../../services/api";

import "../../components/home/home.css";

function Home() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ---------------- Fetch Entrepreneurs ----------------
  const fetchEntrepreneurs = async () => {
    try {
      const data = await getEntrepreneurs();
      setEntrepreneurs(data);
    } catch (error) {
      console.log("Entrepreneur Error:", error);
    }
  };

  // ---------------- Fetch Products ----------------
  const fetchProducts = async () => {
  try {
    const data = await getFeaturedProducts();
    setProducts(data);
  } catch (error) {
    console.log("Product Error:", error);
  }
};

  // ---------------- Fetch Categories ----------------
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  // ---------------- Load Data Once ----------------
  useEffect(() => {
    const loadData = async () => {
      await fetchEntrepreneurs();
      await fetchProducts();
      await fetchCategories();
    };

    loadData();
  }, []);

  return (
    <>

      <Hero />

      <CategorySection categories={categories} />

      <EntrepreneurSection entrepreneurs={entrepreneurs} />

      <FeaturedProducts products={products} />

      <WhyChooseUs />

      <Footer />
    </>
  );
}

export default Home;