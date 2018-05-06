
import * as React from "react";
import * as ReactDOM from "react-dom";

export class EnzymeTestComponent extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        console.log("const")
    }
    render(){
        return(
            <div>
                <span id = {"hello"}>HelloWorld</span>
            </div>
        );
    }
}

export const testComponent:JSX.Element = (<EnzymeTestComponent/>);