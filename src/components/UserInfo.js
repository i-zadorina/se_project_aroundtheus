export default class UserInfo {
  constructor({ name, description,avatar }) {
    this._title = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar=document.querySelector(avatar);
  }
  //returns an object containing information about the user
  //display the user data in the open form
  getUserInfo() {
    this._userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
      avatar:this._avatar.src,
    };
    return this._userInfo;
  }
  //adds new user data to the page after successful submission
  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
  }
  setAvatar(avatar){
    this._avatar.src=avatar;
  }
}
