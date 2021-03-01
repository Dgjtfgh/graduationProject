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
    const result = await this.app.mysql.insert('testpapertable', ctx.request.body)
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
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
    let res;
    // let date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (ctx.request.query.writer) {
      const sql = "SELECT paperId,name,subject,startdate,enddate FROM testpapertable WHERE writer = '" + ctx.request.query.writer + "' AND startdate >  now()";
      result = await this.app.mysql.query(sql);
      // console.log(result);
    } else {}
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
    console.log(ctx.request.query, '+++++++++');
    const result = await this.app.mysql.select('testpapertable', {
      where: {
        paperId: ctx.request.query.paperId
      }
    })
    console.log(result)
    this.ctx.body = {
      data: result
    }
  }

}

module.exports = HomeController;
