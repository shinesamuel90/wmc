import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegionalCommitteePage } from './regional-committee.page';

describe('RegionalCommitteePage', () => {
  let component: RegionalCommitteePage;
  let fixture: ComponentFixture<RegionalCommitteePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalCommitteePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionalCommitteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
