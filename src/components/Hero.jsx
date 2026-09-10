import React from 'react';

export default function Hero({ data }) {
  return (
    <section className="hero-section-framer" id="hero">
      <div className="container hero-layout-grid">
        <div className="hero-text-col">
          {data.experienceBadge && (
            <div className="hero-meta-top">
              <span>{data.experienceBadge}</span>
            </div>
          )}

          <h1 className="hero-name-big">
            Muhammad<br />Ahmed
          </h1>

          <p className="hero-role-text">
            {data.role}
          </p>

          <p className="hero-quote-text">
            {data.quote}
          </p>
        </div>

        <div className="hero-image-col">
          <div className="hero-image-wrap">
            <img src={data.image} alt={data.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
