var sitios_buenos = ['https://www.google.com/', 'https://www.banorte.com']
var sitios_malos = ['http://banortebxi.com-acceso.mxnet24.com/wps/portal/banorte/']

function displayDanger() {
    const Url = '';
    const Data = {
        url: "http://banortebxi.com-acceso.mxnet24.com/wps/portal/banorte/"
    };
    fetch(Url)
        .then((res) => {
            myFunction(res)
        });
}
function displayWarning() {
    const Url = '';
    const Data = {
        url: "http://34.212.143.74/apps/s201911/tc3048/noticias/"
    };
    fetch(Url)
        .then((res) => {
            myFunction(res)
        });
}
function displayOk() {
    const Url = '';
    const Data = {
        url: "https://www.banorte.com/wps/portal/banorte"
    };
    fetch(Url)
        .then((res) => {
            myFunction(res)
        });
}
function myFunction(tipo) {
    console.log("Entre a la funcion " + tipo)
    let pagina = ""
    let color = ""
    let url = ""
    switch (tipo) {
        case "0":
            pagina = `
      <body>
      <h1 class="text-center" style='color: white'>¡Todo en orden!</h1>
      <br>
    <h2 class="text-center" style='color: white'>
      <b> Puedes navegar sin preocupación alguna :D </b>
    </h2>
      <!-- <button onclick='myFunction("1")'>Try it</button>-->
      </body>`
            color = "bg-success"
            break;
        case "1":
            pagina = `
          <body >
      <h1 class="text-center" style='color: white'>¡Advertencia!</h1>
      <br>
    <h2>
      <div class="text-center" style='color: white'>
        <p><b>Es posible que este sitio no sea de quien dice ser.</b></p>
        <p><b>La página no cuenta con un certificado digital vigente.</b></p>
        <p><b>Contiene enlaces a páginas externas al sitio.</p>
      </div>
    </h2>
      <!--<button onclick='myFunction("2")'>Try it</button>-->
      </body>`
            color = "bg-warning"
            break;
        case "2":
            pagina = `
      <body >
      <h1 class="text-center" style='color: white'>¡Peligro!</h1>
      <br>
      <h2>
      <div class="text-center" style='color: white'>
        <p><b>El origen de la página es extranjero.</b></p>
        <p><b>El certificado digital no es oficial.</b></p>
        <p><b>La página no encripta los datos que recibe.</p>
      </div>
      </h2>
      <!--<button onclick='myFunction("0")'>Try it</button>-->
      </body>`
            color = "bg-danger"
            break;
    }
    document.body.innerHTML = pagina;
    document.body.className = color
}

function escoger() {
    function logTabsForWindows(windowInfoArray) {
        var url = windowInfoArray[0].tabs[0].url;
        //document.querySelector("#beast").innerHTML = url;
        var i;
        var hecho = false;
        for (i = 0; i < sitios_buenos.length; i++) {
            if (url === sitios_buenos[i]) {
                hecho = true;
                myFunction("0");
                break;
            }
        }
        if (!hecho) {
            for (i = 0; i < sitios_malos.length; i++) {
                if (url === sitios_malos[i]) {
                    hecho = true;
                    myFunction("2");
                    break;
                }
            }
        }
        if (!hecho) {
            myFunction('1');
            //document.querySelector("#beast").innerHTML = url;
        }
    }

    function onError(error) {
        return error;
    }

    var getting = browser.windows.getAll({
        populate: true,
        windowTypes: ["normal"]
    });

    getting.then(logTabsForWindows, onError);
}
escoger();