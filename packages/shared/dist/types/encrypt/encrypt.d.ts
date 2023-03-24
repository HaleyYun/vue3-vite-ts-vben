interface encryptConfig {
    publicKey?: string;
    privateKey?: string;
}
export default class Encrypt {
    protected readonly $publicKey?: string;
    protected readonly $privateKey?: string;
    protected $encrypt: any;
    constructor(config: encryptConfig);
    protected instanceEncrypt(): void;
    encrypt(val: any): any;
    decrypt(val: any): any;
}
export {};
