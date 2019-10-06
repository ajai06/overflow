import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-post-answer',
  templateUrl: './post-answer.component.html',
  styleUrls: ['./post-answer.component.css']
})
export class PostAnswerComponent implements OnInit {

  constructor(private location: Location,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService) { }


submitted = false;
public id;

  answerForm = this.formBuilder.group({
    answer: ['', [Validators.required]]
  });

  ngOnInit() {
    this.getQuestion();
  }

  goBack(): void {
    this.location.back();
    console.log(this.goBack);
  }

  get check() {
    return this.answerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.answerForm.invalid) {
      return;
    } else {
      this.questionsService.postAnswer(this.id, this.answerForm.value).subscribe(
        data => {
          this.router.navigateByUrl('/forum/' + this.id);
        }
      );
    }
  }

  getQuestion() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.questionsService.getQuestion(this.id).subscribe(
      res => {
        this.id = res.id;
      },
    );
  }

}
