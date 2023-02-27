import * as assert from "assert";

class Accumulator{
    counter;
    constructor(initialValue: number) {
        this.counter = initialValue;
    }

    add(x:number){
        this.counter = this.counter + x;
    }
}
describe("Sourcemap works", function (){
    let instance;

    before(function (){
        instance = new Accumulator(1);
    })

    it("shows correct line when throwing", function(){
        instance.add(5);
        assert.equal(instance.counter,6);

        instance.add(5);
        assert.equal(instance.counter,10);
    })
})
