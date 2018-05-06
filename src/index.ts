import * as React from "react";
import * as ReactDOM from "react-dom";
import {Container} from "inversify";
import {Dispatcher, DispatcherInjectType} from "./Domain/Dispatcher/Dispatcher";


const container = new Container();

//Bind
container.bind<Dispatcher>(DispatcherInjectType).to(Dispatcher).inSingletonScope();

//DependencyInject
var server = container.get<Dispatcher>(DispatcherInjectType);