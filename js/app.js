//ARRELGOS DE PRUEBA (INGRESOS)
const ingresos = [
  new Ingreso("Sueldo", 2100.0),
  new Ingreso("Venta coche", 1500.0),
];
//ARREGLO DE PRUEBA (EGRESOS)
const egresos = [
  new Egreso("Renta departamento", 900.0),
  new Egreso("Ropa", 400.0),
];

//SE EJECUTA AL RECARGAR LA PAGINA
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};
//CALCULA EL TOTAL DE LOS INGRESOS RECORRIENDO EL ARRAY DE INGRESOS
let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};
//CALCULA EL TOTAL DE EGRESOS RECORRIENDO EL ARRAY DE EGRESOS
let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

//CARGA LA PARTE DE PRESUPUESTO ASIGNANDO TODAS LAS FUNCIONES A SUS RESPECTIVOS ID
let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

//ORGANIZA LA MONEDA EN ESTE CASO (EN-US, USD) QUE SIGNIFICA INGLES-ESTADOS UNIDOS, DOLARES Y LAS FRACCIONES MINIMAS SON 2.
//MONEDA COLOMBIANA (es-CO, COP)
const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFranctionDigits: 2,
  });
};
//IGUAL QUE EN LA FUNCION PASADA UN ESTILO PORCENTAJE
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFranctionDigits: 2,
  });
};

//RECORRE EL ARRAY DE INGRESOS Y CARGA LA FUNCION CALLBACK DE crearIngresoHTML
const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

// EN UN TEMPLATE STRING, SE ESCRIBE EL CODIGO HTML Y LAS DIFERENTES FUNCIONES Y MANEJADORES DE EVENTOS
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" 
                    onclick="eliminarIngreso(${ingreso.id})">
                    </ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
  return ingresoHTML;
};

//RETORNA EL INDICE CON EL METODO findIndex( DEFINIMOS UNA VARIABLE, QUE IDENTIFICA QUE EL ID SE EXACTAMENTE EL MISMO),
//CON EL INDICE ELIMINA EL INDICE, Y REFRESCA LOS VALORES.
const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

//PARTE DE EGRESOS, EXACATAMENTE LA MISMA LOGICA QUE LOS NGRESOS

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div  iv class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(
              egreso.valor / totalEgresos()
            )}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso.id})">
                    </ion-icon>
                </button>
            </div>
        </div> 
    </div>
    `;
  return egresosHTML;
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};


//RECUPERAMOS LOS ID, DEL FORMULARIO DEL DOM, Y VALIDAMOS QUE NO SE ENVIE UN CAMPO VACIO Y QUE EL VALOR...
//DEL OPTION SEA INGRESO O EGRESO, CON EL METODO PUSH AGREGAMOS UN OBJETO CON LA DESCRIPCION Y EL VALOR 
//NUEVA MENTE REFRESCAMOS.
let agregarDato = () => {
  let formulario = document.forms["formulario"];
  let tipo = formulario["tipo"];
  let descripcion = formulario["descripcion"];
  let valor = formulario["valor"];
  if (descripcion.value !== "" && valor !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
};
