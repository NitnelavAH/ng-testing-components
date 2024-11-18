import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    component.people = [
      new Person('Peter', 'Parker', 24, 70, 1.7),
      new Person('Armando', 'Rivera', 24, 80, 1.8),
      new Person('Bruce', 'Wayne', 24, 80, 1.8),
    ];

    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(
      By.css('app-person')
    );

    fixture.detectChanges();

    expect(debugElement.length).toEqual(3)
  });

  it('should show a selected person', () => {
    // Arrange
    const personList = [
      new Person('Peter', 'Parker', 24, 70, 1.7),
      new Person('Armando', 'Rivera', 24, 80, 1.8),
      new Person('Bruce', 'Wayne', 24, 80, 1.8),
    ];
    component.people = personList;

    // Act
    fixture.detectChanges();
    const debugButtonList = fixture.debugElement.queryAll(
      By.css('app-person .btn-choose')
    );

    debugButtonList[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    const debugPersonSelectedInfo = fixture.debugElement.queryAll(
      By.css('.selectedPerson ul > li')
    );

    // Assert

    expect(debugPersonSelectedInfo[0].nativeElement.textContent).toContain(
      personList[0].name
    );
    expect(debugPersonSelectedInfo[1].nativeElement.textContent).toContain(
      personList[0].age
    );
  });
});
