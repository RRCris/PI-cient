import "./styles/FormUser.css";

import { useHistory } from "react-router-dom";

export function FormUser() {
  document.title = "Register you";
  let history = useHistory();
  function isEmail(string) {
    let reg = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    );
    return reg.test(string);
  }

  function isName(string) {
    let reg = new RegExp(/^[a-z ,.'-]+$/i);
    return reg.test(string);
  }

  function handleEmail(e) {
    let input = document.getElementsByClassName("groupInputValid")[0];
    if (e.target.value.length > 3) {
      if (isEmail(e.target.value)) {
        if (!input.classList.contains("groupInputValid_checked")) {
          input.classList.remove("groupInputValid_warn");
          input.classList.remove("groupInputValid_error");
          input.classList.add("groupInputValid_checked");
          input.children[3].innerHTML = "The Email is Correct";
        }
      } else {
        if (!input.classList.contains("groupInputValid_error")) {
          input.classList.remove("groupInputValid_warn");
          input.classList.remove("groupInputValid_checked");
          input.classList.add("groupInputValid_error");
          input.children[3].innerHTML = "This isn´t a Email";
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

  function handleName(e) {
    let input = document.getElementsByClassName("groupInputValid")[1];
    if (e.target.value.length > 3) {
      if (isName(e.target.value)) {
        if (!input.classList.contains("groupInputValid_checked")) {
          input.classList.remove("groupInputValid_warn");
          input.classList.remove("groupInputValid_error");
          input.classList.add("groupInputValid_checked");
          input.children[3].innerHTML = "The Name is Sucessfully";
        }
      } else {
        if (!input.classList.contains("groupInputValid_error")) {
          input.classList.remove("groupInputValid_checked");
          input.classList.remove("groupInputValid_warn");
          input.classList.add("groupInputValid_error");
          input.children[3].innerHTML = "This isn´t a Name";
        }
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

  function handleUserName(e) {
    let input = document.getElementsByClassName("groupInputValid")[2];
    if (e.target.value.length > 3) {
      if (!input.classList.contains("groupInputValid_checked")) {
        input.classList.remove("groupInputValid_warn");
        input.classList.remove("groupInputValid_error");
        input.classList.add("groupInputValid_checked");
        input.children[3].innerHTML = "The Username is Good";
      }
    } else {
      if (!input.classList.contains("groupInputValid_warn")) {
        input.classList.remove("groupInputValid_error");
        input.classList.remove("groupInputValid_checked");
        input.classList.add("groupInputValid_warn");
        input.children[3].innerHTML = "The Username is very small";
      }
    }
  }

  function handlePassword(e) {
    let input = document.getElementsByClassName("groupInputValid")[3];
    if (e.target.value.length > 5) {
      if (!input.classList.contains("groupInputValid_checked")) {
        input.classList.remove("groupInputValid_warn");
        input.classList.remove("groupInputValid_error");
        input.classList.add("groupInputValid_checked");
        input.children[3].innerHTML = "The Pasword is Perfect";
      }
    } else {
      if (!input.classList.contains("groupInputValid_warn")) {
        input.classList.remove("groupInputValid_error");
        input.classList.remove("groupInputValid_checked");
        input.classList.add("groupInputValid_warn");
        input.children[3].innerHTML = "The Password is very small";
      }
    }
  }
  function handleRegister(e) {
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let userName = document.getElementById("inputUserName").value;
    let password = document.getElementById("inputPassword").value;

    if (isEmail(email) && email.length > 3) {
      if (isName(name) && name.length > 3) {
        if (userName.length > 3) {
          if (password.length > 5) {
            let body = `email=${email}&name=${name}&username=${userName}&password=${password}`;
            body = encodeURI(body);

            let headers = new Headers();
            headers.append(
              "Content-Type",
              " application/x-www-form-urlencoded"
            );
            fetch("http://localhost:3001/user", {
              method: "POST",
              headers: headers,
              body: body,
            })
              .then((x) => x.json())
              .then((r) => {
                if (r.id) {
                  document.getElementById("inf").innerText =
                    "you has been register in this platform";
                  setTimeout(() => history.push("/home"), 2000);
                }
              });
          }
        }
      }
    }
  }
  return (
    <div className="FormUser">
      <h1>fill in the data to register you</h1>
      <div className="containerInputs">
        <div className="groupInputValid ">
          <input
            type="text"
            placeholder="Email"
            id="inputEmail"
            onChange={handleEmail}
          />
          <label className="name">Email</label>
          <img className="icon" alt="icon" />
          <label className="message" id="messageEmail">
            Esto es un mensaje
          </label>
        </div>

        <div className="groupInputValid ">
          <input
            type="text"
            placeholder="Name"
            required
            id="inputName"
            onChange={handleName}
          />
          <label className="name">Name</label>
          <img className="icon" alt="icon" />
          <label className="message">Esto es un mensaje</label>
        </div>

        <div className="groupInputValid ">
          <input
            type="text"
            placeholder="UserName"
            required
            id="inputUserName"
            onChange={handleUserName}
          />
          <label className="name">UserName</label>
          <img className="icon" alt="icon" />
          <label className="message" id="messageUserName">
            Esto es un mensaje
          </label>
        </div>

        <div className="groupInputValid ">
          <input
            type="text"
            placeholder="Password"
            required
            id="inputPassword"
            onChange={handlePassword}
          />
          <label className="name">Password</label>
          <img className="icon" alt="icon" />
          <label className="message" id="messagePassword">
            Esto es un mensaje
          </label>
        </div>
        <p id="inf">complet all spaces</p>
        <div className="containerButtons">
          <button onClick={handleRegister}>Register you</button>
        </div>
      </div>
    </div>
  );
}
