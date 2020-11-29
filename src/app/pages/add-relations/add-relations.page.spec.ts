import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRelationsPage } from './add-relations.page';

describe('AddRelationsPage', () => {
  let component: AddRelationsPage;
  let fixture: ComponentFixture<AddRelationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRelationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
