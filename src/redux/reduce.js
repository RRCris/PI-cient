import {
  SAVEFIRST100,
  SAVEDETAILS,
  ORDERFIRST100,
  ADDFILTER,
  DELFILTER,
  CLEARFILTER,
  NEXTPAG,
  PREVPAG,
  SAVEUSER,
  CLEARUSER,
} from "./actionsTypes";

let defaultState = {
  first100: [],
  details: { id: "RR" },
  order: "",
  user: {},
  filters: {
    origin: [],
    plataforms: [],
    genres: [],
    pag: 1,
    numPag: 15,
  },
};

function sortAlfabetic(a, b) {
  return a.name.localeCompare(b.name);
}
function sortAlfabeticReverse(a, b) {
  return b.name.localeCompare(a.name);
}
function sortScore(a, b) {
  return b.rating - a.rating;
}
function sortScoreReverse(a, b) {
  return a.rating - b.rating;
}
export function Reducer(state, action) {
  if (!state) return defaultState;

  switch (action.type) {
    case SAVEFIRST100:
      state.filters.pag = 1;
      return {
        ...state,
        first100: action.payload,
      };
    case SAVEDETAILS:
      return { ...state, details: action.payload };
    case ORDERFIRST100:
      state.filters.pag = 1;
      let arr = state.first100;
      if (action.payload === "alfabetic") {
        arr = arr.sort(sortAlfabetic);
      } else if (action.payload === "alfabetic-reverse") {
        arr = arr.sort(sortAlfabeticReverse);
      } else if (action.payload === "most score") {
        arr = arr.sort(sortScore);
      } else if (action.payload === "lower score") {
        arr = arr.sort(sortScoreReverse);
      }

      return { ...state, first100: arr, order: action.payload };
    case ADDFILTER:
      state.filters.pag = 1;

      if (action.payload.class === "origin") {
        state.filters.origin = [action.payload.filter];
      } else if (
        action.payload.class === "plataforms" &&
        !state.filters.plataforms.includes(action.payload.filter)
      ) {
        state.filters.plataforms.push(action.payload.filter);
      } else if (
        action.payload.class === "genres" &&
        !state.filters.genres.includes(action.payload.filter)
      ) {
        state.filters.genres.push(action.payload.filter);
      }

      return { ...state };
    case DELFILTER:
      state.filters.pag = 1;

      if (state.filters.origin.includes(action.payload)) {
        state.filters.origin = [];
      } else if (state.filters.plataforms.includes(action.payload)) {
        let i = state.filters.plataforms.indexOf(action.payload.toString());
        state.filters.plataforms.splice(i, 1);
      } else if (state.filters.genres.includes(action.payload)) {
        let i = state.filters.genres.indexOf(action.payload.toString());
        state.filters.genres.splice(i, 1);
      }

      return { ...state };

    case CLEARFILTER:
      state.filters.pag = 1;
      if (action.payload.class === "origin") {
        state.filters.origin = [];
      } else if (action.payload.class === "plataforms") {
        state.filters.plataforms = [];
      } else if (action.payload.class === "genres") {
        state.filters.genres = [];
      }
      return { ...state };
    case NEXTPAG:
      state.filters.pag += 1;
      return { ...state };
    case PREVPAG:
      state.filters.pag -= 1;
      return { ...state };
    case SAVEUSER:
      state.user = action.payload;
      return { ...state };
    case CLEARUSER:
      state.user = [];
      return { ...state };
    default:
      return state;
  }
}
