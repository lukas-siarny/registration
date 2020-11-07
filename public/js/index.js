import UserForm from "./userForm.js";
import SubmitForm from "./userForm_submitForm.js";
import ShowHints from "./userForm_showHints.js";
import ShowProfilePic from "./userForm_showProfilepic.js";

//GENERAL FUNCTIONS - for both - Registration and Login page
const userForm = new UserForm(); 
userForm.toggleSeePassword();
userForm.closeMessageInfo();

// REGISTRATION - Client side validation
if(document.querySelector("#form-singup")){

  const formSingUp = document.querySelector("#form-singup");
  const inputs = Array.from(document.querySelectorAll(".input--singup"));
  
  //GET COUNTIRES from external API
  userForm.getCountries();
  
  //SUBMIT registrtaion
  const submitForm = new SubmitForm(inputs, formSingUp);
  submitForm.submit();
  
  //SHOW HINTS for registration inputs
  const showHints = new ShowHints(inputs);
  showHints.show();
  
  //PRFILE PIC SELECTOR
  const showProfilePic = new ShowProfilePic();
  showProfilePic.show();

}

