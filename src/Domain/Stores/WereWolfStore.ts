import { SearchToken, SearchResult, ResultPlayer, Wolf, Madman, Villager, Seer, Psychic, Hunter, TokenPlayer, Title} from "../Entities/WereWolfEntity";
import { BehaviorSubject } from "rxjs";
import { Dispatcher } from "../Dispatcher/Dispatcher";
import { Result } from "@threestup/monads";
import { Enumerable, List } from "linqts";

export class WereWolfStore implements IWereWolfStore{
    constructor(dispatcher:Dispatcher){
        dispatcher.search.subscribe(token => this.search(token))
    }

    private _searchResult:BehaviorSubject<SearchResult>;
    public get searchResult(){
        return this._searchResult.asObservable();
    }

    private search = (token:SearchToken) => {
        var result = new SearchResult();
        result.token = token;
        const titles = [new Villager(),new Seer(),new Psychic(),new Hunter(),new Wolf(),new Madman()];
        var titleList = new List<Title>(titles);
        var playerList:List<[TokenPlayer,Title]> = titleList.Select(x => [token.players[0],x] as [TokenPlayer,Title])
        var answerPattern:List<List<[TokenPlayer,Title]>> = playerList.Select(pAndT => new List<[TokenPlayer,Title]>([pAndT])).ToList();

        const patternCheck = (titleName:string,num:number) => (pattern:List<[TokenPlayer,Title]>) => {
            return pattern.Where(pAndT => pAndT["1"].titleName == titleName).Count() == num
        }

        for(var i=1;i<9;i++){
            answerPattern = answerPattern.SelectMany(x => titleList.Select(y => 
                {
                    var xx = x.ToList();
                    xx.Add([token.players[i],y])
                    return xx;
                }
            ))
            answerPattern = answerPattern.Where(patternCheck(Villager.titleNameStatic,3))
                                         .Where(patternCheck(Seer.titleNameStatic,1))
                                         .Where(patternCheck(Psychic.titleNameStatic,1))
                                         .Where(patternCheck(Hunter.titleNameStatic,1))
                                         .Where(patternCheck(Wolf.titleNameStatic,2))
                                         .Where(patternCheck(Madman.titleNameStatic,1))
        }

        result.searchResult = answerPattern.Select(pAndTLs => pAndTLs.Select(pAndT => {
            const player = new ResultPlayer();
            player.name = pAndT["0"].name;
            player.co = pAndT["0"].co;
            player.aliveState = pAndT["0"].aliveState;
            player.title = titles.filter(t => t.titleName === pAndT["1"].titleName)[0]
            return player;
        }).ToArray()).ToArray();

        this._searchResult.next(result)

        return result;
    }
}

export interface IWereWolfStore{
    
}

/*

        var allPatternEachPlayer:[ResultPlayer,Title][][] = token.players.map(player => {
            let p = new ResultPlayer();
            p.co = player.co;
            p.name = player.name;
            p.aliveState = player.aliveState;
            return p.co.match({
                some:(c) => {
                    return [
                        [p,c],
                        [p,new Wolf()],
                        [p,new Madman()]
                    ] as [ResultPlayer,Title][]
                },
                none:() => {
                    return [
                        [p,new Villager()],
                        [p,new Seer()],
                        [p,new Psychic()],
                        [p,new Hunter()],
                        [p,new Wolf()],
                        [p,new Madman()]
                    ] as [ResultPlayer,Title][]
                }
            })
        });
        var allPattern:ResultPlayer = [() => {

        }]

        const patternCheck = (titleName:string,num:number) => (pattern:[ResultPlayer,Title][]) => {
            return pattern.filter(pAndT => pAndT["1"].titleName == titleName).length == num
        }
        var answerPattern = allPattern
                  .filter(patternCheck(Villager.titleNameStatic,3))
                  .filter(patternCheck(Seer.titleNameStatic,1))
                  .filter(patternCheck(Psychic.titleNameStatic,1))
                  .filter(patternCheck(Hunter.titleNameStatic,1))
                  .filter(patternCheck(Wolf.titleNameStatic,2))
                  .filter(patternCheck(Madman.titleNameStatic,1))
                  .map(pattern => {pattern["1"].
                      const player = pattern["1"].
                  })
        this._searchResult.next(answerPattern) */