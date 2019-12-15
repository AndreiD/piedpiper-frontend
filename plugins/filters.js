import Vue from "vue";

Vue.filter(
  "title",
  val => val.charAt(0).toUpperCase() + val.substr(1).toLowerCase()
);

var filter = function(text, length, clamp) {
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter("truncate", filter);
