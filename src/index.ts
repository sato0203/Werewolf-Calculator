import * as React from "react";
import * as ReactDOM from "react-dom";
import {Container} from "inversify";
import {Dispatcher, DispatcherInjectType} from "./Domain/Dispatcher/Dispatcher";
import { IWereWolfStore, IWereWolfStoreInjectType, WereWolfStore } from "./Domain/Stores/WereWolfStore";
import { SearchToken, TokenPlayer } from "./Domain/Entities/WereWolfEntity";
import "reflect-metadata"

const container = new Container();

//Bind
container.bind<Dispatcher>(DispatcherInjectType).to(Dispatcher).inSingletonScope();
container.bind<IWereWolfStore>(IWereWolfStoreInjectType).to(WereWolfStore).inSingletonScope();
//DependencyInject 
const dispatcher = container.get<Dispatcher>(DispatcherInjectType);
const wereWolfStore = container.get<IWereWolfStore>(IWereWolfStoreInjectType);

console.log("hello")
wereWolfStore.searchResult.subscribe(x => console.dir(x));

var token = new SearchToken();
token.players = [
    new TokenPlayer("アンナ"),
    new TokenPlayer("マイク"),
    new TokenPlayer("エリック"),
    new TokenPlayer("バニラ"),
    new TokenPlayer("メアリー")/*,
    new TokenPlayer("ジェイ"),
    new TokenPlayer("ショーン"),
    new TokenPlayer("ジェシカ"),
    new TokenPlayer("サンドラ")*/
]

dispatcher.search.next(token);