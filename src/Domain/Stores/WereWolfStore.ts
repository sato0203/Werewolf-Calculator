import { SearchToken, SearchResult, ResultPlayer, Wolf, Madman, Villager, Seer, Psychic, Hunter, TokenPlayer, Title} from "../Entities/WereWolfEntity";
import { BehaviorSubject, Observable } from "rxjs";
import { Dispatcher, DispatcherInjectType } from "../Dispatcher/Dispatcher";
import { Result } from "@threestup/monads";
import { Enumerable, List } from "linqts";
import { inject, injectable } from "inversify";
import "reflect-metadata";

export const IWereWolfStoreInjectType = Symbol();
@injectable()
export class WereWolfStore implements IWereWolfStore{
    constructor(@inject(DispatcherInjectType)dispatcher:Dispatcher){
        dispatcher.search.subscribe(token => this.search(token))
    }

    private _searchResult:BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>(new SearchResult());
    public get searchResult(){
        return this._searchResult.asObservable();
    }

    
    private search = (token:SearchToken) => {
        console.log("searchStart" + performance.now())
        //ToDo:メモ化(今で十分早いけど。)
        const searchFunction:(a:string[],b:number,c:number,d:number,e:number,f:number,g:number,h:{}) => List<string>[]
         = (arr:string[],villager:number,wolf:number,seer:number,hunter:number,psychic:number,madman:number,memo:Array<{key:string,value:string[][]}>) => {
            const seed = Enumerable.Range(0,6).Select(_ => arr.slice()).ToArray();
            let answer = new Array<List<string>>();
            if(villager != 0){
                seed[0].push("villager")
                const a = searchFunction(seed[0],villager-1,wolf,seer,hunter,psychic,madman,memo);
                answer = answer.concat(a)
            }
            if(wolf != 0){
                seed[1].push("wolf")
                const a = searchFunction(seed[1],villager,wolf-1,seer,hunter,psychic,madman,memo);
                answer = answer.concat(a)
            }
            if(seer != 0){
                seed[2].push("seer")
                const a = searchFunction(seed[2],villager,wolf,seer-1,hunter,psychic,madman,memo);
                answer = answer.concat(a)
            }
            if(hunter != 0){
                seed[3].push("hunter")
                const a = searchFunction(seed[3],villager,wolf,seer,hunter-1,psychic,madman,memo);
                answer = answer.concat(a)
            }
            if(psychic != 0){
                seed[4].push("psychic")
                const a = searchFunction(seed[4],villager,wolf,seer,hunter,psychic-1,madman,memo);
                answer = answer.concat(a)
            }
            if(madman != 0){
                seed[5].push("madman")
                const a = searchFunction(seed[5],villager,wolf,seer,hunter,psychic,madman-1,memo);
                //memo[`${villager},${wolf},${seer},${hunter},${psychic},${madman}`] = a;
                answer = answer.concat(a)
            }
            if(villager == 0 && wolf == 0 && seer == 0 && hunter == 0 && psychic == 0 && madman == 0){
                answer = answer.concat(new List<string>(seed[0]))
            }
            return answer;
        }
        var answer = searchFunction([],3,2,1,1,1,1,{});
        var ls = answer.map(a => 
            Enumerable.Range(0,token.players.length).Select(i => {
                var x = a.ToArray()[i]
                var p = token.players[i]
                return [x,p] as [string,TokenPlayer]
        }))
        console.dir(ls)
    }
}

export interface IWereWolfStore{
    searchResult:Observable<SearchResult>;
}
