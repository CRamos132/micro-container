import React, { useEffect, useRef } from "react";

function MicroFrontend({ name, host }) {
  const ref = useRef(null);
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      window[`render${name}`](`${name}-container`);
      const element = document.getElementById(`${name}-container`);
      ref.current = element;
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }
    async function buscaDados() {
      const res = await fetch(`${host}/asset-manifest.json`);
      const manifest = await res.json();

      //   const delay = await new Promise((resolve) => setTimeout(resolve, 10000));

      const script = document.createElement("script");
      script.id = scriptId;
      script.crossOrigin = "";
      script.src = `${host}${manifest.files["main.js"]}`;
      script.onload = () => {
        renderMicroFrontend();
      };
      document.head.appendChild(script);
    }
    buscaDados();

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](ref.current);
    };
  });

  return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
