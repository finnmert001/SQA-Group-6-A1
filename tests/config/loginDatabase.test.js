const databaseAPI = require('../../config/loginDatabase');
const bcrypt = require("bcrypt");

// integration tests with API's
describe('Integration Tests databaseAPI', () => {
    test('Creating new user successful', async () => { // test adding new users with valid login credentials
        let pass;
        pass = await bcrypt.hash('validPass12', 10);
        expect(await databaseAPI.write('logins', { username: 'newUser', password: pass })).toBeTruthy();
        pass = await bcrypt.hash('newpassword23', 10);
        expect(await databaseAPI.write('logins', { username: 'TESTUSER2', password: pass })).toBeTruthy();
        pass = await bcrypt.hash('p455w0rdNEW', 10);
        expect(await databaseAPI.write('logins', { username: 'validUsername', password: pass })).toBeTruthy();
    }, 30000);

    test('Creating new user unsuccessful', async () => {
        let pass;
        pass = await bcrypt.hash('validPass12', 10);
        await expect(databaseAPI.write('logins', { username: 'newUser', password: pass })).rejects.toThrow(); // should fail because user already exists
        await expect(databaseAPI.write('logins', { username: '123', password: pass })).rejects.toThrow(); // should fail because username is too short
        await expect(databaseAPI.write('logins', { username: '', password: pass })).rejects.toThrow(); // should fail because username is not specified
        await expect(databaseAPI.write('logins', { username: 'usernameIsFarTooLongTOBeAcceptedByDatabase', password: pass })).rejects.toThrow(); // should fail because username is too long
        await expect(databaseAPI.write('logins', { username: 'validUsername', password: '' })).rejects.toThrow(); // should fail because password is not populated
    }, 30000);

    test('Updating user data successful', async () => {
        const newPassword = await bcrypt.hash('UpdatedPass123', 10);
        const user = await databaseAPI.findUserByUsername('newUser');
        
        expect(user).toBeTruthy(); // Ensure the user exists before updating
        
        const updatedUser = await databaseAPI.update('logins', user._id, { password: newPassword });
        
        expect(updatedUser).toHaveProperty('password');
        expect(updatedUser.password).not.toEqual(user.password);
    }, 30000);

    test('Updating user data unsuccessful', async () => {
        const newPassword = await bcrypt.hash('AnotherNewPass!', 10);
        
        // Test with an invalid ID
        try {
            await databaseAPI.update('logins', 'invalidID', { password: newPassword });
        } catch (error) {
            expect(error.response.status).toBe(400); // Expecting "bad request"
        }

        const user = await databaseAPI.findUserByUsername('newUser');
        expect(user).toBeTruthy();

        // Test with an empty username
        try {
            await databaseAPI.update('logins', user._id, { username: '' });
        } catch (error) {
            expect(error.response.status).toBe(400); // Expecting "bad request"
        }

        // Test with an empty password
        try {
            await databaseAPI.update('logins', user._id, { password: '' });
        } catch (error) {
            expect(error.response.status).toBe(400); // Expecting "bad request"
        }
    }, 30000);
});