
document.addEventListener('DOMContentLoaded', function(){
    const activityForm = document.getElementById('activityForm');
    const timeSelect = document.getElementById('time')
    const timeTable = document.getElementById('timeTable').getElementsByTagName('tbody')[0];

    // Function to generate 15-minute time intervals
    function generateTimeSlots(){
        for (let hour = 0; hour < 24; hour++){
            for (let minutes = 0; minutes < 60; minutes += 15) {
                const timeString = formatTime(hour, minutes);

                // Add option to the time select dropdown
                const option = document.createElement('option');
                option.value = timeString;
                option.textContent = timeString;
                timeSelect.appendChild(option);

                // Add row to the time table
                const row = document.createElement('tr');
                const timeCell = document.createElement('td');
                timeCell.textContent = timeString;
                const activityCell = document.createElement('td');
                activityCell.textContent = ''; //will be filled when activities are added

                row.appendChild(timeCell);
                row.appendChild(activityCell);
                timeTable.appendChild(row);
            }
        }
    }

    // Helper function to format time
    function formatTime(hour, minutes){
        const ampm = hour  >= 12? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHour}:${formattedMinutes} ${ampm}`;
    }
    // Generate the time slots for  a full day
    generateTimeSlots();

    // Event listener to capture form submission
    activityForm.addEventListener('submit', function(event){
        event.preventDefault(); // prevent form from refreshing the page

        const time = timeSelect.value;
        const activity = document.getElementById('activity').value;
        const duration = parseInt(document.getElementById('duration').value);

        // Add the activity to the corresponding time slot in the table
        const rows = timeTable.getElementsByTagName('tr');
        for (let row of rows){
            const timeCell = row.getElementsByTagName('td')[0].textContent;
            if (timeCell === time) {
                const activityCell = row.getElementsByTagName('td')[1];
                activityCell.textContent = `${activity} (${duration} minutes)`;
                break;
            }
        }
    });
});

