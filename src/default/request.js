import request from 'superagent';

export default (method0, uri, ...args) => {
  const method = method0.toLowerCase();

  let qs;
  let post;
  let attaches = [];

  if (args.length === 1) {
    if (method === 'get') {
      [qs] = args;
      post = {};
    }

    if (method !== 'get') {
      qs = {};
      [post] = args;
    }
  }

  if (args.length === 2) {
    [qs, post] = args;
  }

  if (args.length === 3) {
    [qs, post, attaches] = args;
  }

  const req = request[method](uri)
    .query(qs)
    .send(post);

  attaches.forEach((f) => {
    req.attach(f.name, f.file, f.options);
  });

  return req.then(({ body: out }) => out)
    .catch((err) => {
      if (err && err.response && err.response.body && err.response.body.result !== 'ok') {
        console.log('error1', JSON.stringify(err.response.body));

        if (err && err.response) {
          return err.response.body;
        }
      }

      return err;
    });
};
