const bcrypt = require('bcrypt');
const databaseAPI = require('../../config/loginDatabase');
const {
  createNewUser,
  validateLoginDetailsFormat,
  presenceCheckLogin,
  userExists,
  checkPasswordMatch,
  validateLogin,
  validateSignup
} = require('../../routes/blog');

jest.mock('bcrypt');
jest.mock('../../config/loginDatabase');

describe('Blog Route Utility Functions', () => {
  describe('createNewUser', () => {
    it('should hash the password and write user details to the database', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const hashedPassword = 'hashedpassword';

      bcrypt.hash.mockResolvedValue(hashedPassword);
      databaseAPI.write.mockResolvedValue({});

      await createNewUser(username, password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(databaseAPI.write).toHaveBeenCalledWith('logins', {
        username: username,
        password: hashedPassword,
      });
    });
  });

  describe('validateLoginDetailsFormat', () => {
    it('should return true for valid username and password', () => {
      const username = 'validUser';
      const password = 'validPass123';
      const confirmPassword = 'validPass123';

      const result = validateLoginDetailsFormat(username, password, confirmPassword);

      expect(result).toBe(true);
    });

    it('should return false for invalid username', () => {
      const username = 'inv';
      const password = 'validPass123';
      const confirmPassword = 'validPass123';

      const result = validateLoginDetailsFormat(username, password, confirmPassword);

      expect(result).toBe(false);
    });

    it('should return false for invalid password', () => {
      const username = 'validUser';
      const password = 'short';
      const confirmPassword = 'short';

      const result = validateLoginDetailsFormat(username, password, confirmPassword);

      expect(result).toBe(false);
    });

    it('should return false if passwords do not match', () => {
      const username = 'validUser';
      const password = 'validPass123';
      const confirmPassword = 'differentPass';

      const result = validateLoginDetailsFormat(username, password, confirmPassword);

      expect(result).toBe(false);
    });
  });

  describe('presenceCheckLogin', () => {
    it('should return true if both username and password are provided', () => {
      const username = 'validUser';
      const password = 'validPass123';

      const result = presenceCheckLogin(username, password);

      expect(result).toBe(true);
    });

    it('should return false if username is missing', () => {
      const username = '';
      const password = 'validPass123';

      const result = presenceCheckLogin(username, password);

      expect(result).toBe(false);
    });

    it('should return false if password is missing', () => {
      const username = 'validUser';
      const password = '';

      const result = presenceCheckLogin(username, password);

      expect(result).toBe(false);
    });
  });

  describe('userExists', () => {
    it('should return user if user exists', async () => {
      const username = 'existingUser';
      const user = { username: 'existingUser', password: 'hashedpassword' };

      databaseAPI.findUserByUsername.mockResolvedValue(user);

      const result = await userExists(username);

      expect(result).toEqual(user);
    });

    it('should return null if user does not exist', async () => {
      const username = 'nonExistingUser';

      databaseAPI.findUserByUsername.mockResolvedValue(null);

      const result = await userExists(username);

      expect(result).toBeNull();
    });
  });

  describe('checkPasswordMatch', () => {
    it('should return true if passwords match', async () => {
      const password = 'password';
      const hashedPassword = 'hashedpassword';

      bcrypt.compare.mockResolvedValue(true);

      const result = await checkPasswordMatch(password, hashedPassword);

      expect(result).toBe(true);
    });

    it('should return false if passwords do not match', async () => {
      const password = 'password';
      const hashedPassword = 'hashedpassword';

      bcrypt.compare.mockResolvedValue(false);

      const result = await checkPasswordMatch(password, hashedPassword);

      expect(result).toBe(false);
    });
  });

  describe('validateLogin', () => {
    it('should return error message if fields are missing', async () => {
      const username = '';
      const password = 'password';

      const result = await validateLogin(username, password);

      expect(result).toBe('Please fill in all fields');
    });

    it('should return error message if user does not exist', async () => {
      const username = 'nonExistingUser';
      const password = 'password';

      databaseAPI.findUserByUsername.mockResolvedValue(null);

      const result = await validateLogin(username, password);

      expect(result).toBe('An account with this username does not exist');
    });

    it('should return error message if password is incorrect', async () => {
      const username = 'existingUser';
      const password = 'wrongPassword';
      const user = { username: 'existingUser', password: 'hashedpassword' };

      databaseAPI.findUserByUsername.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      const result = await validateLogin(username, password);

      expect(result).toBe('The password you entered was incorrect');
    });

    it('should return true if login details are valid', async () => {
      const username = 'existingUser';
      const password = 'password';
      const user = { username: 'existingUser', password: 'hashedpassword' };

      databaseAPI.findUserByUsername.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);

      const result = await validateLogin(username, password);

      expect(result).toBe(true);
    });
  });

  describe('validateSignup', () => {
    it('should return error message if details do not match format', async () => {
      const username = 'inv';
      const password = 'short';
      const confirmPassword = 'short';

      const result = await validateSignup(username, password, confirmPassword);

      expect(result).toBe('Details entered do not match requested format');
    });

    it('should return error message if user already exists', async () => {
      const username = 'existingUser';
      const password = 'validPass123';
      const confirmPassword = 'validPass123';
      const user = { username: 'existingUser', password: 'hashedpassword' };

      databaseAPI.findUserByUsername.mockResolvedValue(user);

      const result = await validateSignup(username, password, confirmPassword);

      expect(result).toBe('An account with this username already exists');
    });

    it('should return true if signup details are valid', async () => {
      const username = 'newUser';
      const password = 'validPass123';
      const confirmPassword = 'validPass123';

      databaseAPI.findUserByUsername.mockResolvedValue(null);

      const result = await validateSignup(username, password, confirmPassword);

      expect(result).toBe(true);
    });
  });
});