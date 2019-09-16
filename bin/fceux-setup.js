var Module = {
  preRun: [waitForUserUpload],
  postRun: [],
  canvas: (function() {
    return document.getElementById("canvas");
  })(),
  setStatus: function() {},
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
  }
};
Module.arguments = ["--no-config", "1", "romfile"];

window.onerror = function(event) {
  console.log(event);
};

var LAUNCH_CONTROLS_CLASS = ".launch-controls";
var ROM_UPLOAD_IDENTIFIER = "#rom";
var RUNTIME_ROM_NAME = "romfile";
var COMMAND_LINE_IDENTIFIER = "#command-line";

function waitForUserUpload() {
  addRunDependency(RUNTIME_ROM_NAME);
}

function addUserData(arrayBuffer, file_name) {
  FS.writeFile(RUNTIME_ROM_NAME, new Uint8Array(arrayBuffer), {
    encoding: "binary"
  });

  Module.setStatus("Running " + file_name);
  removeRunDependency(RUNTIME_ROM_NAME);
}

function handleFileSelect(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();

  reader.onload = (function(theFile) {
    return function(e) {
      addUserData(e.target.result, file.name);
    };
  })(file);

  reader.readAsArrayBuffer(file);
}

const selectElement = document
  .querySelector(ROM_UPLOAD_IDENTIFIER)
  .addEventListener("change", handleFileSelect);
