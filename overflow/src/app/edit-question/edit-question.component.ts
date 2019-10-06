import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  submitted = false;
  public id;
  public title;
  public question;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService,
              private router: Router) { }

  editForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    question: ['', [Validators.required]]
  });

  ngOnInit() {
    this.getQuestion();
  }

  get check() {
    return this.editForm.controls;
  }


  getQuestion() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.questionsService.getQuestion(this.id).subscribe(
      res => {
        console.log(res);
        this.question = res.question;
        this.title = res.title;
      },
      err => {}
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    } else {
      this.questionsService.updateQuestion(this.id, this.editForm.value).subscribe(
        res => {
          this.router.navigateByUrl('/forum/'+this.id),
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }

}
