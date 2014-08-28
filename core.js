
/* The world shouldn't be too large because of the performance. Maybe 64 is a nice value.*/
var PLATE_HEIGHT = 64;
var PLATE_WIDTH = 64;

var LIFE_FACTOR = 1/5;
var VARIATE_FACTOR = 1/100;
var REPRODUCE_FACTOR = 1/40;


function Bacteria(newTeamNum, newProlLv, newAggrLv, newVariLv, newLongLv) {
	/* Bacteria is a *class* saving the basic characteristics of the individual in a lattice. */

	this.teamNum = newTeamNum;

	this.proliferativeLv = newProlLv;
	this.aggressiveLv = newAggrLv;
	this.variativeLv = newVariLv;
	this.longevityLv = newLongLv;

	this.variate = function() {
		/* "variate" means "tu bian" in Chinese. */
		/* This function is variating algorithm for an individual. Only individuals in competitor lists should variate just after being created (this function is called by ThePlate.reproduce(). */
		function newLevel(level) {
			rand = (Math.random()-0.5)*2; // Generate a random number between [-1, 1). Most mutations are harmful!
			var factor = Math.exp(level*VARIATE_FACTOR*rand);
			return Math.round(level * factor);
		}
		this.proliferativeLv = newLevel(this.proliferativeLv);
		this.aggressiveLv = newLevel(this.aggressiveLv);
		this.longevityLv = newLevel(this.longevityLv);
		this.variativeLv = newLevel(this.variativeLv); // variativeLv should be the last thing to change.
	}

}


function PlateLattice() {
	/* PlateLattice is a *class* representing a single lattice in the whole world. */

	this.bact = null;
	this.lifeRemaining = null;
	this.competitor = [];

	this.planting = function(bact) {
		this.bact = bact;
		//this.lifeRemaining = Math.round(bact.longevityLv/10);
		this.lifeRemaining = Math.round(bact.longevityLv*LIFE_FACTOR);
		return true;
	}

	this.eliminate = function() {
		this.bact = null;
		this.lifeRemaining = null;
	}
	
	this.variate = function() {
		/* This function is useless now. Just in case I'll need it in the future. */
		for (var i in competitor) {
			competitor[i].variate();
		}
	}
	this.aging = function() {
		this.bact.lifeRemaining -= 1;
		if (this.bact.lifeRemaining <= 0) {
			this.eliminate();
		}
	}

	this.isEmpty = function() {
		/* The function's effect should be the same as ThePlate::isEmpty(x, y). */
		if (this.bact == null) {
			return true;
		} else {
			return false;
		}
	}

}



function ThePlate() {

	/* ThePlate is a *class* representing the whole world. The instance of this class should be unique. */

	this.teamList = []; /* teamList is a list contain all number of team groups. */
	this.latticeArray = []; /* latticeArray is an 2D array of all lattices. */

	/* Constructing: */
	for (i=0; i<PLATE_HEIGHT; ++i) {
		this.latticeArray.push([]);
		for (j=0; j<PLATE_WIDTH; ++j) {
			this.latticeArray[i].push( new PlateLattice() );
		}
	}

	this.getWidth = function() { return PLATE_WIDTH; }
	this.getHeight = function() { return PLATE_HEIGHT; }

	this.lattice = function(row, col) {
		if (row>=this.getHeight() || col>=this.getWidth() || row<=0 || col <=0) {
			return undefined;
		} else {
			return this.latticeArray[row][col];
		}
	}

	this.birth = function(ancestorBact, posX, posY) {
		/* This function should only be called by this.addNewPlayer or be called directly by test. */
		var x = -1;
		var y = -1;
		if (posX==undefined || posY==undefined) {
			/* Warning: Please make sure there are *enough* empty positions for birthing. */

			/* Plant randomly. This method should be reconsidered in the future. */
			for (var i=0;i<15;++i) {
				tmpX = Math.floor(Math.random()*PLATE_HEIGHT);
				tmpY = Math.floor(Math.random()*PLATE_WIDTH);
				if (this.latticeArray[tmpX][tmpY].isEmpty()) {
					// Found it!
					x = tmpX;
					y = tmpY;
					break;
				}
			}
			if (x == -1 || y == -1) {
				// Didn't find one place.
				return false;
			}
		} else {
			x = posX;
			y = posY;
		}

		// Birthing:
		if (!this.latticeArray[x][y].isEmpty()) {
			return false;
		}
		// else:
		return this.latticeArray[x][y].planting(ancestorBact);
	}
	
	this.addNewPlayer = function(newProlLv, newAggrLv, newVariLv, newLongLv, rowPos, colPos) {
		if (newProlLv + newAggrLv + newVariLv + newLongLv > 100) {
			return false;
		}
		// else:
		newTeamNum = this.teamList.length+1;
		this.teamList.push(newTeamNum);
		bactToAdd = new Bacteria(newTeamNum, newProlLv, newAggrLv, newVariLv, newLongLv);
		
		return this.birth(bactToAdd, rowPos, colPos);
	}


	this.reproduce = function(row, col) {
		/* Note: "reproduce" means "fan zhi" in Chinese. */
		/* This function is the step of repruduction. */

		var ancestor = latticeArray[row][col].bact;
		// Calculate possibility:
		if (Math.random() >= ancestor.proliferativeLv * REPRODUCE_FACTOR) {
			return; // Unlucky. Do nothing.
		} // else reproduce:
		// Calculate position:
		var delta = function(p0, p0max) {
			var rnd = Math.random();
			var newP;
			newP =  (rnd>=2/3) ? (p0+1) : (rnd>=1/3 ? p0 : p0-1 );
			newP = (newP<0) ? 0 : (newP>p0max ? p0max : newP);
			return newP;
		}
		var newRow = delta(row, this.getHeight());
		var newCol = delta(col, this.getWidth());
		offspring = Bacteria(ancestor.teamNum, ancestor.proliferativeLv, ancestor.aggressiveLv, ancestor.variativeLv, ancestor.longevityLv);
		offspring.variate();
		this.latticeArray[newRow][newCol].competitor.push(offspring);
		return; // Succeed.
	}

	this.nextRound = function() {
		/* nextRound is a combination of all function that must be loaded in a round.
		 */
		//TODO:
		for (var i in latticeArray) {
			for (var j in latticeArray[i]) {
				this.latticeArray[i][j].aging();
				this.reproduce(i, j);
				/* Don't call Bacteria.variate() here. It is called by ThePlate.reproduce(). */
			}
		}
		return;
	}
}


//thePlate = new ThePlate();

/* Code for test (unit test) should be placed at test.js and be invoked from testing.html. */

