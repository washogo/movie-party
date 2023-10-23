# MovieParty （最終更新2023/6/15）

## サイト概要
映画を検索し、レビューを行い、映画好きな人と交流を図ることを想定したアプリケーションです。フロントエンド開発のスキルアップを兼ねています。
リファクタリングを行い、UXの向上やコードの最適化を進めています。

## サイトテーマ
- 映画見る前と見た後に一貫して利用することのできる映画レビューサイト
- 映画好きな人と繋がり、共有したり、考察したり、議論したりすることができる

## ターゲットユーザー
- 映画が好きな人
- 好きな映画をテーマに誰かと交流したい人

## 主な利用シーン
- 映画情報の検索
- 映画の概要や感想を記録する
- 映画について考察する
- 映画について議論する
- 映画に関して他者との情報交換

## UI設計
- Figmaを使用
- https://www.figma.com/file/LdDW0eE4PzRqNw0LPBEvd0/MovieParty?node-id=8%3A8

## 機能
- [x] ユーザー認証機能
- [x] ユーザー情報の作成
- [x] ユーザー情報の保存
- [ ] ユーザー情報の編集
- [x] 人気映画情報の一覧表示
- [x] 映画情報の詳細表示
- [x] 映画検索機能
- [x] 映画のレビュー作成
- [x] レビュー情報の保存
- [x] レビュー情報の一覧表示
- [x] レビュー情報の編集・削除
- [ ] 他ユーザーとの交流
- [x] モバイルファーストなレイアウト
- [ ] データベースのセキュリティー

## 開発環境
- OS：Mac
- 言語：JavaScript, HTML, CSS
- フレームワーク：React.js, Next.js
- 状態管理ライブラリ：Recoil
- CSSフレームワーク：Tailwind CSS
- Firebase v9：FirebaseAuthentication, CloudFirestore, Storage
- Vercel

## その他
- アイコン素材：ReactIcons
- アニメーション素材：LottieFiles
- 外部API（映画情報）: TMDB
  - https://www.themoviedb.org/?language=ja
- Vercelを使用してデプロイ
  - https://movie-party.vercel.app/
