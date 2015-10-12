function log(w) {
    console.log(w);
}

function graficarCorte(corte) {
    log('----------------')
    log('ancho: ' + corte.ancho + ', largo: '+ corte.largo);
    
    for (var y = 0; y < corte.largo; y++) {
        var linea = ' ';
        for (var x = 0; x < corte.ancho; x++) {
            linea += corte.superficie[x][y] + ' ';
        }
        log(linea)
    }
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
    
    var superficie = [];
 
    for (var x = 0; x < ancho; x++) {
        for (var y = 0; y < largo; y++) {
            if(superficie[x] == undefined) superficie[x] = [];

            superficie[x][y] = contenido;
        }
    }

    // el corte es un rectangulo con relleno
    var rec = crearRectangulo(ancho, largo);

    rec.contenido = contenido;
    rec.superficie = superficie;

    rec.contenidoEn = function(punto) {
        if(punto.x<0 || punto.x >= ancho) {
            return false;
        }
        if(punto.y<0 || punto.y >= largo) {
            return false;
        }

        return superficie[punto.x][punto.y];
    };

    return rec; 
}

//// una placa puede tener varios tamaños (puede ser recorte), pero siempre es rectangular. , largo: y, ancho: x
function crearPlaca( ancho, largo ) {

    var disponible = 0;
    
    //una placa es una forma de recorte:
    var placa = crearCorte(ancho, largo, disponible);
   
    //con algunas cosas mas:
    placa.cortes = [];
    placa.estaDisponible = function( punto ) {
        return placa.contenidoEn(punto) === disponible;
    };

    //busca dispo a partir de una posicion,  da un punto o false
    placa.buscarPuntoDisponibleDesde = function( p ) {

        for (var x = p.x; x < ancho; x++) {
            for (var y = p.y; y < largo; y++) {
                var p1 = punto(x, y);

                if(placa.estaDisponible( p1 )) {
                    return p1;
                }
            }

        }

        return false;
    };

    placa.existeAreaDisponibleDesde = function(p, area) {

        for (var i = p.x; i < (p.x + area.ancho); i++) {
            for (var j = p.y; j < ( p.y + area.largo); j++) {
                if(!placa.estaDisponible( punto(i,j) )) {
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

graficarCorte(placa);

var cortes = [ crearCorte(4, 2, 1),  crearCorte(4, 5, 2), crearCorte(3, 3, 3)];

/// por cada corte:
cortes.forEach(function(corte){

    log('-----------------')

    graficarCorte(corte);

    encaja = verSiEncaja(corte, placa);

    log(encaja);

    if(encaja) {
        graficarCorte( placa.aplicarCorte(corte, encaja))
    }

});
log('============')
var testPunto = punto(6,0)
log(placa.superficie[testPunto.x][testPunto.y])
log(placa.contenidoEn( testPunto ))
log(placa.estaDisponible( testPunto ))
log(placa.buscarPuntoDisponibleDesde(testPunto.x, testPunto.y))
//log(placa.existeAreaDisponibleDesde(punto(0,6), crearCorte(3, 3, 3)) )
