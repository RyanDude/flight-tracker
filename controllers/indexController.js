const path = require('path');

var root = path.dirname(require.main.filename)
const views = path.join(root, 'views');

exports.sendHome = (req, res) => {
    res.sendFile(path.join(views, "index.html"));
}