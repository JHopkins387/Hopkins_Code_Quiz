var goBackBtnEl = document.querySelector("#go-back-btn");
var clearScoreBtnEl = document.querySelector("#clear-scores-btn");
var textFieldReadOnlyEl = document.querySelector("textArea");
var scoresEntriesEl = document.querySelector(".scores-entries-wrapper");

displayHighScores();

function displayHighScores() {
    var allScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (allScores.length != 0) {
        var rank = 1;

        var sortedByHighest = allScores.sort((a, b) => b.score - a.score);
        for (var i = 0; i < sortedByHighest.length; i++) {
            var scoreEntryEl = document.createElement("textarea");
            scoreEntryEl.readOnly = true;
            scoreEntryEl.setAttribute("class", "score-entry");
            scoreEntryEl.value = `${rank}. ${sortedByHighest[i].initials}: ${sortedByHighest[i].score}`;
            scoresEntriesEl.appendChild(scoreEntryEl);
            if (i == 0) {

                scoresEntriesEl.firstElementChild.setAttribute(
                    "style",
                    "background-color: cyan; text-align:center; color: red; font-size: 16pt"
                );
                scoreEntryEl.value = `${rank}. ${sortedByHighest[i].initials}: ${sortedByHighest[i].score}`;
            }
            rank++;
        }
    } else {
        handleNoScoresStyling();
    }
}

function handleNoScoresStyling() {
    clearScoreBtnEl.setAttribute("class", "hide");
    var headerEl = document.createElement("p");
    headerEl.setAttribute(
        "style",
        "color: white; font-size: 24pt; background: black"
    );
    headerEl.textContent =
        "You are the first one taking the quiz! Good luck on the quiz!";
    scoresEntriesEl.appendChild(headerEl);
}

var clearScoreHandler = function () {
    if (confirm("Do you want to clear the high scores listed here?")) {
        localStorage.removeItem("highScores");
        scoresEntriesEl.innerHTML = "";
        handleNoScoresStyling();
    }
};

clearScoreBtnEl.addEventListener("click", clearScoreHandler)