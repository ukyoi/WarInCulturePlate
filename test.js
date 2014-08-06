/* This file is for testing code. */

var PLATE_HEIGHT = 16; // 16 is just for testing.
var PLATE_WIDTH = 16;


function showPlate(plate) {
	/* Show plate in the console. */
	var width = PLATE_WIDTH;
	var height = PLATE_HEIGHT;
	var toOutput = '';
	for (var i=0; i<height; ++i) {
		for (var j=0; j<width; ++j) {
			if (plate.latticeArray[i][j].isEmpty()) {
				toOutput += "+ ";
			} else {
				toOutput += plate.latticeArray[i][j].bact.teamNum;
				toOutput += " ";
			}
		}
		toOutput += "\n";
	}

	console.log(toOutput);
}

function showBactInfo(bact, onlyShowNum) {
	if (bact == undefined) {
		console.log("Bact is undefined.");
		return;
	}
	var toOut = '';
	toOut += 'teamNum:\t' + bact.teamNum + '\n';
	if (onlyShowNum == true) {
		return;
	} // else: show other info.
	toOut += 'prolLv:\t' + bact.proliferativeLv + '\n'
	toOut += 'aggrLv:\t' + bact.aggressiveLv + '\n';
	toOut += 'variLv:\t' + bact.variativeLv + '\n';
	toOut += 'longLv:\t' + bact.longevityLv + '\n';
	console.log(toOut);
}

function showLatticeInfo(plate, row, col)
{
	var lattice = plate.latticeArray[row][col];
	console.log('Bact in the lattice ' + '[' + row + ', ' + col + '] :\t');
	(lattice.bact==undefined) ? console.log('No bact here.') : showBactInfo(lattice.bact);
	/*
	 * TODO: show competitors.
	console.log('Competitors:\t');
	console.log(lattice.competitor);
	*/
}

thePlate = new ThePlate();

// For Testing:
/*
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
