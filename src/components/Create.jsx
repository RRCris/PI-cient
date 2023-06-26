import { useHistory } from "react-router-dom";
import "./styles/Create.css";

export function Create() {
  //hoocks
  let history = useHistory();
  let image = "";
  function changeInput(e) {
    let input = document.getElementById("inputFile");
    let file = input.files[0];
    if (file) {
      let reader = new FileReader();
      reader.addEventListener("load", (e) => {
        image = btoa(e.target.result);

        document
          .getElementById("ImageFile")
          .setAttribute("src", e.target.result);
      });
      reader.readAsDataURL(file);
    }
  }
  function changeGenres(e) {
    let container = document.getElementById("containerGenres");
    for (let pOld of container.children) {
      if (pOld.id === e.target.value) {
        return false;
      }
    }
    let p = document.createElement("p");
    p.className = "genre";
    p.id = e.target.value;
    p.innerText = e.target.value;
    p.addEventListener("click", (e) => {
      let container = document.getElementById("containerGenres");
      for (let p of container.children) {
        if (p.id === e.target.id) {
          p.remove();
        }
      }
    });
    container.appendChild(p);
  }
  function changePlataforms(e) {
    let container = document.getElementById("containerPlataforms");
    for (let pOld of container.children) {
      if (pOld.id === e.target.value) {
        return false;
      }
    }
    let p = document.createElement("p");
    p.className = "genre";
    p.id = e.target.value;
    p.innerText = e.target.value;
    p.addEventListener("click", (e) => {
      let container = document.getElementById("containerPlataforms");
      for (let p of container.children) {
        if (p.id === e.target.id) {
          p.remove();
        }
      }
    });
    container.appendChild(p);
  }

  function handleName(e) {
    let input = document.getElementsByClassName("groupInputValid")[0];
    if (e.target.value.length > 3) {
      if (!input.classList.contains("groupInputValid_checked")) {
        input.classList.remove("groupInputValid_warn");
        input.classList.remove("groupInputValid_error");
        input.classList.add("groupInputValid_checked");
        input.children[3].innerHTML = "The Name is Sucessfully";
      }
    } else {
      if (!input.classList.contains("groupInputValid_warn")) {
        input.classList.remove("groupInputValid_error");
        input.classList.remove("groupInputValid_checked");
        input.classList.add("groupInputValid_warn");
        input.children[3].innerHTML = "this space is required";
      }
    }
  }
  function handleDate(e) {
    let input = document.getElementsByClassName("groupInputValid")[1];
    let date = undefined;
    try {
      date = Date.parse(e.target.value);
    } catch (error) {}
    if (e.target.value.length > 3) {
      if (date) {
        if (!input.classList.contains("groupInputValid_checked")) {
          input.classList.remove("groupInputValid_warn");
          input.classList.remove("groupInputValid_error");
          input.classList.add("groupInputValid_checked");
          input.children[3].innerHTML = "The Date is Correct";
        }
      } else {
        if (!input.classList.contains("groupInputValid_error")) {
          input.classList.remove("groupInputValid_warn");
          input.classList.remove("groupInputValid_checked");
          input.classList.add("groupInputValid_error");
          input.children[3].translate = "no";
          input.children[3].innerHTML = "the format is Month/Day/Year";
        }
      }
    } else {
      if (!input.classList.contains("groupInputValid_warn")) {
        input.classList.remove("groupInputValid_checked");
        input.classList.remove("groupInputValid_error");
        input.classList.add("groupInputValid_warn");
        input.children[3].innerHTML = "this space is required";
      }
    }
  }
  function handleCreate() {
    let name = document.getElementById("nameInput").value;
    let date = document.getElementById("launchInput").value;
    try {
      date = Date.parse(date);
    } catch (error) {}
    let description = document.getElementById("descriptionInput").value;
    let elementGenres = document.getElementById("containerGenres").children;
    let genres = [];
    for (let genre of elementGenres) {
      genres.push(genre.id);
    }
    let elementPLataforms = document.getElementById(
      "containerPlataforms"
    ).children;
    let plataforms = [];
    for (let plataform of elementPLataforms) {
      plataforms.push(plataform.id);
    }

    if (
      name.length > 3 &&
      typeof date === "number" &&
      image !== "" &&
      description.length > 0
    ) {
      genres = genres.join(",");
      plataforms = plataforms.join(",");
      description = encodeURI(description);
      name = encodeURI(name);
      let body = `name=${name}&launch=${date}&description=${description}&image=${image}&genres=${genres}&plataforms=${plataforms}`;

      let headers = new Headers();
      headers.append("Content-Type", " application/x-www-form-urlencoded");
      fetch("http://localhost:3001/videogames", {
        method: "POST",
        headers: headers,
        body: body,
      })
        .then((r) => r.json())
        .then((r) => {
          history.push("/details/R" + r[0].id);
        });
    }
  }
  return (
    <div className="Create">
      <h1>fill al spaces for create a videogame</h1>

      <div className="group">
        <div className="groupInputValid ">
          <input
            type="text"
            placeholder="Name"
            required
            id="nameInput"
            onChange={handleName}
          />
          <label className="name">Name</label>
          <img className="icon" alt="icon" />
          <label className="message">Esto es un mensaje</label>
        </div>
      </div>
      <div className="group">
        <div className="groupInputValid ">
          <input
            type="text"
            placeholder="Launch on"
            required
            id="launchInput"
            onChange={handleDate}
          />
          <label className="name">Launch on</label>
          <img className="icon" alt="icon" />
          <label className="message">Esto es un mensaje</label>
        </div>
      </div>
      <div className="group">
        <div className="groupTextarea">
          <textarea cols="27" rows="5" id="descriptionInput"></textarea>
          <label className="name">Description</label>
        </div>
        <div className="group">
          <p>Add Image for the videogame</p>
          <div className="groupFile">
            <input type="file" name="" id="inputFile" onChange={changeInput} />
          </div>
          <div className="containerImage">
            <img id="ImageFile" alt="" />
          </div>
        </div>
        <div className="group">
          <div id="containerGenres" translate="no"></div>
          <select onChange={changeGenres} translate="no">
            <option value="any" selected disabled>
              Select any genres
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
        <div className="group">
          <div id="containerPlataforms" translate="no"></div>
          <select onChange={changePlataforms} translate="no">
            <option value="any" selected disabled>
              Select any Plataform
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
        <div className="group">
          <button onClick={handleCreate}>Create VideoGame</button>
        </div>
      </div>
    </div>
  );
}
