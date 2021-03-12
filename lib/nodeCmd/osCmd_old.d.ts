declare const execCwd: (cmd: string, exitOnUnsupport?: boolean) => Promise<string>;
declare const portOccupy: (port: number | string, forceClose?: boolean, exitOnUnsupport?: boolean) => Promise<void>;
export { portOccupy, execCwd };
