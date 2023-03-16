// Assignment Code
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
    answer: "!@#$%^&*()_-+=",
  },
];

var generateBtn = document.querySelector("#generate");
let criteria = '';
let returnedPassword = '';
const chooseCriteria = () => {
  for (let i = 1; i < questions.length; i++) {
    let userChoice = confirm(questions[i].question)
    if (userChoice) {
      criteria += questions[i].answer;
    }
  }
}

const generatePassword = () => {
  let pwLength = prompt(questions[0].question)
  if (pwLength < 8 || pwLength > 128) {
    alert('Please choose a number from 8 - 128')
    generatePassword();
  } else {
    chooseCriteria()
  }
  if (!criteria) {
    alert("please choose at least one criteria")
    chooseCriteria()
  } else {
    let randomize;
    let char;
    for (let i = 0; i < pwLength; i++) {
      randomize = Math.floor(Math.random() * criteria.length)
      char = criteria.charAt(randomize)
      returnedPassword += char
    }
  }
  return returnedPassword 
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  criteria = "";
  returnedPassword = "";
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)
