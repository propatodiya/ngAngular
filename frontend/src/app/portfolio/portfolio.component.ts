import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../_service/main.service';
import { PortfolioResponse, NgDataTablePage, Portfolio } from './../_model/index';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public portfolioList: Array<Portfolio> = [];
  public temp = [];
  public page = new NgDataTablePage();
  public apiCallActive = true;
  public columns = [
    { prop: 'Name', name: 'Name' },
    { prop: 'holdings', name: 'Number of Holdings' },
    { prop: 'lastModified', name: 'Last Modified' }
  ];
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(public mainService: MainService, public router: Router) {
    this.page.pageNumber = 0;
    this.page.size = 50;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.apiCallActive = true;
    this.mainService.getPortfolio(this.page).subscribe((response: PortfolioResponse) => {
      this.portfolioList = response.data as Portfolio[];
      this.temp = response.data;
      this.page.pageNumber = response.pageNumber;
      this.page.size = response.size;
      this.page.totalElements = response.totalElements;
      this.page.totalPages = response.totalPages;
      this.apiCallActive = false;
    }, (error: any) => {
      this.apiCallActive = false;
      console.log(error);
    });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d) => {
      return d.Name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.portfolioList = temp;
    this.table.offset = 0;
  }
  onSelect({ selected }) {
    this.router.navigate(['/security/' + selected[0]._Id]);
  }
}
