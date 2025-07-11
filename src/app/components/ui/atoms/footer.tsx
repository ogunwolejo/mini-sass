"use client";

import {NamedExoticComponent, memo} from "react";

const Footer: NamedExoticComponent = memo(() => {
  const date = new Date();
  const demoLinks: string[] = ["Home", "Simmple", "Blog", "License"];
  return (
    <footer
      id="app_footer"
      className="w-full bg-transparent py-4 px-2 content-border flex justify-center items-center gap-16 lg:gap-32 absolute bottom-0"
    >
      <div
        id="content"
        className="text-xs lg:text-sm font-helvetica text-gray-400"
      >
        @ {date.getFullYear()}, Made with ❤️ by{" "}
        <span className="font-semibold text-teal">Joshua Ogunwole</span>
      </div>
      <div
        id="content_page"
        className="inline-flex justify-between items-center gap-8 lg:gap-16"
      >
        {demoLinks.map((demoLink, idx) => (
          <p
            key={idx}
            id="content_page_link"
            className="font-helvetica font-normal text-xs lg:text-sm text-gray-400"
          >
            {demoLink}
          </p>
        ))}
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
