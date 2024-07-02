import About from "./_components/About";
import Companies from "./_components/Companies";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Services from "./_components/Services";
import Testimonials from "./_components/Testimonials";
import { data } from "./data";


export default async function Home() {
  const storyData = data

  return (
    <div className={`bg-primary`}>
      <Navbar  links={storyData.nav_section.links} data={storyData.nav_section} />
      <Hero links={storyData.nav_section.links} data={storyData.hero} />
      <Services links={storyData.nav_section.links} data={storyData.services} />
      <Companies links={storyData.nav_section.links} data={storyData.companies} />
      {storyData.testimonials.testi.length > 0 &&<Testimonials data={storyData.testimonials} />}
      <About links={storyData.nav_section.links} data={storyData.about} />
      <Contact   links={storyData.nav_section.links} data={storyData.contact} />
      <Footer data={storyData.nav_section} />
    </div>
  );
}
