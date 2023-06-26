import "./styles/Home.css";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getfirst100 } from "../redux/actions";
import { Loader } from "./Loader";
import { Filter } from "./Filter";
import { useEffect } from "react";
import { Paginado } from "./Paginado";

export function Home() {
  let store = useSelector((store) => store);
  let results = store.first100;
  let dispatch = useDispatch();

  //subir al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [store]);

  //peticion para llenar stack
  if (results.length === 0) {
    getfirst100(dispatch);
  }
  //vamos a filtrar

  //origin
  if (store.filters.origin.length > 0) {
    if (store.filters.origin === "Api")
      results = results.filter((x) => x.id.toString()[0] !== "R");
    else results = results.filter((x) => x.id.toString()[0] === "R");
  }
  //plataforms
  if (store.filters.plataforms.length > 0) {
    results = results.filter((videogame) => {
      let result = false;
      videogame.plataforms.forEach((plataform) => {
        store.filters.plataforms.forEach((filter) => {
          if (plataform.name.toLowerCase().includes(filter)) result = true;
        });
      });
      return result;
    });
  }
  //genres
  if (store.filters.genres.length > 0) {
    results = results.filter((videogame) => {
      let result = false;
      videogame.genres.forEach((genre) => {
        console.log(genre.name);
        if (store.filters.genres.includes(genre.name)) result = true;
      });
      return result;
    });
  }
  let resultsPag = results;
  //paginado
  results = results.filter((x) => {
    let pag = store.filters.pag;
    let num = store.filters.numPag;
    let result = false;
    if (
      results.indexOf(x) < pag * num &&
      results.indexOf(x) >= (pag - 1) * num
    ) {
      result = true;
    }
    return result;
  });

  return (
    <div className="Home">
      <div className="Header">
        <h1>You Can Find All Games Here</h1>
        <p>
          This is a page that will help you find your favorite games and find
          some gems, there is everything here!
        </p>
      </div>
      <div className="containerFilters">
        <Filter />
      </div>
      <div className="containerPag">
        <Paginado results={resultsPag} />
      </div>
      <div className="containerCards">
        {results.length === 0 ? (
          store.first100.length === 0 ? (
            <Loader />
          ) : (
            <h1>No hay resultados</h1>
          )
        ) : (
          results.map((x) => <Card key={x.id} data={x} />)
        )}
      </div>
    </div>
  );
}
