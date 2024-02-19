import WebLinks from '../components/WebLinks';
import Seo from '../components/Seo';
import seoData from '../next-seo.config';


export default function Home() {
  const page = {
    title: seoData.openGraph.title,
    excerpt: 'home',
    slug: '/',
    coverImage: 'https://puvvadi.me/images/dp.webp'
  };
  return (
    <>
      <Seo page={page} />
      <WebLinks />
    </>
  )
}

