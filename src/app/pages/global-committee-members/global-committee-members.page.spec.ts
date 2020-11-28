import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlobalCommitteeMembersPage } from './global-committee-members.page';

describe('GlobalCommitteeMembersPage', () => {
  let component: GlobalCommitteeMembersPage;
  let fixture: ComponentFixture<GlobalCommitteeMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCommitteeMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalCommitteeMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
