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
  var url = 'http://localhost:8080/upload'
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
  fd.append("password", password);
  fd.append("duration", 60);
  xhr.send(fd);
}

window.onload = function() {
  document.getElementById('fileinput').addEventListener('change', function(){
    file = this.files[0];
    // This code is only for demo ...
    console.log("name : " + file.name);
    console.log("size : " + file.size);
    console.log("type : " + file.type);
    console.log("date : " + file.lastModified);
    previewImage(file);
  }, false);
  document.getElementById('upload').addEventListener('click', function(){
    if(file != null) {
      doUpload();
    }
  });

}
