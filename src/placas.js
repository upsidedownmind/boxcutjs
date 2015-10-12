function log(w) {
    console.log(w);
}

//crea un punto
function punto(x, y) {
    return {
        x: x,
        y: y
    }
}

// crea un rectangulo, largo: x, ancho: y
function crearRectangulo(largo, ancho) {
    
    return {
        largo: largo,
        ancho: ancho
    }; 
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

    // el corte es un rectangulo con relleno
    var rec = crearRectangulo(largo, ancho);

    rec.contenido = contenido;
    rec.superficie = superficie;

    return rec; 
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

    //busca dispo a partir de una posicion,  da un punto o false
    placa.buscarPuntoDisponibleDesde = function( p ) {

        for (var i = p.x; i < largo; i++) {
            for (var j = p.y; j < ancho; j++) {
                if(placa.estaDisponible(i,j)) {
                    return punto(i, j);
                }
            }

        }

        return false;
    };

    placa.existeAreaDisponibleDesde = function(punto, area) {

        for (var i = punto.x; i < (punto.x + area.largo); i++) {
            for (var j = punto.y; j < ( punto.y + area.ancho); j++) {
                if(!placa.estaDisponible(i,j)) {
                    return false;
                }
            }
        }

        return true;
    };

    //aplicar corte
    placa.aplicarCorte = function(corte, punto) {
        
        for (var i = punto.x; i < (punto.x + corte.largo); i++) {
            for (var j = punto.y; j < ( punto.y + corte.ancho); j++) {
                placa.superficie[i][j] = corte.contenido;
            }
        }

        placa.cortes.push(corte);

        return placa;
    };

    return placa;
}

//// esto ve si encaja y da un punto o false
/// aca va todo la logica de donde poner el corte, y como es complejo, queda fuera del objeto placa
function verSiEncaja(corte, placa) {

    //busco a lo ancho
    var disponible = false;
    var y = 0;

    do {

        // inicia en
        var p = placa.buscarPuntoDisponibleDesde( punto(0,y) );
        
        if(p) {
            //tiene que encajar
            if(placa.existeAreaDisponibleDesde(p, corte)) {
                
                disponible = p;
            }
        }

        y++;

    } while(!disponible && y < placa.largo)
    

    

    //TODO: poner logica compleja...
    
    return disponible;

}


////////////////////////////////////
/////////////////////////////////

//el caso mas simple:
var placa = crearPlaca(10, 10);

log(placa)

var cortes = [ crearCorte(4, 4, 1),  crearCorte(5, 5, 2), crearCorte(3, 3, 3)];

/// por cada corte:
cortes.forEach(function(corte){

    log('-----------------')

    log(corte)

    encaja = verSiEncaja(corte, placa);

    log(encaja);

    if(encaja) {
        log( placa.aplicarCorte(corte, encaja))
    }

});
