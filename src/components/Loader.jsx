import load from "../images/load.svg";
export function Loader() {
  return (
    <div className="Loader">
      <div className="loader">
        <object data={load} type="image/svg+xml">
          Cargando...
        </object>
      </div>
    </div>
  );
}
