import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommitteeMembersPage } from './committee-members.page';

describe('CommitteeMembersPage', () => {
  let component: CommitteeMembersPage;
  let fixture: ComponentFixture<CommitteeMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitteeMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
