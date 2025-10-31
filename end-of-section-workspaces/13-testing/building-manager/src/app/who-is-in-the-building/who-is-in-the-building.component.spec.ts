import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIsInTheBuildingComponent } from './who-is-in-the-building.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('WhoIsInTheBuildingComponent', () => {
  let component: WhoIsInTheBuildingComponent;
  let fixture: ComponentFixture<WhoIsInTheBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoIsInTheBuildingComponent],
      providers: [provideHttpClient(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoIsInTheBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
