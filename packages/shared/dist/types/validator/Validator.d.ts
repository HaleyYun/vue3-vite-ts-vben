interface ValidatorConfig {
    source: object;
    rule: object;
    mul?: boolean;
}
export default class Validator {
    private readonly source;
    private readonly rule;
    private readonly mul;
    constructor(config: ValidatorConfig);
    /**
     * ghgh
     * @param callback
     */
    validate(callback: any): void;
}
export {};
