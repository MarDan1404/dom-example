//Inicializamos nuestro arreglo de personas con dos objetos
const personas = [
  {
    nombre: "Juan Perez",
    edad: 18,
    email: "juan.perez@gmail.com",
  },
  {
    nombre: "Maria Loza",
    edad: 21,
    email: "maria.loza@gmail.com",
  },
];

function agregarPersona() {
  //Obtenemos el elemento para mostrar un error del nombre
  const msgErrorNombre = document.querySelector("#msg-error-nombre");
  //borramos el contenido del elemento
  msgErrorNombre.innerHTML = "";

  //Obtenemos el elemento para mostrar un error de la edad
  const msgErrorEdad = document.querySelector("#msg-error-edad");
  //borramos el contenido del elemento
  msgErrorEdad.innerHTML = "";

  //Obtenemos el elemento para mostrar un error del email
  const msgErrorEmail = document.querySelector("#msg-error-email");
  //borramos el contenido del elemento
  msgErrorEmail.innerHTML = "";

  //Obtenemos el input donde se ingresa el nombre
  const inputNombre = document.querySelector("#input-nombre");

  //Obtenemos el input donde se ingresa la edad
  const inputEdad = document.querySelector("#input-edad");

  //Obtenemos el input donde se ingresa el email
  const inputEmail = document.querySelector("#input-email");

  //Creamos una variable que indica si el formulario tiene error
  //Inicialmente suponemos que el formulario NO tiene error
  let hayError = false;

  //Obtenemos el valor del input y le quitamos los espacios del inicio y el final
  const nombre = inputNombre.value.trim();
  //Validamos que si el valor del nombre está vacío
  if (nombre === "") {
    //De ser así, colocamos el mensaje de error al contenido del elemento para mostrar el error
    msgErrorNombre.innerHTML = "Debe ingresar un nombre";
    //Le asignamos el valor true indicando que el formulario tiene error
    hayError = true;
  }

  //Obtenemos el valor del input y obtenemos el valor convertido a un valor numérico
  let edad = inputEdad.valueAsNumber;
  //Validamos si el valor ingresado NO corresponde a un valor numérico
  if (isNaN(edad)) {
    //De ser así, colocamos el mensaje de error al contenido del elemento para mostrar el error
    msgErrorEdad.innerHTML = "Debe ingresar una edad";
    //Le asignamos el valor true indicando que el formulario tiene error
    hayError = true;
  } else if (!Number.isInteger(edad) || edad < 0) {
    //Verificamos si la edad es un valor entero o menor que cero
    //De ser así, colocamos el mensaje de error al contenido del elemento para mostrar el error
    msgErrorEdad.innerHTML = "Debe ingresar una edad válida";
    //Le asignamos el valor true indicando que el formulario tiene error
    hayError = true;
  }

  //Obtenemos el valor del input de email y quitamos espacios del inicio y el final
  const email = inputEmail.value.trim();
  
  //Validamos si el email está vacío
  if (email === "") {
    msgErrorEmail.innerHTML = "Debe ingresar un correo";
    hayError = true;
  } else if (!esEmailValido(email)) {
    // Validamos si el email no es válido
    msgErrorEmail.innerHTML = "Debe ingresar un correo válido";
    hayError = true;
  }

  //Si el formulario tiene algún error (valores inválidos)
  if (hayError) {
    //Es lo mismo que escribir hayError === true
    //Salimos del método porque no hay nada más que hacer
    return;
  }

  //Si llegamos aquí significa que todos los valores ingresados son válidos

  //Creamos un nuevo objeto con los valores ingresados
  const nuevaPersona = {
    nombre: nombre,
    edad: edad,
    email: email,
  };

  //Ingresamos el nuevo objeto persona dentro del arreglo
  personas.push(nuevaPersona);
  //Limpiamos los inputs
  inputNombre.value = "";
  inputEdad.value = "";
  inputEmail.value = "";

  //Actualizamos la tabla de personas para reflejar los cambios en el arreglo
  actualizarLista();
}

//Esta función recibirá el índice del arreglo donde se encuentra la persona a eliminar
function eliminar(i) {
  //Lanzamos un cuadro de confirmación para confirmar la eliminación
  //La variable respuesta guardará si el usuario seleccionó SI o NO (SI=true, NO=false)
  const respuesta = confirm("¿Está seguro que desea eliminar la persona?");
  if (respuesta === false) {
    //Si la respuesta es no, no hay nada que hacer.
    return;
  }

  //Si la respuesta es SI, eliminamos la persona que se encuentra en el índice del arreglo
  //que se pasó por parámetro a la función
  personas.splice(i, 1);
  //Actualizamos la tabla de personas para reflejar los cambios en el arreglo
  actualizarLista();
}

function actualizarLista() {
  //Obtenemos el elemento <tbody> donde se listarán las personas
  const listaNombresHtml = document.getElementById("lista-nombres");
  //Si el arreglo está vacío
  if (personas.length === 0) {
    //El contenido de la tabla será un mensaje que indique que no hay personas registradas
    listaNombresHtml.innerHTML = `
            <tr>
                <td colspan="4">No hay personas registradas</td>
            </tr>`;
    return;
  }

  //En caso que el arreglo tenga elementos, crearemos una variable que almacenará
  //el contenido de las filas donde cada fila mostrará una persona
  let html = "";
  //Este es una estructura foreach la cual permite iterar una colección de elementos.
  //En este caso vamos a iterar el arreglo de personas, para lo cual por cada iteración
  //la variable i almacenará el índice del arreglo
  for (let i in personas) {
    //Obtenemos el objeto que se encuentra en la posición del arreglo que actualmente se está iterando
    const persona = personas[i];

    //Vamos a concatenar una fila por cada persona del arreglo.
    //La fila contiene cuatro celdas,
    //La primera contiene un botón el cual llama a la función eliminar
    //pasándole como parámetro la posición del arreglo que actualmente se está iterando.
    //La segunda celda contiene el nombre de la persona que actualmente se está iterando
    //La tercera celda contiene la edad de la persona que actualmente se está iterando
    //La cuarta celda contiene el email de la persona
    html +=
      `<tr><td><input class="btn-delete" type="button" onclick="eliminar(${i})" value="Eliminar"></td>` +
      "<td>" +
      persona.nombre +
      "</td><td>" +
      persona.edad +
      "</td><td>" +
      persona.email +
      "</td></tr>";
  }

  //Al final se colocará el html que se generó dentro del contenido del <tbody>
  listaNombresHtml.innerHTML = html;
}

//Función para validar el email
function esEmailValido(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

