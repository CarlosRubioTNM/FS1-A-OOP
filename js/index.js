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
//student1.greet();

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
//student2.greet();

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
//studentAnother.greet();
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
//console.log(student3[property_name]);

//Se pueden iterar los elementos de un objeto
//console.log('---------Elementos de student3')
for (key in student3) {
    //console.log(key, student3[key]);
}

//console.log('---------Solo las propiedades de student3')
for (key in student3) {
    if (typeof student3[key] !== 'function') {
        //console.log(key, student3[key]);
    }
}

const keys = Object.keys(student3);
//console.log(keys);

//Verificar si cierto elemento se encuentra en el objeto
if ('id' in student2) {
    //console.log("Student2 tiene id.");
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
//console.log('pin', stdproperties.pin)
//console.log('hash', stdproperties.hash());

//-----------------PROTOTYPES-----------------------------//
/*const studentObj = {
    name_std : 'William Pérez',
    greet: function() {
        console.log('Hola', this.name_std)
    },
    toString: function() { //Sobreescribir propiedades o métodos se llama shadowing
        return this.name_std
    }
};
studentObj.greet();*/

const personPrototype = {
    name_std : 'William Pérez',
    place_birth: 'Chihuahua',
    greet: function() {
        console.log('Hola', this.name_std, 'de', this.place_birth)
    }
};

function StudentConstructor(name_std) {
    this.grade = 98;
    this.semester = 4;
    //this.pin = '1234'
    let pin = '1234'
    this.recent_subjects = [];
    this.toString = function() { //Sobreescribir propiedades o métodos se llama shadowing
        return this.name_std
    };
}

StudentConstructor.prototype = personPrototype;
StudentConstructor.prototype.constructor = StudentConstructor;

const student4 = new StudentConstructor('No se');
//student4.greet();

//Revisar si un objeto tiene cierta propiedad
//console.log('El objeto tiene grade', Object.hasOwn(student4,'grade'));
//console.log('El objeto tiene greet', Object.hasOwn(student4,'greet'));


//---------------------CLASES SON ES6----------------//
class Person {
    //Atributos
    name_std; //Opcional porque el constructor lo puede asignar
              //Es mejor ponerlo para legibilidad del código
    place_birth;
    constructor(name_std, place_birth) { //Crea objeto vacío, asigna this al objeto, asigna valores y devuelve objeto.
        this.name_std = name_std;
        this.place_birth = place_birth;
    }

    greet() {
        console.log('Hola', this.name_std, 'de', this.place_birth);
    }
}

//const persona1 = new Person('Perengano Rex', 'Chihuahua');
//persona1.greet();

class ClassStudent extends Person {
    grade;
    semester;
    latest_subjects = [];
    #_pin = '1234'; //El # al principio indica una propiedad privada

    constructor(name_std, place_birth, grade, semester) {
        super(name_std,place_birth);//Si hay herencia, se debe llamar al constructor de la clase padre.
        this.grade = grade;
        this.semester = semester;
    }

    get pin() {
        console.log('Desencripando pin...');
        return this.#_pin;
    }

    set pin(pin) {
        if (pin === '') {
            throw new Error('Valor no válido.');
        }
        this.#_pin = pin;
    }

    static all_nighter() {
        console.log('Se está desvelando...');
    }
}

const student5 = new ClassStudent('Bobby Pulido', 'Texas',90,5);

class Teacher extends Person {
    subjects;
    contract;

    constructor(name_std,place_birth,subjects,contract) {
        super(name_std,place_birth);
        this.subjects = subjects;
        this.contract = contract;
    }


    evaluar = function(student) {
        student.grade = Math.random()*100;
    }
}

const teacher = new Teacher('Ramiro Cárdenas', 'Cd Juárez',['Prog. Front End'],false);