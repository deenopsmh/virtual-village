import React from 'react';
import Hero from './Hero/Hero';
import ArchiveIntro from './ArchiveIntro/ArchiveIntro';
import NavigationPortals from './NavigationPortals/NavigationPortals';

export default function HomeNew() {
  return (
    <div>
        <Hero/>
        <ArchiveIntro/>
        <NavigationPortals/>
    </div>
  );
}