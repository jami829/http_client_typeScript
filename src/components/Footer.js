import React from "react";

function Footer() {
  return (
    <div>
      Built with {` `}
      <a
        className="link"
        href="https://www.codestates.com/"
        target="_blank"
        rel="noreferrer"
      >
        codestates
      </a>
      , {` `} Posted by {` `} Fin.K.L © {new Date().getFullYear()}
    </div>
  );
}

export default Footer;
