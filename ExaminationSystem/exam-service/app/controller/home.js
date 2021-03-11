'use strict';

const Controller = require('egg').Controller;
const sd = require('silly-datetime');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async checkLogin() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const sf = ctx.request.body.sf;
    const sql = "SELECT number FROM usertable WHERE number = '" + username + "' AND password = '" + password + "' AND sf = '" + sf + "'";
    const res = await this.app.mysql.query(sql);

    if (res.length > 0) {
      this.ctx.session.id = username;
      this.ctx.body = {
        data: '登录成功',
        username: username,
        sf: sf,
      };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getUserInfo() {
    const { ctx } = this;
    // console.log(ctx.request.query);
    const number = ctx.request.query.number;
    const sf = ctx.request.query.sf;
    const sql = "SELECT * FROM usertable WHERE number = '" + number +"' AND sf = '" + sf + "'";
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result
    };
  }

  async getAllUserInfo() {
    const sql = "SELECT * FROM usertable";
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result
    };
  }

  async deleteUserAccount() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    const number = ctx.request.body.number;
    const sf = ctx.request.body.sf;
    const result = await this.app.mysql.delete('usertable', { number, sf });
    this.ctx.body = {
      data: result
    }
  }

  async addAccount() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    const result = await this.app.mysql.insert('usertable', {
      number: ctx.request.body.number,
      name: ctx.request.body.name,
      sf: ctx.request.body.sf,
      password: ctx.request.body.number
    });
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  async updateUserInfo() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    var userData = {};
    if(!ctx.request.body.changePass) {
      userData = {
        // number: ctx.request.body.number,
        // sf: ctx.request.body.sf,
        // password: ctx.request.body.changePass?ctx.request.body.newPassword,
        name: ctx.request.body.name,
        sex: ctx.request.body.sex,
        college: ctx.request.body.college,
        major: ctx.request.body.major
      } 
    }else {
      userData = {
        password: ctx.request.body.newPassword,
        name: ctx.request.body.name,
        sex: ctx.request.body.sex,
        college: ctx.request.body.college,
        major: ctx.request.body.major
      }
    }
    
    const options = {  where: {number: ctx.request.body.number}};
    const result = await this.app.mysql.update('usertable', userData, options);
    const updateSuccess = result.affectedRows === 1;
    // console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }

  async getCourseInfo() {
    const result = await this.app.mysql.select('subjecttable', {
      // columns: ['id', 'name'], //查询字段，全部查询则不写，相当于查询*
      // where: {
      //   name: 'Jack'
      // }, //查询条件
      // orders: [
      //   ['id', 'desc'] //降序desc，升序asc
      // ],
      // limit: 10, //查询条数
      // offset: 0 //数据偏移量（分页查询使用）
    })
    // console.log(result)
    this.ctx.body = {
      data: result
    }
  }

  async saveTestPaper() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    let result;
    let insertSuccess, insertId;
    if(ctx.request.body.paperId) {
      const options = {  where: {paperId: ctx.request.body.paperId}};
      const data = {
        name: ctx.request.body.name,
        subject: ctx.request.body.subject,
        startdate: new Date(ctx.request.body.startdate),
        enddate: new Date(ctx.request.body.enddate),
        questions: ctx.request.body.questions,
        testtimes: ctx.request.body.testtimes
      }
      result = await this.app.mysql.update('testpapertable', data, options);
      insertSuccess = result.affectedRows === 1;
    } else {
      result = await this.app.mysql.insert('testpapertable', ctx.request.body)
      insertSuccess = result.affectedRows === 1;
      insertId = result.insertId;
    }
    
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  async getQuestionList() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    let result;
    if(ctx.request.query.type) {
      result = await this.app.mysql.select('questiontable', {
        where: {
          subject: ctx.request.query.type
        }, 
        // limit: 10, //查询条数
        // offset: 0 //数据偏移量（分页查询使用）
      })
    } else {
      result = await this.app.mysql.select('questiontable');
    }
    // console.log(result);
    this.ctx.body = {
      data: result
    };
  }

  async getTestPaperList() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    let result;
    if (ctx.request.query.writer) {
      let sql;
      if (ctx.request.query.isEnd) {
        sql = "SELECT paperId,name,subject,startdate,enddate FROM testpapertable WHERE writer = '" + ctx.request.query.writer + "' AND enddate <  now()";
        // sql = "SELECT t.paperId,t.name,t.subject,t.startdate,t.enddate,s.credit FROM testpapertable t, subjecttable s WHERE t.writer = '" + ctx.request.query.writer + "' AND t.subject = s.subjectName";
      } else {
        sql = "SELECT paperId,name,subject,startdate,enddate FROM testpapertable WHERE writer = '" + ctx.request.query.writer + "' AND startdate >  now()";
      } 
      result = await this.app.mysql.query(sql);
      // console.log(result);
    } else if (ctx.request.query.subject) {
      const sql = "SELECT paperId,name,subject,startdate,enddate FROM testpapertable WHERE subject = '" + ctx.request.query.subject + "' AND enddate >  now()";
      result = await this.app.mysql.query(sql);
      // console.log(result);
    } else {
      const sql = "SELECT paperId,name,subject,startdate,enddate FROM testpapertable WHERE enddate >  now()";
      result = await this.app.mysql.query(sql);
    }
    this.ctx.body = {
      data: result
    }
  }

  async deleteTestPaper() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    const result = await this.app.mysql.delete('testpapertable', { paperId: ctx.request.body.paperId });
    this.ctx.body = {
      data: result
    }
  }

  async getTestPaperInfo() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    const result = await this.app.mysql.select('testpapertable', {
      where: {
        paperId: ctx.request.query.paperId
      }
    })
    // console.log(result)
    this.ctx.body = {
      data: result
    }
  }

  async getQuestionInfo() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    const result = await this.app.mysql.select('questiontable', {
      where: {
        questionId: ctx.request.query.questionId
      }
    })
    this.ctx.body = {
      data: result
    }
  }

  async saveAnswer() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    let result;
    let insertSuccess, insertId;
    const sql = "SELECT tempanswer FROM testpaperanswertable WHERE paperId='" + ctx.request.body.paperId +"' AND studentnumber='" + ctx.request.body.studentnumber + "'";
    const temp = await this.app.mysql.query(sql);
    let dataString = JSON.stringify(temp);
    let tempdata = JSON.parse(dataString);
    let arr = [];
    if(tempdata.length>=1) {
      let answerString;
      if(tempdata[0].tempanswer.indexOf('@') != -1) {
        arr = tempdata[0].tempanswer.split('@');
        arr[ctx.request.body.questionId] = ctx.request.body.tempanswer;
        // console.log(arr);
        answerString = arr[0];
      } else {
        arr[0] = tempdata[0].tempanswer;
        arr[ctx.request.body.questionId] = ctx.request.body.tempanswer;
      }
      answerString = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if(arr[i] == undefined) {
          arr[i] = '';
        }
        // console.log(arr[i]);
        answerString += '@'+arr[i];
      }
      const options = {  where: {paperId: ctx.request.body.paperId, studentnumber: ctx.request.body.studentnumber}};
      // console.log(answerString, '33333');
      let data;
      if(ctx.request.body.submit) {
        data = {
          tempanswer: answerString,
          answer: answerString
        }
      } else {
        data = {
          tempanswer: answerString,
        }
      }
      result = await this.app.mysql.update('testpaperanswertable', data, options);
      insertSuccess = result.affectedRows === 1;
    } else {
      let data;
      if(ctx.request.body.submit) {
        data = {
          paperId: ctx.request.body.paperId,
          studentnumber: ctx.request.body.studentnumber,
          tempanswer: ctx.request.body.tempanswer,
          subject: ctx.request.body.subject,
          answer: ctx.request.body.tempanswer
        }
      } else {
        data = {
          paperId: ctx.request.body.paperId,
          studentnumber: ctx.request.body.studentnumber,
          subject: ctx.request.body.subject,
          tempanswer: ctx.request.body.tempanswer,
        }
      }
      result = await this.app.mysql.insert('testpaperanswertable', data);
      insertSuccess = result.affectedRows === 1;
      insertId = result.insertId;
    }
    
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  async getTempAnswer() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    const sql = "SELECT tempanswer FROM testpaperanswertable WHERE paperId='" + ctx.request.query.paperId +"' AND studentnumber='" + ctx.request.query.studentnumber + "'";
    const result = await this.app.mysql.query(sql);
    let dataString = JSON.stringify(result);
    let tempdata = JSON.parse(dataString);
    // console.log(result, '++++');
    let arr = [];
    if(tempdata.length>=1) {
      if(tempdata[0].tempanswer.indexOf('@') != -1) {
        arr = tempdata[0].tempanswer.split('@')
      } else {
        arr[0] = tempdata[0].tempanswer;
      }
      // console.log(arr);
      
      if(arr[ctx.request.query.index] != 'undefine') {
        // console.log(arr[ctx.request.query.index], '+++')
        let res = arr[ctx.request.query.index];
        this.ctx.body = {
          answer: res
        }
      } else {
        this.ctx.body = {
         answer: ''
        }
      }
      // console.log(arr);
    } else {
      this.ctx.body = {
        answer: ''
       }
    }
  }

  async getTestPaperAnswerList() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    const sql = "SELECT t.paperId,t.totalgrade,u.number,u.name,u.college,u.major FROM testpaperanswertable t, usertable u WHERE t.paperId='" + ctx.request.query.paperId +"' AND t.studentnumber = u.number";
    const result = await this.app.mysql.query(sql);
    let dataString = JSON.stringify(result);
    let tempdata = JSON.parse(dataString);
    // console.log(tempdata, "=====");
    let res = tempdata.map(item => {
      if(item.totalgrade == 0) {
        item.tag = '待批阅';
      } else {
        item.tag = '已批阅';
      }
      return item;
    })
    // console.log(res, "=====");
    this.ctx.body = {
      data: res
    }
  }

  async getPaperAnswer(paperId, number) {
    // const { ctx } = this;
    // console.log(paperId, number, '+++++++++');
    const result = await this.app.mysql.select('testpaperanswertable', {
      columns: ['answer'],
      where: {
        paperId: paperId,
        studentnumber: number,
      }
    })
    let dataString = JSON.stringify(result);
    let tempdata = JSON.parse(dataString);
    let arr = [];
    if(tempdata.length>=1) {
      if(tempdata[0].answer.indexOf('@') != -1) {
        arr = tempdata[0].answer.split('@')
      } else {
        arr[0] = tempdata[0].answer;
      }
    }
    // console.log(arr);
    return arr;
    
    // this.ctx.body = {
    //   data: arr
    // }
  }

  async getPaperQuestion() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    let answerArr = await this.getPaperAnswer(ctx.request.query.paperId, ctx.request.query.number);
    // console.log("answerArr", answerArr);
    const sql = "SELECT t.paperId,t.name,t.subject,t.questions,s.credit FROM testpapertable t, subjecttable s WHERE t.paperId = '" + ctx.request.query.paperId + "' AND t.subject = s.subjectName";
    // const result = await this.app.mysql.select('testpapertable', {
    //   columns: ['paperId','name','subject','questions'],
    //   where: {
    //     paperId: ctx.request.query.paperId
    //   }
    // });
    const result = await this.app.mysql.query(sql);
    let dataString = JSON.stringify(result);
    let tempdata = JSON.parse(dataString);
    let paperInfo = {
      paperId: tempdata[0].paperId,
      name: tempdata[0].name,
      subject: tempdata[0].subject,
      credit: tempdata[0].credit
    };
    let chiocequestions = tempdata[0].questions.match(/(?<=@).*?(?=@)/);
    let gapfilling = tempdata[0].questions.match(/(?<=#).*?(?=\#)/);
    let shortanswerquestions = tempdata[0].questions.match(/(?<=\$).*?(?=\$)/);
    let questions = chiocequestions + ',' + gapfilling + ',' + shortanswerquestions;
    let arr = questions.split(',');
    // console.log(arr);
    let res = [];
    for (let index = 0; index < arr.length; index++) {
      const result = await this.app.mysql.select('questiontable', {
        where: {
          questionId: arr[index]
        }
      });
      let questionString = JSON.stringify(result);
      let questionData = JSON.parse(questionString);
      questionData[0].studentAnswer = answerArr[index];
      res[index] = questionData[0];
    }
    // console.log(res);
    this.ctx.body = {
      questionList: res,
      paperInfo: paperInfo
    }
  }

  async insterScore() {
    const { ctx } = this;
    // console.log(ctx.request.body, '+++++++++');
    const options = {  where: {
      studentnumber: ctx.request.body.studentnumber,
      paperId: ctx.request.body.paperId
    }};
    const result = await this.app.mysql.update('testpaperanswertable', ctx.request.body, options);
    const updateSuccess = result.affectedRows === 1;
    // console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }

  async getTestResult() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    let sql = "";
    if (ctx.request.query.subject) {
      // console.log('12121')
      sql = "SELECT ta.paperId,ta.totalgrade,ta.subject,s.credit FROM testpaperanswertable ta,subjecttable s  WHERE ta.studentnumber='" + ctx.request.query.studentnumber + "' AND ta.totalgrade<>-1 AND ta.subject='" + ctx.request.query.subject + "' AND ta.subject=s.subjectName";
    }else {
      // console.log('13131313');
      sql = "SELECT ta.paperId,ta.totalgrade,ta.subject,s.credit FROM testpaperanswertable ta,subjecttable s WHERE ta.studentnumber='" + ctx.request.query.studentnumber + "' AND ta.totalgrade<>-1 AND ta.subject=s.subjectName";
    }
    
    const result = await this.app.mysql.query(sql);
    // console.log(result);
    let dataString = JSON.stringify(result);
    let tempdata = JSON.parse(dataString);
    // console.log(tempdata);
    let res = tempdata.map(item => {
      if(item.totalgrade >= 60) {
        item.tag = '已通过';
        item.haveCredit = item.credit;
      } else {
        item.tag = '未通过';
        item.haveCredit = 0;
      }
      return item;
    })
    this.ctx.body = {
      data: res
    }
  }

  async getAnswerPaper() {
    const { ctx } = this;
    // console.log(ctx.request.query, '+++++++++');
    const result = await this.app.mysql.select('testpaperanswertable', {
      columns: ['paperId'], //查询字段，全部查询则不写，相当于查询*
      where: {
        studentnumber: ctx.request.query.number
      }, //查询条件
    })
    this.ctx.body = {
      data: result
    }
  }

}

module.exports = HomeController;
