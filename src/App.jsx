import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer';

import HomeNew from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roam from './pages/Roam/Roam';
import About from './pages/About/About';
import Contexts from './pages/Contexts/Contexts';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import ScrollToTop from './components/ScrollToTop';

// Sections in the menu that aren't built yet: a proper page instead of a blank screen
const PLANNED = [
  { path: '/topics', title: 'Topics', description: 'Themes such as religion, caste, agriculture, education and daily life, drawn from across the archive. This section is being prepared.' },
  { path: '/maps', title: 'Maps', description: 'Interactive maps of Chainpur and its neighbouring villages, showing landmarks and how the village has changed. This section is being prepared.' },
  { path: '/history', title: 'History', description: 'Historical materials covering more than two centuries of village life. This section is being prepared.' },
  { path: '/oral-histories', title: 'Oral Histories', description: 'Personal testimonies and life stories from the people of Chainpur. This section is being prepared.' },
  { path: '/resources', title: 'Resources', description: 'Resources for teaching with A Virtual Village, and primary and secondary sources about Chainpur. This section is being prepared.' },
];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header/>

      <Routes>
        <Route 
          path="/" 
          element={
            <div>
                <HomeNew/>
            </div>
          } 
          
        />
                <Route 
          path="/roam/*" 
          element={
            <div>
                <Roam/>
            </div>
          } 
          
        />
                <Route 
          path="/about" 
          element={
            <div>
                <About/>
            </div>
          } 
          
        />

        <Route path="/contexts" element={<Contexts />} />

        {PLANNED.map(({ path, title, description }) => (
          <Route key={path} path={path} element={<ComingSoon title={title} description={description} />} />
        ))}

        <Route
          path="*"
          element={<ComingSoon notFound title="We couldn't find that page" description="The link may be out of date. Try one of these instead." />}
        />

                {/* <Route path="/about" element={<Home/>}/> */}
        {/* <Route path="/roam" element={<Roam/>}/>
        <Route path="/topics" element={<Home/>}/>
        <Route path="/maps" element={<Home/>}/> */}
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}