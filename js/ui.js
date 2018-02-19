const infoLabel = document.querySelector('.infoLabel');
const aiSwitch = document.querySelector('.ai-toggle');

document.addEventListener('click', function(){
	if(game.finished){
		if(game.gotWinner){
			infoLabel.innerText = `${game.gotWinner} won`;
		}
		else{
			infoLabel.innerText = 'Draw';
		}
		infoLabel.classList.add('show');
	}
	else{
		infoLabel.classList.remove('show');
	}
});

