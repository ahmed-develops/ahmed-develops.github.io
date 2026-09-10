import React from 'react';

export default function About({ data }) {
  return (
    <section className="framer-section" id="about">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="section-body-text">
          <p>{data.text}</p>
        </div>
      </div>
    </section>
  );
}
