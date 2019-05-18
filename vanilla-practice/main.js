let log = document.getElementById("log");
console.print = (str) => { log.appendChild(document.createTextNode(str)); log.appendChild(document.createElement("br"))}

//flatten array:
// [] -> []
// [[]] -> []
// [1,2,3] -> [1,2,3]
// [1,[2,3]] -> [1,2,3]
// [1,[2,[3]]] -> [1,2,3]

const flatten = (arr) => {
  let stack = [];
  let i_length = arr.length;
  for (let i = 0; i < i_length; i++) {
    let elem = arr.pop();
    if (Array.isArray(elem)) {
      flatten(elem);
      let j_length = elem.length;
      for (let j = 0; j < j_length; j++) {
        stack.push(elem.pop());

      }
    }
    else {
      stack.push(elem);

    }
  }
  let k_length = stack.length;
  for (let k = 0; k < k_length; k++) {
    arr.push(stack.pop());
  }
  return arr;
}



/*
var eventEmitter = new EventEmitter();


function responseToEvent(msg) {
    console.log(msg);
}

eventEmitter.on('pramp', responseToEvent);
eventEmitter.once('pramp', function(msg) { console.log(msg + ' just once!'); });
eventEmitter.emit('pramp', '1st');
eventEmitter.emit('pramp', '2nd');
eventEmitter.off('pramp', responseToEvent);
eventEmitter.emit('pramp', '3rd');
eventEmitter.emit('pramp', '1st');
*/

class Event {
  constructor(func, once) {
      this.func = func;
      this.onlyOnce = once;
  }
  exec(args) {
      this.func.apply({}, args);
  }
  //friend EventEmitter
}

class EventEmitter {
  constructor() {
    this.func_table = {};
    //map from STRING trigger to ARRAY of Events
  }
  on(trigger, func) {
    if (!this.func_table[trigger]) {
      this.func_table[trigger] = [];
    }

    let newEvent = new Event(func, false);
    this.func_table[trigger].push(newEvent);
  }
  once(trigger, func) {
    if (!this.func_table[trigger]) {
      this.func_table[trigger] = [];
    }

    let newEvent = new Event(func, true);
    this.func_table[trigger].push(newEvent);
  }
  emit(trigger) {
    let funcArgs = arguments.slice(1);
    let eventList = this.func_table[trigger];

  }
}

// swap((idx) from, (idx) to, (array) A)
   // switches values at A[from] and A[to]
// [C, D, E, F, G]
// [F, D, E, C, G] swap(0,3,A), swap(0,3,B)
// [D, F, E, C, G] swap(0,1,A), swap(0,1,B)
// [0, 1, 4, 3, 2]

const swap = (from, to, arr) => {
  let temp = arr[to];
  arr[to] = arr[from];
  arr[from] = temp;
}

const sort = (a,b) => {
  readyToMove = false;
  for (let i = 0; i < a.length; readyToMove ? i++ : 0 ) {
    if (i == b[i]) {
      readyToMove = true;
    }
    else {
      readyToMove = false;
      swap(i, b[i], a);
      swap(i, b[i], b);
    }
  }
  return a;
}

console.log(sort(['C', 'D', 'E', 'F', 'G'], [3, 0, 4, 1, 2]))
// [], [] -> A = []
// [1], [0,1] -> A = []
// B has too many elements
// [1,2], [8, 2, 1] -> [1,2]
// B has an index out of bounds of A
// [1,2,3], [1] = A = [2,1,3] OR [3,1,2]
// A has more elements that B does indexes
