$(document).ready(() => {
    const login = document.querySelector("#login");
    if(login) {
        login.addEventListener("click", (event) => {

            let login = document.querySelector("input[name='pseudo']")
            let password = document.querySelector("input[name='password']")

            event.preventDefault();

            let postData = JSON.stringify({
                login:login.value,
                password:password.value
            })

            $.ajax({
                url: 'https://api-content.labreizhdelespoir.com/api/user/login',
                type: 'POST',
                contentType: 'application/json',
                data: postData,
                success: function(response){
                    let messErr = document.querySelector(".message_erreur").textContent = response
                    window.localStorage.setItem("token",response.token)
                    const form = document.createElement('form');
                    form.method = "POST";
                    form.action = "/login-for-pp/admin-logged";

                            const hiddenField = document.createElement('input');
                            hiddenField.type = 'hidden';
                            hiddenField.name = "token";
                            hiddenField.value = response.token;

                            form.appendChild(hiddenField);

                    document.body.appendChild(form);
                    console.log(form)
                    form.submit()
                },
                error: function(){
                    let messErr = document.querySelector(".message_erreur").textContent = "Erreur"
                }
            }).done();
            /*
                    let formdata = new FormData;

                    formdata.append(login.name, login.value);
                    formdata.append(password.name, password.value);
                    let dataJson={
                        login:login,
                        password:password
                    }
                    let data = "login="+encodeURIComponent(login.value)+"&password="+encodeURIComponent(password.value)
                    console.log(dataJson);


                    let httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = take_response;

                    httpRequest.open("POST", "http://localhost:4000/api/user/login");
                    httpRequest.setRequestHeader("Content-Type", "application/json")
                    httpRequest.send(dataJson);
              */
        })

    }

    /*function take_response() {
        try{
            console.log(this.status)
            console.log(this.responseText)

            if(this.status === 200) {
                console.log("blo")
                console.log(this.responseText)
            }
        } catch (err) {
            alert("Une erreur est survenue")
        }
    }

     */

    const form = document.querySelectorAll("form");
    const jwt = window.localStorage.getItem("token");

    if(form && jwt) {
        form.forEach((element) => {
            let input = document.createElement("INPUT");
            input.setAttribute("type", "hidden");
            input.setAttribute("value", jwt);
            input.setAttribute("name", "token");
            element.appendChild(input);
        })
    }
})