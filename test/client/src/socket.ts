import ClickEvents from "./events/buffers/click";
import MouseMoveEvents from "./events/buffers/mouse-move";
import NavigationEvents from "./events/buffers/navigation";
import ResizeEvents from "./events/buffers/resize";
import ScrollEvents from "./events/buffers/scroll";
import { Subjects } from "./events/types/subjects";
import VisibilityChangeEvents from "./events/buffers/visibility-change";
import GlobalConfig from "./state/global-config";
import GlobalState from "./state/global-state";
import { ConnectionEvent } from "./events/types/connection";
import { ReconnectionEvent } from "./events/types/reconnection";

class Socket {
  socket: WebSocket | null = null;

  private constructor() {}
  private static _instance: Socket | null = null;
  static initialize() {
    if (!this._instance) this._instance = new Socket();
  }
  static socket() {
    if (!this._instance)
      throw new Error("Socket need to be initialized before access");
    if (!this._instance.socket)
      throw new Error("Socket must be connected before access");
    return this._instance.socket;
  }

  private static async _handleEventBufferTimeout() {
    GlobalState.instance().eventBufferTimeout = window.setTimeout(async () => {
      const promises = [
        ClickEvents.instance().pushEvents(this._instance!.socket!),
        MouseMoveEvents.instance().pushEvents(this._instance!.socket!),
        NavigationEvents.instance().pushEvents(this._instance!.socket!),
        ResizeEvents.instance().pushEvents(this._instance!.socket!),
        ScrollEvents.instance().pushEvents(this._instance!.socket!),
        VisibilityChangeEvents.instance().pushEvents(this._instance!.socket!),
      ];
      await Promise.all(promises);
      this._handleEventBufferTimeout();
    }, GlobalConfig.EVENT_BUFFER_TIMEOUT);
  }

  private static async _handleOpen() {
    const globals = GlobalState.instance();

    globals.reconnectAttempts = 0;

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

    this._instance!.socket!.send(JSON.stringify(payload));

    globals.firstLoad = false;

    this._handleEventBufferTimeout();
  }

  private static _handleClose() {
    const globals = GlobalState.instance();
    if (globals.eventBufferTimeout) clearTimeout(globals.eventBufferTimeout);
    this.reconnect();
  }

  private static _handleError() {
    this._instance!.socket!.close();
  }

  static async connect() {
    if (!this._instance)
      throw new Error("Socket need to be initialized before connect()");

    this._instance.socket = new WebSocket("ws://analytiq.in/api/v1/visitorwss");
    this._instance.socket.addEventListener("open", this._handleOpen);
    this._instance.socket.addEventListener("close", this._handleClose);
    this._instance.socket.addEventListener("error", this._handleError);
  }

  static async reconnect() {
    const globals = GlobalState.instance();
    if (globals.reconnectAttempts < GlobalConfig.MAX_RECONNECT_ATTEMPTS) {
      setTimeout(async () => {
        globals.reconnectAttempts++;
        await this.connect();
      }, Math.min(GlobalConfig.RECONNECT_INTERVAL * 2 ** globals.reconnectAttempts, GlobalConfig.MAX_RECONNECT_INTERVAL));
    } else {
      console.log("Max connection attemps have be reached.");
    }
  }
}

Socket.initialize();

export default Socket;
