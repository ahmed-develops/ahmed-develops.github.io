import React from 'react';

export default function Languages({ data }) {
  return (
    <section className="framer-section" id="languages">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="languages-grid">
          {data.items.map((item, idx) => (
            <div className="language-card" key={idx}>
              <h4 className="language-name">{item.language}</h4>
              <span className="language-level">{item.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
