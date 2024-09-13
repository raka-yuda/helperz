const generateRandomNumbers = (min, max, exclude = []) => {
	const validNumbers = [];

	for (let i = min; i <= max; i++) {
		if (!exclude.includes(i)) {
			validNumbers.push(i);
		}
	}

	if (validNumbers.length < 2) {
		throw new Error("Not enough valid numbers to generate two distinct values.");
	}

	// Helper function to shuffle an array (Fisher-Yates shuffle)
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const shuffledNumbers = shuffle(validNumbers);
	const randomNumber1 = shuffledNumbers[0];
	const randomNumber2 = shuffledNumbers[1];

	return [randomNumber1, randomNumber2];
}

export {
	generateRandomNumbers
}