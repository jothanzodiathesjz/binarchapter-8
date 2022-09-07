function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === '' || password===''){
        alert("anda belum menginput form")
    }else{
        fetch(
            '/login',
            {
                method: 'post',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({ username: username, password: password})
            }
        ).then(function (response){
            return  response.json()
        }).then(function (result){
            setCookie('user',JSON.stringify(result.result),1)
            alert(result.message)
            setInterval(() => {
                window.location.reload();
            }, 300);
        }).catch(function (error){
            console.log(error)
        })
    }
}




function setCookie(name,value,days) {
var expires = "";
if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
}
document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}
function eraseCookie(name) {   
document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
