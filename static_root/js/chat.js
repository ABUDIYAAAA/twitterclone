const msgForm = document.getElementById("msg-form");
    const msgInput = document.getElementById("msg-input");
    const msgSubmit = document.getElementById("msg-submit");
    const msgList = document.getElementById("msgs");
    const msgContainer = document.getElementById("msg-output");
    const name = "{{user.username}}";
    const typers = document.getElementById("typ");
    const pk = window.location.href.split("/")[5];
    window.socket.emit("join", name);

    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(msgContainer);

    window.socket.on("join", function (nameL) {
      var item = document.createElement("li");
      item.textContent = `${nameL} is online`;
      msgList.appendChild(item);
      scrollToBottom(msgContainer);
    });

    window.socket.on("typing", function (nameL) {
      if (name != nameL) {
        typers.innerText = `${nameL} is typing.....`;
        setTimeout(() => {
          typers.innerHTML = "";
        }, 3000);
      }
    });

    window.socket.on("chat-msg", function(msgpk, msg, author, chatpk) { 
      if (window.location.href.split("/")[5] == chatpk) {
        var item = document.createElement("li");
        if (author == "{{request.user.username}}") {
          item.classList.add("msg", "sent");
          item.textContent = `${author}: ${msg} ✅`;
          item.setAttribute("id", `${msgpk}`)
        } else {
          item.classList.add("msg", "rcvd");
          item.textContent = `${author}: ${msg}`;
          msgRead(msgpk, msg, author);
          item.setAttribute("id", `${msgpk}`)
          
        }
        msgList.appendChild(item);
        scrollToBottom(msgContainer);
      }
    });


    window.socket.on("msg-read", function (msgpk, chatpk, msg, author) {
      
      if (window.location.href.split("/")[5] == chatpk) {
        if (author == "{{request.user.username}}") {
          var msg = (document.getElementById(
            `${msgpk}`
          ).innerHTML = `${author}: ${msg} ☑️`);
          
        }
      }
    });

    msgForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (msgInput.value) {
        let msg = msgInput.value
        $.ajax({
          type: "POST",
          url: "/real-time-chats/create/msg",
          data: {
            msg: msg,
            author: name,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            pk: window.location.href.split("/")[5],
          },
          success: function (e) {
            if (e.status == 200) {
              msgInput.value = "";
              scrollToBottom(msgContainer);
              window.socket.emit("chat-msg", e.id, msg, name, window.location.href.split("/")[5],(response) => {
                if (response.status != "ok") {
                  alert("Something went wrong");
                }else{
                  msgInput.value = "";
                }
              });
            }else {
              alert("Something went wrong")
            }}
          })
        }
        })
      

    function typing() {
      window.socket.emit("typing", name, (response) => {
        if (response.status != "ok") {
          alert("Something went wrong");
        }
      });
    }