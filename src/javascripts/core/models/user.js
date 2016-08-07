import BaseModel from './../model';

class UserModel extends BaseModel {
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

  initialize() {
    /*if (this.isNew()) {
      this.set('created', Date.now());
    }*/
  }

}

UserModel.ROLE_GUEST  = 0;
UserModel.ROLE_USER   = 1;
UserModel.ROLE_ADMIN  = 2;

export default UserModel;