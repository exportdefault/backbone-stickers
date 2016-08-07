class UserModel extends Backbone.Model {
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
        role: UserModel.ROLE_GUEST,
      };
  }

  parse(response) {
   response.id = response._id;
   return response;
  }

}

UserModel.ROLE_GUEST  = 0;
UserModel.ROLE_USER   = 1;
UserModel.ROLE_ADMIN  = 2;

export default UserModel;