
			var words = [
				'monitor',
				'computer',
				'headphones',
				'keyboard',
				'projector',
				'television',
				'speakers',
				'subwoofer',
				'camera',
				'tablet'
			];
			// array of words to choose for the game

			var winCount = 0;
			$('#winCount').html("Wins: " + winCount);
			// win counter

			var lossCount = 0;
			$('#lossCount').html("Losses: " + lossCount);
			// loss counter

			function runGame() {
					var wordPicked = words[Math.floor(Math.random() * 10)];
					// picks a random number from the array between 0 and 9

					var emptyArray = [];
					// creates an empty array that will be filled with underscores

					var guesses = [];
					// creates an empty array that will be filled with letter guesses

					var maxGuesses = 6;
					$('#guessesLeft').html("Remaining Incorrect Guesses: " + maxGuesses);
					// amount of guesses left

					$('#guessedLetters').html("");
					// resets the guessed letters div

					for (var i=0;i<wordPicked.length;i++) {
						emptyArray.push('_');
					}
					$('#wordProgress').html(emptyArray.join(" "));
					// fills the emptyArray with underscores for each character in the word

					document.onkeyup = function(event) {
					
						var input = String.fromCharCode(event.keyCode).toLowerCase();

						var unique = true;
						for (i=0;i<guesses.length;i++) {
							if (input == guesses[i]) {
								unique = false;
								break;
							}
						}
						// checks to make sure input has not been entered already
						if (unique == true) {
							guesses.push(input);
							$('#guessedLetters').append(input);
							// adds the guessed letter to the list of letters

							var guessMatched = false;
							for (i=0;i<wordPicked.length;i++) {
								if (input == wordPicked.charAt(i)) {
									emptyArray[i] = input;
									$('#wordProgress').html(emptyArray.join(" "));
									guessMatched = true;
									var sound = new Audio('assets/sounds/DING.wav');
									sound.play();
								}
							}
							if (guessMatched == false) {
								maxGuesses--;
								$('#guessesLeft').html("Remaining Incorrect Guesses: " + maxGuesses);
								// updates the number of guesses left
							}

						}
						if (maxGuesses == 0 || emptyArray.join("") == wordPicked) {
							if (emptyArray.join("") == wordPicked) {
								winCount++;
								$('#winCount').html("Wins: " + winCount);
								runGame();
								var sound = new Audio('assets/sounds/TADA.wav');
								sound.play();
								$('#previousWord').html("Previous Word: " + wordPicked);
								// user wins if the word has been guessed, game restarts
							}
							else {
								lossCount++;
								$('#lossCount').html("Losses: " + lossCount);
								runGame();
								$('#previousWord').html("Previous Word: " + wordPicked);
								// user loses if the word was not guessed, game starts
							}
						}
						
					}
			}
			runGame();
			// runs the game on page load