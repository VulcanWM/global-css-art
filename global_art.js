const Filehound = require('filehound');
const files = Filehound.create()
      .paths('art')
      .ext('html')
      .findSync();
export const global_art = []
files.forEach(function (file) {
    global_art.push(file.replace("art/", "").replace(".html", ""));
});