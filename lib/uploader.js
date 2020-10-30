const path = require('path');
const upload = require(path.resolve('./') + '/utils/filehelper').fileUpload;
const makeThumb = require(path.resolve('./') + '/utils/filehelper').imageThumb;

module.exports = (app) => {
    // file uploads
    app.post(
        `${app.config.baseUrl}/upload`,
        upload,
        makeThumb(app.config.ImageThumbWidth || 300),
        (req, res, next) => {
            if (!req.file) {
                res.makeError(400, 'Cannot recognize the uploaded file!');
                if (next)
                    return next('route');
            }

            res.addData({
                id: path.join(req.file.myDir, req.file.filename)
            })

            return next();
        }
    );
}