/** 
    Programação funcional:

    Funções puras:
    1 - Dado um parâmetro x, sempre retornará y
    2 - Não geram side-effects (Efeitos Colaterais)
    3 - Devem ser stateless (sem estado)

    *Obs: RECURSÃO é quando você tem uma chamada para um método ou função dela para ela mesma.
    Ex: Um espelho em frente ao outro!
        - A função deve se auto-invocar, no interior dela mesma;
        - É necessário uma verificação para que possamos concluir a recursão. Caso contrário, teremos um loop infinito!

    Funcional X OO
    Programação Funcional:
        - É mais antiga (1957)
        - É mais elegante
        - É mais fácil de manter/testar/debuggar
        - Gasta mais memória :)
        - Multi-core friendly

    Temos também as Higher-Order Functions 
*/

/** Ex: Função Impura, pois ela pode ou não retornar o mesmo resultado: */ 
var diasDesteMes = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var start = new Date(year, month, 1);
    var end = new Date(year, month + 1, 1);
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
}
/** Se invocar em Março */
// console.log(diasDesteMes()); // 31

/** Se invocar em Abril */
// console.log(diasDesteMes()); // 30

/** Transformando ela em Função Pura. Dessa forma, dado os mesmos parâmetros retornará o mesmo resultado */
var diasDesteMes2 = function(year, month) {
    var start = new Date(year, month - 1, 1);
    var end = new Date(year, month, 1);
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
}
/** Se invocar em Março */
// console.log(diasDesteMes(2016, 3)); // 31
// console.log(diasDesteMes(2016, 3)); // 31
// console.log(diasDesteMes(2016, 3)); // 31

/** Se invocar em Abril */
// console.log(diasDesteMes(2016, 4)); // 30
// console.log(diasDesteMes(2016, 4)); // 30

/** Ex: Função Impura, pois o elemento counter está sendo modificado 
 * no estado externo da função e gera side-effects */
var counter = 0;
var increment = function() { 
    counter = counter + 1;
    return counter;
 }
/** Cada vez que for chamada, o resultado será diferente */
// console.log(increment()); // 1
// console.log(increment()); // 2
// console.log(increment()); // 3

/** Transformando ela em Função Pura. Dessa forma, nada externo a função foi modificado */
var counter1 = 0;
var increment1 = function(counter1) { 
    return counter + 1;
}
/** Nada externo a função vai ser modificado */
// console.log(increment1(counter1)); // 1
// console.log(increment1(counter1)); // 1
// console.log(increment1(counter1)); // 1

/** Ex: Função Impura, pois está sendo modificada o estado da variável i.
 * Sempre que temos assign(atribuição) em uma função, ela deixa de ser stateless. */ 
var printSquares = function() { 
    for (var i = 0; i <= 10; i++) {
        console.log(i*i); 
    }
}
// printSquares();

/** Transformando ela em Função Pura. Com a Recursividade */
var printSquares1 = function(n) {
    if (n > 0) {
        /** 1° - Ele decrementa o valor passado cada vez que a função for chamado, 
         * até que não atenda mais a condição. 
         * 2° Ele aloca um espaçona na memória para cada iteração. 
         * 3° Por ultimo executa em ordem a pilha formada na memória por cada iteração
         */
        printSquares1(n - 1); 
        console.log(n * n);
    }
}

// printSquares1(10);

/**
 * Mini-curso de ES6
 * 
 * let - permite que você declare variáveis limitando seu escopo no bloco, 
 * instrução, ou em uma expressão na qual ela é usada. 
 * Isso é inverso da keyword - var, que define uma variável globalmente 
 * ou no escopo inteiro de uma função, independentemente do escopo de bloco.
 * 
 * const - é um variável que não pode ser alterada ou retribuída.
 * 
 * Uma expressão arrow function ( => ) possui uma sintaxe mais curta 
 * e não tem seu próprio this, arguments, super ou new.target.
 * 
 * Em funções de uma linha, podemos omitir as chaves {} , o return 
 * e opcionalmente tirar o ponto e virgila ( ; ).
 */

/** Função de adicionar em ES5 */
// var add = function (x,y) {
//     return x + y;
// }

/** Essa mesma função em ES6 */
// const add = (x,y) => x + y

// console.log(add(2,2));

/** 
 * Higher-Order Functions 
 * São funções que recebem funções como parâmetro.
*/
const add = (x, y) => x + y
const mult = (x, y) => x * y

const calculate = (fn, x, y) => fn(x, y) // Recebe e retorna uma função.

// console.log(calculate(add, 1, 2)) // 3
// console.log(calculate(mult, 1, 2)) // 2

/** 
 * Map
 * Um objeto Map itera seus elementos em ordem de inserção — um loop for...of 
 * retorna um array de [chave, valor] para cada iteração.
 */
/** Transformar esse array */
const students = [
    {name: 'Anna', grade: 6},
    {name: 'John', grade: 4},
    {name: 'Maria', grade: 9}
]

/** Nesse array */
// ['Anna', 'John', 'Maria']

/** Com for: */
const studentsByName = []
for (const student of students)
    studentsByName.push(student.name)

// console.log(studentsByName)
/** Com map: */
// const studentesByName1 = students.map(student => student.name)
// console.log(studentesByName1)

const byName = object => object.name
const studentesByName1 = students.map(byName)
// console.log(studentesByName1)

/**
 * Filter
 * Cria um novo array com todos os elementos que passaram no teste 
 * implementado pela função fornecida.
 */

/** Com for, filtrar o array students, por esse */
// [{name: 'Maria', grade: 9}]
const approvedStudents = []
for (const student of students)
    if (student.grade >= 9) approvedStudents.push(student.name)

// console.log(approvedStudents)

/** Com Filter */
const isApproved = student => student.grade >= 9
const approvedStudents1 = students.filter(isApproved)
// console.log(approvedStudents1)

/** 
 * Reduce
 * Ela “reduz” os itens de um vetor a um valor único. 
 * Por exemplo, podemos utilizá-la para obter uma soma
 */

 /** Com for, somar o array students */
let sum = 0
for (let student of students)
    sum += student.grade
// console.log(sum)

/** Com Reduce */
const sum1 = students.reduce((acc, student) => acc + student.grade, 0)
// console.log(sum1)

/**
 * Compose
 * Faz a composição de funções.
 * 
 * *Obs: Através do REST Operator ( ...fns ), a função compose recebe
 *  quantas funções quisermos utilizar na composição. 
 * 
 * ReduceRight - É idêntica ao reduce, mas itera do último elemento até o primeiro. 
 *  - Ela recebe dois parâmetros. O primeiro é uma função que será chamada N vezes para cada elemento do array.
 *  - O segundo parâmetro é o valor inicial que será levado como valor anterior da redução na primeira vez que sua lógica for invocada.
 *  - Quando passamos value, estamos deixando claro que o valor inicial será o valor passado para a função final retornada por compose
 *     Usamos reduceRight no lugar de reduce porque queremos estar fiéis à função matemática. 
 *     Nela, o resultado da função mais interior é passado para a função mais exterior e assim por diante.
 * 
 * Leitura Adicional: http://cangaceirojavascript.com.br/compondo-funcoes-javascript/
 */

//  const compose = (f,g) => x => f(g(x)) // Dessa forma fica somente 2 funções
/** dessa forma passamos quantas funções forem necessárias */
const compose = (...fns) => value => 
  fns.reduceRight((previousValue, fn) => 
      fn(previousValue), value);

 const toUpperCase = x => x.toUpperCase()
 const exclaim = x => `${x}!!` // entre `crases`

 const scream = compose(exclaim, toUpperCase)
//  console.log(scream("stop")) // STOP!!!

/**
 * Currying
 * Transforma uma função que recebe múltiplos parâmetros de forma que ela pode ser chamada com um parâmetro apenas.
 * 
 * Leitura adicional: http://cangaceirojavascript.com.br/explicando-currying-javascript-busao/
 */

 /** Transformar isso: */
//  add1(1, 2) // 3

 /** Nisso */
//  add1(1)(2) // 3

/** Usabilidade */
const add1 = x => y => x + y

const add1Five = add1(5)
console.log(add1Five) // function (y) {return x + y}

console.log(add1Five(3)) // 8

