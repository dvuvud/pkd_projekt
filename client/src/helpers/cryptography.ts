export const generateKeyPair = async () => {
    try {
        const keyPair: CryptoKeyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: "SHA-256",
        },
        true,
            ["encrypt", "decrypt"]
        );

        const publicKeyBuffer: ArrayBuffer = await window.crypto.subtle.exportKey(
            "spki",
            keyPair.publicKey
        );
        
        const privateKeyBuffer: ArrayBuffer = await window.crypto.subtle.exportKey(
            "pkcs8",
            keyPair.privateKey
        );

        const publicKeyPem: string = formatKey(publicKeyBuffer, 'PUBLIC KEY');
        const privateKeyPem: string = formatKey(privateKeyBuffer, 'PRIVATE KEY');

        console.log(publicKeyPem);
        console.log(privateKeyPem);

        localStorage.setItem('private_key', privateKeyPem);

        downloadPrivateKey(privateKeyPem);

    } catch (error) {
        console.error('Error generating keys:', error);
    }
};

const formatKey = (buffer: ArrayBuffer, label: string) => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return `-----BEGIN ${label}-----\n${base64.match(/.{1,64}/g).join('\n')}\n-----END ${label}-----`;
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