# actions-install

指定されたリポジトリに対して以下の処理を行う Github Actions です。

* `npm install --before <date>`
* `npm install` 後に変更がある場合はエラーとし終了します。

package-lock.json が原因で失敗した場合は、`npm i --before <date>` を実行して package-lock.json を更新する必要があります。

## 入力パラメータ
* `before_days`: npm install の before オプションで何日前を指定。(デフォルト: 7)

### 利用例
```yml
- name: Checkout repository
  uses: actions/checkout@v2
- name: npm install and check package-lock.json
  uses: akashic-games/action-install@v1
  with:
    # npm install --before オプションで 10日前をターゲットとします。
    before_days: 10
```

## ビルド方法

以下のコマンドを実行

```
npm install
npm run build
```

上記コマンドによって、`dist/index.js`にビルド成果物が生成されます。

## デプロイ方法

`npm version` コマンドにより package.json のバージョンを更新してください。
その後 main ブランチへマージすることで自動的にデプロイされます。

## テスト方法

以下のコマンドを実行

```
npm test
```

## ライセンス

本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/action-install/blob/main/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
