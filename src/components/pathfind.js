if ((cat.x > x && cat.y < y) || (cat.x < x && cat.y > y)) {
    console.log(`Head ${cat.y < y ? 'north' : 'south'}-${cat.x > x ? 'east' : 'west'}`);
    Dog.takeDoubleStep(face, 'RIGHT');
}

if ((cat.x < x && cat.y < y) || (cat.x > x && cat.y > y)) {
    console.log(`Head ${cat.y > y ? 'south' : 'north'}-${cat.x < x ? 'west' : 'east'}`);
    Dog.takeDoubleStep(face, 'LEFT');
}

if (cat.x > x && cat.y < y) 
    console.log('Head north-east R-L');

if (cat.x < x && cat.y < y) 
    console.log('Head north-west L-R');

if (cat.x > x && cat.y > y) 
    console.log('Head south-east L-R');

if (cat.x < x && cat.y > y) 
    console.log('Head south-west R-L');


// try a right-left movement
Dog.takeDoubleStep(face, 'RIGHT');


// try left-right instead
if (Dog.isStuck) {
    Dog.takeDoubleStep(face, 'LEFT');
}   

takeDoubleStep = (currentFace, firstTurn) => {
  const Dog = this,
      turns = Dog.getTurns(currentFace, firstTurn),
      rightFirst = firstTurn === 'RIGHT';

  Dog.stepRound(rightFirst ? turns.right : turns.left);

  setTimeout(() => {
      Dog.stepRound(rightFirst ? turns.left : turns.right);
  }, 500);
}

stepRound = direction => {
  const { x, y } = this.state,
      goodStep = this.checkMove(x, y, direction);

  this.setState({ ...this.state, face: direction });

  if (goodStep) {
      this.moveForward(goodStep.x, goodStep.y, direction);
      this.isStuck = false;
  }
}

getTurns = (currentFace, firstTurn) => {
  const rights = {
          up: 'right',
          right: 'down',
          down: 'left',
          left: 'up'
      },
      lefts = {
          up: 'left',
          right: 'up',
          down: 'right',
          left: 'down'
      };

  switch (firstTurn) {
      case 'RIGHT': {
          const rightTurn = rights[currentFace],
              leftTurn = lefts[rightTurn];

          return {
              right: rightTurn,
              left: leftTurn
          }
      }
      case 'LEFT': {
          const leftTurn = lefts[currentFace],
              rightTurn = rights[leftTurn];

          return {
              left: leftTurn,
              right: rightTurn
          }
      }
  }                
}