/**
 * Handle the pendu game object.
 */
class PenduGame {

    /**
     * Construct the game.
     */
    constructor(wordAreaHTMLElement) {
        this.start(wordAreaHTMLElement);
        this.drawRules = [
            new Point(0, 250, 250, 250),
            new Point(40, 0, 40, 250),
            new Point(0, 0, 180, 0),
            new Point(180,0, 180, 30),
            new Point(180,60, 30, 30),
            new Point(180,90, 180, 180),
            new Point(180, 180, 150, 220),
            new Point(180, 180, 210, 220),
            new Point(180, 140, 140, 90),
            new Point(180, 140, 220, 90)
        ];
    }


    /**
     * Start the game.
     */
    start(wordAreaHTMLElement) {
        this.wordAreaHTMLElement = wordAreaHTMLElement;
        this.words = this._getData().words;
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.lettersFound = [];
        this.badAttempts = 0;
        this.wordAreaHTMLElement.innerHTML = "";

        for(let i = 0; i < this.currentWord.length; i++) {
            this.wordAreaHTMLElement.innerHTML += "_ ";
        }
    }


    /**
     * Sets the canvas element to draw on.
     * @param canvasElement
     */
    setCanvas(canvasElement) {
        this.canvas = canvasElement;
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.lineWidth = 2;
        this.canvasContext.fillStyle = "#5F9EA0";
        this.canvasContext.strokeStyle = "#333";
    }


    /**
     * Test a provided charachter, return false if sentence greater than 1.
     * @param character
     * @returns {boolean}
     */
    testCharacter(character) {
        if(character.length === 1 && typeof character === "string") {

            if (this.currentWord.indexOf(character) !== -1) {
                this.lettersFound.push(character);
                return true;
            }
        }
        this.badAttempts++;
        this.paintBuddy();
        return false;
    }


    /**
     * Redraw the text on screen.
     */
    redrawWord(wholeLetters = false) {
        this.wordAreaHTMLElement.innerHTML = "";
        for(let i = 0; i < this.currentWord.length; i++) {
            if(!wholeLetters) {
                if (this.lettersFound.includes(this.currentWord[i])) {
                    this.wordAreaHTMLElement.innerHTML += this.currentWord[i] + " ";
                }
                else {
                    this.wordAreaHTMLElement.innerHTML += "_ ";
                }
            }
            else {
                this.wordAreaHTMLElement.innerHTML += this.currentWord[i] + " ";
            }
        }
    }


    /**
     * Paints a buddy porting regarding attempts.
     */
    paintBuddy() {
        let idx = this.badAttempts - 1; // Starting at 0.
        this.canvasContext.beginPath();
        if(idx !== 4) {
            this.canvasContext.moveTo(this.drawRules[idx].x1, this.drawRules[idx].y1);
            this.canvasContext.lineTo(this.drawRules[idx].x2, this.drawRules[idx].y2);
            this.canvasContext.stroke();
        }
        else {
            this.canvasContext.ellipse(this.drawRules[idx].x1, this.drawRules[idx].y1,
                                       this.drawRules[idx].x2, this.drawRules[idx].y2,
                                45 * Math.PI/180, 0, 2 * Math.PI);
            this.canvasContext.fill();
            this.canvasContext.stroke();
        }
    }


    /**
     * Return true if the game is won.
     * @return boolean
     */
    isGameWon() {
        for(let idx in this.currentWord) {
            if(!this.lettersFound.includes(this.currentWord[idx])) {
                return false;
            }
        }
        return true;
    }


    /**
     * Return attempts left to the player.
     * @returns {number}
     */
    getAttemptsLeft() {
        return 10 - this.badAttempts;
    }


    /**
     * Synchronously get the JSON words file.
     * @private
     */
    _getData() {
        let jsonRequest = new XMLHttpRequest();
        jsonRequest.open('GET', "assets/json/words.json", false);
        jsonRequest.send(null);

        if (jsonRequest.status === 200) {
            return JSON.parse(jsonRequest.response);
        }
    }
}


/**
 * Define a move + lineto canvas point.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @constructor
 */
function Point(x1, y1, x2, y2) {
    this.x1 = x1 || 0;
    this.x2 = x2 || 0;
    this.y1 = y1 || 0;
    this.y2 = y2 || 0;
}