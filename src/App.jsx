import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Languages from './components/Languages';
import References from './components/References';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3000);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    showToast(`Copied ${email} to clipboard`);
  };

  return (
    <>
      <Header data={portfolioData.header} />
      <main>
        <Hero data={portfolioData.hero} />
        <About data={portfolioData.about} />
        <Experience data={portfolioData.experience} />
        <Skills data={portfolioData.skills} />
        <Projects data={portfolioData.projects} />
        <Education data={portfolioData.education} />
        <Languages data={portfolioData.languages} />
        <References data={portfolioData.references} />
        <Publications data={portfolioData.publications} />
        <Contact data={portfolioData.contact} onCopyEmail={handleCopyEmail} />
        <Footer data={portfolioData.footer} />
      </main>
      <Toast message={toastMsg} />
    </>
  );
}
