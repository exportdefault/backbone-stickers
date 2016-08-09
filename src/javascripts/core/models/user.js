export default class UserModel extends Backbone.Model {
  constructor() {
    super();

    this.url = '/api/user';
  }

  // Define default attributes.
  defaults() {
    return {
      id: 0,
      username: '',
      name: '',
      email: '',
      is_admin: false
    };
  }

  parse(response) {
   response.id = response._id;
   return response;
  }

}