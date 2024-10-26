// Populate the dropdowns with 15-minute intervals from 00:00 to 23:45
function populateTimeDropdowns() {
    const startTimeSlot = document.getElementById('startTimeSlot');
    const endTimeSlot = document.getElementById('endTimeSlot');

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            const startOption = document.createElement('option');
            startOption.value = time;
            startOption.textContent = time;

            const endOption = startOption.cloneNode(true); // Clone for independent selection
            startTimeSlot.appendChild(startOption);
            endTimeSlot.appendChild(endOption);
        }
    }
}

// Call this function on page load to fill the dropdowns
populateTimeDropdowns();

// Handle form submission to log activity across selected time range
document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTime = document.getElementById('startTimeSlot').value;
    const endTime = document.getElementById('endTimeSlot').value;
    const activity = document.getElementById('activity').value;
    const duration = document.getElementById('duration').value;

    // Check if end time is after start time
    if (new Date(`1970-01-01T${startTime}:00`) >= new Date(`1970-01-01T${endTime}:00`)) {
        alert("End time must be later than start time.");
        return;
    }

    // Parse start and end times into Date objects for easier manipulation
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const timeTableBody = document.querySelector('#timeTable tbody');

    // Loop through each 15-minute interval between start and end times
    while (start < end) {
        const timeSlot = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;

        // Create a new row in the time table for each 15-minute interval
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        const activityCell = document.createElement('td');
        
        timeCell.textContent = timeSlot;
        activityCell.textContent = `${activity} (${duration} min)`;

        row.appendChild(timeCell);
        row.appendChild(activityCell);
        timeTableBody.appendChild(row);

        // Increment start time by 15 minutes for next interval
        start.setMinutes(start.getMinutes() + 15);
    }

    // Clear the form fields after logging activity
    document.getElementById('activityForm').reset();
});
