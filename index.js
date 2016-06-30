/**
 * Creator: yeliex
 * Project: koa-response
 * Description: Response Middleware for koajs
 */

module.exports = function (callback) {
  return function *response(next) {
    this.throw = function (status = 404, msg, json = true) {
      this.status = status;

      var
        str,
        response = {
          status,
          error: '',
          data: ''
        };

      // JSON Return
      if (status < 400) {
        response.data = msg;
      } else {
        response.error = msg || this.message;
      }

      if (json) {
        // JSON Return
        str = JSON.stringify(response);
        this.set('Content-Type', 'application/json');
      } else {
        // HTML Return
        if (status < 400) {
          str = msg;
        } else {
          str = (
            `<body style="width: 100%; margin: 0 auto;">
            <h1 style="width: 100%;text-align: center;padding: 30px 0 15px 0;">${response.status}</h1>
            <h2 style="width: 100%;text-align: center;padding: 15px 0 30px 0;border-bottom: solid 1px #666;">${response.error}</h2>
            <h4 style="width: 100%;text-align: center;padding: 30px 0;">koa.js && koa-response</h4>
            </body>`
          );
        }
        this.set('Content-Type', 'text/html');
      }

      this.set('Access-Control-Allow-Origin', '*');
      this.body = str;

      callback(this);
    };

    yield next;
  }
};
