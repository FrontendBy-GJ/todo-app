import React from 'react';
import desktopLight from '../assets/bg-desktop-light.jpg';
import mobileLight from '../assets/bg-mobile-light.jpg';
import { MoonIcon } from '../icons';

const Header = () => {
  return (
    <header>
      <picture>
        <source media="(max-width: 600px)" srcSet={mobileLight} sizes="375px" />
        <source srcSet={desktopLight} sizes="1440px" />
        <img src={mobileLight} alt="mountains" className="absolute w-full" />
      </picture>
      <section className="flex justify-between pt-10 lg:pt-14 max-w-md mx-auto relative px-4 xl:max-w-xl xl:pt-20">
        <h1 className="text-lightTheme-50 text-2xl md:text-3xl tracking-[10px] font-josefin">
          TODO
        </h1>
        <MoonIcon />
      </section>
    </header>
  );
};

export default Header;
