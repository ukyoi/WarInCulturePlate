/* This file is for testing code. */

var PLATE_HEIGHT = 16; // 16 is just for testing.
var PLATE_WIDTH = 16;


function showPlate(plate) {
	/* Show plate in the console. */
	var width = PLATE_WIDTH;
	var height = PLATE_HEIGHT;
	var toOut = '\n';
	for (var i=0; i<height; ++i) {
		for (var j=0; j<width; ++j) {
			if (plate.latticeArray[i][j].isEmpty()) {
				toOut += "+ ";
			} else {
				toOut += plate.latticeArray[i][j].bact.teamNum;
				toOut += " ";
			}
		}
	}

	console.log(toOut);
}

function showBactInfo(bact, ifPrintOut, ifOnlyNum) {
	if (bact == undefined) {
		console.log("Bact is undefined.");
		return;
	}
	var toOut = '';
	toOut += 'teamNum:\t' + bact.teamNum + '\n';
	if (ifOnlyNum == true) {
		// Do Nothing.
	} else {
		toOut += 'prolLv:\t' + bact.proliferativeLv + '\n'
		toOut += 'aggrLv:\t' + bact.aggressiveLv + '\n';
		toOut += 'variLv:\t' + bact.variativeLv + '\n';
		toOut += 'longLv:\t' + bact.longevityLv + '\n';
	}
	 if (ifPrintOut == true) {
		 console.log(toOut);
	 } // else:
	 return toOut;
}

function showLatticeInfo(plate, row, col)
{
	var lattice = plate.latticeArray[row][col];
	var toOut = '\n';
	toOut += 'Bact in the lattice ' + '[' + row + ', ' + col + '] :\n';
	if (lattice.bact==undefined) {
		toOut += 'No bact here.\n';
		console.log(toOut);
		return;
	} // else:
	toOut += showBactInfo(lattice.bact, false, false);
	
	toOut += 'lifeRemaining:\t' + lattice.lifeRemaining + '\n';
	
	// TODO: Show competitors:
	toOut += '\n' + 'Competitor(s):\t' + lattice.competitors.length;
	
	console.log(toOut);
}

//function showCompetitors();

// For Testing:
/*
thePlate = new ThePlate();

showPlate(thePlate);

thePlate.addNewPlayer(10,20,30,40, 2, 1);
thePlate.addNewPlayer(20,30,40,10, 10, 5);
thePlate.addNewPlayer(30,40,10,20, 15, 15);
thePlate.addNewPlayer(40,10,20,30, 6, 13);

thePlate.aging();
showPlate(thePlate);
console.log(thePlate.teamList);
console.log(thePlate.teamList);

showBactInfo(thePlate.latticeArray[2][1].bact);
showLatticeInfo(thePlate, 2, 1);
*/

thePlate = new ThePlate();
thePlate.addNewPlayer(10,20,30,40, 2, 1);
bactToTest = thePlate.latticeArray[2][1].bact;
showLatticeInfo(thePlate, 2, 1);
//console.log(thePlate.latticeArray[2][1].lifeRemaining);
bactToTest.variate();
showLatticeInfo(thePlate, 2, 1);