// const fs = require('fs');
// const path = require('path');
// const React = require('react');
// const { renderToString } = require('react-dom/server');
// // const { StaticRouter } = require('react-router-dom');
// // const { renderRoutes } = require('react-router-config');
// // const { Provider } = require('react-redux');

// const Test = require('../../frontend/src/App');

// // import Routes from '../../frontend/routes/routes';
// // import store from '../../frontend/redux/store';

// module.exports = function injector(location) {
//     try {
//         const content = renderToString(Test);

//         const dir = path.resolve(__dirname, './index.html');

//         let data = fs.readFileSync(dir, 'utf8');

//         data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

//         return data;
//     } catch(err) {
//         console.error(err);

//         return null;
//     }
// }
