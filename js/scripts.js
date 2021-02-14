var file;

function previewImage(file) {
  var previewId = "preview";
  var preview = document.getElementById(previewId);
  var imageType = /image.*/;
  if (!file.type.match(imageType)) {
    console.log("Cannot display non-image type.");
    return;
  }
  var thumb = document.createElement("div");
  thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div
  var img = document.createElement("img");
  img.file = file;
  thumb.appendChild(img);
  preview.appendChild(thumb);
  // Using FileReader to display the image content
  var reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);
}

function doUpload() {
  var url = '/upload'
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open("POST", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Every thing ok, file uploaded
      console.log(xhr.responseText); // handle response.
    }
  };
  fd.append("file", file);
  var password = document.getElementById('password').value;
  var duration = parseInt(document.getElementById('duration').value) * 60;
  fd.append("password", password);
  fd.append("duration", duration);
  xhr.send(fd);
}

window.onload = function() {

  document.getElementById('fileinput').addEventListener('change', function(){
    file = this.files[0];
    previewImage(file);
  }, false);
  window.addEventListener('paste', function(e){
    //document.getElementById('fileinput').files = e.clipboardData.files;
    file = e.clipboardData.files[0];
    previewImage(file);
  }, false);
  document.getElementById('upload').addEventListener('click', function(){
    if(file != null) {
      doUpload();
    }
  });

}
