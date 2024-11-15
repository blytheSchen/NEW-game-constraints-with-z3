import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();


// ----- GENERATE INSIDE THE FENCE ----- //

// add variables
const x = Int.const('x');
const y = Int.const('y');

// add constraints
solver.add(And(x.gt(5), x.lt(10)));
solver.add(And(y.gt(15), y.lt(25)));

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract values
let model = solver.model();
let xVal = model.eval(x);
console.log(`${xVal}`);
let yVal = model.eval(y);
console.log(`${yVal}`);

// ----- GENERATE ON THE FENCE ----- //
solver.reset();

// add constraints
solver.add(Or(And(x.ge(5), x.le(10), y.eq(15))), (And(y.ge(15), y.le(25), x.eq(5))));

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract values
model = solver.model();
xVal = model.eval(x);
console.log(`${xVal}`);
yVal = model.eval(y);
console.log(`${yVal}`);

// ----- GENERATE OUTSIDE THE FENCE ----- //
solver.reset();

// add constraints
solver.add(And(x.ge(8), y.ge(20)));
solver.add(Or(And(x.ge(5), x.le(10), y.gt(25)), And(y.ge(15), y.le(25), x.gt(10))))

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract values
model = solver.model();
xVal = model.eval(x);
console.log(`${xVal}`);
yVal = model.eval(y);
console.log(`${yVal}`);