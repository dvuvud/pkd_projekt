/**
 * Generates an RSA key-pair consisting of one public key and one private key.
 * The keys are converted into PEM-format, which is a standardized format to save keys in pure text. The private key is then stored in the browser local storage.
 * The storage is probably not a good security practice, but it is used for demo purposes.
 * The function is asynchronous and therefore returns a promise, which contains the public and private keys in PEM-format.
 * @returns {Promise<{string, string}>}
 */
export const generateKeyPair = async (): Promise<{publicKeyPem: string, privateKeyPem: string}> => {
    try {
        const keyPair: CryptoKeyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP", //algorithm
                modulusLength: 2048, //default value
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]), //defualt value
                hash: "SHA-256", //secure hashing algorithm
            },
            true, //extractable or not
            ["encrypt", "decrypt"] //allowed usages
        );

        const publicKeyBuffer: ArrayBuffer = await window.crypto.subtle.exportKey(
            "spki", //well known format to export public keys
            keyPair.publicKey
        );
        
        const privateKeyBuffer: ArrayBuffer = await window.crypto.subtle.exportKey(
            "pkcs8", //well konwn format to export private keys 
            keyPair.privateKey
        );

        //convert the keys to readable strings, add headers and footers ("--- PUBLIC KEY ----" or "---- PRIVATE KEY -----") 
        const publicKeyPem: string = convertKeyToPem(publicKeyBuffer, 'PUBLIC KEY');  
        const privateKeyPem: string = convertKeyToPem(privateKeyBuffer, 'PRIVATE KEY');

        //save the private key in local storage, so that it can be used to decrypt incoming messages
        localStorage.setItem('private_key', privateKeyPem);
        localStorage.setItem('public_key', publicKeyPem);

        //optional: prompt the user to download the private key to device
        downloadPrivateKey(privateKeyPem);

        return {publicKeyPem, privateKeyPem};
    } catch (error) {
        console.error('Error generating keys:', error);
    }
};

/**
 * Takes a public key in PEM format and a message in plain text.
 * Encrypts the message using the public key. The message can only be encrypted using the respective private key.
 * @param publicKeyPem 
 * @param message 
 * @returns { string } - The encrypted message
 */
export const encryptMessage = async (publicKeyPem, message) => {
    // Import the key using similar settings as when created (see function generateKeyPair)
    const publicKey = await crypto.subtle.importKey(
        'spki',
        convertPemToKey(publicKeyPem),
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        true,
        ['encrypt']
    );

    // encrypt the message
    const encrypted = await crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        publicKey,
        new TextEncoder().encode(message)
    );

    //return the encrypted message, converted into Base64 format (just a string format, used for convenience, not security) for transmission over the API
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};
  
/**
 * Takes a private key in PEM format and a decrypted message in Base64 format
 * Decrypts the message using the private key.
 * @param privateKeyPem 
 * @param base64Ciphertext 
 * @returns { string } - The decrypted message
 */
export const decryptMessage = async (privateKeyPem, base64Ciphertext) => {
    // Import the private key using similar settings as when created (see function generateKeyPair)
    const privateKey = await crypto.subtle.importKey(
        'pkcs8',
        convertPemToKey(privateKeyPem),
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        true,
        ['decrypt']
    );

    // decrypt the message
    const decrypted = await crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        privateKey,
        Uint8Array.from(atob(base64Ciphertext), c => c.charCodeAt(0))
    );

    return new TextDecoder().decode(decrypted);
};

/**
 * Takes a key in binary format and converts it into PEM-format.
 * @param buffer 
 * @param label 
 * @returns { string } - The key in PEM format
 */
const convertKeyToPem = (buffer: ArrayBuffer, label: string): string => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return `-----BEGIN ${label}-----\n${base64.match(/.{1,64}/g).join('\n')}\n-----END ${label}-----`;
};

/**
 * Takes a key in PEM format and converts it into binary format 
 * @param pem 
 * @returns { ArrayBuffer } - The key in binary format 
 */
const convertPemToKey = (pem: string): ArrayBuffer => {
    const pemContents = pem.replace(/-{5}.*?-{5}/g, '').replace(/\s/g, '');
    return Uint8Array.from(atob(pemContents), c => c.charCodeAt(0)).buffer;
};

const downloadPrivateKey = (key: string) => {
    if (!key) return;
    
    const blob = new Blob([key], { type: 'application/x-pem-file' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "privateKey.pem";
    
    if (!window.confirm('A key pair has been generated. Do you want to download the private key?')) {
        URL.revokeObjectURL(url);
        return;
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Uncomment below if you want to test the functions
/*
await generateKeyPair();

const publicKey = localStorage.getItem("public_key");
const privateKey = localStorage.getItem("private_key")

//console.log(publicKey);

const message = "Hej, jag heter benjamin"
console.log("Plain text message: " + message);

const encryptedMessage = await encryptMessage(publicKey, message);

console.log("Encrypted message: " + encryptedMessage);

const decryptedMessage = await decryptMessage(privateKey, encryptedMessage);

console.log("Decrypted message: " + decryptedMessage);
*/