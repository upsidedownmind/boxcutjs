function log(w) {
    console.log(w);
}

// corte = numero, y el numero es la cantidad

var placa = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

var cortes = [1,2,3,4,2]

function indexLibre(placa) {
    
    for (var i = 0; i < placa.length; i++) {
		if(placa[i] == 0) {
            return i;
        }
	}  
    
    return -1;

}

function cantidadLibre(placa, index) {
    var acc = 0;
    for (var i = index; i < placa.length; i++) {
        if( placa[i] != 0) {
            break;
        } 
        acc++;
    }

    return acc;
}

function aplicarCorte(corte, placa) {
    
    var index = indexLibre(placa);
    
    if(index == -1) {
        return false;
    }
    
    if( cantidadLibre(placa, index) < corte){
        return false;
    }
    
    for (var i = index; i < (index + corte); i++) {
        placa[i] = corte; 
    }
    
    return true;
}

for (var i = 0; i < cortes.length; i++) {
    var resultado = aplicarCorte(cortes[i], placa)
    log(placa)
    log(resultado)
}
