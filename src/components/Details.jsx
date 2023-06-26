import "./styles/Details.css";
import imgErr from "../images/onerror.jpg";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../redux/actions";
import { useEffect } from "react";
import { Loader } from "./Loader";

export function Details() {
  //use the hoocks
  let history = useHistory();
  let id = useParams().id;
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  let details = state.details;
  //evitar catch intencionales
  if (id === "RR") id = "RX";
  //actualizar imagenes y botones cuando lleguen los resultados
  useEffect(() => {
    if (details.id.toString() === id) {
      //subir al inicio
      window.scrollTo(0, 0);
      console.log();

      //inyectamos descripccion
      document.getElementById("description").innerHTML = details.description;
      document.title = details.name;

      //preparamos datos para inyectar
      let arrImg = details.image || [];
      let containerImages = document.getElementById("containerImages");
      let containerButtons = document.getElementById("containerButtons");

      function chanceImage(num) {
        if (num > arrImg.length - 1) num = 0;
        for (let image of containerImages.children) {
          if (image.id === "image " + num) {
            image.className = "imageIn";
          } else {
            image.className = "imageOff";
          }
        }
      }

      //limpiamos las listas de imagenes y botones en el dom
      containerImages.replaceChildren();
      containerButtons.replaceChildren();

      //creamos las nuevas listas
      for (let n_url in arrImg) {
        let object = document.createElement("img");
        object.id = "image " + n_url;
        if (n_url == 0) {
          object.className = "imageIn";
        } else {
          object.className = "imageOff";
        }
        object.src =
          details.id.toString()[0] === "R"
            ? atob(arrImg[n_url])
            : arrImg[n_url];
        object.addEventListener("error", onError);
        containerImages.appendChild(object);

        let button = document.createElement("div");
        button.className = "buttonOn";
        button.addEventListener("click", (e) => {
          for (let but of containerButtons.children) {
            but.className = "buttonOn";
          }
          e.target.className = "buttonOff";
          chanceImage(n_url);
        });
        containerButtons.appendChild(button);
      }
    }
  }, [details]);

  //get data
  if (details.id.toString() !== id) {
    getDetails(dispatch, history, id);
  }

  //por si las imagen no carga
  let onError = (e) => {
    e.target.src = imgErr;
  };

  //le aplicamos un estilo a cada plataforma dependiendo de su nombre
  let iterPlataforms = (x) => {
    let p = "";
    if (x.name.toLowerCase().includes("xbox")) p = "groupXbox";
    else if (x.name.toLowerCase().includes("play")) p = "groupPlay";
    else if (x.name.toLowerCase().includes("nintendo")) p = "groupNintendo";
    else if (x.name.toLowerCase().includes("atari")) p = "groupAtari";
    else if (x.name.toLowerCase().includes("android")) p = "groupAndroid";
    else if (x.name.toLowerCase().includes("pc")) p = "groupPC";
    else if (x.name.toLowerCase().includes("mac")) p = "groupPC";
    else if (x.name.toLowerCase().includes("linux")) p = "groupPC";
    else if (x.name.toLowerCase().includes("apple")) p = "groupPC";
    else p = "groupConsole";

    return (
      <div className={p}>
        <img alt="" />
        <p>{x.name}</p>
      </div>
    );
  };

  //creamos una array de estrellas
  let ret = [];
  for (let i = 0; i < 5; i++) {
    if (Math.floor(details.rating) >= i + 1) {
      ret = ret.concat(<img className="starFill" alt="" key={i} />);
    } else ret = ret.concat(<img className="starUnfill" alt="" key={i} />);
  }

  //formateamos fecha
  function formatDate(string) {
    let obj = new Date(string);
    return obj.toLocaleString();
  }

  //calificar
  function handleQualify(string) {
    let input = parseInt(document.getElementById("qualify").value);

    if (!isNaN(input)) {
      if (input >= 0 && input <= 5) {
        let id = details.id.toString().replace("R", "");
        let http = `http://localhost:3001/score?videogame=${id}&user=${state.user.id}&score=${input}`;
        console.log(http);
        fetch(http)
          .then((r) => r.json())
          .then((r) => {
            alert(r.err || r.msg);
          });
      } else {
        alert("fuera del rango:0-5");
      }
    } else {
      alert("no es un numero");
    }
  }

  if (details.id.toString() === id) {
    return (
      <div className="Details">
        <button onClick={() => history.goBack()}>Go to Back</button>

        <div className="header">
          <h1 translate="no">{details.name}</h1>
          <h2>
            {details.id.toString()[0] === "R"
              ? "Launch on: " + formatDate(details.launch)
              : "Launch on: " + details.launch}
          </h2>

          <div className="containerGalery">
            <div id="containerButtons"></div>
            <div id="containerImages"></div>
          </div>
        </div>
        <div className="containerPlataforms" translate="no">
          {details.plataforms.map(iterPlataforms)}
        </div>
        <div className="moreInfo">
          <p id="description"></p>

          <div className="containerGenres">
            {details.genres.map((x) => (
              <p className="genre">{x.name}</p>
            ))}
          </div>
        </div>
        <div className="containerStar">
          <h2>{"👨‍👧‍👧 : " + details.rating_count + " "}</h2>
          {ret}
        </div>
        {state.user.id && details.id.toString()[0] === "R" ? (
          <div className="group">
            <div className="groupInput">
              <input type="text" placeholder="Qualify" id="qualify" />
              <label>Qualify to :1-5</label>
            </div>
            <button onClick={handleQualify}>Qualify</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Loader />
      </div>
    );
  }
}
