import UserForm from "./userForm.js";

export default class Hints extends UserForm{
  constructor(inputs){
    super();
    this.inputsShowHints = inputs.filter(input => input.classList.contains("showhints"));
  }
  
  //show hints while typing in input fields
  show(){
    //show hints for common input
    this.inputsShowHints.forEach(input => {
      this.showTypicalHint(input);
    })
  
    //show hits for atypical password input
    this.showPassHint();

    //show hits for password repeat 
    this.showPassRepeatHint();
  }

  //show typical hint
  showTypicalHint(input){
    const inputRule = this.findRule(input.name);
    
    // ignore atypical inputs which will be hanlded in their own functions
    if(input.name == "password" || input.name == "passwordrepeat"){
      return;
    }

    // handle typical input
    input.addEventListener("keyup", (e) => {
      if(this.checkRegex(input.value, inputRule.regex)){
        this.renderDefault(input);
      } else{
        this.renderMessageInvalid(input, inputRule.messageInvalid, true);
      }
    }) 
  }

  //show atypical password hint
  showPassHint(){  
    const password = this.inputsShowHints.find(input => input.name === "password");
    const passwordRepeat = this.inputsShowHints.find(input => input.name === "passwordrepeat");

    password.addEventListener("keyup", (e) => {
      const passRule = this.findRule(password.name);
      const passRepRule = this.findRule(passwordRepeat.name);
      this.renderPassToggleVisibility(password);

      if(this.checkRegex(password.value, passRule.regex)){
        this.renderDefault(password);
      } else{
        this.renderMessageInvalid(password, passRule.messageInvalid, true);
      }

      if(passwordRepeat.value !== ""){
        if(passwordRepeat.value === password.value && this.checkRegex(passwordRepeat.value, passRule.regex)){
          this.renderDefault(passwordRepeat);
        } else{
          this.renderMessageInvalid(passwordRepeat, passRepRule.messageInvalid, true);
        }
      }
    });
  }  

  //show atypical password-repeat hint 
  showPassRepeatHint(){
    const password = this.inputsShowHints.find(input => input.name === "password");
    const passwordRepeat = this.inputsShowHints.find(input => input.name === "passwordrepeat");
    
    passwordRepeat.addEventListener("keyup", (e) => {
      const passRule = this.findRule(password.name);
      const passRepRule = this.findRule(passwordRepeat.name);
      this.renderPassToggleVisibility(passwordRepeat);

      if((passwordRepeat.value === password.value) && this.checkRegex(passwordRepeat.value, passRule.regex)){
        this.renderDefault(passwordRepeat);
      } else{
        this.renderMessageInvalid(passwordRepeat, passRepRule.messageInvalid, true);
      }  
    });  
  }
}