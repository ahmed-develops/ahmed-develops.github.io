import React from 'react';

export default function Publications({ data }) {
  return (
    <section className="framer-section" id="publications">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="list-rows-container">
          {data.items.map((pub, idx) => (
            <a
              href={pub.url}
              target="_blank"
              rel="noreferrer"
              className="list-row-item"
              key={idx}
            >
              <div className="list-row-left">
                <span className="list-row-title">{pub.title}</span>
                <span className="list-row-meta">{pub.source}</span>
              </div>
              <span className="list-row-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
