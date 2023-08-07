'use strict';

class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.settings = { category: 'general', pageSize: 5 };
  }
}
