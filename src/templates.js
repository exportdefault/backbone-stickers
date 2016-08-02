const TaskTemplate = `
  <%= title %> <!--span>(<%= sort %>)</span-->
  <button class="edit">Edit</button> 
  <button class="delete">Delete</button>
  `;

const HomeTemplate = `
    <h1>Home</h1>
    <a href="#about">Go to "About"</a>
  `;

const AboutTemplate = `
    <h1>About</h1>
    <a href="#">Go to back to "Home"</a>
  `;


export { TaskTemplate, HomeTemplate, AboutTemplate };