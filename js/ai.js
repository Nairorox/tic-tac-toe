class Ai{
	constructor(game, enemy){
		this.game = game;
		this.matrixValues = [];
		this.enemy = enemy;
		this.mark = "AI";
		game.players.push(this);
	}

	initMatrix(){
		for(var i = 0; i < this.game.matrix.length; i++){
			this.matrixValues.push([0, 0, 0]);
		}
	}

	placeMark(domel){
		domel.innerText = this.mark;
	}

	getRandomBest(){
		this.analyzeMove();
		let maxNum = 0;
		let arrOfMax = [];
		for(var i = 0; i < this.game.matrix.length; i++){
			for(var j = 0; j < this.game.matrix.length; j++){
				if(this.matrixValues[i][j] > maxNum){
					maxNum = this.matrixValues[i][j];
					arrOfMax = [];
				}
				if(this.matrixValues[i][j] === maxNum){
					arrOfMax.push(this.game.matrix[i][j]);
				}
			}
		}
		this.placeMark(arrOfMax[Math.floor(Math.random()*arrOfMax.length)]);
	}


	analyze(element){
		let counterX = 0;
		let counterY = 0;
		let counterCross1 = 0;
		let counterCross2 = 0;

		for(var i = 0; i < 3; i++){
			let c2 = 2;
			for(var j = 0; j < 3; j++){
				if(ai.game.matrix[i][j].innerText === element){
					counterX += 1;
				}
				if(ai.game.matrix[j][i].innerText === element){
					counterY += 1;
				}
				if(ai.game.matrix[j][j].innerText === element){
					counterCross1 += 1;
				}
				if(ai.game.matrix[j][c2].innerText === element){
					counterCross2 += 1;
					//console.log(counterCross2)
				}
				c2 -= 1;
			}	//checking which field to prevent lose

			if(counterX === 2){
				for(var k = 0; k < 3; k++){
					if(ai.game.matrix[i][k].innerText === ''){
						return ai.game.matrix[i][k];
					}
				}
			}
			if(counterY === 2){
				for(var k = 0; k < 3; k++){
					if(ai.game.matrix[k][i].innerText === ''){
						return ai.game.matrix[k][i];
					}
				}
			}
			if(counterCross1 == 2){
				for(var k = 0; k < 3; k++){
					if(ai.game.matrix[k][k].innerText === ''){
						return ai.game.matrix[k][k];
					}
				}
			}
			if(counterCross2 == 2){
				c2 = 2;
				for(var k = 0; k < 3; k++){
					if(ai.game.matrix[k][c2].innerText === ''){
						return ai.game.matrix[k][c2];
					}
					c2 -= 1;
				}
			}
			counterX = 0;
			counterY = 0;
			counterCross1 = 0;
			counterCross2 = 0;
		}
	}

	makeAMove(){
		if(this.analyze(this.mark)){
			this.placeMark(this.analyze(this.mark));
		}
		else if(this.analyze(this.enemy.mark)){
			this.placeMark(this.analyze(this.enemy.mark));
		}
		else{
			this.getRandomBest();
		}
	}

	analyzeMove(){
		//searches for player move
		for(var i = 0; i < this.game.matrix.length; i++){
			for(var j = 0; j < this.game.matrix.length; j++){
				if(this.game.matrix[i][j].innerText === this.enemy.mark){
					for(var k=0; k < this.game.matrix.length; k++){
						if(this.game.matrix[i][k].innerText === ''){
							this.matrixValues[i][k] += 1;
						}
						if(this.game.matrix[k][i].innerText === ''){
							this.matrixValues[k][i] += 1;
						}
						if(this.game.matrix[i][j] !== ''){
							this.matrixValues[i][j] = 0;
						}
					//	this.matrixValues[k][k] += 1;
					}
				}
			}
		}
	}
}

let ai = new Ai(game, game.players[0]);
ai.initMatrix();