function commentReply(parent_id) {
  const row = document.getElementById(parent_id);
  const rowClasses = row.classList;
  if (rowClasses.contains("d-none")) {
    row.classList.remove("d-none");
  } else {
    row.classList.add("d-none");
  }
}

function showNotification() {
  const container = document.getElementById("notification-container");
  if (container.classList.contains("d-none")) {
    container.classList.remove("d-none");
  } else {
    container.classList.add("d-none");
  }
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function removeNotification(removeNotificationURL, redirectURL) {
  const csrftoken = getCookie("csrftoken");
  let xmlhttp = new XMLHttpRequest();
  console.log(xmlhttp.status);

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        window.location.replace(redirectURL);
      } else {
        alert("There was an error");
      }
    }
  };

  xmlhttp.open("GET", removeNotificationURL, true);
  let headers = "X-CSRFToken";
  xmlhttp.setRequestHeader(headers, csrftoken);
  xmlhttp.send();
}
