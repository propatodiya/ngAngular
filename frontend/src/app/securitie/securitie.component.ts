import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../_service/main.service';
import { PortfolioResponse, NgDataTablePage, Portfolio } from './../_model/index';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-securitie',
  templateUrl: './securitie.component.html',
  styleUrls: ['./securitie.component.scss']
})
export class SecuritieComponent implements OnInit {
  public transactionsList: Array<Portfolio> = [];
  public portfolioId: number;
  public temp = [];
  public page = new NgDataTablePage();
  public columns = [
    { prop: 'Name', name: 'Name' },
    { prop: 'holdings', name: 'Number of Holdings' },
    { prop: 'lastModified', name: 'Last Modified' }
  ];
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(public mainService: MainService, public router: Router, public route: ActivatedRoute) {
    this.page.pageNumber = 0;
    this.page.size = 50;
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.portfolioId = +params.get('id');
      if (this.portfolioId) {
        this.getSecurity();
      }
    });
  }

  ngOnInit() {
  }
  getSecurity() {
    console.log(this.portfolioId);
    this.mainService.portfolioById(this.portfolioId).subscribe((response: any) => {
      this.transactionsList = response.Transactions;
    }, (error: any) => {

    });
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
