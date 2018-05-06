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
        var result = new SearchResult();
        result.token = token;
        const titles = [new Villager(),new Seer(),new Psychic(),new Hunter(),new Wolf(),new Madman()];
        //var titleList = new List<Title>(titles);
        //var playerList:List<[TokenPlayer,Title]> = titleList.Select(x => [token.players[0],x] as [TokenPlayer,Title])
        var playerList:[TokenPlayer,Title][][] = token.players
                                                         .map(player => titles
                                                            .map(title =>
                                                                {
                                                                    return [player,title] as [TokenPlayer,Title]
                                                                }
                                                            )
                                                         );
        
        var answerList:List<List<[TokenPlayer,Title]>>;
        answerList = new List(playerList[0].map(x => new List([x])))
        
        const patternCheck = (titleName:string,num:number) => (pattern:List<[TokenPlayer,Title]>) => {
            return pattern.Where(pAndT => pAndT["1"].titleName == titleName).Count() <= num
        }

        var playerListTail = playerList.filter(x => playerList.indexOf(x) != 0);
        console.log("1人目の準備完了" + performance.now())
        playerListTail.forEach(ls => {
                answerList = answerList.SelectMany( (a:List<[TokenPlayer,Title]>) => {
                var arr:List<List<[TokenPlayer,Title]>> = new List([]);
                ls.forEach(ele => {
                        var arr2 = JSON.parse(JSON.stringify(a.ToArray()));
                        arr2.push(ele)
                        arr.Add(new List(arr2))
                })
                return arr;
            }).Where(patternCheck(Villager.titleNameStatic,3))//.Where(patternCheck(Villager.titleNameStatic,3))
            .Where(patternCheck(Seer.titleNameStatic,1))
            .Where(patternCheck(Psychic.titleNameStatic,1))
            .Where(patternCheck(Hunter.titleNameStatic,1))
            .Where(patternCheck(Wolf.titleNameStatic,2))
            .Where(patternCheck(Madman.titleNameStatic,1)).ToList();
            console.log("2人目以降" + performance.now())
        })
        /*for(var i=1;playerList.length;i++){                                            
            var answerList = answerList.SelectMany(a => {
                var arr:List<List<[TokenPlayer,Title]>> = new List([]);
                    for(var j =0;playerList[i].length;j++){
                        var arr2 = a.ToArray();
                        arr2.push(playerList[i][j])
                        arr.Add(new List(arr2))
                    }
                return arr;
            });
        }*/
        //var answerPattern:List<List<[TokenPlayer,Title]>> = playerList.Select(pAndT => new List<[TokenPlayer,Title]>([pAndT])).ToList();

        console.dir(playerList)
        console.dir(answerList)

        return result;
    }
}

export interface IWereWolfStore{
    searchResult:Observable<SearchResult>;
}

/*


        var testLs:List<List<[TokenPlayer,Title]>> = answerPattern.ToList();
        var testLs2 = testLs.SelectMany(x => titleList.Select(y => 
            {
                var xx = x.Select(xxx => );
                console.dir(xx)
                xx.Add([token.players[1],y])
                return xx;
            }
        )).ToList();

        /*const patternCheck = (titleName:string,num:number) => (pattern:List<[TokenPlayer,Title]>) => {
            return pattern.Where(pAndT => pAndT["1"].titleName == titleName).Count() == num
        }

        playerList.Select(p => answerPattern.Select(pattern => {
            pattern
        }))

        var testLs:List<List<[TokenPlayer,Title]>> = answerPattern.ToList();
        var testLs2 = testLs.SelectMany(x => titleList.Select(y => 
            {
                var xx = x.ToList();
                console.dir(xx)
                xx.Add([token.players[1],y])
                return xx;
            }
        )).ToList();

        console.dir(titleList)
        console.dir(testLs2)*/

        /*for(var i=1;i<playerList.Count();i++){
            answerPattern = answerPattern.SelectMany(x => titleList.Select(y => 
                {
                    var xx = x.ToList();
                    xx.Add([token.players[i],y])
                    return xx;
                }
            )).ToList();
            answerPattern = answerPattern.Where(patternCheck(Villager.titleNameStatic,3))
                                         .Where(patternCheck(Seer.titleNameStatic,1))
                                         .Where(patternCheck(Psychic.titleNameStatic,1))
                                         .Where(patternCheck(Hunter.titleNameStatic,1))
                                         .Where(patternCheck(Wolf.titleNameStatic,2))
                                         .Where(patternCheck(Madman.titleNameStatic,1)).ToList();
        }*/

        /*result.searchResult = answerPattern.Select(pAndTLs => pAndTLs.Select(pAndT => {
            const player = new ResultPlayer();
            player.name = pAndT["0"].name;
            player.co = pAndT["0"].co;
            player.aliveState = pAndT["0"].aliveState;
            player.title = titles.filter(t => t.titleName === pAndT["1"].titleName)[0]
            return player;
        }).ToArray()).ToArray();
        console.log("helloworld")
        this._searchResult.next(result)*/


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