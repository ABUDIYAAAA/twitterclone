function online(){
    $.ajax({
        type: "POST",
        url: "/social/profile/online/true",
        data: {
          username: window.name,
          csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        },
        success: function (e) {
          if (e.status == 200) {
            window.socket.emit("user_online", window.name,(response) => {
              if (response.status != "ok") {
                alert("Something went wrong");
              }else{
               
              }
            });
          }else {
            alert("Something went wrong")
          }}
        })
    }

    window.socket.on("user_joined", function(username) { 
        
          var item = document.createElement("li");
           item.classList.add("msg", "rcvd");
           item.textContent = `${username} if online`;
            window.msgList.appendChild(item);
            scrollToBottom(window.msgContainer);
        }
      );
    
    window.socket.on("user_disconnected", function(username){
        Offline_user(username)
    })

function Offline_user(username){
    $.ajax({
        type: "POST",
        url: "/social/profile/online/false",
        data: {
          username: username.username,
          csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        },
        success: function (e) {
          if (e.status == 200) {
            var item = document.createElement("li");
             item.classList.add("msg", "rcvd");
            item.textContent = `${username.username} is offline`;
            window.msgList.appendChild(item);
            scrollToBottom(window.msgContainer);
          }else {
            Offline_user(username)
          }}
        })
    }

    
    online()