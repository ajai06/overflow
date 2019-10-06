import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FormBuilder, Validators } from '@angular/forms';

import { QuestionsService } from '../questions.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {

  edited = false;
  buttonName = 'Post Your Answer';

  submitted = false;

  edit = false;
  editButton = 'Edit';


  constructor(private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private location: Location) { }

  public id;
  question;
  answers = [];
  userId = localStorage.getItem('userId');
  userValue;

  answerForm = this.formBuilder.group({
    answer: ['', [Validators.required]]
  });

  get check() {
    return this.answerForm.controls;
  }

  ngOnInit() {
    this.getQuestion();
    this.idVerify();
    console.log(this.answers);
  }

  getQuestion() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.questionsService.getQuestion(this.id).toPromise().then(
      response => {
        this.question = response;
        this.userValue = response.user.id;
        this.answers = response.answers;
        console.log(response.answers);
      },
      error => console.log(error)
    );
  }

  idVerify() {
     if ( Number(this.userId) === this.userValue) {
       return true;

     }
  }

  deleteQuestion() {
    this.questionsService.deleteQuestion(this.id).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/forum']);
      },
      err => {
        console.log(err);
      }
    );
  }

  postAnswer() {
    this.submitted = true;

    if (this.answerForm.invalid) {
      return;
    } else {
      this.questionsService.postAnswer(this.id, this.answerForm.value).subscribe(
        data => {
          console.log(data);
          location.reload();
          this.router.navigate(['/forum/' + this.id], {relativeTo: this.activatedRoute});
          this.ngOnInit();
        }
      );
    }

  }

  deleteAnswer(answerId) {
    this.questionsService.deleteAnswer(answerId).subscribe(
      res => {
        this.router.navigate(['/forum/'+this.id]);
        this.ngOnInit();
        console.log(res);
      },
      err => console.log(err)
    );
  }


  toggle() {
    this.edited = !this.edited;

    if (this.edited) {
      this.buttonName = 'Cancel';
    } else {
      this.buttonName = 'Post Your Answer';
    }
  }

  editer() {
    this.edit = !this.edit;

    if (this.edit) {
      this.editButton = 'Cancel';
    } else {
      this.editButton = 'Edit';
    }
  }

}
