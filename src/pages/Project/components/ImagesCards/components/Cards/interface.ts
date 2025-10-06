import { IProjectMedia } from 'interfaces/interfaces';

export interface CardsProps {
  images: (string | IProjectMedia)[];
  onImagesLoaded?: () => void;
}
