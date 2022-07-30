import { VideoModal } from "@/components/VideoModal";
import { MessageModal } from "@/components/MessageModal";

import { DataBaseName, DataBaseType, DataBaseConfig } from "./types";

export const DATABASE_CONFIG: DataBaseConfig = {
  [DataBaseName.GOT7]: {
    [DataBaseType.CARDS]: "bf4fb76b86974ddd978b1ab0af9f6516",
    [DataBaseType.GROUPS]: "70655d81af314ea8ab49262740528aa4",
    resultComponent: VideoModal,
    resultConfig: {}
  },
  [DataBaseName.XIAOGA]: {
    [DataBaseType.CARDS]: "3111faf6c5864298947a0c87e835aab5",
    [DataBaseType.GROUPS]: "8599b0c8417c4a3a90f859a820e01f27",
    resultComponent: MessageModal,
    resultConfig: {
      title: 'HBD 0730',
      message: 'Congratulation! Your password is xiaogababa0730HBD!',
    }
  },
};
