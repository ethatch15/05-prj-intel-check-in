// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

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
    attendeeCount.textContent = count;

    //Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);
    progressBar.style.width = percentage;

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

    // Celebrate when the attendance goal is reached
    if (count === maxCount) {
        celebrateGoal();
    }

    form.reset();
});

// Find the team(s) with the most attendees, highlight them, and celebrate
function celebrateGoal() {
    const teams = [
        { id: "water", name: "Team Water Wise" },
        { id: "zero", name: "Team Net Zero" },
        { id: "power", name: "Team Renewables" }
    ];

    let topCount = 0;
    teams.forEach(function(t) {
        t.count = parseInt(document.getElementById(t.id + "Count").textContent);
        topCount = Math.max(topCount, t.count);
    });

    const winners = teams.filter(function(t) {
        return t.count === topCount;
    });

    winners.forEach(function(t) {
        document.querySelector(".team-card." + t.id).classList.add("winner");
    });

    const winnerNames = winners.map(function(t) {
        return t.name;
    }).join(" & ");

    greeting.textContent = `🏆 Goal reached! ${maxCount} attendees checked in. ${winnerNames} ${winners.length > 1 ? "tie" : "wins"} with ${topCount} attendees!`;
    greeting.className = "success-message celebration-message";
    greeting.style.display = "block";
}
