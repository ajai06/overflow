import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';


import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'overflow';
  results = [];
  keyword: string;

  constructor(private questionsService: QuestionsService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.questionsService.questionSearch().subscribe(
      res => {
        this.results = res.result.data;
        console.log(res);
      },
      err => console.log(err)
    );
    this.questionsService.updateKeyword(this.keyword);
    console.log(this.keyword);
  }
}
