interface SuccessResponse<T> {
    status: 'ok';
    statusCode: number;
    result: T;
}

interface ErrorResponse {
    status: 'error';
    statusCode: number;
    message: string;
}

const success = <T>(statusCode: number, result: T): SuccessResponse<T> => {
    return {
        status: 'ok',
        statusCode,
        result
    };
};

const error = (statusCode: number, message: string): ErrorResponse => {
    return {
        status: 'error',
        statusCode,
        message
    };
};

export { success, error, SuccessResponse, ErrorResponse };
