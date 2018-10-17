/*
 * uiReducer
 *
 * The reducer handles ui-changes for the platform,
 * like: navigation-UI components,
 */

// ui action-types
export const types = {
  TOGGLE_NAVBAR: "UI/TOGGLE_NAVBAR",
  TOGGLE_NAVBAR_SIDE: "UI/TOGGLE_NAVBAR_SIDE",
  TOGGLE_SEARCH: "UI/TOGGLE_SEARCH"
};

// Initial ui state
const initialState = {
  navbarMobileVisible: false,
  navbarSideExpanded: false,
  searchVisible: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_NAVBAR:
      return { ...state, navbarMobileVisible: !state.navbarMobileVisible };
    case types.TOGGLE_NAVBAR_SIDE:
      return { ...state, navbarSideExpanded: !state.navbarSideExpanded };
    case types.TOGGLE_SEARCH:
      return { ...state, searchVisible: !state.searchVisible };

    default:
      return state;
  }
};

export default ui;
