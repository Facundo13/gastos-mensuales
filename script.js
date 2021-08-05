const listGastos = document.querySelector('.list-gastos');
const btnAdd = document.querySelector('.btn-add');
let arrayGastos = [];
let presupuestoTotal = document.getElementById("presupuesto-total");
let presupuestoRestante = document.getElementById("presupuesto-restante");

if (JSON.parse(localStorage.getItem('presupuestoRestante') == null)){
    presupuestoTotal.innerHTML = window.prompt("Por favor, introduce tu presupuesto total");
    presupuestoRestante.innerHTML = presupuestoTotal.innerHTML;
}else{
    presupuestoTotal.innerHTML = JSON.parse(localStorage.getItem('presupuestoTotal'));
}


const guardarDB = () =>{

    localStorage.setItem('gastos', JSON.stringify(arrayGastos));
    localStorage.setItem('presupuestoRestante', JSON.stringify(presupuestoRestanteDB));
    localStorage.setItem('presupuestoTotal', JSON.stringify(presupuestoTotalDB));

    leerDB();
}

const crearGasto = (gasto,cant)=>{

    const item = {
        gasto: gasto,
        cant: cant
    }
    arrayGastos.push(item);
    presupuestoRestanteDB = parseInt(presupuestoRestante.innerHTML) - cant;
    presupuestoTotalDB = parseInt(presupuestoTotal.innerHTML);
    return item;
}

const leerDB = () =>{

    listGastos.innerHTML = '';
    arrayGastos = JSON.parse(localStorage.getItem('gastos'));
    presupuestoRestanteDB = JSON.parse(localStorage.getItem('presupuestoRestante'));
    presupuestoTotalDB = JSON.parse(localStorage.getItem('presupuestoTotal'));

    if (presupuestoRestanteDB != null){
        presupuestoRestante.innerHTML = presupuestoRestanteDB;
    }

    if(arrayGastos === null){
        arrayGastos = [];
    }else{
        arrayGastos.forEach(element => {
            const div = document.createElement('DIV');
            const p = document.createElement('p');
            const h5 = document.createElement('h5');
            const btnDelete = document.createElement('button');
        
            div.classList.add('gasto');
            btnDelete.classList.add('btn-delete');
        
            p.textContent = element.gasto;
            h5.textContent = element.cant;
            btnDelete.textContent = 'Borrar';
        
            div.appendChild(p);
            div.appendChild(h5);
            div.appendChild(btnDelete);
                
            listGastos.appendChild(div);
        });
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    leerDB();
    let presupuestoRestanteDB;

    if (JSON.parse(localStorage.getItem('presupuestoRestante')) == null){
        presupuestoRestanteDB = parseInt(presupuestoTotal.innerHTML);
    }else{
        presupuestoRestanteDB = JSON.parse(localStorage.getItem('presupuestoRestante'));
    }
    let presupuestoTotalDB = parseInt(presupuestoTotal.innerHTML);
    localStorage.setItem('presupuestoRestante', JSON.stringify(presupuestoRestanteDB));
    localStorage.setItem('presupuestoTotal', JSON.stringify(presupuestoTotalDB));
});

btnAdd.addEventListener('click',(e)=>{

    e.preventDefault();
    let gasto = document.getElementById('gasto').value;
    let cant = document.getElementById('cant').value;

    crearGasto(gasto,cant);

    guardarDB();

    document.getElementById('gasto').value = '';
    document.getElementById('cant').value = '';
    
});

listGastos.addEventListener('click', e => {

    e.preventDefault();
    let indexArray;
    let cantIndex;

    if(e.target.innerHTML === 'Borrar'){
        let tuitDelete = e.path[1].childNodes[0].innerHTML;
        arrayGastos.forEach((elemento,index) => {
            if (elemento.gasto === tuitDelete){
                indexArray = index;
                cantIndex = elemento.cant;
            }
        });
    }

    presupuestoRestanteDB = presupuestoRestanteDB + parseInt(cantIndex);
    arrayGastos.splice(indexArray,1);
    guardarDB();

});