document.addEventListener('deviceready', onDeviceReady, false);

document.getElementById("createFile").addEventListener("click", createFile);
document.getElementById("writeFile").addEventListener("click", writeFile);
document.getElementById("readFile").addEventListener("click", readFile);
document.getElementById("removeFile").addEventListener("click", removeFile);

function onDeviceReady() {
}

function createFile() {
    let type = window.TEMPORARY;
    let size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
            alert('File creation successfull!')
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }

}

function removeFile() {
    let type = window.TEMPORARY;
    let size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

            fileEntry.remove(function() {
                alert('File removed.');
            }, errorCallback);
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}


function readFile() {
    let type = window.TEMPORARY;
    let size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', {}, function(fileEntry) {

            fileEntry.file(function(file) {
                let reader = new FileReader();

                reader.onloadend = function(e) {
                    let txtArea = document.getElementById('textarea');
                    txtArea.value = this.result;
                };
                reader.readAsText(file);
            }, errorCallback);
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}


function writeFile() {
    let type = window.TEMPORARY;
    let size = 5*1024*1024;
    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {
        fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    alert('Write completed.');
                };

                fileWriter.onerror = function(e) {
                    alert('Write failed: ' + e.toString());
                };

                let blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
                fileWriter.write(blob);
            }, errorCallback);
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("ERROR: " + error.code)
    }
}

