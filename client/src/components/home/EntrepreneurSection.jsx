function EntrepreneurSection({ entrepreneurs }) {
  return (
    <section className="section">

      <div className="section-header">
        <h2>Verified Entrepreneurs</h2>
        <p>Meet talented artisans building their businesses through HunarHub.</p>
      </div>

      <div className="entrepreneur-grid">

        {entrepreneurs.map((person) => (
          <div className="entrepreneur-card" key={person._id}>

            <div className="avatar">
              {person.fullName.charAt(0)}
            </div>

            <h3>{person.fullName}</h3>

            <p>📍 {person.location}</p>

            <span className="verified">
              ✔ Verified Seller
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}

export default EntrepreneurSection;