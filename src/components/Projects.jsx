import React, { useState } from 'react';

export default function Projects({ data }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const inumePictures = [
    './assets/inume/Screenshot 2026-10-03 at 12.32.57 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.33.50 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.34.05 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.34.32 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.34.41 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.34.49 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.35.00 am.png',
    './assets/inume/Screenshot 2026-10-03 at 12.35.09 am.png'
  ];

  const handleProjectClick = (e, project) => {
    if (project.title === 'Inume AI') {
      e.preventDefault();
      setIsGalleryOpen(true);
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <section className="framer-section" id="projects">
      <div className="container section-editorial-row">
        <div className="section-num-title">{data.sectionNum}</div>
        <div className="list-rows-container">
          {data.items.map((project, idx) => (
            <a
              href={project.url}
              target={project.title === 'Inume AI' ? '_self' : '_blank'}
              rel="noreferrer"
              className="list-row-item"
              key={idx}
              onClick={(e) => handleProjectClick(e, project)}
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

      {isGalleryOpen && (
        <div className="gallery-modal-overlay" onClick={closeGallery}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeGallery}>&times;</button>
            <h2 className="gallery-modal-title">Inume AI Gallery</h2>
            <div className="gallery-grid">
              {inumePictures.map((src, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={src} alt={`Inume AI screenshot ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
