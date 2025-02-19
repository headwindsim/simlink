import { Connection } from '../connection';
import { SystemEventType } from '../constants';
export interface SystemEvent {
    lastError(): string;
}
export declare const SystemEvent: {
    new (connection: Connection, systemEventId: number, eventType: SystemEventType): SystemEvent;
};
