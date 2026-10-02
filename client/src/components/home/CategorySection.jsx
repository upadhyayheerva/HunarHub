function CategorySection({ categories }) {
  return (
    <section className="section">

      <div className="section-header">
        <h2>Popular Categories</h2>
        <p>Explore authentic Indian crafts and handmade products.</p>
      </div>

      <div className="category-grid">

        {categories.map((category) => (
          <div className="category-card premium" key={category._id}>

            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.name}</h3>

          </div>
        ))}

      </div>

    </section>
  );
}

export default CategorySection;