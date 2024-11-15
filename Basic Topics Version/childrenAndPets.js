import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();

// add variables, var name is person, value is pet
const bob = Int.const('bob');
const mary = Int.const('mary');
const cathy = Int.const('cathy');
const sue = Int.const('sue');
// let's say cat = 0, dog = 1, bird = 2; fish = 3

// add constraints
solver.add(bob.eq(1)); // the boy has a dog
solver.add(sue.eq(2)); // Sue has a pet with 2 legs
solver.add(mary.neq(3)); // Mary does NOT have a fish

solver.add(Distinct(bob, mary, cathy, sue)); // each person has a different pet

solver.add(Or(bob.eq(0), bob.eq(1), bob.eq(2), bob.eq(3)));
solver.add(Or(mary.eq(0), mary.eq(1), mary.eq(2), mary.eq(3)));
solver.add(Or(cathy.eq(0), cathy.eq(1), cathy.eq(2), cathy.eq(3)));
solver.add(Or(sue.eq(0), sue.eq(1), sue.eq(2), sue.eq(3))); // limit potential outcomes to range [0, 3]

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract values
const model = solver.model();
const bobPet = model.eval(bob);
console.log(`${bobPet}`);
const maryPet = model.eval(mary);
console.log(`${maryPet}`);
const cathyPet = model.eval(cathy);
console.log(`${cathyPet}`);
const suePet = model.eval(sue);
console.log(`${suePet}`);

// node childrenAndPets.js