// Get references to form and table elements
const startTimeSlot = document.getElementById("startTimeSlot");
const endTimeSlot = document.getElementById("endTimeSlot");
const dateInput = document.getElementById("dateInput"); // for date picker
const activityInput = document.getElementById("activity");
const durationInput = document.getElementById("duration");
const activityLog = document.getElementById("activityLog");
const timeTable = document.getElementById("timeTable").getElementsByTagName("tbody")[0];

// Initialize a dictionary for category learning
let categoryDictionary = {
    "meals": ["breakfast", "lunch", "dinner", "coffee", "tea"],
    "travel": ["walk", "bike", "drive", "bus", "train"],
    "work": ["meeting", "coding", "project", "planning"],
};

// Populate time slot options for 24 hours in 15-minute intervals
function populateTimeSlots() {
    startTimeSlot.innerHTML = ""; // Clear existing options
    endTimeSlot.innerHTML = "";   // Clear existing options

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
            const optionStart = document.createElement("option");
            const optionEnd = document.createElement("option");

            optionStart.value = timeString;
            optionEnd.value = timeString;
            optionStart.textContent = timeString;
            optionEnd.textContent = timeString;

            startTimeSlot.appendChild(optionStart);
            endTimeSlot.appendChild(optionEnd);
        }
    }
}
populateTimeSlots();

// Function to determine the category of an activity
function categorizeActivity(activity) {
    for (const category in categoryDictionary) {
        if (categoryDictionary[category].some(keyword => activity.toLowerCase().includes(keyword))) {
            return category;
        }
    }
    return "other"; // default category if none matches
}

// Function to allow the system to learn new categories
function learnCategory(activity, category) {
    if (!categoryDictionary[category]) {
        categoryDictionary[category] = [];
    }
    categoryDictionary[category].push(activity.toLowerCase());
}

// Function to add an activity to the time log and table
function logActivity(date, startTime, endTime, activity, duration, category) {
    const row = timeTable.insertRow();
    row.insertCell(0).textContent = `${date} ${startTime} - ${endTime}`;
    row.insertCell(1).textContent = activity;
    row.insertCell(2).textContent = category;

    const logItem = document.createElement("li");
    logItem.textContent = `${date} ${startTime} - ${endTime}: ${activity} (${category}), Duration: ${duration} mins`;
    activityLog.appendChild(logItem);
}

// Event listener for form submission
document.getElementById("activityForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const date = dateInput.value;
    const startTime = startTimeSlot.value;
    const endTime = endTimeSlot.value;
    const activity = activityInput.value;
    const duration = durationInput.value;

    // Determine the category and add the activity to log
    let category = categorizeActivity(activity);

    // Log activity with categorized information
    logActivity(date, startTime, endTime, activity, duration, category);

    // Optionally learn new categories based on user input
    if (category === "other") {
        const userCategory = prompt(`What category would you like to assign to "${activity}"?`);
        if (userCategory) {
            learnCategory(activity, userCategory.toLowerCase());
            category = userCategory.toLowerCase(); // Update category for current entry
        }
    }

    // Clear form inputs
    dateInput.value = "";
    activityInput.value = "";
    durationInput.value = "";
    startTimeSlot.selectedIndex = 0;
    endTimeSlot.selectedIndex = 0;
});
