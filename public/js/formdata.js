
let form = document.querySelector("form[enctype='multipart/form-data']");

if(form) {
    let button_submit = document.querySelector("form[enctype='multipart/form-data'] input[type='submit']")

    button_submit.addEventListener('submit', (event) => {
        event.preventDefault();
        let name = document.querySelector("form[enctype='multipart/form-data'] input[name='name']");
        let alt = document.querySelector("form[enctype='multipart/form-data'] input[name='alt']");
        let file = document.querySelector("form[enctype='multipart/form-data'] input[name='item']");
        let formdata = new FormData;

        formdata.append(name.name, name.value);
        formdata.append(alt.name, alt.value);
        formdata.append(file.name, file.value, file.files.item(0).name)

        this.submit();
    })
}

