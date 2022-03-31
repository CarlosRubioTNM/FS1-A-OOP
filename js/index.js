//Object Literal Syntax
//const square  = new Object()
//const square = {}
const square = {
    //Propiedades o atributos
    len: 1,
    position: {
        x: 0,
        y: 0
    },

    //Método
    draw: function() {
        console.log("Dibujando...")
    }
};

//Si se quisiera crear otro cuadrado, se puede duplicar el código.
//Cuando el objeto tiene funciones (métodos), se dice que tiene comportamiento, y no conviene usar el Object Literal Syntax.

//Factory
function createStudent(name_std, semester) {
    return {
        //name_std: name_std
        name_std,
        semester,
        recent_subjects: [],
        greet: function() {
            console.log("Hola", name_std)
        }
    }
}
const student1 = createStudent("Fulano Dex", 6);
student1.greet();

//Constructor Function
function Student(name_std, semester) {
    this.name_std = name_std;
    this.semester = semester;
    this.recent_subjects = [];
    this.greet = function() {
        console.log("Hola", name_std);
    }
}
const student2 = new Student("Perengano Díaz", 8);
/*1.-Se crea un nuevo objeto {}.
2.- Asigna a this a este objeto.
3.- Regresar el objeto creado.*/
student2.greet();

/*new Object() desde {}
  new Number() desde 1,2,3
  new Boolean() desde true, false
  new String() desde ''*/

//Los arreglos y las funciones también son objetos.
const StudentAnother = new Function('name_std, semester', `
this.name_std = name_std;
this.semester = semester;
this.recent_subjects = [];
this.greet = function() {
    console.log("Hola", name_std);
}
`);
const studentAnother = new StudentAnother('Zutano Fox', 1);
studentAnother.greet();
//Otras maneras de generar objetos en lugar del operador new
Student.call({}, 'Macario Ross', 3);
Student.apply({}, ['Macario Ross2', 4]);

/*Los elementos en Javascript se pueden clasificar en 2:
Value Types: Number, String, Boolean, Symbol, undefined, null
Reference Types: Objets, Function, Array
NOTA: Function y Array también son objetos.*/

//Valores y referencias
//Copia por valor
/*let ancho = 10;
let alto = ancho;
ancho = 20;
console.log('ancho', ancho)
console.log('alto',alto)*/

//Copia por referecia
/*let ancho = {valor: 10};
let alto = ancho;
ancho.valor = 20;
console.log('ancho', ancho.valor)
console.log('alto',alto.valor)*/

//Otro ejemplo de paso por valor y referencia
/*let n = 50;
function duplicate_from_value(number) {
    number *= 2;
}
duplicate_from_value(n);
console.log('Por valor', n);

let obj = {value: 50};
let obj2 = {value: 50};
function duplicate_from_reference(object) {
    object.value += object.value;
}
duplicate_from_reference({value: obj.value});//Estoy mandando copia con el valor de obj
duplicate_from_reference(obj);//Estoy mandando la referencia a obj.
console.log('Por referencia',obj.value);
console.log('Por referencia 2',obj2.value);*/


//Añadir atributos y métodos nuevos a un objeto.
const student3 = new Student("Ramiro Hdz", 6);
student3.id = 1;
//delete student3.greet;

const property_name = 'otra-cosa';//Si la propiedad tiene un -, solo puede ser accedida desde corchetes.
student3[property_name] = 'algo';
console.log(student3[property_name]);

//Se pueden iterar los elementos de un objeto
console.log('---------Elementos de student3')
for (key in student3) {
    //console.log(key, student3[key]);
}

console.log('---------Solo las propiedades de student3')
for (key in student3) {
    if (typeof student3[key] !== 'function') {
        //console.log(key, student3[key]);
    }
}

const keys = Object.keys(student3);
console.log(keys);

//Verificar si cierto elemento se encuentra en el objeto
if ('id' in student2) {
    console.log("Student2 tiene id.");
}

//-------------MANEJO DE ACCESO A PROPIEDADES-------------------//
function StudentWithProperties(name_std, semester) {
    this.name_std = name_std;
    this.semester = semester;
    //this.pin = '1234'
    let pin = '1234'
    this.recent_subjects = [];
    this.greet = function() {
        let algo = 1;
        console.log(algo)
        console.log("Hola", name_std);
    }

    this.hash = function() {
        let s = pin.split('');
        let num = s.map(Number)
        const helpSum = (acc,curr) => acc+curr;
        /*const helpSum = function(acc,curr) {
            return acc+curr;
        }*/
        let sum = num.reduce(helpSum, 0)
        return sum;
    }

    this.getPin = function() {
        return pin;
    }

    Object.defineProperty(this, 'pin', {
        get: function() {
            return pin;
        },
        set: function(value) {
            if (!value) {
                throw new Error('Valor no válido.');
            }
            pin = value;
        }
    });
}

const stdproperties = new StudentWithProperties('Bill Ramses', 7);
//console.log('pin', stdproperties.getPin())
console.log('pin', stdproperties.pin)
console.log('hash', stdproperties.hash());
