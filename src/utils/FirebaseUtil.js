import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";  //esto importamos para poder usar el email y el password y esto lo llamamos dentro del export firebaseRegistrarUsuario

import{ collection,getDocs,setDoc, getFirestore, doc,deleteDoc} from "firebase/firestore";





import { v4 as uuidv4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to userr
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



export function firebaseConfig() {
  
  const config = {
    apiKey: "AIzaSyDBbBaaoFtZyGlKDXyeGR4-4tMdYdCNjlg",
  authDomain: "sistema-47cc1.firebaseapp.com",
  projectId: "sistema-47cc1",
  storageBucket: "sistema-47cc1.appspot.com",
  messagingSenderId: "1023712822494",
  appId: "1:1023712822494:web:3e63caa0b82b8d2ca6ae4f",
  measurementId: "G-H26HCND9TH"
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}


//aca la funcion con promesa usamos un then
export function firebaseRegistrarUsuario(email, password) {

//al ser una funcion asincronica devuelve una promesa.
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      // credenciales.user.
    })
}



//en esta funcion usamos async await. Ambas formas funcionan
export async function firebaseIniciarSesion(email, password) {

  
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  } catch (e) {
    return false;
  }
  return true;
}



//para buscar un cliente en el array
export async function firebaseBuscar(coleccionABuscar) {

  let listado= [];

let consulta= collection(getFirestore(),coleccionABuscar);

let resultado = await getDocs(consulta);

//cada elemento que guardamos se le llama documento en firebase ya que usa nosql

resultado.forEach( documento  => {
//documento.id  //id
let info =documento.data(); //informacion como el email
info.id= documento.id;  //le cargamos la id a la informacion
listado.push(info) //metemos la informacion dentro del listado o array.

});

return listado;
}




/*
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach(documento => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

*/
/*
//no olvidarse de poner el export en cada funcion para que lo tome en otro lado
export function firebaseGuardar(coleccion, documento){

  setDoc(documento.id,documento);
}
*/




//documentos seria el objeto.
export  function firebaseCrear(coleccion, documento){
 // try {

documento.id= uuidv4();


//documento.id=UUID.generate();

//documento.id="123jlksdf";


  //ponemos la instancia del objeto doc (que viene de la libreria de setdoc) dentro de una variable
  //fijarse de llamarlo correctamente al doc,porque puede que no lo reconozca como objeto
  //fijarse tambien de poner documento.id, ya que sino no estaria llamando a ninguna id.
 let  docc =  doc(getFirestore(),coleccion,documento.id);

  //se crea aca la referencia

  setDoc(docc,documento);
/*
} catch (e) {
  return false;
}
return true;


*/
}








export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}






