import React from 'react';
import Header from '../organism/Header';
import BannerMain from '../organism/BannerMain';
import Topics from '../organism/Topics';
import Footer from '../organism/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <BannerMain />
      <Topics />
      <Footer />
    </>
  );
}
