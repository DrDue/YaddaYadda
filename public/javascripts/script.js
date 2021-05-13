/* Clickable tabs */
function tabFunc(evt, tag) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tab-content");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" tabButton-active", "");
    }
    document.getElementById(tag).style.display = "block";
    evt.currentTarget.className += " tabButton-active";
  }

    document.getElementById("followersBtn").addEventListener('click', function() {
      tabFunc(event, 'followers')
    });
    document.getElementById("followingBtn").addEventListener('click', function() {
        tabFunc(event, 'following')
        });  