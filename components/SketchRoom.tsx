
import React from 'react';
import { Project, ViewState } from '../types';

interface Props {
  projects: Project[];
  onNavigate: (target: ViewState) => void;
  currentProjectIndex: number;
}

export const SketchRoom: React.FC<Props> = ({ projects, onNavigate, currentProjectIndex }) => {
  const currentProject = projects[currentProjectIndex];

  return (
    <div className="        relative w-full mx-auto aspect-[3/4] md:aspect-[4/3] md:min-h-screen md:max-w-[1800px] bg-neutral overflow-visible select-none border-4 border-ink rough-border shadow-2xl">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-ink opacity-80 rough-border" />
      
      {/* --- THE WINDOW (Projects Display) --- */}
      <div 
        className="absolute top-10 left-[5%] right-[5%] h-[40%] border-4 border-ink rounded-sm rough-border bg-white overflow-hidden cursor-pointer group hover:shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] transition-shadow"
        onClick={() => onNavigate(ViewState.MAP_VIEW)}
      >
        {/* Curtains */}
        <div className="absolute           top-[-18%] left-[-15%] right-[-7%] h-[100%] md:top-[-21%] md:left-[-15%] md:right-[-6%] md:h-[110%] pointer-events-none z-20">
          <img src="https://freight.cargo.site/t/original/i/U2687340249706951858275328947109/8292FB4D191E9E423455C75995831B2F.png" className="w-full h-full object-fill" alt="Curtains" />
        </div>
        
        {/* Project Image Slideshow */}
        <div className="w-full h-full relative p-3 sm:p-4 md:p-5">
           <img 
            src={currentProject.image} 
            alt={currentProject.title} 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
           />
           <div className="absolute inset-3 sm:inset-4 md:inset-5 bg-primary mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
        </div>

        {/* Window Frame */}
        <img src="https://freight.cargo.site/t/original/i/D2668197997637467577862563787685/IMG_2478.PNG" alt="Window Frame" className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        
        {/* Helper Text */}
        <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white border-2 border-ink px-2 py-1 rounded font-hand font-bold text-ink shadow-[2px_2px_0px_0px_#2d2d2d]">Enter Map</span>
        </div>
      </div>


      {/* --- THE ROOM ELEMENTS --- */}

      {/* The Character */}
      <div className="absolute top-[48%] sm:top-[45%] left-[5%] sm:left-[15%] md:left-[20%] w-28 sm:w-32 md:w-48 aspect-[1/2] z-30">
        <div className="relative w-full h-full">
            <img 
              src="https://freight.cargo.site/t/original/i/Z2668201366750805200175070933925/IMG_2494.GIF" 
              alt="Character" 
              className="w-full h-full object-contain drop-shadow-xl animate-float" 
            />
            <div 
                className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 cursor-pointer w-28 sm:w-32 md:w-40 group"
                onClick={() => onNavigate(ViewState.ABOUT)}
            >
                <img src="https://freight.cargo.site/t/original/i/U2668197997508340369346596926373/4BB311E6928A49680F3BF2E63E746CCE.png" alt="About" className="w-full h-auto transition-transform group-hover:scale-105" />
            </div>
        </div>
      </div>

      {/* The Plant */}
      <div className="absolute top-[55%] right-[5%] sm:right-[10%] w-20 sm:w-24 md:w-32 aspect-square pointer-events-none">
         <img 
            src="https://freight.cargo.site/t/original/i/J2668197997619020833788854236069/CE62722D3C80EBAF11F0FD47C063863C.png" 
            alt="Plant" 
            className="w-full h-full object-contain animate-[sway_4s_ease-in-out_infinite] origin-bottom" 
         />
      </div>

      {/* The Floor Books - Research */}
      <div 
        className="absolute bottom-[20%] sm:bottom-[15%] right-[5%] sm:right-[25%] w-24 md:w-32 h-auto cursor-pointer group z-30"
        onClick={() => onNavigate(ViewState.RESEARCH)}
      >
         <div className="relative transform rotate-3 group-hover:rotate-0 transition-transform origin-bottom-left">
             <img src="https://freight.cargo.site/t/original/i/E2668197997600574089715144684453/752EF925108B66FC0FCFE2FC40C53D51.png" alt="Research Books" className="w-full h-auto" />
             <span className="absolute -top-10 left-0 font-hand font-bold text-ink bg-white border border-ink px-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Research</span>
         </div>
         <div className="absolute -right-4 -top-8 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-jerk">
            <img src="https://freight.cargo.site/t/original/i/V2668197997526787113420306477989/9D1252F0FC899711624253D85377F23C.png" alt="Magnifying Glass" className="w-full h-full" />
         </div>
      </div>

      {/* The Bell - Contact */}
      <div 
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-24 md:w-32 cursor-pointer z-30 group"
        onClick={() => onNavigate(ViewState.CONTACT)}
      >
        <img src="https://freight.cargo.site/t/original/i/J2668197997489893625272887374757/0C5F40BD6529531A35A7118B8A0C8451.png" alt="Contact" className="w-full h-auto transition-transform group-hover:scale-105" />
      </div>
      
    </div>
  );
};
