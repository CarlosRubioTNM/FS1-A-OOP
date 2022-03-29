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
Student.apply({}, ['Macario Ross2', 4])

/*Los elementos en Javascript se pueden clasificar en 2:
Value Types: Number, String, Boolean, Symbol, undefinded, null
Reference Types: Objets, Function, Array
NOTA: Function y Array también son objetos.*/