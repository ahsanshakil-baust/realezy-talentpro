document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("share").onclick = function() {
  var share_icons = document.querySelector("#share_icons");
  check_opacity = share_icons.classList.contains('opacity-0');
  if (check_opacity) {
  share_icons.classList.remove('opacity-0');
  share_icons.classList.add('opacity-1');
  } else {
  share_icons.classList.remove('opacity-1');
  share_icons.classList.add('opacity-0');
  }
  };
  
  });