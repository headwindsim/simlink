export interface Connection {
    open(clientName: string): boolean;
    close(): void;
    isConnected(): boolean;
    lastError(): string;
}
export declare const Connection: {
    new (): Connection;
};
