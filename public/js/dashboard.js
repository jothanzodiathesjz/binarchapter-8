const konten = document.getElementById("konten");
console.log(konten)







function deleteUser(id){
    fetch(`http://localhost:8000/remove/${id}`).then(function (response){
                return  response.json()
            }).then((result)=>{
              console.log(result)
              alert(result.message)
              window.location.reload()
            }).catch(console.error())
}

