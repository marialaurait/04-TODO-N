

//Referencias en HTML con la clase del div

import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

//divTodoList = puntero al inicio del <ul> que se asocia a class=todo-list
const divTodoList = document.querySelector('.todo-list');

//btnClearCompleted = puntero al button "Borrar Completados"
const btnClearCompleted = document.querySelector('.clear-completed');

//txtinput = puntero al area donde escriben la tarea (class=new-todo)
const txtInput = document.querySelector('.new-todo');

//manejo del footer
const ulFilters = document.querySelector('.filters'); 

//manejo de las propiedades de los botones en footer
const anchorFilters = document.querySelectorAll('.filtro');

//manejo de total de tareas pendientes
const numPendientes = document.querySelector('.todo-count');

//metodo que crea un <li> en HTML asociado al puntero anterior
export const crearTodoHtml = (todo) => {

   // htmlTodo= literal de HTML para agregar  
   const htmlTodo = 
   ` <li class="${(todo.completado) ?'completed' :''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado) ?'checked' :'' }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // div= elemento nuevo de tipo HTML div cargado con el literal <li>
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //cuelgo el firstElementChild porque así inserta el primer elemento del 'div' (despues de ul, debe venir li, no div)
    divTodoList.append(div.firstElementChild); 
    return div.firstElementChild;
}

//Funciones sobre LS
export const calcularPendientes = () => {
    let cantPendientes = 0;
    for (const elemento of divTodoList.children) {
     if (!elemento.classList.contains ('completed')) {cantPendientes++}}
    numPendientes.innerHTML = `${cantPendientes} Pendientes`;
}
//EVENTOS



// evento en que keyup(suelta la tecla) y cargo una nueva tarea
txtInput.addEventListener('keyup', (event) => {
    console.log('entro txtInput keyup');

    //console.log('evento', event);
    if (event.keyCode === 13 && txtInput.value.length > 0)
       {   
           //console.log('valore ingresado',txtInput.value);
           const nuevaTarea = new Todo(txtInput.value);
           todoList.nuevoTodo(nuevaTarea);
           // todoList.nuevoTodo(nuevaTarea2);
           crearTodoHtml(nuevaTarea);
        //    console.log(todoList);
           txtInput.value = '';
        }
    calcularPendientes();    
    anchorFilters.forEach (elem => elem.classList.remove ('selected'));
});

// evento en que check un class toggle del  y cargo una nueva tarea
divTodoList.addEventListener('click', (event) => {
    console.log('entro divTodoList click');

    //dentro del div class=todo-list, dependiendo de donde clicke, me sale:
    //  con (console.log('click', event.target); )
    // event.target = input class=toggle type=checkbox  (boton de marcar)
    // event.target = input class=destroy , button  (boton de eliminar)
    // event.target = label "lavar"    (leyenca)

    //  con (console.log('click', event.target.localName); me sale: input/button/label
    // console.log('click', event.target.localName);
    const nombreElemento = event.target.localName; // input,button,label

    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')
    // console.log(todoId);
    if (nombreElemento === 'input') {
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')
    }
    else if (nombreElemento === 'label') {
        // console.log ('label')
    }
    else if (nombreElemento === 'button') {
        todoList.eliminarTodo(todoId)
        divTodoList.removeChild(todoElemento)
    };
    calcularPendientes();    
    anchorFilters.forEach (elem => elem.classList.remove ('selected'));

    });

// evento para borrar todos los completados    
btnClearCompleted.addEventListener('click', (event) => {
    console.log('entro btnClearCompleted click');

    // const nombreElemento = event.target.localName; // input,button,label

    // const todoElemento = event.target.parentElement.parentElement;
    // const todoId = todoElemento.getAttribute('data-id')
    todoList.eliminarCompletados()
    //empiezo a borrar html desde abajo hacia arriba
    for ( let i=divTodoList.children.length-1; i>=0; i--) {
        const elemento= divTodoList.children[i];
        if (elemento.classList.contains ('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
    calcularPendientes();    
    anchorFilters.forEach (elem => elem.classList.remove ('selected'));
    });

    
// evento para borrar todos los completados    
ulFilters.addEventListener('click', (event) => {
    console.log('entro ulFilters click');
    const eventTText = event.target.text;
    if (!eventTText) { return}; // undefined y null
   
    anchorFilters.forEach (elem => elem.classList.remove ('selected'));
    event.target.classList.add ('selected');
  
    
    for (const elemento of divTodoList.children) {
        // console.log(elemento);
        elemento.classList.remove('hidden');

        if ( (!elemento.classList.contains ('completed') && eventTText === 'Completados') 
           ||( elemento.classList.contains ('completed') && eventTText === 'Pendientes'))
        {
            elemento.classList.add('hidden');
        }   

     }
     calcularPendientes();   
})