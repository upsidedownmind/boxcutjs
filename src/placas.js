function log(w) {
    console.log(w);
}

//crear corte, una corte es un rectangulo.
function crearCorte(largo, ancho, contenido) {
    
    var superficie = new Array(largo);
 
    for (var i = 0; i < largo; i++) {
        for (var j = 0; j < ancho; j++) {
            if(superficie[i] == undefined) superficie[i] = new Array(ancho);

            superficie[i][j] = contenido;
        }
    }

   
    return {
        largo: largo,
        ancho: ancho,
        contenido: contenido,
        superficie: superficie
    }; 
}

//// una placa puede tener varios tamaños (puede ser recorte), pero siempre es rectangular
function crearPlaca(largo, ancho) {

    var disponible = 0;
    var ocupado = 1;

    //una placa es una forma de recorte:
    var placa = crearCorte(largo, ancho, disponible);
   
    //con algunas cosas mas:
    placa.cortes = [];
    placa.estaDisponible = function(x,y) {
        if(x<0 || x >= largo) {
            return false;
        }
        if(y<0 || y >= ancho) {
            return false;
        }
        
        return placa.superficie[x][y] == disponible;
    };

    //busca dispo a partir de una posicion,  da {x:x, y:y} o false
    placa.buscarAreaDisponibleDesde = function(x,y) {

        for (var i = x; i < largo; i++) {
            for (var j = y; j < ancho; j++) {
                if(placa.estaDisponible(i,j)) {
                    return {x: i, y: j};
                }
            }

        }

        return false;
    };

    //aplicar corte
    placa.aplicarCorte = function(corte, x, y) {
        
        for (var i = x; i < (x + corte.largo); i++) {
            for (var j = y; j < ( y + corte.ancho); j++) {
                placa.superficie[i][j] = corte.contenido;
            }
        }

        placa.cortes.push(corte);

        return placa;
    };

    return placa;
}

//// esto ve si encaja y da {x:x, y:y} o false
/// aca va todo la logica de donde poner el corte, y como es complejo, queda fuera del objeto placa
function verSiEncaja(corte, placa) {

    var dispo = placa.buscarAreaDisponibleDesde(0,0);
    
    if(!dispo) return false;

    
    return dispo;

}

//el caso mas simple:
var placa = crearPlaca(10, 10);
var corte = crearCorte(4, 4, 1);

log(placa)
log(corte)

var encaja = verSiEncaja(corte, placa);

log(encaja);

if(encaja) {
    log( placa.aplicarCorte(corte, encaja.x, encaja.y))
}
