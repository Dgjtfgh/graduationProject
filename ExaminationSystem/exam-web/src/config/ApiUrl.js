let Url = 'http://127.0.0.1:7001/'

let servicePath = {
    checkLogin: Url + 'checkLogin',
    getAllUserInfo: Url + 'getAllUserInfo',         // 管理员获取所有账户列表
    searchAccount: Url + 'searchAccount',           // 管理员对账户进行模糊查询
    deleteUserAccount: Url + 'deleteUserAccount',   // 管理员删除账户
    resetPasswords: Url + 'resetPasswords',         // 管理员重置密码
    addAccount: Url + 'addAccount',                 // 管理员添加账户
    getUserInfo: Url + 'getUserInfo',               // 获取用户个人信息
    updateUserInfo: Url + 'updateUserInfo',         // 修改用户个人信息和密码
    getCourseInfo: Url + 'getCourseInfo',           // 获取课程信息
    saveTestPaper: Url + 'saveTestPaper',           // 保存试卷
    getQuestionList: Url + 'getQuestionList',       // 获取题库列表
    getTestPaperList: Url + 'getTestPaperList',     // 获取试卷列表
    deleteTestPaper: Url + 'deleteTestPaper',       // 删除试卷
    getTestPaperInfo: Url + 'getTestPaperInfo',     // 获取试卷详细信息
    getQuestionInfo: Url + 'getQuestionInfo',       // 根据题目id获取题目信息
    saveAnswer: Url + 'saveAnswer',                 // 保存学生答案
    getTempAnswer: Url + 'getTempAnswer',           // 获取学生临时的答案
    getTestPaperAnswerList: Url + 'getTestPaperAnswerList', // 获取答卷列表
    getPaperQuestion: Url + 'getPaperQuestion',     // 获取试卷题目
    insterScore: Url + 'insterScore',               // 上传分数
    getTestResult: Url + 'getTestResult',           // 获取考试结果
    getAnswerPaper: Url + 'getAnswerPaper'          // 获取答卷详细信息
}

export default servicePath;