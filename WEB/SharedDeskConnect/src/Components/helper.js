export const isStrongPassword = (password) => {
  // Verifică dacă parola este suficient de puternică
  // Puteți implementa propriile criterii de validare aici
  // Exemplu simplu: Parola trebuie să aibă cel puțin 8 caractere
  return password.length >= 8;
};

export const doesUserExist = (users, username) => {
  return users.some((user) => user.username === username);
};

export const isUserAuthenticated = (users, username, password) => {
    // Check if any user in the list has the given username and password
    return users.some(user => user.username === username && user.password === password);
}
