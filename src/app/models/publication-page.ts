import { Publication } from './publication';
import { PageInfo } from './pageInfo';

export interface PublicationPage {
  publications: Publication[];
  pages: PageInfo;
  totalCount: number;
  page: number;
}
