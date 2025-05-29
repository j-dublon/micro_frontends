import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
  // If defaultHistory (browser history) provided - i.e marketing running in isolation -
  // use it, otherwise create memory history
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    // If running in the container, notify container when
    // path changes by calling onNavigate
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    // Return this function to the container - used to notify
    // marketing app when container changes browser history
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    // And use browser history, rather than memory history
    // so path changes are visible in URL
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
