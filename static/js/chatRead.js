function msgRead(msgpk, msg, author) {
    window.socket.emit("msg-read", msgpk, window.location.href.split("/")[5], msg, author,
      (response) => {
        if (response.status !== "ok") {
          alert("something went wrong pls try again later");
        } else {
          $.ajax({
            type: "POST",
            url: "https://abudiyaaaa.pythonanywhere.com/real-time-chats/msg/read",
            data: {
              msg: msgpk,
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