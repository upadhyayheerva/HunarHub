import { useState, useMemo } from "react";
import "./home.css";

function FeaturedProducts({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  // Safely get category name
  const getCategoryName = (product) => {
    if (!product || !product.category) {
      return "";
    }

    // If category is an object
    if (typeof product.category === "object") {
      return product.category.name || "";
    }

    // If category is already a string
    return String(product.category).trim();
  };

  // Get unique categories
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => getCategoryName(product))
          .filter((category) => category !== "")
      ),
    ];
  }, [products]);

  // Get unique locations
  const locations = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.location)
          .filter((location) => location)
      ),
    ];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productCategory = getCategoryName(product);

      const productName = product.name
        ? product.name.toLowerCase()
        : "";

      const searchText = search.toLowerCase();

      const matchSearch = productName.includes(searchText);

      const matchCategory =
        category === "" || productCategory === category;

      const matchLocation =
        location === "" || product.location === location;

      const matchPrice =
        price === "" || Number(product.price) <= Number(price);

      return (
        matchSearch &&
        matchCategory &&
        matchLocation &&
        matchPrice
      );
    });
  }, [products, search, category, location, price]);

  return (
    <section className="featured-section">

      {/* Section Header */}
      <div className="section-header">
        <h2>Featured Products</h2>

        <p>
          Discover authentic handmade products from local entrepreneurs.
        </p>
      </div>

      {/* Filters */}
      <div className="filter-box">

        {/* Search */}
        <input
          className="filter-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="filter-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          className="filter-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>

          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Price */}
        <input
          className="filter-input"
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

      </div>

      {/* Product Grid */}
      <div className="product-grid">

        {filteredProducts.length === 0 ? (
          <p>No matching products found.</p>
        ) : (
          filteredProducts.map((product) => {

            const productCategory = getCategoryName(product);

            return (
              <div
                className="product-card"
                key={product._id}
              >

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                {/* Product Content */}
                <div className="product-content">

                  {/* Category */}
                  <span className="product-category">
                    {productCategory || "Uncategorized"}
                  </span>

                  {/* Name */}
                  <h3>{product.name}</h3>

                  {/* Description */}
                  <p>{product.description}</p>

                  {/* Price + Location */}
                  <div className="product-footer">

                    <span className="price">
                      ₹{product.price}
                    </span>

                    <span className="location">
                      📍 {product.location}
                    </span>

                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>

    </section>
  );
}

export default FeaturedProducts;