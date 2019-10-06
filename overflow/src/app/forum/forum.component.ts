import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';

import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  // config: any;
  questions = [];
  page = 1 ;

  nodata = this.questions.length < 1;



  constructor(private questionsService: QuestionsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

              // this.config = {
              //  itemsPerPage: 2,
              //  currentPage: 1
              // };

              // this.activatedRoute.queryParamMap
              // .pipe(map(params => params.get('page')))
              // .subscribe(page => this.config.currentPage = page);

              // for (let i = 1; i <= 100; i++) {
              // this.questions.push(`question ${i}`);
              // }
  }


  ngOnInit() {
    this.getQuestions();
    console.log(this.nodata);
  }


  getQuestions() {
    this.questionsService.getQuestions()
    .subscribe(
      response => this.questions = response.data,
      error => console.log(error)
    );
  }

//   pageChange(newPage: number) {
//   this.router.navigate([''], { queryParams: { page: newPage } });
//   console.log(newPage);
// }


}
