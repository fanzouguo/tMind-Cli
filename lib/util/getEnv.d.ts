interface IenvTmind {
    obj: ICliConf;
    arr: string[];
}
export declare const getEnvCli: () => Promise<IenvTmind>;
export declare const setEnvCli: (data: string | string[]) => Promise<void>;
export {};
