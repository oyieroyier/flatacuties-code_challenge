const charactersList = document.querySelector('.characters-list');
const charactersDisplay = document.querySelector('.characters-display');
const form = document.querySelector('form');
const reset = document.querySelector('.reset');

const characterCard = document.createElement('div');
const characterBorderTop = document.createElement('div');
const characterImage = document.createElement('img');
const characterName = document.createElement('p');
const characterVotes = document.createElement('p');

characterCard.className = 'card';
characterBorderTop.className = 'card-border-top';
characterImage.className = 'img';
characterVotes.className = 'votes';

const allCharactersUrl =
	'https://api.npoint.io/801d31d178bfa14b5abb/characters';

let currentCharacter;

document.addEventListener('DOMContentLoaded', fetchAllCharacters);

function fetchAllCharacters() {
	fetch(allCharactersUrl)
		.then((res) => res.json())
		.then(renderCharactersList);
}

function renderCharactersList(characters) {
	characters.map((character) => {
		const characterSpan = document.createElement('span');

		characterSpan.textContent = character.name;

		charactersList.appendChild(characterSpan);

		characterSpan.addEventListener('click', () => {
			currentCharacter = character;
			renderCharacter(currentCharacter);
		});
	});
}

function renderCharacter(character) {
	charactersDisplay.innerHTML = '';

	characterName.textContent = currentCharacter.name;
	characterImage.src = currentCharacter.image;
	characterVotes.textContent = `Votes: ${currentCharacter.votes}`;

	characterCard.appendChild(characterBorderTop);
	characterCard.appendChild(characterImage);
	characterCard.appendChild(characterName);
	characterCard.appendChild(characterVotes);

	charactersDisplay.appendChild(characterCard);
}

form.addEventListener('submit', addVotes);
function addVotes(e) {
	e.preventDefault();

	currentCharacter.votes += parseInt(e.target.children[0].value);

	renderCharacter(currentCharacter);

	e.target.children[0].value = '';
}

reset.addEventListener('click', resetVotes);

function resetVotes() {
	currentCharacter.votes = 0;
	renderCharacter(currentCharacter);
}
