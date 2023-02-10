if (window.currentPk) {
  var chatLeftDiv = document.getElementById(`${window.currentPk}`);
  chatLeftDiv.classList.add("active");
  chatLeftDiv.setAttribute("id", `${window.currentPk}`);
  var div = document.getElementById(`${window.currentPk}`).children;
  var chatAreaTitle = document.getElementsByClassName("chat-area-title");
  chatAreaTitle[0].innerHTML = `${div[1].firstElementChild.innerHTML}`;
  $.ajax({
    type: "GET",
    url: "/real-time-chats/chat/",
    data: {
      pk: window.currentPk,
      username: window.name,
    },
    success: function (response) {
      if (response.status == 200) {
        for (let index = 0; index < response.msgs.length; index++) {
          var author = response.msgs[index][0];
          var msg = response.msgs[index][1];
          var created_on = response.msgs[index][2];
          var read = response.msgs[index][3];
          var img_url = response.msgs[index][4];
          var pk = response.msgs[index][5];
          if (read) {
            if (author == window.name) {
              document.getElementsByClassName(
                "chat-area-main"
              )[0].innerHTML += `
                  <div class="chat-msg owner">
                    <div class="chat-msg-profile">
                      <img class="chat-msg-img" src="${img_url}" alt="" />
                      <div class="chat-msg-date" id="${pk}">Message seen ${created_on}</div>
                    </div>
                    <div class="chat-msg-content">
                      <div class="chat-msg-text">${msg}</div>
                    </div>
                </div>
                `;
            } else {
              document.getElementsByClassName(
                "chat-area-main"
              )[0].innerHTML += `
                  <div class="chat-msg">
                    <div class="chat-msg-profile">
                      <img class="chat-msg-img" src="${img_url}" alt="" />
                      <div class="chat-msg-date" id="${pk}">Message seen ${created_on}</div>
                    </div>
                    <div class="chat-msg-content">
                      <div class="chat-msg-text">${msg}</div>
                    </div>
                </div>
                `;
            }
          } else {
            if (author == window.name) {
              document.getElementsByClassName(
                "chat-area-main"
              )[0].innerHTML += `
                      <div class="chat-msg owner">
                        <div class="chat-msg-profile">
                          <img class="chat-msg-img" src="${img_url}" alt="" />
                          <div class="chat-msg-date" id="${pk}"> ${created_on}</div>
                        </div>
                        <div class="chat-msg-content">
                          <div class="chat-msg-text">${msg}</div>
                        </div>
                    </div>
                    `;
            } else {
              document.getElementsByClassName(
                "chat-area-main"
              )[0].innerHTML += `
                  <div class="chat-msg">
                    <div class="chat-msg-profile">
                      <img class="chat-msg-img" src="${img_url}" alt="" />
                      <div class="chat-msg-date" id="${pk}"> ${created_on}</div>
                    </div>
                    <div class="chat-msg-content">
                      <div class="chat-msg-text">${msg}</div>
                    </div>
                </div>
                
                `;
              var image = document.getElementById("profile-image");
              image.src = `${img_url}`;

              msgRead(pk, msg, author, created_on);
            }
          }
        }
        document.getElementsByClassName("chat-area-main")[0].innerHTML += `
    <div class="e10_11 vanish" id="typ" name="e10_11">
      <div class="e10_2"></div>
      <div class="e10_6"></div>
      <div class="e10_9"></div>
      <div class="e10_10"></div>
    </div>
  
    `;
        scrollToBottom();
      } else {
        alert("Something went wroong");
        window.location.href == "/social/";
      }
    },
  });
}
function openThread(pk, username) {
  window.location.href =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?pk=${pk}`;
  $.ajax({
    type: "GET",
    url: "/real-time-chats/chat/",
    data: {
      pk: pk,
      username: window.name,
    },
    success: function (response) {
      if (response.status == 200) {
        var chatLeftDiv = document.getElementById(`${pk}`);
        chatLeftDiv.classList.add("active");
        if (window.currentPk) {
          var chatLeftDiv2 = document.getElementById(`${window.currentPk}`);
          chatLeftDiv2.classList.remove("active");
          window.currentPk = pk;
        } else {
          wind0w.currentPk = pk;
        }
      }
    },
    error: function (response) {
      alert("something went wrong", response);
      console.log(response);
    },
  });
}

window.socket.on("user_joined", function (username) {
  div = document.getElementsByName(`${username}`);
  if (div.length > 0) {
    if (div[0].classList.contains("online")) {
    } else {
      div[0].classList.add("online");
    }
  }
});

window.socket.on("user_disconnected", function (username) {
  div = document.getElementsByName(`${username.username}`);
  Offline_user(username.username);
  if (div.length > 0) {
    if (div[0].classList.contains("online")) {
      div[0].classList.remove("online");
    }
  }
});

console.log("Done");
scrollToBottom();
