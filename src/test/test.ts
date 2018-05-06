import * as mocha from "mocha";
import * as assert from "power-assert"
import { Container } from "inversify";
import * as Rx from "rxjs/Rx";
import { List } from "linqts";
import { Configuration } from "../configuration";
import {shallow,configure, EnzymeAdapter} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { testComponent } from "./Mock/EnzymeTestComponent";

describe('Mochaが動いてる', () => {
  it('joins all elements into a string with separator', () => {
    assert(['a', 'b', 'c'].join(':') === 'a:b:c');
  });
});

describe('enzymeが動いてる', function(){
  it('shallowがつかえる', () => {
      configure({adapter : new Adapter()});
      const dom = shallow(testComponent);
      assert.equal(dom.find("#hello").length,1)
      assert.equal(dom.find("#hoge").length,0)
    })
});