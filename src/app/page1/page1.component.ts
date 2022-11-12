import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, User } from '../service/user.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  // サービスファイルの読み込み
  constructor(private service: UserService) {}

  // 購読設定停止用
  private subscriptions = new Subscription();

  // page1で表示するユーザ情報
  page1User: User;

  ngOnInit(): void {
    this.subscriptions.add(
      // user$を購読する
      // ※user$が更新される度に呼ばれる
      this.service.user$.subscribe(
        (userInfo) =>
          // pageUser1に購読したuser$の値を代入し、情報をリンクさせる
          (this.page1User = userInfo)
      )
    );
  }

  /**更新したいユーザ情報をサービスに渡す */
  updateUserInfo() {
    const newUser: User = {
      name: 'ねこハック',
      age: 24,
      job: 'OL',
    };

    // user$を更新
    this.service.upadte(newUser);
  }

  ngOnDestroy(): void {
    /**ページ遷移時に購読を停止 */
    this.subscriptions.unsubscribe();
  }
}
