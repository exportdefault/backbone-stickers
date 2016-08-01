class HomeView extends Backbone.View {

  initialize () {
    this.template = $('script[name="home"]').html();
  }

  render () {
    this.$el.html(_.template(this.template));
    return this;
  }
}

class AboutView extends Backbone.View {

  initialize () {
    this.template = $('script[name="about"]').html();
  }

  render () {
    this.$el.html(_.template(this.template));
    return this;
  }
}

export { HomeView, AboutView };