import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseProviderService } from './base-provider.service';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService extends BaseProviderService {

  constructor(public http: HttpClient) { super(http); }

  getPortfolio(pages) {
    return this.makePostCall(environment.APIURL + '/portfolio', pages);
  }
  portfolioById(id) {
    return this.makeGetCall(environment.APIURL + '/portfolio/' + id)
  }
}
