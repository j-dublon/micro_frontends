import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(0);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // Function passed to marketing app - when called, updates
      // container history to match marketing
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    // Update the marketing app history when container changes
    // its history
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
