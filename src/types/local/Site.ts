import { type Site, type SiteWithBuildinginformation } from '@/types/global/site/Site';

export type SiteWithDataurl = Site & { data: { imageDataUrl?: string } };

export type SiteWithBuildinginformationAndDataurl = SiteWithBuildinginformation & {
  data: { imageDataUrl?: string };
};
