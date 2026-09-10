import React from 'react';

export default function Education({ data }) {
  return (
    <section className="framer-section" id="education">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {data.items.map((item, idx) => (
            <div className="education-item" key={idx}>
              <div className="education-meta">{item.institution} • {item.period}</div>
              <h3 className="education-degree">{item.degree}</h3>
              <p className="education-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
