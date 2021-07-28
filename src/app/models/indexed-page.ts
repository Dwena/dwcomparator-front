import { Crawler } from './crawler';

export interface IndexedPage {
  id?: number;
  creationDate?: Date;
  url?: string;
  reference?: string;
  title?: string;
  duration?: string;
  price?: number;
  taxesIncluded?: boolean;
  crawler?: Crawler;


}
