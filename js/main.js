let playerEntry = document.getElementById("player-entry");
let submit = document.getElementById("submit");
let attempts = document.getElementById("attemptsLeft");

function start() {
    attempts.innerHTML = "";
    message("", "");
    pendu = new PenduGame(document.getElementById("word-area"));
    pendu.setCanvas(document.getElementById("pendu"));
}

// Submit a character proposal.
submit.addEventListener("click", function(event) {
   let result = pendu.testCharacter(playerEntry.value);

   if(result) {
       pendu.redrawWord();
       message("Vous avez trouvé la lettre " + playerEntry.value, "green");
   }
   else {
       message("La lettre '" + playerEntry.value + "' n'est pas comprise dans le mot à trouver", "red");
   }
   playerEntry.value = "";

   if(pendu.isGameWon()) {
       message("Vous avez gagné !", "green");
       setTimeout(start, 1500);
   }

   attempts.innerHTML = pendu.getAttemptsLeft() + " essais restants";

   if(pendu.getAttemptsLeft() === 0) {
       message("Vous avez perdu !", "red");
       pendu.redrawWord(true);
       setTimeout(start, 1500);
   }
});


/**
 * Display a text message to the player.
 * @param text
 * @param bg
 */
function message(text, bg) {
    let box = document.getElementById("messages");
    box.innerHTML = text;
    box.style.backgroundColor = bg;
    box.style.color = "white";
}

start();