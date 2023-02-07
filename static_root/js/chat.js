    var msgForm = document.getElementById("msg-form");
    var msgInput = document.getElementById("msg-input");
    var msgSubmit = document.getElementById("msg-submit");
    var msgList = document.getElementById("msgs");
    var msgContainer = document.getElementById("msg-output");
    var typers = document.getElementById("typ");
    var pk = window.location.href.split("/")[5];

    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(msgContainer);

    window.socket.on("typing", function (nameL) {
      if (window.name != nameL) {
        typers.innerText = `${nameL} is typing.....`;
        setTimeout(() => {
          typers.innerHTML = "";
        }, 3000);
      }
    });

    window.socket.on("chat-msg", function(msgpk, msg, author, chatpk) { 
      if (window.location.href.split("/")[5] == chatpk) {
        var item = document.createElement("li");
        if (author == `${window.name}`) {
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
        if (author == `${window.name}`) {
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
            author: window.name,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            pk: window.location.href.split("/")[5],
          },
          success: function (e) {
            if (e.status == 200) {
              msgInput.value = "";
              scrollToBottom(msgContainer);
              window.socket.emit("chat-msg", e.id, msg, window.name, window.location.href.split("/")[5],(response) => {
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
      window.socket.emit("typing", window.name, (response) => {
        if (response.status != "ok") {
          alert("Something went wrong");
        }
      });
    }



