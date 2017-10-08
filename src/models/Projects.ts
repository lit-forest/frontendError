import * as mongoose from "mongoose";

const ProjectErrsSchema = new mongoose.Schema({
    proId: String,                    // 项目ID
    source: {                         // 源代码相关信息
        column: Number,                 // 源代码列数
        line: Number,                   // 源代码行数
        name: String,                   // 报错的名称
        source: String                  // 源代码路径
    },

    sourceFile: String,
    linCol: String,

    column: Number,                   // 编译之后代码列数
    line: Number,                     // 编译之后代码行数
    type: String,                     // 错误类型
    error: String,                    // 错误具体信息
    filename: String,                 // 打包之后的文件名
    path: String,                     // 打包之后的文件路径
    userAgent: String,                // 具体浏览器信息
    stackTrace: String,               // 调用堆栈
    datetime: String,                 // 错误发生时间
});

const ProjectErrors = mongoose.model("projectErrors", ProjectErrsSchema, 'projectErrors');
export default ProjectErrors;