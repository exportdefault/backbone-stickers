const { Model } = Backbone;

export default class Book extends Model {
  constructor(...args) {
    super(...args);
  }

  // Define some default attributes for the todo.
  defaults() {
    return {
        coverImage: 'i/placeholder.jpg',
        title: 'No title',
        author: 'Unknown',
        releaseDate: '',
        keywords: []
      };
  }

  parse(response) {
   response.id = response._id;
   return response;
  }
}