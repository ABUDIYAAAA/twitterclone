var msgForm = document.getElementById("msg-form");
var msgInput = document.getElementById("msg-input");
var typers = document.getElementById("typ");
var pk = window.currentPk;

// msg read, div scroll, user online

window.socket.on("typing", function (nameL) {
  if (window.name != nameL) {
    div = document.getElementsByName("e10_11");
    if (div.length > 0) {
      div[0].classList.remove("vanish");
    }

    setTimeout(() => {
      div = document.getElementsByName("e10_11");
      div[0].classList.add("vanish");
    }, 3000);
  }
});

function scrollToBottom() {
  var div = document.getElementById("scrollable-div");
  div.scrollTop = div.scrollHeight;
}

window.socket.on(
  "chat-msg",
  function (msgpk, msg, author, chatpk, img_url, timesince) {
    if (urlParams.get("pk") == chatpk) {
      if (author == `${window.name}`) {
        document.getElementsByClassName("chat-area-main")[0].innerHTML += `
                  <div class="chat-msg owner">
                    <div class="chat-msg-profile">
                      <img class="chat-msg-img" src="${img_url}" alt="" />
                      <div class="chat-msg-date" id="${msgpk}"> ${timesince}</div>
                    </div>
                    <div class="chat-msg-content">
                      <div class="chat-msg-text">${msg}</div>
                    </div>
                </div>
                `;
      } else {
        msgRead(msgpk, msg, author, timesince);
        console.log("Msg read");
        document.getElementsByClassName("chat-area-main")[0].innerHTML += `
                  <div class="chat-msg">
                    <div class="chat-msg-profile">
                      <img class="chat-msg-img" src="${img_url}" alt="" />
                      <div class="chat-msg-date" id="${msgpk}"> ${timesince}</div>
                    </div>
                    <div class="chat-msg-content">
                      <div class="chat-msg-text">${msg}</div>
                    </div>
                </div>
                `;
      }
      var div = document.getElementById("scrollable-div");
      div.scrollTop = div.scrollHeight;
    }
  }
);

window.socket.on("msg-read", function (msgpk, chatpk, msg, author, timesince) {
  if (urlParams.get("pk") == chatpk) {
    if (author == `${window.name}`) {
      var msg = (document.getElementById(
        `${msgpk}`
      ).innerHTML = `Message seen ${timesince}`);
    }
  }
});

msgForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (msgInput.value) {
    let msg = msgInput.value;
    $.ajax({
      type: "POST",
      url: "/real-time-chats/create/msg",
      data: {
        msg: msg,
        author: window.name,
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        pk: urlParams.get("pk"),
        author_img_url: window.request_user_url,
      },
      success: function (e) {
        if (e.status == 200) {
          msgInput.value = "";
          scrollToBottom();
          window.socket.emit(
            "chat-msg",
            e.id,
            msg,
            window.name,
            urlParams.get("pk"),
            window.request_user_url,
            e.timesince,
            (response) => {
              if (response.status != "ok") {
                alert("Something went wrong");
              } else {
                msgInput.value = "";
              }
            }
          );
          console.log("Message sent");
        } else {
          alert("Something went wrong");
        }
      },
    });
  }
});

// function typing() {
//   window.socket.emit("typing", window.name, (response) => {
//     if (response.status != "ok") {
//       alert("Something went wrong");
//     }
//   });
// }

scrollToBottom();
