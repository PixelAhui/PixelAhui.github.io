function validar() {
        const u = document.getElementById('user').value;
        const p = document.getElementById('pass').value;
        const error = document.getElementById('error-msg');

        // AQUÍ DEFINES TU FLAG O RESPUESTA CORRECTA
        // Basado en lo que investigaron de Don Pepe
        if(u.toLowerCase() === "donpepe_azul" && p === "190223") { 
            alert("¡ACCESO CONCEDIDO! FLAG{HUMINT_MASTER_RECOVERED}");
            window.location.href = "https://pixelahui.com"; 
        } else {
            error.style.display = "block";
        }
    }