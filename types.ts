
export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
}

export enum ViewState {
  HOME = 'HOME',
  MAP_VIEW = 'MAP_VIEW',
  PROJECTS = 'PROJECTS',
  PROJECT_DETAIL = 'PROJECT_DETAIL',
  ABOUT = 'ABOUT',
  RESEARCH = 'RESEARCH',
  RESEARCH_DETAIL = 'RESEARCH_DETAIL',
  CONTACT = 'CONTACT'
}
