// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");
const emptyList = document.getElementById("emptyList");

// Track Attendence
let count = 0;
const maxCount = 50;
let teamCounts = { water: 0, zero: 0, power: 0 };
let attendees = [];

// Local storage key for saved check-in data
const storageKey = "intelCheckInData";

// Restore any saved counts and attendees when the page loads
loadSavedData();


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
    teamCounts[team]++;
    const teamCounter = document.getElementById(team + "Count");
    console.log(teamCounter);
    teamCounter.textContent = teamCounts[team];

    // Show Welcome Message
    const message = `🎉 Welcome, ${name} from ${teamName}!`;
    console.log(message);
    greeting.textContent = message;
    greeting.className = "success-message";
    greeting.style.display = "block";

    // Add the attendee to the list (newest first)
    attendees.push({ name: name, team: team, teamName: teamName });
    addAttendeeToList(name, team, teamName);

    // Save counts and attendees so they survive a refresh
    saveData();

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

// Add one attendee row to the top of the list
function addAttendeeToList(name, team, teamName) {
    const listItem = document.createElement("li");
    listItem.className = "attendee-item " + team;
    const nameSpan = document.createElement("span");
    nameSpan.className = "attendee-name";
    nameSpan.textContent = name;
    const teamSpan = document.createElement("span");
    teamSpan.className = "attendee-team";
    teamSpan.textContent = teamName;
    listItem.append(nameSpan, teamSpan);
    attendeeList.prepend(listItem);
    emptyList.style.display = "none";
}

// Save the total count, team counts, and attendees to local storage
function saveData() {
    const data = {
        count: count,
        teamCounts: teamCounts,
        attendees: attendees
    };
    try {
        localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
        console.warn("Could not save check-in data:", error);
    }
}

// Load saved data from local storage and show it on the page
function loadSavedData() {
    let data = null;
    try {
        data = JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
        console.warn("Could not load check-in data:", error);
    }
    if (!data) {
        return;
    }

    count = data.count || 0;
    teamCounts = Object.assign({ water: 0, zero: 0, power: 0 }, data.teamCounts);
    attendees = data.attendees || [];

    // Total count and progress bar
    attendeeCount.textContent = count;
    progressBar.style.width = Math.round((count / maxCount) * 100) + "%";

    // Team counts
    Object.keys(teamCounts).forEach(function(team) {
        document.getElementById(team + "Count").textContent = teamCounts[team];
    });

    // Attendee list (oldest first, so the newest ends up on top)
    attendees.forEach(function(a) {
        addAttendeeToList(a.name, a.team, a.teamName);
    });

    // Keep the celebration showing if the goal was already reached
    if (count >= maxCount) {
        celebrateGoal();
    }
}
