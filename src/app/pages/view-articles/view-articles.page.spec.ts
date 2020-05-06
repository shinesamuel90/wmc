import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewArticlesPage } from './view-articles.page';

describe('ViewArticlesPage', () => {
  let component: ViewArticlesPage;
  let fixture: ComponentFixture<ViewArticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
