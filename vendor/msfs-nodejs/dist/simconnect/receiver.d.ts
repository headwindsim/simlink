import { Connection } from './connection';
import { ClientDataPeriod, ClientDataRequest, SimulatorDataPeriod } from './constants';
import { ClientDataArea, SimulatorDataArea } from './dataareas';
import { SystemEvent } from './events';
import { ClientDataRequestMessage, ErrorMessage, ExceptionMessage, OpenMessage, SimulatorDataRequestMessage, SystemEventMessage } from './types';
export type ReceiverCallbacks = {
    open: (message: OpenMessage) => void;
    quit: () => void;
    clientData: (message: ClientDataRequestMessage) => void;
    simulatorData: (message: SimulatorDataRequestMessage) => void;
    systemEvent: (message: SystemEventMessage) => void;
    exception: (message: ExceptionMessage) => void;
    error: (message: ErrorMessage) => void;
};
export declare class Receiver {
    private dispatcher;
    private interval;
    private callbacks;
    constructor(connection: Connection);
    private processDispatch;
    addCallback<K extends keyof ReceiverCallbacks>(event: K, callback: ReceiverCallbacks[K]): void;
    start(): void;
    stop(): void;
    requestClientData(clientData: ClientDataArea, period: ClientDataPeriod, request: ClientDataRequest): boolean;
    requestSimulatorData(simulatorData: SimulatorDataArea, period: SimulatorDataPeriod): boolean;
    requestSimulatorDataForId(simulatorData: SimulatorDataArea, period: SimulatorDataPeriod, objectId: number): boolean;
    subscribeSystemEvent(systemEvent: SystemEvent): boolean;
    unsubscribeSystemEvent(systemEvent: SystemEvent): boolean;
}
