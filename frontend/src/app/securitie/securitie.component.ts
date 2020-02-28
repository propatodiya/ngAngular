import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../_service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { IAngularMyDpOptions, IMyDateModel } from './../../package';
import { PortfolioByDateResponse, TransactionList, NgDataTablePage, Portfolio } from './../_model/index';
@Component({
  selector: 'app-securitie',
  templateUrl: './securitie.component.html',
  styleUrls: ['./securitie.component.scss']
})
export class SecuritieComponent implements OnInit {
  public transactionsList: Array<TransactionList> = [];
  public portfoliaoDetail: FormGroup;
  public portfoliao = new PortfolioByDateResponse();
  public portfoliaoDate: IMyDateModel = null;
  public toDayDate = new Date('2004-11-30');
  public portfolioId: number;
  public apiCallActive = true;
  public myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy'
  };
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(public mainService: MainService, public router: Router, public route: ActivatedRoute) {
    this.createPortfoliaoForm();
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
    const body = {
      id: this.portfolioId,
      portfoliaoDate: moment(this.portfoliaoDate.singleDate.formatted, 'DD-mm-YYYY').format('YYYY-mm-DD') as string
    };
    this.apiCallActive = true;
    this.mainService.portfolioByIdDate(body).subscribe((response: PortfolioByDateResponse) => {
      this.portfoliao = response;
      if (this.portfoliao.Transactions) {
        this.transactionsList = response.Transactions as TransactionList[];
      } else {
        this.transactionsList = [] as TransactionList[];
      }
      this.apiCallActive = false;
    }, (error: any) => {
      this.apiCallActive = false;
    });
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  onDateChanged(date: IMyDateModel) {
    if (date && date.singleDate && date.singleDate.jsDate) {
      this.portfoliaoDate = date as IMyDateModel;
      this.getSecurity();
    } else {
      alert('Please select portfolio date');
    }
  }
  createPortfoliaoForm() {
    this.portfoliaoDate = {isRange: false, singleDate: {jsDate: this.toDayDate, formatted: moment(this.toDayDate).format('DD-MM-YYYY') as string }, dateRange: null} as  IMyDateModel;
    this.portfoliaoDetail = new FormGroup({
      portfoliaoDate: new FormControl(this.portfoliaoDate, [Validators.required]),
    });
  }
}
