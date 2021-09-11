const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

module.exports = function (app, prefix) {
  prefix = prefix || '';
  var options = {
    swaggerDefinition: {
      info: {
        title: 'Sunrise Gaming Backend',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'https://sunrise-gaming-backend.io',
        },
      ],
    },
    apis: [path.resolve(__dirname, '../../feature/**/*.js')],
  };

  var swaggerSpec = swaggerJSDoc(options);
  app.get(prefix + '/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    (swaggerSpec.securityDefinitions = {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    }),
      (swaggerSpec.security = [
        {
          bearerAuth: [],
        },
      ]);

    res.send(swaggerSpec);
  });

  options = {
    swaggerUrl: prefix + '/api-docs.json',
    showExplorer: true,
  };

  app.use(
    prefix + '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(null, options)
  );
};
