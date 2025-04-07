document.addEventListener("DOMContentLoaded", function () {
  const catPollForm = document.getElementById("catPoll");
  const pollResults = document.getElementById("pollResults");

  // Initialize vote counts from localStorage or set defaults
  let votes = JSON.parse(localStorage.getItem("catVotes")) || {
    Mona: 4,
    Tenley: 6,
    Maxwell: 7,
  };

  // Update the progress bars based on current votes
  function updatePollResults() {
    const totalVotes = Object.values(votes).reduce(
      (sum, count) => sum + count,
      0
    );

    // Update each progress bar
    for (const [cat, count] of Object.entries(votes)) {
      const percentage =
        totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
      const progressBar = document.querySelector(
        `.progress-bar[data-cat="${cat}"]`
      );

      if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${cat}: ${count} (${percentage}%)`;

        // Set color based on cat
        if (cat === "Mona") {
          progressBar.style.backgroundColor = "magenta";
        } else if (cat === "Tenley") {
          progressBar.style.backgroundColor = "brown";
        } else if (cat === "Maxwell") {
          progressBar.style.backgroundColor = "red";
        }
      }
    }
  }

  // Initialize poll results on page load
  updatePollResults();

  if (catPollForm) {
    catPollForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const userName = document.getElementById("userName").value.trim();
      const favCat = document.querySelector(
        'input[name="favCat"]:checked'
      )?.value;

      if (!userName || !favCat) {
        alert("Please enter your name and select your favorite cat!");
        return;
      }

      // Update vote count
      votes[favCat]++;
      localStorage.setItem("catVotes", JSON.stringify(votes));

      // Update the display
      updatePollResults();

      // Show confirmation message
      const confirmation = document.createElement("div");
      confirmation.className = "alert alert-success mt-3";
      confirmation.innerHTML = `
              <strong>Thanks for voting, ${userName}!</strong> 
              You voted for <strong>${favCat}</strong>.
              Total votes for ${favCat}: ${votes[favCat]}
          `;

      // Remove any existing confirmation
      const oldConfirmation = document.querySelector(".alert");
      if (oldConfirmation) {
        oldConfirmation.remove();
      }

      catPollForm.after(confirmation);

      // Reset form
      catPollForm.reset();
    });
  }
});
