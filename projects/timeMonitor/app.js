// Select form and log elements
const activityForm = document.getElementById('activityForm');
const activityLog = document.getElementById('activityLog');

// Event listener to capture form submission
activityForm.addEventListener('submit', function(event){
    event.preventDefault(); //prevent form from refreshing the page

    //get form values
    const activity = document.getElementById('activity').value;
    const duration = parseInt(document.getElementById('duration').value);

    //add activity to the log
    const listItem = document.createElement('li');
    listItem.textContent = '${activity}: ${duration} minutes' ;
    activityLog.appendChild(listItem);

    //TODO: add logic to categorize activity and calculate time
})