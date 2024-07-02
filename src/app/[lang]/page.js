import About from "./_components/About";
import Companies from "./_components/Companies";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Pricing from "./_components/Pricing";
import Services from "./_components/Services";
import Testimonials from "./_components/Testimonials";

const getLandingPageData = async (lang) => {
  const token = process.env.SB_TOKEN;
  const version = process.env.SB_VERSION;
  const url = `https://api.storyblok.com/v2/cdn/stories/landing-page?version=${version}&token=${token}&language=${lang}`;
  let req = await fetch(url, { next: { revalidate: 10 } });

  const storyData = await req.json();
  const {
    NavbarSection,
    Hero, Services, Pricing, Testimonials,
    About, Companies, Contact
  } = storyData.story.content;

  return {
    nav_section: NavbarSection[0],
    hero: Hero[0],
    services: Services[0],
    pricing: Pricing[0],
    testimonials: Testimonials[0],
    about: About[0],
    companies: Companies[0],
    contact: Contact[0]
  };
};

export default async function Home({ params: { lang } }) {
  const storyData = await getLandingPageData(lang);

  return (
    <div className={`bg-primary ${lang === 'ar' ? 'rtl' : ''}`}>
      <Navbar lang={lang} links={storyData.nav_section.links} data={storyData.nav_section} />
      <Hero links={storyData.nav_section.links} data={storyData.hero} lang={lang}/>
      <Services links={storyData.nav_section.links} data={storyData.services} />
      <Companies links={storyData.nav_section.links} data={storyData.companies} />
      {/* <Pricing data={storyData.pricing} />
      <Testimonials data={storyData.testimonials} /> */}
      <About links={storyData.nav_section.links} data={storyData.about} />
      <Contact lang={lang}  links={storyData.nav_section.links} data={storyData.contact} />
      <Footer data={storyData.nav_section} />
    </div>
  );
}
