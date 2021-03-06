import './styles.css';
import {Todo,TodoList } from './classes/index.js';  //en automatico busca index.js
import {crearTodoHtml, calcularPendientes } from './js/componentes.js';  

// const todos = [];


// const nuevaTarea = new Todo('lavarme los dientes');
// const nuevaTarea2= new Todo('peinarme');
export const todoList   = new TodoList();


// todoList.nuevoTodo(nuevaTarea);
// todoList.nuevoTodo(nuevaTarea2);
// crearTodoHtml(nuevaTarea);
// console.log(todoList);

// localStorage.setItem('mi-key','my-value')
// sessionStorage.setItem('mi-key','my-value')

// //callback de prueba, en 1,5 s (1500ms) remuevo la ls
// setTimeout( () => { localStorage.removeItem('mi-key') }
// ,1500 )
// si el argumento es igual al condicional, puedo borrar todo y dejar solo la invocación   
// todoList.todos.forEach( todo => crearTodoHtml(todo) );
todoList.todos.forEach( crearTodoHtml);

// todoList.todos[0].imprimirClase ();
// const newTodo = new Todo('Nuevo Todo');
// todoList.nuevoTodo(newTodo);
// newTodo.imprimirClase();
// console.log('todos',todoList.todos)
calcularPendientes(); 
