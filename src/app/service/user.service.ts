import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// User型
export interface User {
  name: String;
  age: number;
  job: String;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // 初期値用
  data = {
    name: 'サメハック',
    age: 29,
    job: 'エンジニア',
  };

  // ユーザの持つ値を保管する
  user$ = new BehaviorSubject<User>(this.data);

  /**user$を更新 */
  upadte(userInfo: User) {
    console.log('更新前 ', this.user$.getValue());
    // this.user$の保管する値を更新
    this.user$.next(userInfo);
    console.log('更新後 ', this.user$.getValue());
  }

  /**user$のageをインクリメント */
  increment() {
    console.log('インクリメント前 ', this.user$.getValue().age);

    // user$に保管した値ののageプロパティのみを更新
    const userInfo = {
      ...this.user$.getValue(),
      age: this.user$.getValue().age + 1,
    };

    // this.user$の保管する値を更新
    this.user$.next(userInfo);
    console.log('インクリメント後 ', this.user$.getValue().age);
  }

  constructor() {}
}
