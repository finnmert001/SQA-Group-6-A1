const { validateLoginDetailsFormat, presenceCheckLogin } =  require('../../services/loginFunctions');

describe('Unit Tests validateLoginDetailsFormat()', () => {
    test('Login details are valid', () => {
        expect(validateLoginDetailsFormat('ValidUser', 'NewPass3', 'NewPass3')).toBeTruthy();
        expect(validateLoginDetailsFormat('newusername', 'MyPassword12', 'MyPassword12')).toBeTruthy();
        expect(validateLoginDetailsFormat('UserName123', 'p455w0rd', 'p455w0rd')).toBeTruthy();
        expect(validateLoginDetailsFormat('username', 'PASSWORD2%%', 'PASSWORD2%%')).toBeTruthy();
        expect(validateLoginDetailsFormat('USER89', 'a3£££££#', 'a3£££££#')).toBeTruthy();
    }, 30000);
    test('Login details do not match criteria', () => {
        expect(validateLoginDetailsFormat('John', 'Bob', 'Bob')).toBeFalsy();
        expect(validateLoginDetailsFormat('', '', '')).toBeFalsy();
        expect(validateLoginDetailsFormat('123', '123', '123')).toBeFalsy();
        expect(validateLoginDetailsFormat('NewAccount12', '', '')).toBeFalsy();
        expect(validateLoginDetailsFormat('NewAccount12', 'ILoveMusic23', 'Bob')).toBeFalsy();
        expect(validateLoginDetailsFormat(123, 123, 123)).toBeFalsy();
        expect(validateLoginDetailsFormat('NewAccount12', 'ValidPassword3', 123)).toBeFalsy();
        expect(validateLoginDetailsFormat('UsernameIsFarTooRidiculouslyLong', 'ValidPassword3', 'ValidPassword3')).toBeFalsy();
        expect(validateLoginDetailsFormat(true, false, false)).toBeFalsy();
        expect(validateLoginDetailsFormat('John89&', 'ValidPassword4', 'ValidPassword4')).toBeFalsy();
    }, 30000);
});
describe('Unit Tests presenceCheckLogin', () => {
    test('Login Details are present', () => {
        expect(presenceCheckLogin('username', 'password')).toBeTruthy();
        expect(presenceCheckLogin('1', '1')).toBeTruthy();
        expect(presenceCheckLogin(1, 1)).toBeTruthy();
        expect(presenceCheckLogin(true, true)).toBeTruthy();
        expect(presenceCheckLogin('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBeTruthy();
        expect(presenceCheckLogin('&8#@£^(', 12345)).toBeTruthy();
        expect(presenceCheckLogin(85353.975453, 'TEST&%$£(*^"')).toBeTruthy();
    }, 30000);
    test('Login Details are not present', () => {
        expect(presenceCheckLogin('', '')).toBeFalsy();
        expect(presenceCheckLogin('PRESENT', '')).toBeFalsy();
        expect(presenceCheckLogin('', 'PRESENT')).toBeFalsy();
        expect(presenceCheckLogin('', 1234)).toBeFalsy();
        expect(presenceCheckLogin('', true)).toBeFalsy();
        expect(presenceCheckLogin(1234, '')).toBeFalsy();
        expect(presenceCheckLogin(true, '')).toBeFalsy();
    }, 30000);
});