import './style.css'
import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();

/*
Place a wheelbarrow inside a fenced-in area.
Place a mushroom inside the forested area, avoiding existing trees and mushrooms
Place 2-3 signs next to a path
Place a beehive anywhere there isn't already something present.
*/

// ----- GENERATE WHEELBARROW ----- //

// add variables
const x = Int.const('x');
const y = Int.const('y');

// add constraints

// top-left of fence1: (21, 17)
// top-right of fence1: (29, 17)
// bottom-left of fence1: (21, 20)
// bottom-right of fence1: (29, 20)

// top-left of fence2: (34, 2)
// top-right of fence2: (38, 2)
// bottom-left of fence2: (34, 6)
// bottom-right of fence2: (38, 6)

solver.add(Or(And(x.gt(21), x.lt(29), y.gt(17), y.lt(20)), And(x.gt(34), x.lt(38), y.gt(2), y.lt(6))));

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract values
let model = solver.model();
let xVal = model.eval(x);
console.log(`${xVal}`);
let yVal = model.eval(y);
console.log(`${yVal}`);

window.wheelbarrowPosX = `${xVal}`;
window.wheelbarrowPosY = `${yVal}`;

// ----- GENERATE MUSHROOM ----- //

// wooded area: (10, 0), (10, 12), (24, 0), (24, 12)
solver.reset();
console.log(window.mushroomValidities);
solver.add(And(x.gt(10), x.lt(24), y.gt(0), y.lt(12)));

for (let posY = 0; posY <= 12; posY++)
{
  for (let posX = 10; posX <= 24; posX++) // check tiles within wooded area
  {
    if (window.mushroomValidities[posY][posX] == false) // if there's already something there
    {
      solver.add(Or(x.eq(posX), y.eq(posY), And(x.neq(posX), y.neq(posY))));
    }
  }
}

console.log(await solver.check());

// Extract values
model = solver.model();
xVal = model.eval(x);
console.log(`${xVal}`);
yVal = model.eval(y);
console.log(`${yVal}`);

window.mushroomPosX = `${xVal}`;
window.mushroomPosY = `${yVal}`;

document.querySelector('#app').innerHTML = `
  <div>
    <p>Check the console</p>
    <p>I guess I could've just put the results here too...</p>
  </div>
`
game.scene.start("loadScene");