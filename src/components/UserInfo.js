export default class UserInfo {
  constructor({ name, description }) {
    this._title = document.querySelector(name);
    this._description = document.querySelector(description);
  }
  //returns an object containing information about the user
  //display the user data in the open form
  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return userInfo;
  }
  //adds new user data to the page after successful submission
  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
  }
}
