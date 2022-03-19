# ただ今実装中のため、変更する場合があります。

# MovieParty 

## サイト概要
映画を検索し、レビューを行い、映画好きな人と交流を図る

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
- [ ] ユーザー認証機能
- [x] 外部API（TMDB）を利用した映画検索機能
- [x] 映画情報の詳細表示
- [x] 映画のレビュー作成
- [ ] ユーザー情報の保存
- [ ] レビュー情報の保存
- [ ] 他ユーザーとの交流

## 開発環境
- OS：Mac
- 言語：JavaScript, HTML, CSS
- フレームワーク：React.js, Next.js
- 状態管理ライブラリ：Recoil
- CSSフレームワーク：Tailwind CSS
- Firebase v9：FirebaseAuthentication, CloudFirestore

## その他
- アイコン素材：ReactIcons
- アニメーション素材：LottieFiles
- Firebase Hosting　を使用してデプロイする予定
