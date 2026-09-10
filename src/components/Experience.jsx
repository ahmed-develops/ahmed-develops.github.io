import React from 'react';

export default function Experience({ data }) {
  return (
    <section className="framer-section" id="experience">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="experience-items-list">
          {data.items.map((item, idx) => (
            <div className="experience-item-block" key={idx}>
              <div className="exp-header-meta">
                {item.company} {item.location ? `• ${item.location}` : ''} • {item.period}
              </div>
              <h3 className="exp-role-title">{item.role}</h3>
              <p className="exp-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
