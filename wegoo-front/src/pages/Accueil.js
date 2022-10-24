import  Header from "../components/Entete/Header.js"
import Banner from "../components/Body/Banner.js"
import Footer from "../components/Entete/Footer.js";
import Contact from "../components/Body/Contact.js";
import Part1 from "../components/Body/Part1.js";
import Banner2 from "../components/Body/Banner2.js";
import Banner3 from "../components/Body/Banner3.js";
import Banner4 from "../components/Body/Banner4.js";
const Accueil = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <Banner2/>
      <Banner3/>
      <Banner4/>
      <Part1/>
      <Footer/>
      
    </div>
  );
};

export default Accueil;
