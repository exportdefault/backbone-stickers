export const template = `
    <img src="<%= coverImage %>"/>
    <ul>
    <li><%= title %></li>
    <li><%= author %></li>
    <li><%=  $.format.date( new Date( releaseDate ), 'MMMM yyyy' ) %></li>
    <li>
      <% _.each( keywords, function( keyobj ) {%>
        <%= keyobj.keyword %><% 
      } ); %>
    </li>
    </ul>
    <button class="delete">Delete</button>
  `;