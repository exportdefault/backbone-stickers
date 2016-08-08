import FooterTemplate from './../../../templates/layouts/footer.handlebars'; 

export default class FooterLayout extends Backbone.Marionette.ItemView {

  constructor(options) {
    super(options);
    this.template = FooterTemplate;
  }
}