import { Visibility } from "@analytiq/shared";
import ClickEvents from "./events/buffers/visitor-click";
import MouseMoveEvents from "./events/buffers/visitor-mouse-move";
import NavigationEvents from "./events/buffers/visitor-navigation";
import ResizeEvents from "./events/buffers/visitor-resize";
import ScrollEvents from "./events/buffers/visitor-scroll";
import VisibilityChangeEvents from "./events/buffers/visitor-visibility-change";
import GlobalState from "./state/global-state";

function poolPathChange() {
  const globals = GlobalState.instance();
  setTimeout(() => {
    const newPage = window.location.hostname + window.location.pathname;
    if (globals.page != newPage) {
      globals.page = newPage;
      NavigationEvents.instance().addEvent({
        domain: globals.domain,
        subdomain: globals.subdomain,
        id: globals.id,
        ip: globals.ip,
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
      domain: globals.domain,
      subdomain: globals.subdomain,
      id: globals.id,
      ip: globals.ip,
      x: event.x,
      y: event.y,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("resize", (event) => {
    const w = event.target as Window;
    ResizeEvents.instance().addEvent({
      domain: globals.domain,
      subdomain: globals.subdomain,
      id: globals.id,
      ip: globals.ip,
      width: w.innerWidth,
      height: w.innerHeight,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("visibilitychange", (event) => {
    VisibilityChangeEvents.instance().addEvent({
      domain: globals.domain,
      subdomain: globals.subdomain,
      id: globals.id,
      ip: globals.ip,
      visibility:
        document.visibilityState === "hidden"
          ? Visibility.Hidden
          : Visibility.Visible,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("scroll", (event) => {
    ScrollEvents.instance().addEvent({
      domain: globals.domain,
      subdomain: globals.subdomain,
      id: globals.id,
      ip: globals.ip,
      x: window.scrollX,
      y: window.scrollY,
      timeStamp: event.timeStamp,
    });
  });

  window.addEventListener("click", (event) => {
    ClickEvents.instance().addEvent({
      domain: globals.domain,
      subdomain: globals.subdomain,
      id: globals.id,
      ip: globals.ip,
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
    window.navigation.addEventListener("navigate", (event) => {
      globals.page =
        window.location.hostname + new URL(event.destination.url).pathname;
      NavigationEvents.instance().addEvent({
        domain: globals.domain,
        subdomain: globals.subdomain,
        id: globals.id,
        ip: globals.ip,
        page: globals.page,
        html: document.documentElement.outerHTML,
        timeStamp: performance.now(),
      });
    });
  }
};

export default registerListeners;
