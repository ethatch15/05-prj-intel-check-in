// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");

// Track Attendence
let count = 0;
const maxCount = 50;


// Handle Form Submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const name = nameInput.value.trim();
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;



    console.log(name, teamName);

    // Increment count
    count++;
    console.log("Total check-ins: " + count);

    //Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);

    //Update Team counter
    const teamCounter = document.getElementById(team + "Count");
    console.log(teamCounter);
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    // Show Welcome Message
    const message = `🎉 Welcome, ${name} from ${teamName}!`;
    console.log(message);
    greeting.textContent = message;
    greeting.className = "success-message";
    greeting.style.display = "block";

    form.reset();
});
