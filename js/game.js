const main = document.querySelector('main');
class gameField{
	constructor(parent, parentDOM){
		this.parentDOM = parent;

		let gameFieldEl = document.createElement('div');
			gameFieldEl.classList.add('gameField');
			gameFieldEl.width = parentDOM.offsetWidth/3;
			gameFieldEl.height = parentDOM.offsetHeight/3;
			gameFieldEl.style.border = 'solid';
			this.domEl = gameFieldEl
			gameFieldEl.dataset.parent = parent.domEl.tagName.toLowerCase();
			gameFieldEl.dataset.index = parent.fields.length;
			parentDOM.appendChild(gameFieldEl);
			gameFieldEl.addEventListener('click', function(e){
				parent.clickHandler(e, this);
			});

		parent.fields.push(this)
	}
}

class Player{
	constructor(game, mark){
		this.mark = mark;
		game.players.push(this);
	}
}

class Game{
	constructor(domEl){
		this.fields = [];
		this.players = [];
		this.finished = false;
		this.gotWinner = false;
		this.domEl = domEl;
		this.currentPlayer = null;
		this.tour = 0;
		/*AI MODE */
		this.ai = true;
	}

	clearFields(){
		while(this.fields.length > 0){
			this.fields[this.fields.length-1].domEl.remove();
			this.fields.pop();
		}
	}

	createFields(){
		for(var i=0; i < 9; i++){
			new gameField(this, this.domEl);
		}
		this.currentPlayer = this.players[0];
		game.setMatrix(9);
		this.finished = false;
	}

	getNextPlayer(){
		this.currentPlayer = this.players[this.players.indexOf(this.currentPlayer) + 1] || this.players[0]
	}

	searchForWinners(){
		let crossWinner1 = true;
		let crossWinner2 = true;
		for(var i = 0; i < this.matrix.length; i++){
			let rowWinner = true;
			let tableWinner = true;
			for(var j = 0; j < this.matrix.length; j++){
				if(this.matrix[i][j].innerText !== this.currentPlayer.mark){
					rowWinner = false;
				}
				if(this.matrix[j][i].innerText !== this.currentPlayer.mark){
					tableWinner = false;
				}
				if(this.matrix[j][j].innerText !== this.currentPlayer.mark){
					crossWinner1 = false;
				}
			}

			//opposite side of crosswinner
			let l = this.matrix.length - 1;
			for(var k = 0; k < this.matrix.length; k++){
				if(this.matrix[k][l].innerText !== this.currentPlayer.mark){
					crossWinner2 = false;
				}
				l -= 1;
			}
			//winning
			if(rowWinner || tableWinner || crossWinner1 || crossWinner2){
				game.finished = true;
				this.gotWinner = this.currentPlayer.mark;
				return;
			}
		}//draw
		if(this.tour === 9){
			this.finished = true;
		}
	}

	restartGame(){
		console.log('Restarted the game');
		this.clearFields();
		this.createFields();
		this.tour = 0;
		this.currentPlayer = this.players[0];
		console.log(this.currentPlayer);
		this.gotWinner = false;
	}

	setMatrix(quanity = 9){
		this.matrix = [];
		let x = Math.sqrt(quanity);
		let counter = 0;
		for(var i = 0; i < x; i++){
			let row = [];
			for(var j = 0; j < x; j++){
				row.push(this.fields[counter].domEl);
				counter += 1;
			}
			this.matrix.push(row);
		}
	}

	clickHandler(e, dom){
		if(this.finished){
			this.restartGame();
		}
		else if(dom.innerText === '' && !this.finished){
			dom.innerText = this.currentPlayer.mark;
			this.tour += 1;
			this.searchForWinners();
			this.getNextPlayer();
			if(this.ai && !this.finished){
				ai.makeAMove();
				this.searchForWinners();
				this.tour += 1;
				this.getNextPlayer();
			}
		}
	}
}

game = new Game(main);

new Player(game, 'X');
//new Player(game, 'O');

game.createFields();
