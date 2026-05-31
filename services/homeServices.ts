import { ISlider } from '@/types/SliderDto';
import { IProduct } from '@/types/ProductDto';
import { IPost } from '@/types/PostDto';
import { ISiteInfo } from '@/types/SiteInfoDto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export interface IHomeData {
  sliders: ISlider[];
  products: Pick<
    IProduct,
    'id' | 'title' | 'slug' | 'image' | 'category' | 'description'
  >[];
  posts: Pick<
    IPost,
    'id' | 'title' | 'slug' | 'image' | 'category' | 'date' | 'readTime'
  >[];
  siteInfo: ISiteInfo | null;
}

export const getHomeDataApi = async (): Promise<IHomeData> => {
  const res = await fetch(`${baseUrl}/api/home`, { cache: 'no-store' });
  return res.json();
};
