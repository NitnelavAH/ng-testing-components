import {Person} from './person.model';

describe('Test for person', () => {
    let person: Person;
    beforeEach(() => {
        person = new Person('Juan', 'Chimal', 28, 70, 1.74)
    });
    
    it('attrs', () => {
        expect(person.name).toEqual('Juan');
        expect(person.lastName).toEqual('Chimal');
        expect(person.age).toEqual(28);
        expect(person.weigth).toEqual(70);
        expect(person.heigth).toEqual(1.74);
    })

    describe('test for calcIMC', () => {
        it('should return "down" for IMC less than 18', () => {
          const person = new Person('John', 'Doe', 20, 50, 1.8);
          expect(person.calcIMC()).toBe('down');
        });
      
        it('should return "normal" for IMC between 18 and 24', () => {
          const person = new Person('Jane', 'Doe', 25, 60, 1.7); // IMC = 20.8
          expect(person.calcIMC()).toBe('normal');
        });
      
        it('should return "overweigth" for IMC between 25 and 26', () => {
          const person = new Person('John', 'Doe', 28, 70, 1.65); // IMC = 26
          expect(person.calcIMC()).toBe('overweigth');
        });
      
        it('should return "overweigth level 1" for IMC between 27 and 29', () => {
          const person = new Person('Jane', 'Doe', 30, 75, 1.65); // IMC = 28
          expect(person.calcIMC()).toBe('overweigth level 1');
        });
      
        it('should return "overweigth level 2" for IMC between 30 and 39', () => {
          const person = new Person('John', 'Doe', 35, 90, 1.7); // IMC = 31
          expect(person.calcIMC()).toBe('overweigth level 2');
        });
      
        it('should return "overweigth level 3" for IMC 40 or more', () => {
          const person = new Person('Jane', 'Doe', 40, 120, 1.7); // IMC = 42
          expect(person.calcIMC()).toBe('overweigth level 3');
        });
      
        it('should return "not found" for invalid IMC', () => {
          const person = new Person('John', 'Doe', 25, -70, 1.7); // Negative weight should lead to invalid IMC
          expect(person.calcIMC()).toBe('not found');
        });
      });
    
});