export default class Registration{
  constructor(){
    this.inputsRules = [
      {
        name: "nickname",
        regex: /^[a-zA-Z0-9]{5,20}$/,
        messageInvalid: "Username must be alphanumeric and contains 5 and 20 characters",
      },
      {
        name: "email",
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        messageInvalid: "E-mail must be a valid adress, e.g. me@myadress.com",
      },
      {
        name: "password",
        regex: /^(?=^.{6,20}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/,
        messageInvalid: "Password must be between 6 - 20 characters long and contains at least one number, one uppercase latter and one lowercase latter",
      }, 
      {
        name: "passwordrepeat",
        messageInvalid: "Your passwords must be equal and valid",
      },       
      {
        name: "profilepic",
        messageInvalid: "Select .jpg, .gif or .png image. Maximum size is: 5 MB.",
      },
      {
        name: "firstname",
        regex: /./,
        messageInvalid: "Your first name must contains latter only",
      },
      {
        name: "lastname",
        regex: /./,
        messageInvalid: "Your last name must contains latter only",
      },
      {
        name: "address",
        regex: /./,
        messageInvalid: "Your adress must contains latters and numbers only",
      },
      {
        name: "city",
        regex: /./,
        messageInvalid: "Your city must contains latters only",
      },  
      {
        name: "postalcode",
        regex: /./,
        messageInvalid: "Your city must contains numbers only",
      },
      {
        name: "personalwebsite",
        regex: /./,
        messageInvalid: "Enter a valid URL address, e.g. www.mywebsite.com",
      },
      {
        name: "fbprofile",
        regex: /^^(http(?:s)?:\/\/)?(?:www)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)/,
        messageInvalid: "Enter a valid facebook profile link",
      },
      {
        name: "instagramprofile",
        regex: /./,
        messageInvalid: "Enter a valid instagram profile link",
      },
      {
        name: "twitteraccount",
        regex: /^(http(?:s)?:\/\/)?(?:www)?twitter\.com\/([a-zA-Z0-9_]+)/,
        messageInvalid: "Enter a valid twitter accuount link",
      }, 
    ]
  }

  //find rule
  findRule(input){
    return this.inputsRules.find(inp => inp.name === input);
  }

  //return true if user enters a valid input
  checkRegex(input, regex){
    return regex.test(input);
  }

  //return true if input is filled
  isFilled(input){
    return input !== "" ? true : false
  }

  checkPicTypeSize(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if(file && acceptedImageTypes.includes(file['type']) && file.size <= 5000000) {
      return true;
    } else {
      return false;
    }
  }

  //get countires from API
  getCountries(){
    let selCountries = document.querySelector(".input__sel-country");
  
    fetch("https://restcountries.eu/rest/v2/all?fields=name")
    .then(res => {
      if(res.ok){
        return res.json()
      } else{
        throw Error(res.statusText);
      }
    })
    .then(countries => { 
      countries.forEach(country => {
        const option = document.createElement("option");
        option.innerHTML = country.name;
        option.value = country.name;
        selCountries.appendChild(option);
      })
    })
    .catch(error => {
      selCountries.innerHTML = "<option selected hidden>Failed to load list of countires</option>";
      console.log(error);
    })  
  }

  //Toggle password
  toggleSeePassword(){
    const formGroupPasswords = document.querySelectorAll(".fg--password");
  
    formGroupPasswords.forEach(fg => {
      const showSymbol = fg.querySelector(".fa-eye");
      const inputPassword = fg.querySelector("input[type='password']");
      showSymbol.addEventListener("mousedown", () => inputPassword.type = "text");
      showSymbol.addEventListener("mouseup", () => inputPassword.type = "password");
      showSymbol.addEventListener("mouseout", () => inputPassword.type = "password");
    });
  }

  //Render messages
  renderMessageInvalid(input, message, renderDefault){
    const divFormGroup = input.parentNode;
    const errorText = divFormGroup.querySelector(".singup__form-validation-message");
    
    divFormGroup.classList.add("fg--invalid");
    errorText.innerHTML = message;        

    if(input.value === "" && renderDefault){
      this.renderDefault(input);
    };
  }

  renderDefault(input){
    const divFormGroup = input.parentNode;
    const errorText = divFormGroup.querySelector(".singup__form-validation-message");
  
    if(divFormGroup.classList.contains("fg--invalid")){
      divFormGroup.classList.remove("fg--invalid");
    } 
    errorText.innerHTML = ""; 
  }

  renderPassToggleVisibility(input){    
    if(!this.isFilled(input.value)){
      if(input.parentNode.classList.contains("fg--show-passicon")){
        input.parentNode.classList.remove("fg--show-passicon");
      }
    } else {
      if(!input.parentNode.classList.contains("fg--show-passicon")){
        input.parentNode.classList.add("fg--show-passicon");
      }
    }
  }

  renderMessagePofilePic(message){
    const divFormGroup = document.querySelector(".fg--profilepic");
    let errorText = divFormGroup.querySelector(".singup__form-validation-message");

    if(divFormGroup.classList.contains("fg--invalid")){
      divFormGroup.classList.remove("fg--invalid");
    }

    divFormGroup.classList.add("fg--invalid");
    errorText.innerHTML = message;    
  }  

  renderMessageInfo(){
    const message = document.querySelector(".message");
    message.style.display = "block";
  }

  closeMessageInfo(){
    if(document.querySelector(".message__btnClose")){
      const btnClose = document.querySelector(".message__btnClose");
    
      btnClose.addEventListener("click", (e) => {
        e.target.parentNode.style.display = "none";
      });     
    }
  }
}