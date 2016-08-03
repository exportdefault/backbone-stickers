export const template = `

  <form action="" id="add-task">
    <input id="new-todo" type="text" placeholder="What needs to be done?" autofocus="" />
    <!--input type="submit" value="Add task" /-->
  </form>

  <input id="toggle-all" type="checkbox">
  <label for="toggle-all"><span></span>Mark all as complete</label>

  <span id="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
  <ul id="filters">
    <li><a class="selected" href="#/">All</a></li>
    <li><a href="#/active">Active</a></li>
    <li><a href="#/completed">Completed</a></li>
  </ul>
  <% if (completed) { %>
    <a href="#" id="clear-completed">Clear completed (<%= completed %>)</a>
  <% } %>
  `;