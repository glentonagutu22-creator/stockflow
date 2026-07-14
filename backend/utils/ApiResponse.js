class ApiResponse {
  static success(message, data = null) {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message, errors = []) {
    return {
      success: false,
      message,
      errors,
    };
  }
}

export default ApiResponse;