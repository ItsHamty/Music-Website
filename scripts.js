var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
function getCurrentMonth() {
  return (new Date()).getMonth()
}
CanvasRenderingContext2D.prototype.clear = CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
  if (preserveTransform) {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
  }
  this.clearRect(0, 0, this.canvas.width, this.canvas.height);
  if (preserveTransform) {
    this.restore();
  }           
};
function LetItSnow() {
  window.removeEventListener("load", LetItSnow);
  var snowCanvasId = "snowCanvas",
    framerate = 30,
    flakeNumberModifier = 0.1,
    fallSpeedModifier = 0.4;
  var canvas = document.getElementById(snowCanvasId);
  if(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowCanvas.numFlakes = Math.min(canvas.width, 300) * canvas.height / 400 * flakeNumberModifier;
    snowCanvas.flakes = [];
    for(var x = 0; x < snowCanvas.numFlakes; x++) {
      snowCanvas.flakes[x] = getRandomFlake(true);
    }
    return "Canvas resized successfully.";
  }
  canvas = document.createElement("CANVAS");
  canvas.id = snowCanvasId;
  document.body.appendChild(canvas);
  var context = canvas.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight,
    TWO_PI = Math.PI * 2,
    radHeight = 40;
  window.snowCanvas = {};
  snowCanvas.numFlakes = Math.min(width, 300) * height / 400 * flakeNumberModifier;
  snowCanvas.flakes = [];
  canvas.width = width;
  canvas.height = height;
  console.log(width + "x" + height);
  flake = document.createElement("CANVAS"),
    flakeContext = flake.getContext("2d");
  // create flake grafic
  flake.width = 8;
  flake.height = 8;
  flakeContext.fillStyle = "#fff";
  flakeContext.beginPath();
  flakeContext.arc(4, 4, 4, 0, TWO_PI);
  flakeContext.fill();
  // init snowflakes
  for(var x = 0; x < snowCanvas.numFlakes; x++) {
    snowCanvas.flakes[x] = getRandomFlake(true);
  }
  // start tick at specified fps
  window.setInterval(tick, Math.floor(1000 / framerate));
  // main routine
  function tick() {
    var posX = 0,
      imageData;
    // reset canvas for next frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var x = 0; x < snowCanvas.numFlakes; x++) {
      // calculate changes to snowflake
      posX = snowCanvas.flakes[x].x + Math.sin(snowCanvas.flakes[x].yMod + snowCanvas.flakes[x].y / radHeight * (5 - snowCanvas.flakes[x].size)) * snowCanvas.flakes[x].waveSize * (1 - snowCanvas.flakes[x].size);
      snowCanvas.flakes[x].y += snowCanvas.flakes[x].size * fallSpeedModifier; // bigger flakes are nearer to screen, thus they fall faster to create 3d effect
      // if snowflake is out of bounds, reset
      if(snowCanvas.flakes[x].y > canvas.height + 5) {
        snowCanvas.flakes[x] = getRandomFlake();
      }
      // draw snowflake
      context.globalAlpha = (snowCanvas.flakes[x].size - 1) / 3;
      context.drawImage(flake, posX, snowCanvas.flakes[x].y, snowCanvas.flakes[x].size, snowCanvas.flakes[x].size);
    }
    // repeat 300px wide strip with snowflakes to fill whole canvas
    if(canvas.width > 300) {
      context.globalAlpha = 1;
      context.drawImage(canvas, 300, 0);
      if(canvas.width > 600) context.drawImage(canvas, 600, 0);
      if(canvas.width > 1200) context.drawImage(canvas, 1200, 0);
      if(canvas.width > 2400) context.drawImage(canvas, 2400, 0);
    }
  }
  // randomize flake data
  function getRandomFlake(init) {
    return {
      x: range(10, 310),
      y: init ? range(-5, height + 5) : -5,
      size: Math.max(range(1, 4), 2),
      yMod: range(0, 150),
      waveSize: range(1, 4)
    };
  }
  // get a random number inside a range
  function range(start, end) {
    return Math.random() * (end - start) + start;
  }
}
(function() {
  var m = month[getCurrentMonth()];
  if((location.pathname != "/banner") && (m == "December" || m == "January" || m == "February")) {
    window.addEventListener("load", LetItSnow);
    window.addEventListener("resize", LetItSnow);
  }
})();

