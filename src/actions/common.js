import { SIDEBAR_ACTIVE_MENU, SIDEBAR_UPDATE_MENU } from "../_types/dux"

export const setActiveMenu = (menuArgs) => {
    return {
       type:SIDEBAR_ACTIVE_MENU,
       payload:menuArgs
     }
 }

 export const updateMenu = (menuArgs) => {
  return {
     type:SIDEBAR_UPDATE_MENU,
     payload:menuArgs
   }
}