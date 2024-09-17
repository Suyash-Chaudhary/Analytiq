import registerListeners from "./register-listeners";
import GlobalState from "./state/global-state";
import Socket from "./state/socket";

const startup = async () => {
  await GlobalState.initialize();
  registerListeners();
  Socket.connect();
};

startup();
