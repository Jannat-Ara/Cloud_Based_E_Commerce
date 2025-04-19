module.exports = {
  success: (data) => {
      return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          status: 'success',
          data: data,
      };
  },
  error: (message) => {
      return {
          statusCode: 400,
          status: 'error',
          message: message,
      };
  },
};
