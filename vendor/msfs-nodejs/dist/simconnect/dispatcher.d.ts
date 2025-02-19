import { Connection } from './connection';
import { ClientDataPeriod, ClientDataRequest, SimulatorDataPeriod } from './constants';
import { ClientDataArea, SimulatorDataArea } from './dataareas';
import { SystemEvent } from './events';
import { DispatcherResponse } from './types';
export interface Dispatcher {
    requestClientData(clientData: ClientDataArea, period: ClientDataPeriod, request: ClientDataRequest): boolean;
    requestSimulatorData(simulatorData: SimulatorDataArea, period: SimulatorDataPeriod): boolean;
    requestSimulatorDataForId(simulatorData: SimulatorDataArea, period: SimulatorDataPeriod, objectId: number): boolean;
    subscribeSystemEvent(systemEvent: SystemEvent): boolean;
    unsubscribeSystemEvent(systemEvent: SystemEvent): boolean;
    nextDispatch(): DispatcherResponse;
    lastError(): string;
}
export declare const Dispatcher: {
    new (connection: Connection): Dispatcher;
};
