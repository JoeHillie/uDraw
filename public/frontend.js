$(function(){

    var clicks = 0;

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

document.body.style.margin = 0;
canvas.style.position = 'fixed';
// added for ReImg:
canvas.setAttribute("id", "canvas");

var ctx = canvas.getContext('2d');
resize();

var pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke();
}

  document.getElementById("logoForm").style.display="block";

  function clearCanvas() {
    var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


$('.submitBut').click(function(){

  console.log("submit pressed/clicked");

  var newDrawing;
  var postImage;

  function convertCanvasToImgElement() {
        newDrawing = ReImg.fromCanvas(document.querySelector('canvas')).toImg();
        // var output = document.querySelector('.drawings');
        // output.innerText = '';
        // output.appendChild(newDrawing);

        postImage = ReImg.fromCanvas(document.querySelector('canvas')).toBase64()
    }

    convertCanvasToImgElement();

  $.post('/', {"newDrawing" : postImage}).done(function(data){
        console.log(data);
      })

      document.getElementById("logoForm").style.display="none";
      document.getElementById("spleenForm").style.display="block";

  clearCanvas();

console.log(clicks);

  clicks++;

  if (clicks > 1) {
    document.getElementById("drawingSection").style.display="flex";
  }else {
    document.getElementById("drawingSection").style.display="none";
  }

});

// $.ajax({
//   url: "public/uploads/",
//   success: function(data){
//      $(data).find("a:contains(.png)").each(function(){
//         // will loop through
//         var images = $(this).attr("href");
//
//         $('<image></image>').html(images).appendTo('.drawingSection')
//
//      });
//   }
// });

// var dir = "uploads/";
// var fileextension = ".png";
// $.ajax({
//     //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//     url: dir,
//     success: function (data) {
//         //Lsit all png file names in the page
//         $(data).find("a:contains(" + fileextension + ")").each(function () {
//             var filename = this.href.replace(window.location, "").replace("http:///", "");
//             $("#drawingSection").append($("<img src=" + dir + filename + "></img>"));
//         });
//     }
// });

// $.get("uploads/", function(data){
//   var fileextension = ".png";
//   $.ajax({
//       //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//       url: dir,
//       success: function (data) {
//           //Lsit all png file names in the page
//           $(data).find("a:contains(" + fileextension + ")").each(function () {
//               var filename = this.href.replace(window.location, "").replace("http:///", "");
//               $("#drawingSection").append($("<img src=" + dir + filename + "></img>"));
//           });
//       }
//   });
// })

$.get("/files", function(data){
  console.log(data)

    for ( var i=0;i<=data.length;i++){
      $("<img src='uploads/" + data[i] + "'>").appendTo('#drawingSection')
    }
})



////clear////
$('.clearBut').click(function(){

  clearCanvas();

})
////clear////


});
