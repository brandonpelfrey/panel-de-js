export class PositionSet {
	constructor() {
		this.positions = new Map();
	}

	add(x,y) {
		let ys = this.positions.get(x);
		if(!ys) {
			ys = new Set();
			this.positions.set(x,ys);
		}
		ys.add(y);
	}

	has(x,y) {
		const ys = this.positions.get(x);
		return ys && ys.has(y);
	}

	size() {
		return [...this].length;
	}

	*[Symbol.iterator]() {
		for(const [x,ys] of this.positions) {
			for(const y of ys) {
				yield [x,y];
			}
		}
	}

	byRows() {
	  let inverted = new PositionSet();
	  [...this].forEach(([x,y]) => 
	  	inverted.add(y,x));
	  return inverted.positions; 
	}

	bookOrder() {
		let positions = [...this];
		positions.sort(([x,y],[a,b]) => (y<b || (y == b && x < a)) ? -1 : 1);
		return positions; 
	}

    reversedBookOrder() {
    	return this.bookOrder().reverse();
	}
}