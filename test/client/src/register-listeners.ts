import GlobalState from "./global-state";

function poolPathChange() {
  const globals = GlobalState.instance();
  setTimeout(() => {
    const newPage = window.location.hostname + window.location.pathname;
    if (globals.page != newPage) {
      globals.page = newPage;
      globals.addEvent({
        id: globals.id,
        ip: globals.ip,
        type: "navigation",
        page: globals.page,
        html: document.documentElement.outerHTML,
        timeStamp: performance.now(),
      });
    }
    poolPathChange();
  }, 1000);
}

const registerListeners = () => {
  const globals = GlobalState.instance();

  window.addEventListener("mousemove", (event) => {
    globals.addEvent({
      id: globals.id,
      ip: globals.ip,
      type: "mousemove",
      x: event.x,
      y: event.y,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("resize", (event) => {
    const w = event.target as Window;
    globals.addEvent({
      id: globals.id,
      ip: globals.ip,
      type: "resize",
      width: w.innerWidth,
      height: w.innerHeight,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("visibilitychange", (event) => {
    globals.addEvent({
      id: globals.id,
      ip: globals.ip,
      type: "visibilitychange",
      visibility: document.visibilityState,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("scroll", (event) => {
    globals.addEvent({
      id: globals.id,
      ip: globals.ip,
      type: "scroll",
      x: window.scrollX,
      y: window.scrollY,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("click", (event) => {
    globals.addEvent({
      id: globals.id,
      ip: globals.ip,
      type: "click",
      x: event.x,
      y: event.y,
      timeStamp: event.timeStamp,
    });
  });

  if (["firefox", "safari", "unknown"].includes(globals.browser)) {
    // Simply pool to detect path changes
    poolPathChange();
  } else {
    // New experimental Navigation API
    window.navigation.addEventListener("navigate", () => {
      globals.page = window.location.hostname + window.location.pathname;
      globals.addEvent({
        id: globals.id,
        ip: globals.ip,
        type: "navigation",
        page: globals.page,
        html: document.documentElement.outerHTML,
        timeStamp: performance.now(),
      });
    });
  }
};

export default registerListeners;
