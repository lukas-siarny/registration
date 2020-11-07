import UserForm from "./userForm.js";

export default class SubmitForm extends UserForm{
  constructor(inputs, form){
    super();
    this.formSignUp = form;
    this.inputsRequied = inputs.filter(input => input.classList.contains("requied"));
    this.inputsOptional = inputs.filter(input => input.classList.contains("optional"));
  }

  //submit all inputs
  submit(){  
    this.formSignUp.addEventListener("submit", (e) => {
      
      //// REQUESTED INPUTS ///// 
      //submit typical requested inputs
      this.inputsRequied.forEach(input => {
        this.submitRequested(input, e);
      })

      // submit atypical password repeat input
      this.submitPassRepeat(e);
      
      ///// OPTIONAL INPUTS /////
      // submit typical optional inputs, if filled
      this.inputsOptional.forEach(input => {
        this.submitOptional(input, e);
      });

      // submit atypical picture input
      this.submitPorfilePic(e);

      this.renderMessageInfo();
      window.scrollTo(0, 0);
    });
  }

  //submit typical requested input
  submitRequested(input, e){
    const inputRule = this.findRule(input.name);

    // ignore atypical inputs which will be hanlded in their own functions
    if(input.name == "passwordrepeat"){
      return;
    }

    // handle typical input
    if(this.checkRegex(input.value,inputRule.regex) && this.isFilled(input.value)){
      this.renderDefault(input);
    } else{
      e.preventDefault();
      this.renderMessageInvalid(input, inputRule.messageInvalid);
    } 
  }

  //submit typical optional input, if filled
  submitOptional(input, e){
    if (!this.isFilled(input.value)){
      return;
    }

    const inputRule = this.findRule(input.name);

    if(this.checkRegex(input.value, inputRule.regex)){
      this.renderDefault(input);
    } else{
      e.preventDefault();
      this.renderMessageInvalid(input, inputRule.messageInvalid);
    }  
  }

  //submit atypical password repeat input (requested)
  submitPassRepeat(e){
    const password = this.inputsRequied.find(input => input.name === "password");
    const passwordRepeat = this.inputsRequied.find(input => input.name === "passwordrepeat");
    const passRepRule = this.findRule(passwordRepeat.name); 

    if((passwordRepeat.value === password.value) && this.isFilled(passwordRepeat.value)){
      this.renderDefault(passwordRepeat); 
    } else{
      e.preventDefault();
      this.renderMessageInvalid(passwordRepeat, passRepRule.messageInvalid);
    } 
  }

  //valiadte profile picture
  submitPorfilePic(e){
    const profilePicBtnChoose = document.querySelector("input[name='profilepic']");
    const message = this.findRule(profilePicBtnChoose.name).messageInvalid;
    const file = profilePicBtnChoose.files[0];

    if(file == undefined){  
      return;
    }

    if(!this.checkPicTypeSize(file)){
      e.preventDefault();
      this.renderMessagePofilePic(message);
    } 
  }
}