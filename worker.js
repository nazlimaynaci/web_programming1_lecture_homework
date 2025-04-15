onmessage = function(e) {
    postMessage("Web Worker'dan gelen mesaj: Merhaba, " + e.data);
  }