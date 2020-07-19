const path = require('path');
const upload = require('../../../utils/filehelper').fileUpload;
const makeThumb = require('../../../utils/filehelper').imageThumb;

module.exports = (app) => {
    // file uploads
    app.post(
        `${app.config.baseUrl}/upload`,
        upload,
        makeThumb(app.config.ImageThumbWidth || 300),
        (req, res, next) => {
            if (!req.file) {
                res.makeError(400, '无法识别上传的文件！');
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