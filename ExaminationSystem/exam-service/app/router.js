'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth(); // 调用中间件
  router.get('/', controller.home.index);
  router.post('/checkLogin', controller.home.checkLogin);
  router.get('/getUserInfo',adminauth, controller.home.getUserInfo);
  router.get('/getAllUserInfo',adminauth, controller.home.getAllUserInfo);
  router.get('/searchAccount',adminauth, controller.home.searchAccount);
  router.post('/deleteUserAccount',adminauth, controller.home.deleteUserAccount);
  router.post('/resetPasswords',adminauth, controller.home.resetPasswords);
  router.post('/addAccount',adminauth, controller.home.addAccount);
  router.post('/updateUserInfo',adminauth, controller.home.updateUserInfo);
  router.get('/getCourseInfo',adminauth, controller.home.getCourseInfo);
  router.post('/saveTestPaper',adminauth, controller.home.saveTestPaper);
  router.get('/getQuestionList',adminauth, controller.home.getQuestionList);
  router.get('/getTestPaperList',adminauth, controller.home.getTestPaperList);
  router.post('/deleteTestPaper',adminauth, controller.home.deleteTestPaper);
  router.get('/getTestPaperInfo',adminauth, controller.home.getTestPaperInfo);
  router.get('/getQuestionInfo',adminauth, controller.home.getQuestionInfo);
  router.post('/saveAnswer',adminauth, controller.home.saveAnswer);
  router.get('/getTempAnswer',adminauth, controller.home.getTempAnswer);
  router.get('/getTestPaperAnswerList',adminauth, controller.home.getTestPaperAnswerList);
  router.get('/getPaperQuestion',adminauth, controller.home.getPaperQuestion);
  router.post('/insterScore',adminauth, controller.home.insterScore);
  router.get('/getTestResult',adminauth, controller.home.getTestResult);
  router.get('/getAnswerPaper',adminauth, controller.home.getAnswerPaper);
};
