
import React, { useState, useEffect } from 'react';
import { 
  PROJECTS, CONTACT_INFO, RESEARCH_LINKS, CV_PDF_URL,
  MAP_BG_URL, MARKER_IMAGE_URL, SEE_ALL_BUTTON_URL, CATEGORIES,
  ABOUT_BG_URL, BIO_IMAGE_URL, PORTFOLIO_BTN_IMAGE, CV_BTN_IMAGE,
  RESEARCH_BG_URL
} from './constants';
import { ViewState } from './types';
import { SketchRoom } from './components/SketchRoom';
import { SketchyButton } from './components/SketchyButton';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    if (viewState === ViewState.HOME) {
      const interval = setInterval(() => {
        setProjectIndex((prev) => (prev + 1) % PROJECTS.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [viewState]);

  const goHome = () => {
    setViewState(ViewState.HOME);
    setActiveId(null);
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const goMap = () => {
    setViewState(ViewState.MAP_VIEW);
    setActiveId(null);
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const navigateToProject = (id: number) => {
    setActiveId(id);
    setViewState(ViewState.PROJECT_DETAIL);
    window.scrollTo(0, 0);
  };

  const navigateToResearch = (id: number) => {
    setActiveId(id);
    setViewState(ViewState.RESEARCH_DETAIL);
    window.scrollTo(0, 0);
  };

  const goProjects = (category: string | null = null) => {
    setSelectedCategory(category);
    setViewState(ViewState.PROJECTS);
    window.scrollTo(0, 0);
  };

  const goResearchList = () => {
    setViewState(ViewState.RESEARCH);
    setActiveId(null);
    window.scrollTo(0, 0);
  };

  const PageWrapper = ({ 
    title, 
    children, 
    color = "bg-white", 
    showBacks = true,
    backHome = { text: "← Back Home", action: goHome },
    backPrev = null,
    hideHeader = false 
  }: { 
    title: string, 
    children?: React.ReactNode, 
    color?: string, 
    showBacks?: boolean,
    backHome?: { text: string, action: () => void },
    backPrev?: { text: string, action: () => void } | null,
    hideHeader?: boolean
  }) => (
    <div className={`min-h-screen w-full flex flex-col p-4 md:p-12 animate-draw`}>
      {!hideHeader && (
        <nav className="mb-12 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto w-full gap-4">
          <h2 className="font-hand text-4xl md:text-6xl font-bold text-ink -rotate-1">{title}</h2>
          {showBacks && (
            <div className="flex flex-wrap justify-center gap-3">
              {backPrev && <SketchyButton onClick={backPrev.action} variant="neutral" className="text-sm whitespace-nowrap">{backPrev.text}</SketchyButton>}
              <SketchyButton onClick={backHome.action} variant="accent" className="text-sm whitespace-nowrap">{backHome.text}</SketchyButton>
            </div>
          )}
        </nav>
      )}
      <main className={`max-w-6xl mx-auto w-full ${color} border-4 border-ink rough-border shadow-2xl overflow-hidden relative ${hideHeader ? 'min-h-[85vh]' : 'p-6 md:p-12 mb-20'}`}>
        {hideHeader && showBacks && (
          <div className="absolute top-6 right-6 z-50 flex flex-wrap justify-end gap-3 pointer-events-none">
            <div className="pointer-events-auto flex gap-3">
              {backPrev && <SketchyButton onClick={backPrev.action} variant="neutral" className="text-xs md:text-sm whitespace-nowrap">{backPrev.text}</SketchyButton>}
              <SketchyButton onClick={backHome.action} variant="accent" className="text-xs md:text-sm whitespace-nowrap">{backHome.text}</SketchyButton>
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );

  const renderProjectDetail = (id: number) => {
    const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];

    const VideoEmbed = ({ url }: { url: string }) => {
      const videoId = url.includes('v=') ? url.split('v=')[1] : url.split('/').pop();
      return (
        <div className="aspect-video w-full border-4 border-ink shadow-2xl rough-border rotate-1 bg-ink my-8">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`} 
            title="Video Player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      );
    };

    const DetailSection = ({ title, children, bgColor = "bg-white", rotate = "rotate-0" }: { title: string, children: React.ReactNode, bgColor?: string, rotate?: string }) => (
      <section className={`${bgColor} p-8 border-4 border-ink rough-border ${rotate} shadow-lg mb-12`}>
        <h3 className="text-4xl font-bold mb-6 border-b-4 border-primary inline-block font-hand">{title}</h3>
        <div className="text-xl leading-relaxed font-hand space-y-4">{children}</div>
      </section>
    );

    const ImagePlaceholder = ({ label, count = 1, height = "h-64" }: { label: string, count?: number, height?: string }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`border-4 border-ink border-dashed p-4 flex items-center justify-center bg-neutral/30 ${height} rough-border`}>
            <p className="text-ink/40 font-bold font-hand text-xl text-center">[{label} - Image {i + 1}]</p>
          </div>
        ))}
      </div>
    );

    switch (id) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <VideoEmbed url="https://youtu.be/Xp60Bq2VX1U" />
            <DetailSection title="Project Introduction">
              <p>How can we help children perceive the fragility of our ecosystem through their bodies? Escape to the Outdoors builds a hybrid physical-digital field using Arduino sensors to capture real-world soil moisture data, generating interactive visual landscapes via Unity.</p>
            </DetailSection>
            <DetailSection title="Background Research" bgColor="bg-primary/10" rotate="-rotate-1">
              <h4 className="font-bold text-2xl">Z-Generation in China:</h4>
              <p>Deeply bound to the internet, resulting in urbanized lifestyles and weakened desire for nature. High-pressure education further compresses childhood freedom.</p>
              <h4 className="font-bold text-2xl mt-4">Nature Deficit Disorder:</h4>
              <p>First proposed by Richard Louv in "Last Child in the Woods."</p>
              <ImagePlaceholder label="Research Reference" count={1} />
              <h4 className="font-bold text-2xl mt-4">Primary Research:</h4>
              <p>Field interviews in Dajing Village, Zhangzhou, revealed parents' shared wish for children to spend more time outdoors away from screens.</p>
              <ImagePlaceholder label="Field Research" count={1} />
            </DetailSection>
            <DetailSection title="Ideation" rotate="rotate-1">
              <h4 className="font-bold text-2xl">Design Sketches:</h4>
              <p>Combining a common shovel with DHT11 sensors. Designed a spring-controlled foldable lid to isolate the sensing space while maintaining functionality.</p>
              <ImagePlaceholder label="Conceptual Sketches" count={1} />
              <p>Integrated a lockable button module and SD card module in the handle for data triggering and recording.</p>
              <ImagePlaceholder label="Mechanism Design" count={1} />
            </DetailSection>
            <DetailSection title="Design Development" bgColor="bg-accent/10">
              <h4 className="font-bold text-2xl">Interaction Design:</h4>
              <p>Initially used Unreal but pivoted to Unity for better cross-platform compatibility. Used SD card modules for data transfer, resolved bugs with AI assistance.</p>
              <ImagePlaceholder label="Technical Development" count={2} />
              <h4 className="font-bold text-2xl mt-4">Visual Logic:</h4>
              <p>Mapped data to material properties. Implemented crosshair aiming for object placement and interactive generation.</p>
            </DetailSection>
            <DetailSection title="User Testing & Scenarios">
              <p>Feedback showed high engagement for virtual souvenirs but highlighted the need for clearer rewards. Target users include public procurement and nature education institutions for children aged 6-15.</p>
              <ImagePlaceholder label="Final Work Display" count={5} />
            </DetailSection>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto">
            <VideoEmbed url="https://youtu.be/_ipO_RUhqH4" />
            <DetailSection title="Say and Guess">
              <p>A collaborative VR co-op game exploring communication "noise." The goal is to reflect how digital distortion and subjective assumptions affect human interaction. Players work together to overcome communication barriers through cooperative mechanics.</p>
            </DetailSection>
            <DetailSection title="Background & Ideation" bgColor="bg-primary/10" rotate="rotate-1">
              <h4 className="font-bold text-2xl">The "Noise" in Communication:</h4>
              <p>Digitalization leads to information loss. Physical noise from devices and networks often causes barriers or conflicts. This project invites reflection on technology's role in interpersonal relationships.</p>
              <h4 className="font-bold text-2xl mt-4">Brainstorming:</h4>
              <p>Inspired by the "Draw and Guess" carousel mode and the visualization system of "City Block."</p>
              <ImagePlaceholder label="Inspiration Works" count={2} />
            </DetailSection>
            <DetailSection title="Gameplay Exploration">
              <h4 className="font-bold text-2xl">Core Gameplay:</h4>
              <p>Players take turns providing information for the other to guess, simulating real-world communication. Visual success is represented by building houses together.</p>
              <h4 className="font-bold text-2xl mt-4">Mechanics:</h4>
              <p>One game consists of 5 rounds. Players select "audio debuffs" as tools, which stack over time. They record voice messages (10s) that are processed and then interpreted by the partner.</p>
              <ImagePlaceholder label="Gameplay Mechanics" count={2} />
            </DetailSection>
            <DetailSection title="Design Development" bgColor="bg-accent/10" rotate="-rotate-1">
              <h4 className="font-bold text-2xl">Character Design:</h4>
              <p>Beavers were chosen for their collaborative building nature. Visual iterations focused on making them distinct from generic prototypes.</p>
              <h4 className="font-bold text-2xl mt-4">UI & Scene Design:</h4>
              <p>Used paint buckets as metaphors for verbal communication and backpacks for the "debuff" tools.</p>
              <ImagePlaceholder label="UI & Scene" count={2} />
              <ImagePlaceholder label="Scenery Design" count={6} />
              <ImagePlaceholder label="Music & Lo-Fi Prototyping" count={3} />
            </DetailSection>
            <DetailSection title="Future Vision">
              <p>Investigating if virtual body language can be more resistant to interference than text/voice in VR social spaces.</p>
            </DetailSection>
          </div>
        );

      case 3:
        return (
          <div className="max-w-4xl mx-auto">
            <DetailSection title="Little Toad's Great Adventure">
              <p>An educational adventure game designed to help children understand non-human life by adopting the perspective of a black-spined toad. It utilizes "inverse anthropomorphism" to challenge human-centric education.</p>
            </DetailSection>
            <DetailSection title="Background: Humans vs. Non-humans" bgColor="bg-primary/10">
              <p>Anthropomorphism often imposes human understanding onto animals. This RPG aims to let children jump out of human linguistic symbols through biological behavioral mimicry.</p>
              <ImagePlaceholder label="Concept Art" count={1} />
              <h4 className="font-bold text-2xl mt-4">Primary Research:</h4>
              <p>Observations showed that children are naturally curious and highly capable of mimicry, proving the feasibility of teaching through action-based games.</p>
              <ImagePlaceholder label="Field Observation" count={4} />
            </DetailSection>
            <DetailSection title="Ideation & Prototyping" rotate="rotate-1">
              <h4 className="font-bold text-2xl">Gameplay Exploration:</h4>
              <p>Explore 3D interfaces, interact with NPCs to gain skills, and react to specific cues. NPCs include both predators (dogs, crocodiles) and prey (beetles).</p>
              <ImagePlaceholder label="NPC Design" count={3} />
              <h4 className="font-bold text-2xl mt-4">Modeling & Scene:</h4>
              <p>Used 3D scanning (3Dscanner app) for 1:1 environment replication and tripoAI for non-human character modeling assistance.</p>
              <ImagePlaceholder label="Modeling Process" count={6} />
            </DetailSection>
            <DetailSection title="Controls & User Feedback" bgColor="bg-accent/10">
              <h4 className="font-bold text-2xl">Perspective Choice:</h4>
              <p>First-person for immersion. Lowering the third-person camera height to simulate a toad's vision unintentionally fixed low-fidelity model issues by mimicking a frog's nearsightedness.</p>
              <h4 className="font-bold text-2xl mt-4">Feedback:</h4>
              <p>Children loved the unique perspective and cute characters but found keyboard/mouse tricky, leading to the development of a virtual joystick controller.</p>
              <ImagePlaceholder label="Final Display" count={4} />
            </DetailSection>
          </div>
        );

      case 4:
        return (
          <div className="max-w-4xl mx-auto">
            <DetailSection title="Looking Back at Life">
              <p>A handmade collage series reflecting on memory as a non-continuous narrative. Memory is seen as fragments that are selected, covered, and re-exposed over time.</p>
              <p>The collage method allows for the juxtaposition of images from different eras and contexts, creating a viewing path that moves from detail to distance.</p>
              <ImagePlaceholder label="Collage Works" count={1} />
            </DetailSection>
          </div>
        );

      case 5:
        return (
          <div className="max-w-4xl mx-auto">
            <VideoEmbed url="https://youtu.be/ntqGDg-NCe0" />
            <DetailSection title="Colorful">
              <p>Interactive generative art exploring "emotions" and "dilemmas" through brushstrokes inspired by Van Gogh. The central face represents the self, while surrounding lines simulate the unpredictable challenges of life.</p>
              <p>Clicks trigger random color reorganizations. The black background provides a contrast that makes each change feel like relighting an emotion in the dark.</p>
            </DetailSection>
          </div>
        );

      case 6:
        return (
          <div className="max-w-4xl mx-auto">
            <VideoEmbed url="https://youtu.be/sBUrjyLJlns" />
            <DetailSection title="Window of Opportunity">
              <p>A documentary short (approx. 5 mins) set in Xiamen's antique market. It uses a three-part structure to contrast three different classes of merchants, bringing the abstract concept of "opportunity" back to real-world transactions and waiting.</p>
              <p>The film uses environmental sound and hand details as narrative anchors, letting the audience enter the character's situation through information flow rather than being told a conclusion by narration.</p>
            </DetailSection>
          </div>
        );

      case 7:
        return (
          <div className="max-w-4xl mx-auto">
            <DetailSection title="Invalid Makeup">
              <p>Conceptual photography series exploring appearance anxiety and self-concealment. It juxtaposes heavy makeup with white cloth to metaphorically show how self-worth is compressed into an immediately evaluable "shell."</p>
              <p>The viewer experiences the tension between wanting to "see clearly" and "not seeing clearly," pulling the "visible dress-up" and "invisible self" into the same frame.</p>
              <ImagePlaceholder label="Photography Series" count={2} />
            </DetailSection>
          </div>
        );

      case 8:
        return (
          <div className="max-w-4xl mx-auto">
            <DetailSection title="Horn (The Soft Control)">
              <p>A fiber art installation discussing how "soft control" is executed in the name of love. Sewing serves as the material language: stitches signify both care and the stitching of boundaries.</p>
              <p>The "softened" sharp corners are elastic and gentle to attract touch, but retain their pointed structure, hinting that power dynamics haven't disappeared but have become harder to refuse.</p>
              <ImagePlaceholder label="Installation Photos" count={10} />
            </DetailSection>
          </div>
        );

      case 10:
        return (
          <div className="max-w-4xl mx-auto">
            <VideoEmbed url="https://youtu.be/5tFH6kx4974" />
            <DetailSection title="Permeate">
              <p>A silent film presenting family mechanisms through bodily narrative. When a father responds with indifference, a child internalizes this as a template for relationships through long-term observation.</p>
              <p>The focus is on repeating daily micro-actions: eye avoidance, body turning, and absence of response. It's designed to make the audience feel that influence happens "like osmosis"—quiet yet life-changing.</p>
            </DetailSection>
          </div>
        );

      case 11:
        return (
          <div className="max-w-4xl mx-auto">
            <DetailSection title="City of Blood">
              <p>A collage work based on historical imagination of Rome 2000 years ago. It core discussion is structural oppression: gladiators forced into violence for survival, and civilians suppressed into silence.</p>
              <p>The visual style establishes the texture of oppression through grid structures and the weight of color blocks, making the "cage" more visible than the "characters."</p>
              <ImagePlaceholder label="Collage Detail" count={2} />
            </DetailSection>
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto">
            <DetailSection title={project.title}>
              <p className="text-2xl">{project.description}</p>
            </DetailSection>
            <DetailSection title="Process & Vision" rotate="rotate-1" bgColor="bg-primary/5">
              <p>This project explores the intersection of traditional mediums and digital narratives, emphasizing the texture of the hand-drawn mark in a technical context.</p>
            </DetailSection>
            <ImagePlaceholder label="Selected Process Gallery" height="h-80" />
          </div>
        );
    }
  };

  const renderView = () => {
    switch (viewState) {
      case ViewState.HOME:
        return (
          <div className="relative min-h-screen w-full bg-neutral flex flex-col items-center">
            <header className="relative w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4 mt-12 mb-8 z-10 px-4">
              <div className="text-center md:text-left">
                <h1 className="font-hand text-5xl sm:text-6xl font-bold text-ink drop-shadow-md -rotate-2 animate-wobble-slow">
                  My <span className="text-primary underline decoration-ink/20">Sketchy</span> Studio
                </h1>
                <p className="font-hand text-xl text-ink/60 mt-1">Digital Crafting Room</p>
              </div>
            </header>

            <main className="relative w-full flex-grow flex items-center justify-center z-10 px-4">
              <div className="w-full max-w-5xl">
                <SketchRoom 
                  projects={PROJECTS} 
                  currentProjectIndex={projectIndex}
                  onNavigate={setViewState}
                />
              </div>
            </main>

            <footer className="relative mt-8 mb-4 text-center font-hand text-ink/40 text-lg flex flex-col items-center gap-2 z-10">
               <p className="animate-float">Click objects in the room to explore</p>
               <div className="text-sm border-t-2 border-ink/10 pt-2">© 2025 Hand-Drawn Experience</div>
            </footer>
          </div>
        );

      case ViewState.MAP_VIEW:
        return (
          <PageWrapper title="Creation Map" hideHeader color="bg-transparent" backHome={{ text: "← Back Home", action: goHome }}>
            <div className="absolute inset-0 z-0 overflow-auto bg-neutral map-container">
               <div className="relative inline-block min-w-full">
                  <img src={MAP_BG_URL} alt="Creation Map Background" className="max-w-none md:w-full h-auto block" />
                  
                  <div className="absolute top-[28%] left-[28%] group cursor-pointer z-20" onClick={() => goProjects(CATEGORIES.INTERACTIVE)}>
                    <img src={MARKER_IMAGE_URL} className="w-10 h-10 md:w-16 md:h-16 animate-bounce" style={{animationDuration: '2s'}} alt="marker" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
                       {CATEGORIES.INTERACTIVE}
                    </div>
                  </div>

                  <div className="absolute top-[42%] left-[68%] group cursor-pointer z-20" onClick={() => goProjects(CATEGORIES.NARRATIVE)}>
                    <img src={MARKER_IMAGE_URL} className="w-10 h-10 md:w-16 md:h-16 animate-bounce" style={{animationDuration: '2.4s'}} alt="marker" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
                       {CATEGORIES.NARRATIVE}
                    </div>
                  </div>

                  <div className="absolute top-[68%] left-[24%] group cursor-pointer z-20" onClick={() => goProjects(CATEGORIES.STATIC)}>
                    <img src={MARKER_IMAGE_URL} className="w-10 h-10 md:w-16 md:h-16 animate-bounce" style={{animationDuration: '1.8s'}} alt="marker" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
                       {CATEGORIES.STATIC}
                    </div>
                  </div>

                  <div className="absolute top-[75%] left-[75%] group cursor-pointer z-20" onClick={() => goProjects(CATEGORIES.HANDMADE)}>
                    <img src={MARKER_IMAGE_URL} className="w-10 h-10 md:w-16 md:h-16 animate-bounce" style={{animationDuration: '2.1s'}} alt="marker" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-4 border-ink px-4 py-2 rounded-xl font-hand font-bold text-lg text-ink shadow-2xl whitespace-nowrap z-50 rough-border pointer-events-none">
                       {CATEGORIES.HANDMADE}
                    </div>
                  </div>
               </div>
            </div>

            <div className="fixed bottom-10 right-10 md:right-20 z-40">
               <button onClick={() => goProjects(null)} className="group transition-transform hover:scale-110 active:scale-95">
                  <img src={SEE_ALL_BUTTON_URL} alt="See all the spot" className="w-32 md:w-64 h-auto drop-shadow-2xl" />
                </button>
            </div>
          </PageWrapper>
        );

      case ViewState.ABOUT:
        return (
          <PageWrapper title="About Me" hideHeader color="bg-transparent" backHome={{ text: "← Back Home", action: goHome }}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
               <div className="relative w-full max-w-4xl max-h-full">
                  <img src={ABOUT_BG_URL} alt="Background" className="w-full h-auto block" />
                  <div className="absolute top-[10%] bottom-[10%] left-[8%] right-[8%] z-10 overflow-y-auto font-hand text-ink custom-scrollbar pr-4">
                     <div className="flex flex-col gap-8 md:gap-12 py-4">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
                           <div className="w-24 md:w-1/3 flex-shrink-0 animate-wobble-slow">
                              <img 
                                src={BIO_IMAGE_URL} 
                                alt="Bio" 
                                className="w-full h-auto object-contain" 
                              />
                           </div>
                           <div className="w-full md:w-2/3">
                              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary underline decoration-ink/20">Bio</h2>
                              <div className="space-y-4 text-lg md:text-xl leading-relaxed">
                                <p>
                                   I’m a cross-media narrative designer and creative technologist, supporting game teams and creative projects from concept to a presentable, demo-ready prototype.
                                </p>
                                <p>
                                   My core skills include Unity/Unreal development, Arduino-based sensing interaction, and AI-assisted creation workflows. I specialize in rapidly prototyping interactive systems that translate real-world data (e.g., environmental signals) into playable experiences.
                                </p>
                              </div>
                           </div>
                        </div>

                        <div className="relative">
                           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary underline decoration-ink/20">Artist Statement</h2>
                           <p className="text-xl md:text-2xl leading-relaxed italic mb-8 border-l-4 border-primary pl-4">
                              My practice treats interactive media as both a research object and a method, focusing on mechanisms of empathy formation and the ways cognitive bias becomes legible within interaction structures.
                           </p>
                           <h3 className="text-2xl font-bold mb-4 border-b-2 border-ink inline-block">Three Propositions</h3>
                           <div className="space-y-6 md:space-y-8">
                              <div className="group">
                                 <h4 className="text-xl md:text-2xl font-bold text-ink mb-2">(1) Non-human-centered empathy design.</h4>
                                 <p className="text-lg md:text-xl">Animals, data-beings, or virtual entities take on narrative agency, repositioning nature and technology as responsive subjects.</p>
                              </div>
                              <div className="group">
                                 <h4 className="text-xl md:text-2xl font-bold text-ink mb-2">(2) Data as a narrative condition.</h4>
                                 <p className="text-lg md:text-xl">Data is organized into rhythms, thresholds, and tension structures that trigger narrative progression and guide attention.</p>
                              </div>
                              <div className="group">
                                 <h4 className="text-xl md:text-2xl font-bold text-ink mb-2">(3) Accessible visual vernacular as a critical vehicle.</h4>
                                 <p className="text-lg md:text-xl">I adopt approachable visual languages to lower entry barriers, embedding critical concerns into lightweight interaction mechanisms.</p>
                              </div>
                           </div>
                           <div className="mt-10 pt-8 border-t-2 border-ink border-dashed">
                              <p className="text-lg md:text-xl leading-relaxed">
                                 Participation is not an add-on to narrative but a condition for its formation: the work is completed through being triggered, chosen, and deviated from.
                              </p>
                           </div>
                        </div>
                        <div className="h-20" />
                     </div>
                  </div>
               </div>
            </div>
          </PageWrapper>
        );

      case ViewState.RESEARCH:
        return (
          <PageWrapper title="Research & Thoughts" hideHeader color="bg-transparent" backHome={{ text: "← Back Home", action: goHome }}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
               <div className="relative w-full max-w-4xl max-h-full animate-draw">
                  <img src={RESEARCH_BG_URL} alt="Research Background" className="w-full h-auto block" />
                  <div className="absolute top-[12%] bottom-[12%] left-[10%] right-[10%] z-10 overflow-y-auto font-hand text-ink custom-scrollbar pr-2">
                     <div className="flex flex-col gap-6 py-6">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary underline decoration-ink/20 text-center">Journal & Notes</h2>
                        <div className="space-y-4">
                          {RESEARCH_LINKS.map((link, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => navigateToResearch(idx)}
                              className="group block p-4 md:p-6 border-4 border-ink bg-white/60 hover:bg-primary/20 transition-all font-hand text-xl md:text-2xl font-bold relative cursor-pointer shadow-md rough-border -rotate-1 hover:rotate-0"
                            >
                              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
                              <span className="relative z-10">{idx + 1}. {link.title}</span>
                              <span className="float-right group-hover:translate-x-2 transition-transform text-ink/50 text-base md:text-xl">Open Entry →</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 p-6 bg-accent/20 border-2 border-ink border-dashed rounded-lg text-center italic text-lg md:text-xl">
                          "Connecting dots between data, narrative, and interaction design."
                        </div>
                        <div className="h-10" />
                     </div>
                  </div>
               </div>
            </div>
          </PageWrapper>
        );

      case ViewState.RESEARCH_DETAIL:
        const research = RESEARCH_LINKS[activeId ?? 0];
        return (
          <PageWrapper 
            title="Journal Entry" 
            backHome={{ text: "← Back Home", action: goHome }}
            backPrev={{ text: "← Back to Research", action: goResearchList }}
          >
            <article className="max-w-3xl mx-auto font-hand text-2xl leading-relaxed">
              <h3 className="text-5xl font-bold mb-8 text-primary underline decoration-ink/10">{research.title}</h3>
              <p className="mb-6">Creative research is an ongoing conversation with the self and the world.</p>
              <div className="my-10 p-8 border-4 border-ink rough-border bg-primary/10 -rotate-1 shadow-lg">
                 <p className="italic">"The hand is the tool of the mind."</p>
              </div>
              <p>Journal entries dive deeper into the theoretical and practical foundations of the projects shown here.</p>
            </article>
          </PageWrapper>
        );

      case ViewState.PROJECTS:
        const currentCategorized = Object.values(CATEGORIES).map(cat => ({
          name: cat,
          items: PROJECTS.filter(p => p.category === cat)
        }));

        return (
          <PageWrapper 
            title="Selected Works" 
            color="bg-neutral" 
            backHome={{ text: "← Back Home", action: goHome }}
            backPrev={{ text: "← Back to Map", action: goMap }}
          >
            <div className="flex flex-wrap gap-4 mb-12 justify-center">
              <SketchyButton 
                variant={selectedCategory === null ? 'primary' : 'neutral'}
                onClick={() => setSelectedCategory(null)}
                className="text-sm"
              >
                All Spots
              </SketchyButton>
              {Object.values(CATEGORIES).map(cat => (
                <SketchyButton 
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'neutral'}
                  onClick={() => setSelectedCategory(cat)}
                  className="text-sm"
                >
                  {cat.split(' - ')[0]}
                </SketchyButton>
              ))}
            </div>

            <div className="space-y-16">
              {currentCategorized.map(categoryGroup => (
                (selectedCategory === null || selectedCategory === categoryGroup.name) && categoryGroup.items.length > 0 && (
                  <div key={categoryGroup.name} className="animate-draw">
                    <h3 className="font-hand text-2xl md:text-4xl font-bold mb-8 border-b-4 border-primary inline-block text-ink">
                      {categoryGroup.name}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {categoryGroup.items.map(project => (
                        <div 
                          key={project.id} 
                          onClick={() => navigateToProject(project.id)}
                          className="bg-white border-4 border-ink p-3 hover:-translate-y-2 hover:rotate-2 transition-all duration-300 shadow-lg group cursor-pointer"
                        >
                          <div className="aspect-square overflow-hidden border-2 border-ink mb-4 bg-primary/5">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>
                          </div>
                          <h3 className="font-hand text-2xl font-bold mb-1">{project.title}</h3>
                          <p className="font-hand text-lg text-ink/70">View Details →</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </PageWrapper>
        );

      case ViewState.PROJECT_DETAIL:
        const project = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];
        return (
          <PageWrapper 
            title={project.title} 
            backHome={{ text: "← Back Home", action: goHome }}
            backPrev={{ text: "← Back to Works", action: () => setViewState(ViewState.PROJECTS) }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
              <div className="border-4 border-ink p-2 bg-white rough-border rotate-1 shadow-xl">
                <img src={project.image} alt={project.title} className="w-full h-auto object-cover border-2 border-ink" />
              </div>
              <div className="font-hand">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{project.category}</h3>
                <p className="text-2xl leading-relaxed text-ink/80 mb-8">{project.description}</p>
                <div className="p-6 bg-primary/10 border-4 border-ink border-dashed rounded-lg rough-border">
                  <p className="text-xl italic">A hand-crafted piece of visual storytelling.</p>
                </div>
              </div>
            </div>
            {activeId && renderProjectDetail(activeId)}
          </PageWrapper>
        );

      case ViewState.CONTACT:
        return (
          <PageWrapper title="Contact" color="bg-white" backHome={{ text: "← Back Home", action: goHome }}>
            <div className="max-w-md mx-auto text-center py-10">
              <h2 className="font-hand text-4xl mb-10 font-bold text-primary animate-twitch">Get in Touch</h2>
              <ul className="space-y-8 font-hand text-3xl">
                <li className="flex items-center justify-center gap-6 group">
                   <span className="w-12 h-12 rounded-full bg-primary border-4 border-ink group-hover:scale-110 transition-transform shadow-lg"></span>
                   <span className="border-b-4 border-ink/10 group-hover:border-primary transition-colors cursor-pointer">{CONTACT_INFO.email}</span>
                </li>
                <li className="flex items-center justify-center gap-6 group">
                   <span className="w-12 h-12 rounded-full bg-accent border-4 border-ink group-hover:scale-110 transition-transform shadow-lg"></span>
                   <span className="border-b-4 border-ink/10 group-hover:border-accent transition-colors cursor-pointer">{CONTACT_INFO.instagram}</span>
                </li>
              </ul>
            </div>
          </PageWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-fixed selection:bg-primary/40">
      {renderView()}
    </div>
  );
};

export default App;
