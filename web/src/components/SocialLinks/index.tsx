import React from "react";
import config from "../../config";

import style from "./SocialLinks.module.scss";

type Props = {
  theme: "dark" | "light";
};

function SocialLinks({ theme }: Props): JSX.Element {
  return (
    <div className={style.mainWrapper}>
      <a
        className={`${style.socialLink} ${
          style[`socialLink__instagram__${theme}`]
        }`}
        href={config.socialMediaLinks.instagram}
        target="_blank"
        rel="noreferrer"
      >
        {""}
      </a>
      <a
        className={`${style.socialLink} ${
          style[`socialLink__facebook__${theme}`]
        }`}
        href={config.socialMediaLinks.facebook}
        target="_blank"
        rel="noreferrer"
      >
        {""}
      </a>
      <a
        className={`${style.socialLink} ${
          style[`socialLink__telegram__${theme}`]
        }`}
        href={config.socialMediaLinks.telegram}
        target="_blank"
        rel="noreferrer"
      >
        {""}
      </a>
      <a
        className={`${style.socialLink} ${
          style[`socialLink__linkedin__${theme}`]
        }`}
        href={config.socialMediaLinks.linkedIn}
        target="_blank"
        rel="noreferrer"
      >
        {""}
      </a>
    </div>
  );
}

export default SocialLinks;
