(function() {
  var Component = function(template) {
    this.component = _.template(template);

    this.render = function(el, props) {
      $(el).html(this.component(props));
    };
  };

  var L1Template =
    "<% for (var i = 0; i < posts.length; i++) { %>\
      <%= L2({L3:L3, post:posts[i]}) %>\
     <% } %>";
  var L2Template =
    "<article>\
       <ul>\
         <%= L3({id:post.id, userId:post.userId, title:post.title, body:post.body}) %>\
       </ul>\
     </article>";

  var L3Template =
    "<li>id: <%= id %></li>\
     <li>userId: <%= userId %></li>\
     <li>title: <%= title %></li>\
     <li>body: <%= body %></li>";

  // instances
  var layer1 = new Component(L1Template);
  var layer2 = new Component(L2Template);
  var layer3 = new Component(L3Template);

  $.subscribe("posts/loaded", function(e, data) {
    layer1.render("#main", {
      posts: data,
      L2: layer2.component,
      L3: layer3.component
    });
  });
})();

window.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  // API Call
  $.ajax({
    url: "/api/posts",
    type: "GET",
    data: { userId: "1" },
    datatype: "json"
  })
    .done(function(data) {
      console.log(data);
      // initial rendering
      $.publish("posts/loaded", [data]);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error(jqXHR.status, textStatus);
    });

  setTimeout(function() {
    // API Call
    $.ajax({
      url: "/api/posts",
      type: "GET",
      data: { userId: "2" },
      datatype: "json"
    })
      .done(function(data) {
        console.log(data);
        // re-rendering
        $.publish("posts/loaded", [data]);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error(jqXHR, textStatus);
      });
  }, 3000);
});
