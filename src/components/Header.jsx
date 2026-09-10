import React, { useState, useEffect } from 'react';

export default function Header({ data }) {
  const [liveTime, setLiveTime] = useState('(UTC+10)');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Australia/Sydney',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        const timeStr = new Intl.DateTimeFormat('en-AU', options).format(now);
        setLiveTime(`${timeStr} (UTC+10)`);
      } catch (e) {
        setLiveTime('(UTC+10)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="framer-nav-header">
      <div className="container framer-nav-inner">
        <div className="nav-left-group">
          <a href="#hero" className="nav-brand-title">{data.name}</a>
          <div className="nav-status-badge">
            <div className="nav-status-dot-wrap">
              <span className="nav-status-pulse"></span>
              <span className="nav-status-dot"></span>
            </div>
            <span>{data.statusText}</span>
          </div>
        </div>

        <div className="nav-right-group">
          <span className="nav-timezone">{liveTime}</span>
          <a
            href={data.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="nav-pill-btn"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
