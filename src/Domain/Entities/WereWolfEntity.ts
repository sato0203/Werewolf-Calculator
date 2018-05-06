import { Option, Some, None } from '@threestup/monads'

export class SearchToken{
    public players:Array<TokenPlayer>
    //day:Day;
}

export class SearchResult{
    public token:SearchToken;
    public searchResult:ResultPlayer[][];
}

export class Day{
    dayNum:number;
}

export class AliveState{
    constructor(stateName:string){
        this.stateName = stateName;
    }
    public stateName:string;
    public day:Option<Day>;
    
    public static readonly Alive = new AliveState("Alive");
    public static readonly Suspended = new AliveState("Suspended");
    public static readonly Attacked = new AliveState("Attacked");
    public static readonly SuddenDeath = new AliveState("SuddenDeath");
}

export enum SeerResult{
    White,
    Black
}

export enum PsychicResult{
    White,
    Black
}

export class TokenPlayer{
    name:String;
    co:Option<Title> ;
    aliveState:AliveState;
}

export class ResultPlayer{
    name:String;
    co:Option<Title>;
    aliveState:AliveState;
    title:Title;
}

export class Title{
    public static titleNameStatic:string;
    public titleName:string;
}

//村人
export class Villager extends Title{
    public static readonly titleNameStatic = "Villager"
    public titleName = Villager.titleNameStatic;
}

//占い師
export class Seer extends Title{
    public static readonly titleNameStatic = "Seer"
    public titleName = Seer.titleNameStatic;
    results:Array<[ResultPlayer,Option<SeerResult>]>
}

//霊媒師
export class Psychic extends Title{
    public static readonly titleNameStatic = "Psychic"
    public titleName = Psychic.titleNameStatic;
    results:Array<[ResultPlayer,Option<PsychicResult>]>
}

//狩人
export class Hunter extends Title{
    public static readonly titleNameStatic = "Hunter"
    public titleName = Hunter.titleNameStatic;
}

//人狼
export class Wolf extends Title{
    public static readonly titleNameStatic = "Wolf"
    public titleName = Wolf.titleNameStatic;
}

//狂人
export class Madman extends Title{
    public static readonly titleNameStatic = "Madman"
    public titleName = Madman.titleNameStatic;
}