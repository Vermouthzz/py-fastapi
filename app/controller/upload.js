const { Controller } = require("egg");

const fs = require('fs');
const path = require('path');
class UploadController extends Controller {
  async uploadAvatar() {
    const { ctx } = this;

    const file = ctx.request.files[0];
    const { filename, type, size } = file;
    const filePath = file.filepath;
    const fileName = `${Date.now()}_${filename}`;

    try {
      const targetDir = path.join(this.app.baseDir, 'app/public/upload/avatar');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      //目标路径
      const targetPath = path.join(targetDir, fileName);

      fs.renameSync(filePath, targetPath);
      // path.basename(file.filepath)

      ctx.body = { success: true, message: 'File uploaded successfully', filePath: 'http://127.0.0.1:3000/app/public/upload/avatar/' + fileName };
    } catch (error) {
      ctx.cleanupRequestFiles(); // 清理上传的文件
      ctx.body = { success: false, message: 'File upload failed', error };
    }

  }
}

module.exports = UploadController;