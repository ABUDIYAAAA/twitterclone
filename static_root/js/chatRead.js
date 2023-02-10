function msgRead(msgpk, msg, author, timesince) {
  window.socket.emit(
    "msg-read",
    msgpk,
    window.currentPk,
    msg,
    author,
    timesince,
    (response) => {
      if (response.status !== "ok") {
        alert("something went wrong pls try again later");
      } else {
        $.ajax({
          type: "POST",
          url: "/real-time-chats/msg/read",
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
