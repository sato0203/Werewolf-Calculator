import { inject,injectable } from "inversify";
import "reflect-metadata";
import { Subject } from "rxjs";
import { SearchToken } from "../Entities/WereWolfEntity";

export const DispatcherInjectType = Symbol();
@injectable()
export class Dispatcher{
    public search:Subject<SearchToken> = new Subject<SearchToken>();
}