/**
 * Creator: yeliex
 * Project: koa-response
 * Description: Response Middleware for koajs
 */

module.exports = (callback) => {
  return async (ctx, next) => {
    ctx.throw = (status = 404, msg, json = true) => {
      if (status && isNaN(Number(status) && !msg)) {
        json = msg;
        msg = status;
        status = 200;
      }

      ctx.status = status;

      let str;
      const response = {
        status,
        error: '',
        data: ''
      };

      // JSON Return
      if (status < 400) {
        response.data = msg;
      } else {
        response.error = msg || ctx.message;
      }

      if (json) {
        // JSON Return
        str = JSON.stringify(response);
        ctx.set('Content-Type', 'application/json');
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
        ctx.set('Content-Type', 'text/html');
      }

      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.body = str;

      if (typeof callback === 'function') {
        callback(ctx);
      }
    };

    await next();
  }
};
