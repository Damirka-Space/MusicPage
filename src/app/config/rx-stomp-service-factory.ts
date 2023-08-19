import { RxStompService } from "../services/rx-stomp.service";
import { channelRxStompConfig } from "./stomp.config";


export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(channelRxStompConfig);
  return rxStomp;
}