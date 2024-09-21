export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Subscription User Side API',
            version: '1.0.0',
            description: 'API documentation for the user side of the subscription based project',
            contact: {
                name: 'abc',
                email: 'abc@gmail.com'
            },
        },
        servers: [
            {
                url: 'http://localhost:7001',
                description: 'Local development server'
            }
        ],
        components: {
            schemas: {
                apiResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            description: 'Either ok or error'
                        },
                        statuscode: {
                            type: 'number',
                            description: 'Status code for the response'
                        },
                        result: {
                            type: 'object',
                            description: 'The required object or the success/error message'
                        }
                    }
                }
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            }
        },
        security: [{
            ApiKeyAuth: []
        }]
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to API docs
};