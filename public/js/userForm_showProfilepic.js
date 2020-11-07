import UserForm from "./userForm.js";

export default class ProfilePic extends UserForm{
  constructor(){
    super();
    this.divFormGroup = document.querySelector(".fg--profilepic");
    this.profilePicBtnChoose = document.querySelector("input[name='profilepic']");
    this.profilePicImg = document.querySelector(".singup_profilepic-img");
    this.profilePicBtnRemove = document.querySelector("#button-remove");
    this.profilePicMsgInvalid = document.querySelector(".singup__form-validation-message");
    this.message = this.findRule(this.profilePicBtnChoose.name).messageInvalid;
  }

  show(){    
    this.profilePicBtnChoose.addEventListener("change", () => {
      this.file = this.profilePicBtnChoose.files[0];

      if(this.checkPicTypeSize(this.file)){  
        this.renderProfilePic();
      } else {
        this.renderMessagePofilePic(this.message);
      }
    });
  }

  renderProfilePic(){
    if(this.divFormGroup.classList.contains("fg--invalid")){
      this.divFormGroup.classList.remove("fg--invalid");
    }
    
    if(this.profilePicBtnChoose.files[0]){
      this.profilePicBtnRemove.style.display = "block";
      
      const reader = new FileReader();
  
      reader.onload = (e) => {
        this.profilePicImg.setAttribute('src', e.target.result);
      }
    
      reader.readAsDataURL(this.profilePicBtnChoose.files[0]);

      this.removeProfilePic();
    }
  }

  removeProfilePic(){
    this.profilePicBtnRemove.addEventListener("click", () => {
      this.profilePicImg.src = "../images/profilepic_default.png";
      this.profilePicImg.value = null;
      this.profilePicBtnRemove.style.display = "none";
      
      if(this.divFormGroup.classList.contains("fg--invalid")){
        this.divFormGroup.classList.remove("fg--invalid");
      }
    })
  }
}