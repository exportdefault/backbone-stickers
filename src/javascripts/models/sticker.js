const { Model } = Backbone;

export default class Sticker extends Model {
  constructor(...args) {
    super(...args);
  }

  // Define default attributes.
  defaults() {
    return {
        title: 'No title',
        description: 'Unknown',
        liked: false,
        user_id: 1,
        created: 0,
        likes: 0
      };
  }

  parse(response) {
   response.id = response._id;

   // @todo get current user_id!
   let user_id = Backbone.Radio.channel('app').request('session').user.get('id');

   console.log(JSON.stringify(response));
   console.log(user_id);

   response.liked = !!(_.find(response.likes, item => item.user_id == user_id ));
   response.likes = response.likes.length;

   //console.log(JSON.stringify(response));

   return response;
  }

  isLiked() {
    return this.get('liked');
  }

  toggle() {
    return this.set({
      'liked': !this.isLiked(),
      'like': true
    });
  }

  initialize() {
    if (this.isNew()) {
      this.set('created', Date.now());
    }
  }

}