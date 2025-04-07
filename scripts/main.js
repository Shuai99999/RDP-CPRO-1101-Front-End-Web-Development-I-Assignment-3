document.addEventListener("DOMContentLoaded", function () {
  const catPollForm = document.getElementById("catPoll");
  const pollResults = document.getElementById("pollResults");

  if (catPollForm) {
    catPollForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const userName = document.getElementById("userName").value;
      const favCat = document.querySelector(
        'input[name="favCat"]:checked'
      ).value;

      // Update poll results (in a real app, this would be saved to a database)
      alert(`Thanks for voting, ${userName}! Your favorite cat is ${favCat}.`);

      // In a real implementation, you would update the results display here
      // based on the new vote count from the server
    });
  }
});
