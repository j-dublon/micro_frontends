import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(0);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
