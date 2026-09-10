import React from 'react';

export default function Projects({ data }) {
  return (
    <section className="framer-section" id="projects">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="list-rows-container">
          {data.items.map((project, idx) => (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="list-row-item"
              key={idx}
            >
              <div className="list-row-left">
                <span className="list-row-title">{project.title}</span>
                <span className="list-row-meta">{project.source}</span>
              </div>
              <span className="list-row-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
