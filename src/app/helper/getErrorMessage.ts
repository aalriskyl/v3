export const getErrorMessage = (error: any): string => {
  const response = error?.response?.data;

  if (response) {
    // Check for `field` in the response first
    if (response.field) {
      let errorMessage = null;
      Object.keys(response.field).forEach((key) => {
        errorMessage = key.length > 2 ? `${key}: ${response.field[key]}` : null;
      });
      return errorMessage || response.field || "Internal Server Error";
    }

    // If `field` doesn't exist, check for `message`
    if (response.message) {
      return response.message;
    }
  }

  // Default error message
  return "Internal Server Error";
};