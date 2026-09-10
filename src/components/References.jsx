import React from 'react';

export default function References({ data }) {
  return (
    <section className="framer-section" id="references">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="references-cards-grid">
          {data.items.map((ref, idx) => (
            <div className="reference-card" key={idx}>
              <p className="reference-quote">{ref.quote}</p>
              <div className="reference-author-row">
                <img src={ref.image} alt={ref.name} className="reference-avatar-img" />
                <div>
                  <h4 className="reference-author-name">{ref.name}</h4>
                  <p className="reference-author-role">{ref.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
