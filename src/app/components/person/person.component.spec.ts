import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person("Juan", "Casillas", 27, 70, 1.75);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul the name be "Juan"', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h3> with "Hola, {person.name}"', () => {
    //Arrange
    component.person = new Person("Juan Name", "Casillas", 27, 70, 1.75);
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    // Assert
    expect(h3Element?.textContent).toEqual(`Hola, ${component.person.name}`);
  });

  it('should have <p> with "Mi estatura es {person.heigth}"', () => {
    component.person = new Person("Juan Name2", "Casillas", 27, 70, 1.75);
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();
    // Assert
    expect(pElement?.textContent).toContain(component.person.heigth);
  });

  it('should display a text with IMC when do click', () => {
    // ARRANGE
    const expectedMsg = 'overweigth level 3'
    component.person = new Person("Juan Name2", "Casillas", 30, 120, 1.65);
    const buttoDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const button = buttoDebug.nativeElement;
    //ACT
    buttoDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //ASSERT
    expect(button.textContent).toContain(expectedMsg);
    
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectedPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected
    .subscribe(person => selectedPerson = person);
    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  })
});

@Component({
  template: `
    <app-person [person]="person" (onSelected)="onSelected($event)"></app-person>
  `,
})
export class HostComponent {
	person: Person = new Person('Name', 'LastName', 30, 80, 1.69);
  selectedPerson: Person | undefined;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}


fdescribe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectName = component.person.name;
    const h3De = fixture.debugElement.query(By.css('app-person h3'));
    const h3El = h3De.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3El.textContent).toContain(expectName);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const btnDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  })
})