import React from 'react';

export default function Contact({ data, onCopyEmail }) {
  return (
    <section className="framer-section" id="contact">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="contact-links-grid">
          <div className="contact-entry">
            <span className="contact-label">Phone</span>
            <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="contact-val-link">
              {data.phone}
            </a>
          </div>

          <div className="contact-entry">
            <span className="contact-label">Email</span>
            <a
              href={`mailto:${data.email}`}
              className="contact-val-link"
              onClick={(e) => {
                if (onCopyEmail) onCopyEmail(data.email);
              }}
            >
              {data.email}
            </a>
          </div>

          <div className="contact-entry">
            <span className="contact-label">Site</span>
            <a
              href={`https://${data.site}`}
              target="_blank"
              rel="noreferrer"
              className="contact-val-link"
            >
              {data.site}
            </a>
          </div>

          <div className="contact-entry">
            <span className="contact-label">Socials</span>
            <div className="contact-social-tags">
              {data.socials.map((s, idx) => (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-val-link"
                  key={idx}
                >
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
