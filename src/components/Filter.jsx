import "./styles/Filter.css";
import loader from "../images/load.svg";
import {
  addFilter,
  deleteFilter,
  getSearch,
  orderFisrt100,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function Filter() {
  let dispatch = useDispatch();
  let filters = useSelector((state) => state.filters);
  function Enter(e) {
    if (e.code === "Enter") {
      e.preventDefault();
      let loader = document.getElementById("miniLoader");
      loader.style.display = "inline-block";
      let search = document.getElementById("searchIn").value;
      if (search.length > 0) {
        getSearch(dispatch, search, loader);
      }
    }
  }
  function addFilterOrigin(e) {
    dispatch(addFilter({ class: "origin", filter: e.target.value }));
  }
  function addFilterPlataform(e) {
    dispatch(addFilter({ class: "plataforms", filter: e.target.value }));
  }
  function addFilterGenres(e) {
    dispatch(addFilter({ class: "genres", filter: e.target.value }));
  }
  function deleteMe(e) {
    dispatch(deleteFilter(e.target.innerText));
  }
  function handleSearch() {
    let loader = document.getElementById("miniLoader");
    loader.style.display = "inline-block";
    let search = document.getElementById("searchIn").value;
    if (search.length > 0) {
      getSearch(dispatch, search, loader);
    }
  }
  function onOrder(e) {
    dispatch(orderFisrt100(e.target.value));
  }
  return (
    <div className="Filter">
      <div className="header">
        <div className="containerSearch">
          <div className="groupInputSearch">
            <input
              type="text"
              name="search"
              id="searchIn"
              placeholder="Search"
              onKeyPress={Enter}
            />
            <label>Search</label>
            <div onClick={handleSearch}>
              <img alt="" />
            </div>
          </div>
          <div className="miniLoader" id="miniLoader">
            <object data={loader} type="image/svg+xml"></object>
          </div>
        </div>
        <div className="order">
          <p>Order by : </p>
          <select name="selectOrder" id="selectOrder" onChange={onOrder}>
            <option value="alfabetic">alfabetic</option>
            <option value="alfabetic-reverse">alfabetic-reverse</option>
            <option value="most score">most score</option>
            <option value="lower score">lower score</option>
          </select>
        </div>
      </div>
      <h2>Filter By :</h2>
      <div className="nameFilters" translate="no">
        <p className="nameOrigin" onClick={deleteMe}>
          {filters.origin}
        </p>
        {filters.plataforms.map((x) => (
          <p className="namePlataform" onClick={deleteMe}>
            {x}
          </p>
        ))}
        {filters.genres.map((x) => (
          <p className="nameGenre" onClick={deleteMe}>
            {x}
          </p>
        ))}
      </div>
      <div className="filters">
        <div className="origin">
          <p>Origin : </p>
          <select
            name="selectOrigin"
            id="selectOrigin"
            onChange={addFilterOrigin}
          >
            {filters.origin.length < 1 ? (
              ""
            ) : (
              <option value="null" selected>
                Filtrando ⬆⬆⬆
              </option>
            )}
            <option value="All" translate="no">
              All origin
            </option>
            <option value="Api" translate="no">
              API Rawg
            </option>
            <option value="Database">Native of GameWiki</option>
          </select>
        </div>
        <div className="plataforms">
          <p>Patforms : </p>
          <select
            name="selectPlataforms"
            id="selectPlataforms"
            onChange={addFilterPlataform}
            translate="no"
          >
            {filters.plataforms.length > 0 ? (
              <option value="null" selected>
                Filtrando ⬆⬆⬆
              </option>
            ) : (
              ""
            )}
            <option value="All" translate="no">
              All Plataforms
            </option>
            <option value="xbox">Xbox</option>
            <option value="play">PlayStation</option>
            <option value="nintendo">Nintendo</option>
            <option value="atari">Atari</option>
            <option value="android">Android</option>
            <option value="pc">pc</option>
            <option value="other">Other Consoles</option>
          </select>
        </div>
        <div className="genres">
          <p>Genres : </p>
          <select
            name="selectGenres"
            id="selectGenres"
            onChange={addFilterGenres}
          >
            {filters.genres.length < 1 ? (
              ""
            ) : (
              <option value="null" selected>
                Filtrando ⬆⬆⬆
              </option>
            )}
            <option value="All" translate="no">
              All Genres
            </option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Indie">Indie</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Racing">Racing</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
          </select>
        </div>
      </div>
    </div>
  );
}
