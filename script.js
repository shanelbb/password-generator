// Assignment Code
// Object to hold the prompt questions and answers
const questions = [
  {
    question: "Choose a password length from 8 to 128 characters",
    answer: "",
  },
  {
    question: "Include lowercase [a-z] (Ok = Yes, Cancel = No)",
    answer: "abcdefghijklmnopqrstuvwxyz",
  },
  {
    question: "Include uppercase [A-Z] (Ok = Yes, Cancel = No)",
    answer: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    question: "Include numbers [1-9] (Ok = Yes, Cancel = No)",
    answer: "0123456789",
  },
  {
    question:
      "Include special characters [!@#$%^&*()_-+=] (Ok = Yes, Cancel = No)",
    answer: "!@#$%^&*+=",
  },
];

// query the button for the event listener to start generating the password
const generateBtn = document.querySelector("#generate");
// Variable to store the password criteria
let criteria = '';

// Function to loop through the questions object questions and add the characters the user wants to use to the criteria variable
const chooseCriteria = () => {
  for (let i = 1; i < questions.length; i++) {
    let userChoice = confirm(questions[i].question)
    if (userChoice) {
      criteria += questions[i].answer;
    }
  }

  // Error handling for when user doesn't choose any character criteria
  if (!criteria) {
    alert("please choose at least one criteria");
    // start function over
    chooseCriteria();
  } 
}

// Function to collect user answers to prompts and return the generated password
const generatePassword = () => {
  // variable to store the generated password and clears the returned password when user generates another password
  let returnedPassword = "";
  // Variable with prompt for user to choose a password length between 8 and 28
  let pwLength = prompt(questions[0].question)
  // Conditional statement to handle user input
  // Function stops if user hits cancel on prompt
  if (!pwLength) {
    return ''
  }
  // Error handling if user chooses number outside of 8 and 128
  else if (+pwLength < 8 || +pwLength > 128 || isNaN(+pwLength)){
    alert("Please choose a number from 8 - 128");
    return generatePassword();
  } else {
    console.log(+pwLength);
    chooseCriteria();
    let randomize;
    let char;
    for (let i = 0; i < +pwLength; i++) {
      randomize = Math.floor(Math.random() * criteria.length);
      char = criteria.charAt(randomize);
      returnedPassword += char;
    }
  }
  return returnedPassword 
}

const copyPassword = (val) => {
  val.select();
  val.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(val.value).then(() => {
  });
};

// Write password to the #password input
function writePassword() {
  const passwordText = document.querySelector("#password");
  const copyMessage = document.querySelector(".card-header p");
  const password = generatePassword();
  passwordText.value = password;
  copyMessage.textContent = "Click password to copy to clipboard"

  passwordText.addEventListener('click', () => {
    copyPassword(passwordText);
    copyMessage.textContent = 'Password copied to clipboard!'
  })
  criteria = ''
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)
