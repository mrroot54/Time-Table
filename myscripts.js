
    function generateTimeTable() {
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");

    // Get the input values
    let hours = parseInt(hoursInput.value);
    let minutes = parseInt(minutesInput.value);

    // Validate and limit hours between 1 and 12
    if (hours < 1 || hours > 12 || isNaN(hours)) {
        alert("Please enter valid hours between 01 and 12.");
        hoursInput.value = "";
        return;
    }

    // Validate and limit minutes between 0 and 59
    if (minutes < 0 || minutes > 59 || isNaN(minutes)) {
        alert("Please enter valid minutes between 00 and 59.");
        minutesInput.value = "";
        return;
    }

    const amPmSelect = document.getElementById("amPmSelect").value;
    const timetable = document.getElementById("timetable");

    timetable.innerHTML = ""; // Clear previous timetable content

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (const day of days) {
        const listItem = document.createElement("li");
        let daySchedule = "Indoor Class";
        let location = "";

// Thursday and Saturaday Time never Change user but any values //////

        if (day === "Thursday") {
            daySchedule = "Outdoor Class";
            location = "Gandhi Maidan";
            const fixedStartTime = "08:00 am";
            const fixedEndTime = "10:00 am";
            listItem.innerHTML = `${day}: <span class="highlight-outdoor">${daySchedule}</span> (${fixedStartTime} - ${fixedEndTime}) at <span class="highlight-location">${location}</span>`;

        } else if (day === "Saturday") {
            daySchedule = "Outdoor Class";
            location = "SK Puri Park";
            const fixedStartTime = "03:00 pm";
            const fixedEndTime = "05:00 pm";
            listItem.innerHTML = `${day}: <span class="highlight-outdoor">${daySchedule}</span> (${fixedStartTime} - ${fixedEndTime}) at <span class="highlight-location">${location}</span>`;
        } else {
            // Convert 12-hour time to 24-hour format if it's after 12:00 PM
            if (amPmSelect === "PM" && hours !== 12) {
                hours += 12;
            }



  /// convert AM / PM /////////
          const formattedStartTime = `${hours === 12 ? 12 : hours % 12}:${minutes.toString().padStart(2, "0")} ${amPmSelect}`;
const formattedEndTime = `${(hours + 2) % 12 || 12}:${minutes.toString().padStart(2, "0")} ${(hours + 2) >= 12 ? 'PM' : 'AM'}`;

            listItem.textContent = `${day}: ${daySchedule} (${formattedStartTime} - ${formattedEndTime})`;
        }

        timetable.appendChild(listItem);
    }
}

