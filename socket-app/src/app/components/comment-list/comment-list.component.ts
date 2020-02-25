import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  providers: [CommentService]
})
export class CommentListComponent implements OnInit {
  commentForm: FormGroup;
  comments: Observable<any>;
  typing: Observable<any>;
  description = '';
  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    // this.commentService.comments.map(com => {
    //   this.comments = this.transform(com);
    // });
    // this.commentService.typing.map(type => {
    //   this.typing = type;
    // });
    this.comments = this.commentService.comments.map(res => this.transform(res));
    this.typing = this.commentService.typing.map(res => res);

    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  transform(value): any {
    const keys = [];
    for (let key in value) {
      keys.push({
        id: value[key].id,
        name: value[key].name,
        comment: value[key].comment
      });
    }
    return keys;
  }

  onSubmit(formGroup) {
    if (formGroup.valid) {
      this.commentService.newComment(formGroup.value);
      this.description = '';
    }
  }
  typingComments(flag) {
    this.commentService.typingComment(flag);
  }
}

