import "./styles/Paginado.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPag, prevPag } from "../redux/actions";

export function Paginado(props) {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  function next() {
    let pag = state.filters.pag;
    let num = state.filters.numPag;
    console.log();
    if (pag * num < props.results.length) {
      dispatch(nextPag());
    }
  }
  function prev() {
    let pag = state.filters.pag;
    if (pag > 1) {
      dispatch(prevPag());
    }
  }
  return (
    <div className="Paginado">
      <button onClick={prev}>Previus</button>
      <p translate="no">Pag: {state.filters.pag}</p>
      <button onClick={next}>Next</button>
    </div>
  );
}
