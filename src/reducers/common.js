import { SIDEBAR_ACTIVE_MENU, SIDEBAR_UPDATE_MENU  } from "../_types/dux";
import menudata from "../data/dummy-menu.json"

const initialState = {
  menuId:{
      parent:null,
      child:null
  },
  menus:menudata
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_ACTIVE_MENU:
      return {
        ...state,
        menuId: action.payload
      };
    case SIDEBAR_UPDATE_MENU:
      return {
        ...state,
        menus: action.payload
      };
    default:
      return state;
  }
}
