import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  person: Person = new Person('Name', 'LastName', 30, 80, 1.69);
  people: Person[] = [
    new Person('Pedro', 'LastName', 25, 70, 1.69),
    new Person('juan', 'Las', 30, 80, 1.69)
  ];

  selectedPerson: Person | null =  null;

  constructor() { }

  ngOnInit(): void {
  }

  choose(person: Person) {
    this.selectedPerson = person;
  }

}
