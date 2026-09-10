import React from 'react';

export default function Footer({ data }) {
  return (
    <section className="thanks-section-framer">
      <div className="container">
        <h2 className="thanks-big-text">
          {data.bigHeadline.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < data.bigHeadline.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        <p className="thanks-subline">
          {data.subline}
        </p>

        <div className="footer-bottom-bar">
          <span>{data.author}</span>
          <span>
            <a href={data.creditUrl} target="_blank" rel="noreferrer">
              {data.creditText}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
