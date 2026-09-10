import React from 'react';

export default function Skills({ data }) {
  return (
    <section className="framer-section" id="skills">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="skills-tags-cloud">
          {data.list.map((skill, idx) => (
            <span className="skill-tag-box" key={idx}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
