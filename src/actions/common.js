import { SIDEBAR_ACTIVE_MENU } from "../_types/dux"

export const setActiveMenu = (menuArgs) => {
    return {
       type:SIDEBAR_ACTIVE_MENU,
       payload:menuArgs
     }
 }