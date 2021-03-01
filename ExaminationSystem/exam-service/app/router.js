'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/', controller.home.index);
  router.post('/checkLogin', controller.home.checkLogin);
  router.get('/getUserInfo',adminauth, controller.home.getUserInfo);
  router.get('/getAllUserInfo',adminauth, controller.home.getAllUserInfo);
  router.post('/deleteUserAccount',adminauth, controller.home.deleteUserAccount);
  router.post('/addAccount',adminauth, controller.home.addAccount);
  router.post('/updateUserInfo',adminauth, controller.home.updateUserInfo);
  router.get('/getCourseInfo',adminauth, controller.home.getCourseInfo);
  router.post('/saveTestPaper',adminauth, controller.home.saveTestPaper);
  router.get('/getQuestionList',adminauth, controller.home.getQuestionList);
  router.get('/getTestPaperList',adminauth, controller.home.getTestPaperList);
  router.post('/deleteTestPaper',adminauth, controller.home.deleteTestPaper);
  router.get('/getTestPaperInfo',adminauth, controller.home.getTestPaperInfo);
};
