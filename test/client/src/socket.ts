import GlobalConfig from "./global-config";
import GlobalState from "./global-state";
import getIp from "./utils/get-ip";
import short from "short-uuid";

class Socket {
  private constructor() {}

  private static _socket: WebSocket | null = null;

  private static async _handleEventBufferTimeout() {
    GlobalState.instance().eventBufferTimeout = window.setTimeout(async () => {
      await GlobalState.instance().sendEvents(this._socket);
      this._handleEventBufferTimeout();
    }, GlobalConfig.EVENT_BUFFER_TIMEOUT);
  }

  private static async _handleOpen() {
    const globals = GlobalState.instance();

    globals.reconnectAttempts = 0;

    globals.ip = globals.ip || (await getIp());
    globals.id = globals.id || short.generate();

    const payload = {
      type: globals.firstLoad ? "connection" : "reconnetion",
      ip: globals.ip,
      id: globals.id,
      html: document.documentElement.outerHTML,
      subdomain: globals.subdomain,
      page: globals.page,
      timeStamp: performance.now(),
    };

    this._socket.send(JSON.stringify(payload));

    globals.firstLoad = false;

    this._handleEventBufferTimeout();
  }

  private static _handleClose() {
    const globals = GlobalState.instance();
    if (globals.eventBufferTimeout) clearTimeout(globals.eventBufferTimeout);
    this.reconnect();
  }

  private static _handleError() {
    this._socket.close();
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
