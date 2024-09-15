export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your Project API',
            version: '1.0.0',
            description: 'API documentation for your project',
            contact: {
                name: 'API Support',
                email: 'support@yourdomain.com'
            },
        },
        servers: [
            {
                url: 'http://localhost:7001',
                description: 'Local development server'
            }
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to API docs
};