import ClickEvents from "./events/buffers/click";
import MouseMoveEvents from "./events/buffers/mouse-move";
import NavigationEvents from "./events/buffers/navigation";
import ResizeEvents from "./events/buffers/resize";
import ScrollEvents from "./events/buffers/scroll";
import { Subjects } from "./events/types/subjects";
import VisibilityChangeEvents from "./events/buffers/visibility-change";
import GlobalConfig from "./global-config";
import GlobalState from "./global-state";
import getIp from "./utils/get-ip";
import short from "short-uuid";
import { ConnectionEvent } from "./events/types/connection";
import { ReconnectionEvent } from "./events/types/reconnection";

class Socket {
  private constructor() {}

  private static _socket: WebSocket | null = null;

  private static async _handleEventBufferTimeout() {
    GlobalState.instance().eventBufferTimeout = window.setTimeout(async () => {
      const promises = [
        ClickEvents.instance().pushEvents(this._socket!),
        MouseMoveEvents.instance().pushEvents(this._socket!),
        NavigationEvents.instance().pushEvents(this._socket!),
        ResizeEvents.instance().pushEvents(this._socket!),
        ScrollEvents.instance().pushEvents(this._socket!),
        VisibilityChangeEvents.instance().pushEvents(this._socket!),
      ];
      await Promise.all(promises);
      this._handleEventBufferTimeout();
    }, GlobalConfig.EVENT_BUFFER_TIMEOUT);
  }

  private static async _handleOpen() {
    const globals = GlobalState.instance();

    globals.reconnectAttempts = 0;

    globals.ip = globals.ip || (await getIp());
    globals.id = globals.id || short.uuid();

    const payload: ConnectionEvent["payload"] | ReconnectionEvent["payload"] = {
      subject: globals.firstLoad ? Subjects.Connection : Subjects.Reconnection,
      data: {
        ip: globals.ip,
        id: globals.id,
        html: document.documentElement.outerHTML,
        domain: globals.domain,
        subdomain: globals.subdomain,
        page: globals.page,
        timeStamp: performance.now(),
      },
    };

    this._socket!.send(JSON.stringify(payload));

    globals.firstLoad = false;

    this._handleEventBufferTimeout();
  }

  private static _handleClose() {
    const globals = GlobalState.instance();
    if (globals.eventBufferTimeout) clearTimeout(globals.eventBufferTimeout);
    this.reconnect();
  }

  private static _handleError() {
    this._socket!.close();
  }

  static async connect() {
    this._socket = new WebSocket("ws://analytiq.in/api/v1/visitorwss");
    this._socket.addEventListener("open", () => this._handleOpen());
    this._socket.addEventListener("close", () => this._handleClose());
    this._socket.addEventListener("error", () => this._handleError());
  }

  static async reconnect() {
    const globals = GlobalState.instance();
    if (globals.reconnectAttempts < GlobalConfig.MAX_RECONNECT_ATTEMPTS) {
      setTimeout(async () => {
        console.log({ attempts: globals.reconnectAttempts });
        globals.reconnectAttempts++;
        await this.connect();
      }, Math.min(GlobalConfig.RECONNECT_INTERVAL * 2 ** globals.reconnectAttempts, GlobalConfig.MAX_RECONNECT_INTERVAL));
    } else {
      console.log("Max connection attemps have be reached.");
    }
  }
}

export default Socket;
