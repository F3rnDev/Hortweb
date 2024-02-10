var id;
var email;
var senha;
var nome;
var phone;
var tipo;
var img;

function checkToken(functionToCall, extraData)
{
  var token = localStorage.getItem("token");

  if (token) 
  {
    console.log("Token found, comparing with database");

    fetch("http://localhost:8080/controller/checkUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token}),
    })
      .then((res) => res.json())
      .then((data) => {        
        if(data.user)
        {
            console.log("User found");

            id = data.user[0].id;
            email = data.user[0].email;
            senha = data.user[0].senha;
            nome = data.user[0].nome;
            phone = data.user[0].telefone;
            tipo = data.user[0].tipo;
            img = data.user[0].img;

            if(extraData != undefined)
            { 
              window[functionToCall]('validToken', extraData);
            }
            else
            {
              window[functionToCall]('validToken');
            }
            
        }
        else
        {
            console.log("Invalid token");
            if(extraData != undefined)
            { 
              window[functionToCall]('invalidToken', extraData);
            }
            else
            {
              window[functionToCall]('invalidToken');
            }
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }
  else
  {
    console.log("No token found");
    if(extraData != undefined)
    { 
      window[functionToCall]('noToken', extraData);
    }
    else
    {
      window[functionToCall]('noToken');
    }
  }
}
