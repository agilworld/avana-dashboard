import { SIDEBAR_ACTIVE_MENU  } from "../_types/dux";

const initialState = {
  menuId:{
      parent:null,
      child:null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_ACTIVE_MENU:
      return {
        ...state,
        menuId: action.payload
      };
    default:
      return state;
  }
}
