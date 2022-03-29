//Object Literal Syntax
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
const student1 = createStudent("Fulano Dex", 6)
student1.greet();