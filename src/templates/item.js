export const template = `
  <input class="toggle" id="c<%= order %>" type="checkbox" <%= completed ? 'checked' : '' %> /><label for="c<%= order %>"><span></span></label>
  <span><%= title %></span>
  <a href="#" class="edit">Edit</a>
  <a href="#" class="delete">Delete</a>
  `;