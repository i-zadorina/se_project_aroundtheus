export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }
  //returns an object containing information about the user
  //display the user data in the open form
  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src,
    };
    return this._userData;
  }
  //adds new user data to the page after successful submission
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
  setAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
