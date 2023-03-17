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
    answer: "!@#$%^&*+=",
  },
];

const generateBtn = document.querySelector("#generate");
let criteria = '';

const chooseCriteria = () => {
  for (let i = 1; i < questions.length; i++) {
    let userChoice = confirm(questions[i].question)
    if (userChoice) {
      criteria += questions[i].answer;
    }
  }
  if (!criteria) {
    alert("please choose at least one criteria");
    chooseCriteria();
  } 
}

const generatePassword = () => {
  let returnedPassword = "";
  let pwLength = prompt(questions[0].question)
  if (!pwLength) {
    return ''
  } else if (+pwLength < 8 || +pwLength > 128) {
    alert("Please choose a number from 8 - 128");
    return generatePassword();
  } else {
    chooseCriteria()
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
