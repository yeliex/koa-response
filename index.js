/**
 * Creator: yeliex
 * Project: koa-response
 * Description: Response Middleware for koajs
 */

module.exports = (callback, cors = true) => {
  return async (ctx, next) => {
    ctx.throw = (status = 404, msg, json = true) => {
      if (status && isNaN(Number(status)) && !msg) {
        json = msg;
        msg = status;
        status = 200;
      } else if (isNaN(Number(status))) {
        status = 500;
        msg = (msg.data || {}).message || msg.message || msg.error || msg.msg || msg.code || msg;
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

      if (cors) {
        ctx.set({
          'Access-Control-Allow-Origin': ctx.get('origin') || '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': ctx.get('Access-Control-Request-Method') || 'GET,POST,HEAD,DELETE,PUT,OPTIONS',
          'Access-Control-Allow-Headers': ctx.get('Access-Control-Request-Headers') || '*',
          'Access-Control-Max-Age': '86400'
        })
      }

      ctx.body = str;

      if (typeof callback === 'function') {
        callback(ctx);
      }
    };

    await next();
  }
};
