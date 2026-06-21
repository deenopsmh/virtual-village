import React from 'react';
import ContactInfo from "../pages/Home/ContactInfo/ContactInfo";

export default function Footer() {
  return (
    <ContactInfo/>

    // <footer className="h-[10vh] bg-stone-900 text-stone-400 border-t border-stone-800 flex items-center justify-between px-6 text-xs">
    //   <p>© {new Date().getFullYear()} Virtual Village Project — Chainpur, Bihar</p>
    //   <div className="flex gap-4">
    //     <span className="hover:text-stone-200 cursor-pointer">Pedagogical Guide</span>
    //     <span className="hover:text-stone-200 cursor-pointer">Archival Sources</span>
    //   </div>
    // </footer>
  );
}