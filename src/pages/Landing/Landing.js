import React from "react";
import Navbar from "./Navbar/Navbar";
import styles from "./Landing.module.css";
import pic from "../../assets/picc.png";
import Testimonials from "./Testimonials/Testimonials";
import Headline from "./Headline/Headline";
import Features from "./Features/Features";
import ForSection from "./ForSection/ForSection";
import CtaButton from "./CtaButton/CtaButton";
import Pricing from "./Pricing/Pricing";
import Faq from "./FAQ/FAQ";
import Footer from "./Footer/Footer";


const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div>
        <Headline/>
        </div>
        <div className={styles.picture_container}>
          <img className={styles.picture} src={pic} alt="pic" />
        </div>
        <div className={styles.testimonials_container}>
          <div className={styles.testimonials}>
            <Testimonials />
          </div>
        </div>
        <div className={styles.features} id='features'>
        <Features/>
        </div>
        <div className={styles.for} id>
          <ForSection/>
          <CtaButton/>
        </div>
        <div className={styles.pricing} id='pricing'>
          <Pricing/>
        </div>
        <div className={styles.faq}>
          <Faq/>
          <CtaButton/>
        </div>
        <div className={styles.footer}>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Landing;
