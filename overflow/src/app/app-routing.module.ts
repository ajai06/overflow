import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './forum/forum.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { PostQuestionComponent } from './post-question/post-question.component';
import { PostAnswerComponent } from './post-answer/post-answer.component';

import { AuthGuard } from './auth.guard';

import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyAnswersComponent } from './my-answers/my-answers.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';


const routes: Routes = [
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/:id', component: PostQuestionComponent },
  { path: 'forum/:id/answer', component: PostAnswerComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'ask', component: AskQuestionComponent, canActivate: [AuthGuard]},
  { path: 'my-questions', component: MyQuestionsComponent },
  { path: 'my-answers', component: MyAnswersComponent },
  { path: 'forum/answer/:id', component: EditAnswerComponent },
  { path: 'forum/edit/:id', component: EditQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
