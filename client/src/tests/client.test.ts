import { encryptMessage, decryptMessage } from '../helpers/cryptography'

const testPublicKey: string = `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLpr2Mkc4ogWNnnBdHhTaY8IeC
    FE6SrCN6LesLuR3+MDJtCO5+Zuz91K6ii7j5Dupq4IAlErWEsHqyAh90rUO9z1g1
    y9C08MN6g3fVVkp6vVd2AspSnqpWvb+sWi/ktSccgFoM+ms0SaWOvcvvOynsxzAa
    xQ/H0Rw/NbBhYzrEbQIDAQAB
    -----END PUBLIC KEY-----
`

const testPrivateKey: string = `
    -----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDLpr2Mkc4ogWNnnBdHhTaY8IeCFE6SrCN6LesLuR3+MDJtCO5+
    Zuz91K6ii7j5Dupq4IAlErWEsHqyAh90rUO9z1g1y9C08MN6g3fVVkp6vVd2AspS
    nqpWvb+sWi/ktSccgFoM+ms0SaWOvcvvOynsxzAaxQ/H0Rw/NbBhYzrEbQIDAQAB
    AoGBAICBJJZw4s+4ZYtZeW8N5he3nyo7uiDfMjvEgc6R7xUYQJmAy01DkUPSUqgK
    1puCB/WM2A+MsLGb0rBEmqi7NESOnTCuW/ptI8jvUJbc2Ae1L51nCrG68JbJJBUm
    ezdzFHwbLfXcVUAP5ti/gPmHZ7Ka5NtMwSNGqz9rlSKdr/VBAkEA9I8c/WnqTHDu
    wvzS8iXElemj+slevJvh7a0KkcwDxBKe1YLT79eTx0YgBxgE/X7kwsUxFTd0vNDR
    NNVZWsiURQJBANUttWDDt8ELeqJ43cjLbe2898n5i0qZT1M35Y1nvfBmRZV7tYeO
    Fxx46IolR9NoVdcIVbmfi6YZ8VKNwss7NgkCQQDa60l+J9PO/cEd1whWLyzdLbrW
    gnBF0hzaj+5IOSKd4DVC18w0hPwKhGGjOAMvkOni2HZpkaz0YNEFxH4qYCcpAkBV
    rpJ5OxEPOTLoPJY/z2v2ov4hIviWWjpk41GTXUAdcK3FIDzdKAIoAnzMkaFl2kiu
    Lf5upi616zVwjePeVYUpAkANFyN43j+Odr+pqX2slruqBTJc7N+GqySgmEVilLI1
    bSKdAzRhw+hDIz0BlSPVdBDibyfyX4LuyaufXQE6KUKo
    -----END RSA PRIVATE KEY-----
`

const testString: string = "This is ä test string, with söme different charactérs!"

test("Encrypting", async () => {
    const encryptedString = await encryptMessage(testPublicKey, testString);
    expect(encryptedString).not.toBe(testString)
});

test("Encrypting and decrypting", async () => {
    const encryptedString = await encryptMessage(testPublicKey, testString);
    const decryptedString = await decryptMessage(testPrivateKey, encryptedString);
    expect(testString).toBe(decryptedString);
});
