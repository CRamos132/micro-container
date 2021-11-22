import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";

function MicroFrontend({ name, host }) {
  const { isLoading, error, data } = useQuery(`fetch${name}`, buscaDados);

  async function buscaDados() {
    const res = await fetch(`${host}/asset-manifest.json`);
    const manifest = await res.json();
    console.log("🚀 ~ manifest", manifest);
    return await manifest;
  }

  const renderMicroFrontend = () => {
    window[`render${name}`](`${name}-container`);
    const element = document.getElementById(`${name}-container`);
    ref.current = element;
  };

  const scriptId = `micro-frontend-script-${name}`;
  const ref = useRef(null);

  useEffect(() => {
    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    if (error) {
      return;
    }

    if (data) {
      const manifest = data;
      const script = document.createElement("script");
      script.id = scriptId;
      script.crossOrigin = "";
      script.src = `${host}${manifest.files["main.js"]}`;
      script.onload = () => {
        renderMicroFrontend();
      };
      document.head.appendChild(script);
    }

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);
  if (isLoading) return <div>Loading...</div>;
  return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
