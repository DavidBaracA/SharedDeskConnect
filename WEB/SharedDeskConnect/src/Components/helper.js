export const isStrongPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const isLongEnough = password.length >= 8;
  return hasUpperCase && hasDigit && isLongEnough;
};

export const doesUserExist = (users, username) => {
  return users.some((user) => user.username === username);
};

export const isUserAuthenticated = (users, username, password) => {
  // Check if any user in the list has the given username and password
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

export const getImageTypeFromBase64 = (base64Data) => {
  if (base64Data) {
    if (base64Data.startsWith('/9j/')) {
        return 'image/jpeg';
      } else if (base64Data.startsWith('iVBORw0KGgoAAA')) { // Sample prefix for PNG images
        return 'image/png';
      } else {
        return null; // Unknown image type
      }
  }
  return;
};
