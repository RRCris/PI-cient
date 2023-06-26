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

export function getfirst100(dispatch) {
  fetch("http://localhost:3001/videogames")
    .then((x) => x.json())
    .then((x) => dispatch(saveFirst100(x)));
}

export function getSearch(dispatch, search, loader) {
  fetch("http://localhost:3001/videogames?name=" + search)
    .then((x) => x.json())
    .then((x) => {
      loader.style.display = "none";
      dispatch(saveFirst100(x));
    });
}

export function getDetails(dispatch, history, id) {
  fetch("http://localhost:3001/videogames/" + id)
    .then((x) => x.json())
    .then((x) => {
      //evitar catch intencionales
      if (id === "RR") history.push("/details/1");

      if (x.id) {
        if (x.id.toString() === id) {
          dispatch(saveDetails(x));
        } else {
          history.push("/details/1");
        }
      } else {
        history.push("/details/1");
      }
    });
}

export function orderFisrt100(order) {
  return {
    type: ORDERFIRST100,
    payload: order,
  };
}
export function saveFirst100(result) {
  return {
    type: SAVEFIRST100,
    payload: result,
  };
}

export function saveDetails(details) {
  return {
    type: SAVEDETAILS,
    payload: details,
  };
}

export function addFilter(filter) {
  return {
    type: filter.filter === "All" ? CLEARFILTER : ADDFILTER,
    payload: filter,
  };
}

export function deleteFilter(filter) {
  return {
    type: DELFILTER,
    payload: filter,
  };
}
export function nextPag() {
  return {
    type: NEXTPAG,
    payload: 1,
  };
}

export function prevPag() {
  return {
    type: PREVPAG,
    payload: -1,
  };
}
export function saveUser(user) {
  return {
    type: SAVEUSER,
    payload: user,
  };
}
export function clearUser(user) {
  return {
    type: CLEARUSER,
    payload: user,
  };
}
