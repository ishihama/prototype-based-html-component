// [Support for older versions of IE]
//
// Object.setPrototypeOf =
//   Object.setPrototypeOf ||
//   function(obj, proto) {
//     if (!isIE9() && !isIE10()) {
//       obj.__proto__ = proto;
//     } else {
//       /** IE9,IE10 fix - copy object methods from the protype to the new object **/
//       for (var prop in proto) {
//         obj[prop] = proto[prop];
//       }
//     }
//     return obj;
//   };
// var isIE9 = function() {
//   return navigator.appVersion.indexOf("MSIE 9") > 0;
// };
// var isIE10 = function() {
//   return navigator.appVersion.indexOf("MSIE 10") > 0;
// };

Base = function() {
  this.component = _.template(this.template);
};
Base.prototype = {
  render: function(el, props) {
    $(el).html(this.component(props));
  }
};

Main = function() {
  Base.call(this);
};
Main.prototype = {
  template: `<% for (var i = 0; i < posts.length; i++) { %>
               <%= Sub({id:posts[i].id, title:posts[i].title, body:posts[i].body}) %>
             <% } %>`
};

Sub = function() {
  Base.call(this);
};
Sub.prototype = {
  template: `<article>
               <ul>
                 <li>id: <%= id %></li>
                 <li>title: <%= title %></li>
                 <li>body: <%= body %></li>
               </ul>
             </article>`
};

// inherits
Object.setPrototypeOf(Main.prototype, Base.prototype);
Object.setPrototypeOf(Sub.prototype, Base.prototype);

// instances
var main = new Main();
var sub = new Sub();

var initialData = [
  {
    id: "1",
    title: "title1",
    body: "body1"
  },
  {
    id: "2",
    title: "title2",
    body: "body2"
  },
  {
    id: "3",
    title: "title3",
    body: "body3"
  }
];

window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");

  // initial rendering
  main.render("#main", { posts: initialData, Sub: sub.component });

  setTimeout(function() {
    // API Call
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      type: "GET",
      datatype: "json"
    })
      .done(function(data) {
        // re-rendering
        main.render("#main", { posts: data.slice(0, 10), Sub: sub.component });
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error(jqXHR.status, textStatus);
      });
  }, 3000);
});
