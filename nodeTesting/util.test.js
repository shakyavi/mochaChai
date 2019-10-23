const { multiplierFunction } = require('./util');

test('Should return product of two natural numbers',()=>{
    let num = Math.floor(Math.random() * 10);
    let multiplier = Math.floor(Math.random() * 10);
    const product = multiplierFunction(num,multiplier);
    let expectedProduct = num*multiplier;

    console.log('number ',num);
    console.log('multiplier ', multiplier);
    console.log('expected product ', expectedProduct);
    console.log('obtained product ', product);
    expect(product).toBe(expectedProduct);
});