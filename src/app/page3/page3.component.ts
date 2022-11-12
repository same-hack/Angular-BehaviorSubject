import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss'],
})
export class Page3Component implements OnInit {
  // サービスファイルの読み込み
  constructor(private service: UserService) {}

  // 購読設定停止用
  private subscriptions = new Subscription();

  // page3で表示するユーザ情報
  page3User: User;

  ngOnInit(): void {
    this.subscriptions.add(
      // user$を購読する
      // ※user$が更新される度に呼ばれる
      this.service.user$.subscribe(
        (userInfo) =>
          // pageUser3に購読したuser$の値を代入し、情報をリンクさせる
          (this.page3User = userInfo)
      )
    );
  }

  /**ユーザの年齢をインクリメント */
  updateUserAge() {
    // user$を更新
    this.service.increment();
  }

  ngOnDestroy(): void {
    /**ページ遷移時に購読を停止 */
    this.subscriptions.unsubscribe();
  }
}
