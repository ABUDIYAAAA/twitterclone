function online() {
  $.ajax({
    type: "POST",
    url: "/social/profile/online/true",
    data: {
      username: window.name,
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: function (e) {
      if (e.status == 200) {
        window.socket.emit("user_online", window.name, (response) => {
          if (response.status != "ok") {
            alert("Something went wrong");
          } else {
          }
        });
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function Offline_user(username) {
  console.log("Offline request");
  $.ajax({
    type: "POST",
    url: "/social/profile/online/false",
    data: {
      username: username,
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: function (e) {
      if (e.status == 200) {
        console.log("offline request processed");
      } else {
        Offline_user(username);
      }
    },
  });
}

online();

window.onbeforeunload = function () {
  Offline_user(window.name);
};
