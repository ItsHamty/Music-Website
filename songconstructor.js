function $(id) { return document.getElementById(id) }
String.prototype.capFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
function setVectorSource(elem, id) {
  if(elem && id) {
    elem.src = images[id].svg;
    elem.onerror="this.onerror=null; this.src=\'" + images[id].png + "\'";
  } else {
    return false;
  }
}
var images = {
  soundcloud: {
    svg: "https://static.tumblr.com/mv8e1sl/50Soehftt/sc.svg",
    png: "https://static.tumblr.com/mv8e1sl/48ioehftr/sc.png"
  },
  youtube: {
    svg: "https://static.tumblr.com/mv8e1sl/g88oehfu7/yt.svg",
    png: "https://static.tumblr.com/mv8e1sl/QnGoehfu3/yt.png"
  },
  bandcamp: {
    svg: "https://static.tumblr.com/mv8e1sl/hNQoehftc/bc.svg",
    png: "https://static.tumblr.com/mv8e1sl/Bpqoehft9/bc.png"
  },
  download: {
    svg: "https://static.tumblr.com/mv8e1sl/SYGoeqq6l/dl2.svg",
    png: "https://static.tumblr.com/mv8e1sl/tQKoeqq6o/dl2.png"
  },
  download2: {
    svg: "http://static.tumblr.com/mv8e1sl/rRrogsjia/dl3.svg",
    png: "http://static.tumblr.com/mv8e1sl/6aGogsjid/dl3.png"
  }
}
function timeAgo(oldDate, length) {
  length = length || 3;
  var newDate = new Date();
  if((newDate - oldDate) < 0) {
    return "Coming soon";
  }
  var msInWeek = 1000 * 60 * 60 * 24 * 7,
    msInDay = 1000 * 60 * 60 * 24;
  var deltaYr = newDate.getFullYear() - oldDate.getFullYear();
  if (oldDate.getMonth() > newDate.getMonth() ||
    (oldDate.getMonth() === newDate.getMonth() && oldDate.getDate() > newDate.getDate())) {
    deltaYr--;
  }
  var deltaMn = newDate.getMonth() - oldDate.getMonth();
  if (deltaMn < 0) {
    deltaMn += 12;
  }
  if (oldDate.getDate() > newDate.getDate()) {
    deltaMn--;
  }
  var tempDate = new Date(oldDate.getFullYear() + deltaYr, oldDate.getMonth() + deltaMn, oldDate.getDate());
  var tempDy = (newDate.getTime() - tempDate.getTime()) / msInDay;
  var deltaDy = parseInt(tempDy);
  var tempHr = (tempDy - deltaDy) * 24;
  var deltaHr = parseInt(tempHr);
  var tempMt = (tempHr - deltaHr) * 60;
  var deltaMt = parseInt(tempMt);
  var tempSc = (tempMt - deltaMt) * 60;
  var deltaSc = parseInt(tempSc);
  var sb = [];
  if (deltaYr > 0) {
    sb.push(deltaYr + ' year' + (deltaYr > 1 ? 's' : ''));
  }
  if (deltaMn > 0) {
    sb.push(deltaMn + ' month' + (deltaMn > 1 ? 's' : ''));
  }
  if (deltaDy > 0) {
    sb.push(deltaDy + ' day' + (deltaDy > 1 ? 's' : ''));
  }
  if (deltaHr > 0) {
    sb.push(deltaHr + ' hour' + (deltaHr > 1 ? 's' : ''));
  }
  if (deltaMt > 0) {
    sb.push(deltaMt + ' minute' + (deltaMt > 1 ? 's' : ''));
  }
  if (deltaSc > 0) {
    sb.push(deltaSc + ' second' + (deltaSc > 1 ? 's' : ''));
  }
  if (sb.length > length) {
    sb.length = length;
  }
  return (sb.join(', ') + " ago");
}

function addEvent(elem, evnt, func) {
  if (elem.addEventListener) { // W3C DOM
    elem.addEventListener(evnt, func, false);
  } else if (elem.attachEvent) { // IE DOM
    elem.attachEvent("on" + evnt, func);
  } else { // No much to do
    elem[evnt] = func;
  }
}
String.prototype.isEmpty = function() {
  return (this.length === 0 || !this.trim());
};

function Search(str) {
  str = str || "";
  if (str.length == 0) {
    return Songs;
  }
  var srchTgs = str.split(" ");
  for (var i = 0; i < srchTgs.length; i++) {
    srchTgs[i] = srchTgs[i].toLowerCase();
  }
  var mObj = {};
  for (i in Songs) {
    mObj[i] = true;
  }
  for (var i = 0; i < srchTgs.length; i++) {
    for (var y in mObj) {
      if (Songs[y].name) {
        if (((Songs[y].name).toLowerCase()).search(srchTgs[i]) == -1) {
          delete mObj[y];
        }
      }
    }
  }
  var results = {};
  for (i in mObj) {
    results[i] = (Songs[i]);
  }
  return results;
}

function newElem(type, parent, class1) {
  var elem = document.createElement(type);
  parent.appendChild(elem);
  if (class1) {
    elem.className = class1;
  }
  return elem;
}

function hideSongs(Songs) {
  var SongStorage = $("SongStorage");
  if(!SongStorage) {
    SongStorage = newElem("div", document.body);
    SongStorage.id = "SongStorage";
  }
  if(SongStorage) {
    if (Songs) {} else {
      return false;
    }
    var songParent = $("SongList");
    if(songParent) {} else {
      return false;
    }
    if (Songs.length == 0) {
      return false;
    }
    for (var i in Songs) {
      var Song = Songs[i];
      if(Song.elem) {
        SongStorage.appendChild(Song.elem);
      }
    }
    songParent.innerHTML = "";
  }
}

function drawSongs(Songs) {
  if (Songs) {} else {
    return false;
  }
  var songParent = $("SongList");
  hideSongs(Songs);
  if (Songs.length == 0) {
    return false;
  }
  for (var i in Songs) {
    var Song = Songs[i];
    if(Song.elem) {
      songParent.appendChild(Song.elem);
      continue;
    }
    var wrap = newElem("div", songParent, "song-wrap");
    var elem = newElem("div", wrap, "song pb shadow");
    if (Song.img) {
      var imgPar = newElem("a", elem, "song-image-parent");
      imgPar.href = "#" + i;
      var img = newElem("img", imgPar, "song-image shadow");
      img.src = Song.img.replace(/^http:\/\//i, 'https://');
    }
    var title = newElem("div", elem, "song-title");
    title.innerHTML = Song.title;
    title.setAttribute("title", Song.name);
    var author = newElem("div", elem, "song-author");
    author.innerHTML = Song.author;
    author.setAttribute("title", Song.name);
    
    var links = newElem("div", elem, "link-buttons");
    if(Song.download) {
      var a = newElem("a", links, "link download-link");
      a.setAttribute("title", "Click for download options");
      var arrowBox = newElem("div", newElem("div", links, "arrow_box-container"), "arrow_box shadow");
      var dlbtn = newElem("img", a, "link-button ");
      setVectorSource(dlbtn, "download");
      for (var key in Song.download) {
        var link = Song.download[key];
        var a = newElem("a", arrowBox, "link");
        link = (link.href) ? link.href : link;
        a.href = (link.constructor === Array) ? link.join("") : link;
        a.target = "_blank";
        var span = newElem("span", a, "link-description");
        a.setAttribute("title", ("Free Download ." + key + " (" + Song.name + ")"));
        span.innerHTML = "." + key;
      }
    }
    for (var key in Song.links) {
      var link = Song.links[key];
      var a = newElem("a", links, "link");
      link = (link.href) ? link.href : link;
      a.href = (link.constructor === Array) ? link.join("") : link;
      a.target = "_blank";
      var dlbtn = newElem("img", a, "link-button");
      a.setAttribute("title", ("\"" + Song.name + "\" on " + key.capFirstLetter()));
      setVectorSource(dlbtn, key);
    }
    //Release Date
    if (Song.date) {
      if (Object.prototype.toString.call(Song.date) === "[object Date]") {
        var date = Song.date;
        var dates = newElem("div", elem, "DateContainer");
        var date1 = newElem("div", dates, "dateText dateAbsolute");
        date1.innerHTML = date.toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "numeric"
        });
        date1.setAttribute("title", (date.toLocaleDateString([], {
          day: "numeric",
          month: "long",
          year: "numeric"
        }) + " | " + date.toLocaleTimeString([])));
        var date2 = newElem("div", dates, "dateText dateRelative");
        date2.innerHTML = timeAgo(date, 1);
        date2.setAttribute("title", (timeAgo(date)));
      }
    }
    Song.elem = wrap;
  }
  return true;
}
function drawSong(Song) {
  if (Song) {} else {
    return false;
  }
  if (Song.img) {
    var img = $("SongImage");
    img.src = Song.img.replace(/^http:\/\//i, 'https://');
  }
  var title = $("SongTitle");
  title.innerHTML = Song.name;
  title.setAttribute("title", Song.title + " by " + Song.author);
  
  var links = $("SongLinks");
  links.innerHTML = "";
  var dlLinks = $("SongDlLinks");
  dlLinks.innerHTML = "";
  if(Song.download) {
    for (var key in Song.download) {
      var link = Song.download[key];
      var a = newElem("a", dlLinks, "link");
      link = (link.href) ? link.href : link;
      a.href = (link.constructor === Array) ? link.join("") : link;
      a.target = "_blank";
      var span = newElem("span", a, "link-description");
      a.setAttribute("title", ("Free Download ." + key + " (" + Song.name + ")"));
      span.innerHTML = "." + key;
    }
  }
  for (var key in Song.links) {
    var link = Song.links[key];
    var a = newElem("a", links, "link");
    link = (link.href) ? link.href : link;
    a.href = (link.constructor === Array) ? link.join("") : link;
    a.target = "_blank";
    var dlbtn = newElem("img", a, "link-button");
    a.setAttribute("title", ("\"" + Song.name + "\" on " + key.capFirstLetter()));
    setVectorSource(dlbtn, key);
  }

  //Release Date
  if (Song.date) {
    if (Object.prototype.toString.call(Song.date) === "[object Date]") {
      var date = Song.date;
      var date1 = $("dateAbsolute");
      date1.innerHTML = date.toLocaleDateString([], {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
      date1.setAttribute("title", (date.toLocaleDateString([], {
        day: "numeric",
        month: "long",
        year: "numeric"
      }) + " | " + date.toLocaleTimeString([])));
      var date2 = $("dateRelative");
      date2.innerHTML = timeAgo(date, 1);
      date2.setAttribute("title", (timeAgo(date)));
    }
  }
  var price = Song.price || "Free";
  $("SongPrice").innerHTML = price;
  
  if(Song.links.youtube) {
    var ytid = Song.links.youtube.id;
    if(ytid) {
      try {
        if(window.curEmbedId != ytid) {
          if(window.curEmbed) {
            window.curEmbed.outerHTML = "";
          }
          var ytEmbedWrap = newElem("div", $("embeds"), "yt-embed-wrap embed-wrap");
          var ytEmbed = newElem("iframe", ytEmbedWrap, "yt-embed embed");
          ytEmbed.src = "https://www.youtube.com/embed/" + ytid + "?autoplay=0&origin=" + (location.href || (location + "") || location.pathname);
          ytEmbed.setAttribute("frameborder", 0);
          window.curEmbed = ytEmbedWrap;
          window.curEmbedId = ytid;
        }
      } catch(e) {}
    }
  }
  if(Song.links.soundcloud) {
    var scEmbedWrap = newElem("div", $("embeds"), "sc-embed-wrap embed-wrap");
    ToneDenReady = window.ToneDenReady || [];
    ToneDenReady.push(function() {
      ToneDen.player.create({
        dom: ".sc-embed-wrap",
        urls: [Song.links.soundcloud]
      });
    });
  }
  return true;
}
