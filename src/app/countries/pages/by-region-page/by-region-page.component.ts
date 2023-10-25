import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent  implements OnInit{

  @Input()
  public countries: Country[] = [];
  public isLoading : boolean = false;
  public regions: Region[] = ['Americas','Europe','Africa','Oceania','Asia'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion =  this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region){

    this.selectedRegion = term;

    this.isLoading = true;
    this.countriesService.searchRegion(term)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
