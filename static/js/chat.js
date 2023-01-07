const socket = io("http://127.0.0.1:3000");
console.log("{{request.user.username}}");

socket.on("join", function (nameL) {
  var item = document.createElement("li");
  item.textContent = `${nameL} is online`;
  msgList.appendChild(item);
});

socket.on("typing", function (nameL) {
  if ("{{request.user.username}}" != nameL) {
    typers.innerText = `${nameL} is typing.....`;
    setTimeout(() => {
      typers.innerHTML = "";
    }, 3000);
  }
});

socket.on("chat-msg", function (msg, pk, author) {
  if (window.location.href.split("/")[5] == pk) {
    var item = document.createElement("li");
    if (author == "{{request.user.username}}") {
      item.classList.add("send");
      item.textContent = `${author}: ${msg} ✅`;
    } else {
      item.classList.add("receive");
      item.textContent = `${author}: ${msg}`;
      item.style.margin_;
      item.setAttribute("style", "margin-right: auto; margin-left: 0;");
    }

    msgList.appendChild(item);
  }
});

socket.on("msg-read", function (msgpk, chatpk, msg, author) {
  if (window.location.href.split("/")[5] == chatpk) {
    if (author !== "{{request.user}}") {
      var msg = (document.getElementById(
        `${msgpk}`
      ).innerHTML = `${author}: ${msg} ☑️`);
      console.log("changed");
    }
  }
});

// msgForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (msgInput.value) {
//     socket.emit(
//       "chat-msg",
//       msgInput.value,
//       "{{request.user.username}}",
//       window.location.href.split("/")[5],
//       (response) => {
//         if (response.status != "ok") {
//           alert("Something went wrong");
//         } else {
//           $.ajax({
//             type: "POST",
//             url: "http://127.0.0.1:8000/real-time-chats/create/msg",
//             data: {
//               msg: msgInput.value,
//               author: name,
//               csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
//               pk: window.location.href.split("/")[5],
//             },
//             success: function (e) {
//               if (e.status == 200) {
//                 msgInput.value = "";
//               } else {
//                 alert("Something went wrong.");
//               }
//             },
//           });
//         }
//       }
//     );
//   }
// });

function typing() {
  socket.emit("typing", name, (response) => {
    if (response.status != "ok") {
      alert("Something went wrong");
    }
  });
}
function msgRead(id, message, author) {
  socket.emit(
    "msg-read",
    id,
    window.location.href.split("/")[5],
    message,
    author,
    (response) => {
      if (response.status !== "ok") {
        alert("something went wrong pls try again later");
      } else {
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:8000/real-time-chats/msg/read",
          data: {
            msg: id,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
          },
          success: function (e) {
            if (e.status !== 200) {
              alert("Something went wrong.");
            }
          },
        });
      }
    }
  );
}
