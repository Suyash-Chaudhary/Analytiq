import ClickEvents from "./events/buffers/click";
import MouseMoveEvents from "./events/buffers/mouse-move";
import NavigationEvents from "./events/buffers/navigation";
import ResizeEvents from "./events/buffers/resize";
import ScrollEvents from "./events/buffers/scroll";
import VisibilityChangeEvents from "./events/buffers/visibility-change";
import GlobalState from "./state/global-state";

function poolPathChange() {
  const globals = GlobalState.instance();
  setTimeout(() => {
    const newPage = window.location.hostname + window.location.pathname;
    if (globals.page != newPage) {
      globals.page = newPage;
      NavigationEvents.instance().addEvent({
        id: globals.id!,
        ip: globals.ip!,
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
    MouseMoveEvents.instance().addEvent({
      id: globals.id!,
      ip: globals.ip!,
      x: event.x,
      y: event.y,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("resize", (event) => {
    const w = event.target as Window;
    ResizeEvents.instance().addEvent({
      id: globals.id!,
      ip: globals.ip!,
      width: w.innerWidth,
      height: w.innerHeight,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("visibilitychange", (event) => {
    VisibilityChangeEvents.instance().addEvent({
      id: globals.id!,
      ip: globals.ip!,
      visibility: document.visibilityState,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("scroll", (event) => {
    ScrollEvents.instance().addEvent({
      id: globals.id!,
      ip: globals.ip!,
      x: window.scrollX,
      y: window.scrollY,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("click", (event) => {
    ClickEvents.instance().addEvent({
      id: globals.id!,
      ip: globals.ip!,
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
      NavigationEvents.instance().addEvent({
        id: globals.id!,
        ip: globals.ip!,
        page: globals.page,
        html: document.documentElement.outerHTML,
        timeStamp: performance.now(),
      });
    });
  }
};

export default registerListeners;
