function log(w) {
    console.log(w);
}

//crea un punto
function punto(x, y) {
    return {
        x: x,
        y: y
    };
}

// crea un rectangulo, largo: y, ancho: x
function crearRectangulo(ancho, largo) {
    
    return {
        ancho: ancho,
        largo: largo
    }; 
}

//crear corte, una corte es un rectangulo. , largo: y, ancho: x
function crearCorte(ancho, largo, contenido) {
    
    var superficie = new Array(largo);
 
    for (var y = 0; y < ancho; y++) {
        for (var x = 0; x < largo; x++) {
            if(superficie[x] == undefined) superficie[x] = new Array(ancho);

            superficie[x][y] = contenido;
        }
    }

    // el corte es un rectangulo con relleno
    var rec = crearRectangulo(ancho, largo);

    rec.contenido = contenido;
    rec.superficie = superficie;

    return rec; 
}

//// una placa puede tener varios tamaños (puede ser recorte), pero siempre es rectangular. , largo: y, ancho: x
function crearPlaca( ancho, largo ) {

    var disponible = 0;
    var ocupado = 1;

    //una placa es una forma de recorte:
    var placa = crearCorte(ancho, largo, disponible);
   
    //con algunas cosas mas:
    placa.cortes = [];
    placa.estaDisponible = function(x,y) {
        if(x<0 || x >= ancho) {
            return false;
        }
        if(y<0 || y >= largo) {
            return false;
        }
        
        return placa.superficie[x][y] == disponible;
    };

    //busca dispo a partir de una posicion,  da un punto o false
    placa.buscarPuntoDisponibleDesde = function( p ) {

        for (var i = p.x; i < ancho; i++) {
            for (var j = p.y; j < largo; j++) {
                if(placa.estaDisponible(i,j)) {
                    return punto(i, j);
                }
            }

        }

        return false;
    };

    placa.existeAreaDisponibleDesde = function(punto, area) {

        for (var i = punto.x; i < (punto.x + area.ancho); i++) {
            for (var j = punto.y; j < ( punto.y + area.largo); j++) {
                if(!placa.estaDisponible(i,j)) {
                    return false;
                }
            }
        }

        return true;
    };

    //aplicar corte
    placa.aplicarCorte = function(corte, punto) {
        
        for (var i = punto.x; i < (punto.x + corte.ancho); i++) {
            for (var j = punto.y; j < ( punto.y + corte.largo); j++) {
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
    for (var y = 0; y < placa.largo; y++) {
        // inicia en
        var p = placa.buscarPuntoDisponibleDesde( punto(0,y) );

        //tiene que encajar
        if(p && placa.existeAreaDisponibleDesde(p, corte)) {
                
           return p;
            
        }
    } 
    
    //TODO: poner logica compleja...
    return false;

}


////////////////////////////////////
/////////////////////////////////

//el caso mas simple:
var placa = crearPlaca(8, 10);

log(placa)

var cortes = [ crearCorte(4, 2, 1),  crearCorte(4, 5, 2), crearCorte(3, 3, 3)];

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


log(placa.existeAreaDisponibleDesde(punto(6,6), crearCorte(3, 3, 3)) )
