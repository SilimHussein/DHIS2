// Categories and keywords dictionary
const categories = {
    Meals: ["breakfast", "lunch", "dinner", "snack", "tea", "coffee" ,"eat"],
    Travel: ["walk", "bike", "transport", "drive", "commute"],
    Work: ["meeting", "email", "coding", "code", "project", "research"],
    Sleep: ["sleep", "nap" , "dozed", "dozed",],
    Exercise: ["gym", "run", "yoga", "swim", "workout"],
    Leisure: ["movie", "game", "read", "relax", "tv"],
};

// Function to categorize activities based on keywords
function categorizeActivity(activity) {
    for (const [category, keywords] of Object.entries(categories)) {
        for (const keyword of keywords) {
            if (activity.toLowerCase().includes(keyword)) {
                return category;
            }
        }
    }
    return "Other"; // Default category if no match is found
}

// Function to populate time dropdowns with 15-minute intervals
function populateTimeDropdowns() {
    const startTimeDropdown = document.getElementById('startTimeSlot');
    const endTimeDropdown = document.getElementById('endTimeSlot');

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            const optionStart = new Option(timeString, timeString);
            const optionEnd = new Option(timeString, timeString);

            startTimeDropdown.add(optionStart);
            endTimeDropdown.add(optionEnd);
        }
    }
}

// Call the function to populate dropdowns
populateTimeDropdowns();

// Form submission to log activity with category
document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTime = document.getElementById('startTimeSlot').value;
    const endTime = document.getElementById('endTimeSlot').value;
    const activity = document.getElementById('activity').value;
    const duration = document.getElementById('duration').value;

    if (new Date(`1970-01-01T${startTime}:00`) >= new Date(`1970-01-01T${endTime}:00`)) {
        alert("End time must be later than start time.");
        return;
    }

    // Determine category of the activity
    const category = categorizeActivity(activity);

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const timeTableBody = document.querySelector('#timeTable tbody');

    while (start < end) {
        const timeSlot = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;

        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        const activityCell = document.createElement('td');
        const categoryCell = document.createElement('td'); // New cell for category

        timeCell.textContent = timeSlot;
        activityCell.textContent = `${activity} (${duration} min)`;
        categoryCell.textContent = category; // Display the category

        row.appendChild(timeCell);
        row.appendChild(activityCell);
        row.appendChild(categoryCell); // Add category cell to row
        timeTableBody.appendChild(row);

        start.setMinutes(start.getMinutes() + 15);
    }

    document.getElementById('activityForm').reset();
});
