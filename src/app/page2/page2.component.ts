import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
  // サービスファイルの読み込み
  constructor(private service: UserService) {}

  // 購読設定停止用
  private subscriptions = new Subscription();

  // page2で表示するユーザ情報
  page2User: User;

  ngOnInit(): void {
    this.subscriptions.add(
      // user$を購読する
      // ※user$が更新される度に呼ばれる
      this.service.user$.subscribe(
        (userInfo) =>
          // pageUser2に購読したuser$の値を代入し、情報をリンクさせる
          (this.page2User = userInfo)
      )
    );
  }

  /**空のユーザ情報をサービスに渡す */
  clearUserInfo() {
    const newUser: User = {
      name: '',
      age: 0,
      job: '',
    };

    // user$を更新
    this.service.upadte(newUser);
  }

  ngOnDestroy(): void {
    /**ページ遷移時に購読を停止 */
    this.subscriptions.unsubscribe();
  }
}
