const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");

      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
      
      const signupForm = document.getElementById("signup-form").addEventListener("submit", function(e) {
        e.preventDefault()
        const signupusername = document.getElementById("signup-username").value
        const signuppassword1 = document.getElementById("signup-password").value
        const signuppassword2 = document.getElementById("signup-password2").value
       if (signuppassword1 && signuppassword2){
          if (passwordValidator(signuppassword1, signuppassword2) === true){
            $.ajax({
          type: "POST",
          url: "/accounts/signup/",
          data: {
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            username: signupusername,
            password1: signuppassword1,
            password2: signuppassword2,
            email: " ",
          },
          success: function (response) {
            console.log(response)
            let redirect_url = response.location;
            window.location.href = redirect_url;
          },
          error: function (response) {
            document.getElementById("errorSignUp").innerText = errorCathcer(response)
          }
        });
        }else{
          document.getElementById("errorSignUp").innerText = r[1]
        }}
      })
        
        
      function errorCathcer(a){
          if (a.responseJSON.form.fields.username.errors[0]){
          return a.responseJSON.form.fields.username.errors[0]
          }else if (a.responseJSON.form.fields.password1.errors[0]){
            return a.responseJSON.form.fields.password1.errors[0]
          }else if (a.responseJSON.form.fields.password2.errors[0]){
            return a.responseJSON.form.fields.password2.errors[0]
          }else if(a.responseJSON.form.fields.email.errors[0]){
            return a.responseJSON.form.fields.email.errors[0]
          }
      }


      function passwordValidator(a, b) {
        if (a === b){
          if (a.length >= 8){
            var matches = a.match(/\d+/g);
            if (matches != null) {
              if (similarity(a, document.getElementById("signup-username").value) <= 0.5){
                if (containsSpecialChars(a)){
                  if (stringHasTheWhiteSpaceOrNot(a) == false){
                    return true
                  }else{
                    r = [false, "password cannot contain whitespaces"]
                    return r
                  }
                }else {
                  r = [false, "password must contain a special character like $, @, etc."]
                  return r
                }
              }else {
                r = [false, "password is too similar to username"]
                return r
              }
            }else {
              r = [false, "password must contain a digit"]
              return r
            }
          }else {
            r = [false, "password must be longer than 8 chars"]
            return r
          }
        }else{
          r = [false, "make sure both passswords match"]
          return r
        }
      }
      const loginForm = document.getElementById("sigin-form").addEventListener("submit", function(e){
        e.preventDefault()
        const loginUsername = document.getElementById("login-username");
        const loginPassword = document.getElementById("login-password");
        if (loginUsername.value && loginPassword.value) {
        $.ajax({
          type: "POST",
          url: "/accounts/login/",
          data: {
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            login: loginUsername.value,
            password: loginPassword.value,
            remember: 'on',
          },
          success: function (response) {
            console.log(response)
            let redirect_url = response.location;
            window.location.href = redirect_url;
          },
          error: function (response) {
            document.getElementById("errorSignIn").innerText = response.responseJSON.form.errors[0]
            console.log(response.responseJSON.form.errors[0])
          }
        });
      }})

      function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
          var lastValue = i;
          for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
             costs[j] = j;
            else {
             if (j > 0) {
               var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
               newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
              }
          }
        }
        if (i > 0)
         costs[s2.length] = lastValue;
         }
        return costs[s2.length];
    }
       
      function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
         longer = s2;
        shorter = s1;
          }
        var longerLength = longer.length;
        if (longerLength == 0) {
          return 1.0;
          }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
      }

      function containsSpecialChars(str) {
         const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
       }

       function stringHasTheWhiteSpaceOrNot(value){
         return value.indexOf(' ') >= 0;
        }