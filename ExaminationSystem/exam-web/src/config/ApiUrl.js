let Url = 'http://127.0.0.1:7001/'

let servicePath = {
    checkLogin: Url + 'checkLogin',
    getAllUserInfo: Url + 'getAllUserInfo',
    deleteUserAccount: Url + 'deleteUserAccount',
    addAccount: Url + 'addAccount',
    getUserInfo: Url + 'getUserInfo',
    updateUserInfo: Url + 'updateUserInfo',
    getCourseInfo: Url + 'getCourseInfo',
    saveTestPaper: Url + 'saveTestPaper',
    getQuestionList: Url + 'getQuestionList',
    getTestPaperList: Url + 'getTestPaperList',
    deleteTestPaper: Url + 'deleteTestPaper',
    getTestPaperInfo: Url + 'getTestPaperInfo',
    getQuestionInfo: Url + 'getQuestionInfo',
    saveAnswer: Url + 'saveAnswer',
    getTempAnswer: Url + 'getTempAnswer',
    getTestPaperAnswerList: Url + 'getTestPaperAnswerList',
    getPaperQuestion: Url + 'getPaperQuestion',
    insterScore: Url + 'insterScore',
    getTestResult: Url + 'getTestResult',
    getAnswerPaper: Url + 'getAnswerPaper'
}

export default servicePath;