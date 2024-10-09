const dateInput = document.querySelector("input");
const calculateBtn = document.querySelector("button");
const result = document.querySelector("p");

dateInput.max = new Date().toISOString().split("T")[0];

function calculateAge() {
  // Check if dateInput value is empty
  if (!dateInput.value) {
    result.innerHTML = "Please select the birth date!";
    return;
  }

  const birthDate = new Date(dateInput.value);
  const currentDate = new Date();

  // Calculate age
  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  // Adjust age based on month and day difference
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths = 12 + ageMonths; // Convert negative month difference to positive
  }

  if (ageDays < 0) {
    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    ageDays = prevMonthLastDay + ageDays; // Calculate days in previous month
    ageMonths--; // Subtract one month
  }

  // Display the calculated age
  result.innerHTML = `You are <span>${ageYears}</span> years, <span>${ageMonths}</span> months and <span>${ageDays}</span> days old`;
}

calculateBtn.addEventListener("click", calculateAge);
