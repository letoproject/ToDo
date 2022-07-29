import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import Api from "./api";

// Bootstrap Modal for JS
var myModal = new Modal(document.getElementById("exampleModal"));

// Rendering todolist
renderTodos();

validation();

// Remove todoitem by close button
document.getElementById("container").addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("remove-todo")) {
    const liEl = el.closest("li");
    const allLi = Array.from(document.querySelectorAll("#container li"));
    const numberToRemove = allLi.indexOf(liEl);
    Api.removeTodo(numberToRemove);
    renderTodos();
  }
});

// Function for todolist rendering
function renderTodos() {
  document.getElementById("container").innerHTML = "";

  const data = Api.getData();

  data.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="input-group mb-3">
      <div class="input-group-text">
        <input
          class="form-check-input mt-0"
          type="checkbox"
          value=""
        />
      </div>
        <input
          type="text"
          class="form-control"
          value="${item.name}"
        />
      <div class="input-group-text">
        <button type="button" class="btn-close remove-todo"></button>
      </div>
    </div>`;
    document.getElementById("container").appendChild(li);
  });
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function validation() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const input = document.getElementById("toDoName");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          Api.addTodo({ name: input.value });
          myModal.hide();
          input.value = "";
          renderTodos();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}

// Add new todoitem by Modal
// document.getElementById("onSaveTodo").addEventListener("click", () => {
//   const input = document.getElementById("toDoName");
//   if (input.value === "") {
//     alert("You must write something!");
//   } else {
//     Api.addTodo({ name: input.value });
//     myModal.hide();
//     input.value = "";
//     renderTodos();
//   }
// });
