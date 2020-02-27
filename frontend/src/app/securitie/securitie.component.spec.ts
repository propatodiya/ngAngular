import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritieComponent } from './securitie.component';

describe('SecuritieComponent', () => {
  let component: SecuritieComponent;
  let fixture: ComponentFixture<SecuritieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
