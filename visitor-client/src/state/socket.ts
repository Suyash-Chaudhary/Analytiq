import ClickEvents from "../events/buffers/click";
import MouseMoveEvents from "../events/buffers/mouse-move";
import NavigationEvents from "../events/buffers/navigation";
import ResizeEvents from "../events/buffers/resize";
import ScrollEvents from "../events/buffers/scroll";
import { Subjects } from "../events/types/subjects";
import VisibilityChangeEvents from "../events/buffers/visibility-change";
import GlobalConfig from "./global-config";
import GlobalState from "./global-state";
import { ConnectionEvent } from "../events/types/connection";
import { ReconnectionEvent } from "../events/types/reconnection";

class Socket {
  private _socket: WebSocket | null = null;

  private constructor() {}
  private static _instance: Socket | null = null;
  static initialize() {
    if (!this._instance) this._instance = new Socket();
  }
  static socket(caller: string) {
    if (!this._instance)
      throw new Error(`Socket need to be initialized before ${caller}`);
    if (!this._instance._socket)
      throw new Error(`Socket need to be connected before ${caller}`);
    return this._instance._socket;
  }

  private static async _handleEventBufferTimeout() {
    GlobalState.instance().eventBufferTimeout = window.setTimeout(async () => {
      const promises = [
        ClickEvents.instance().pushEvents(
          this.socket("_handleEventBufferTimeout")
        ),
        MouseMoveEvents.instance().pushEvents(
          this.socket("_handleEventBufferTimeout")
        ),
        NavigationEvents.instance().pushEvents(
          this.socket("_handleEventBufferTimeout")
        ),
        ResizeEvents.instance().pushEvents(
          this.socket("_handleEventBufferTimeout")
        ),
        ScrollEvents.instance().pushEvents(
          this.socket("_handleEventBufferTimeout")
        ),
        VisibilityChangeEvents.instance().pushEvents(
          this.socket("_handleEventBufferTimeout")
        ),
      ];
      await Promise.all(promises);
      Socket._handleEventBufferTimeout();
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

    this.socket("_handleOpen").send(JSON.stringify(payload));

    globals.firstLoad = false;

    this._handleEventBufferTimeout();
  }

  private static _handleClose() {
    const globals = GlobalState.instance();
    if (globals.eventBufferTimeout) clearTimeout(globals.eventBufferTimeout);
    this.reconnect();
  }

  private static _handleError() {
    this.socket("_handleError").close();
  }

  static async connect() {
    if (!this._instance)
      throw new Error("Socket need to be initialized before connect()");

    this._instance._socket = new WebSocket(
      "ws://analytiq.in/api/v1/visitorwss"
    );
    this._instance._socket.addEventListener("open", () => this._handleOpen());
    this._instance._socket.addEventListener("close", () => this._handleClose());
    this._instance._socket.addEventListener("error", () => this._handleError());
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
