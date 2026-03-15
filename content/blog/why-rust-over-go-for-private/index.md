+++
title = "わたしがGoではなくRustをプライベートで使う理由"
description = "難しいらしい。でも気になる。触ってみたらハマった。仕事でGoを書くエンジニアがプライベートでRustを選ぶようになった話"
date = 2026-03-15

[taxonomies]
tags = ["rust", "go"]

[extra]
toc = true
quick_navigation_buttons = true
+++

仕事ではGoやTypeScriptを書いている。プライベートではRustを書いている。

Rustは難しいらしい。でも妙に支持されている。なんか気になって触ってみたら思った以上にハマってしまった。なぜなのか自分でもちゃんと言語化できてなかったので、ちょっと整理してみる。

## なぜRustだったのか

仕事でGoやTypeScript書いてて、別に不満があるわけじゃない。チームで成果出すにはシンプルで認知負荷の低い言語が強いし、それは分かってる。

ただなんというか、仕事のコードだけだと足りない感覚がある。手が止まらない代わりに頭が止まってる気がする。いやまぁちゃんと考えてるんだけど。まぁアレだ。飽きたんだなとw

そんなときに目に入ったのがRustだった。「難しい」って言われてるのに使ってる人たちがやたら楽しそうにしてる。Stack Overflowの「最も愛されている言語」で何年も1位取ってたのも気になった。難しいのに好かれるって、なんなんだと。

自分はもともと難しいものに向き合うのが嫌いじゃない。むしろコンパイラに怒られながら「なんでだよ」って考える時間が好きなタイプだと思う。そういう性分とRustは相性が良かった。

あと自分はCLIやTUIを作るのが好きで、Rustのエコシステムがそこにちょうど強い。昨今の潮流も手伝い、ターミナルで完結するのってなんかかっこいいし、ちょっとしたツールの自動化ってなるとCLIとか作りがちだし。clapでCLI引数組み立ててratauiでターミナルUI描いてtokioで非同期処理回す。このへんのクレートが充実してて「作りたいもの」と「使いたい言語」が噛み合った。実際にS3バケットを閲覧するTUIツール（[s3v](https://github.com/daisuke8000/s3v)）を作ったりしている。

## 所有権とライフタイムに殴られる

Rustが面倒くさいって話は色んなところで書かれてる。コンパイラが厳しい、通ったときは安心、みたいなやつ。まぁそうなんだけど、それだけだと伝わらんので実際に詰まった話を書く。

[s3v](https://github.com/daisuke8000/s3v)というS3バケットをブラウジングするTUIアプリを作ってたとき、一番頭使ったのがライフタイムだった。

TUIのイベントループではユーザーのキー入力を受け取りつつ、裏でS3からデータを非同期に取得して画面を再描画する必要がある。Goだったらgoroutineとchannelでサクッと書けるところだ。

Rustではそうはいかなかった。非同期処理を関数に切り出そうとしたらコンパイラが「その参照、いつまで生きてるの？」と聞いてくる。は？ってなった。最終的にこういうシグネチャになった。

```rust
fn handle_single_command<'a>(
    app: &'a mut App,
    s3_client: &'a S3Client,
    preview: &'a mut PreviewState,
    ctx: &'a mut CommandContext,
    stream_tx: &'a mpsc::UnboundedSender<Event>,
    cmd: Command,
) -> Pin<Box<dyn Future<Output = Result<()>> + 'a>>
```

この `'a` は「この関数に渡された参照は全部同じ寿命ですよ」という宣言。最初見たとき正直意味わからんかった。でもこれがないとコンパイラは「`app` と `preview` と `s3_client` の寿命が違うかもしれないから、返すFutureがどこまで生きていいか分からん」とブチギレられる。Goでは考えもしなかったやつだ。

もう一つ詰まったのが非同期タスク間のデータ受け渡し。s3vでは画像のデコードをバックグラウンドタスクでやってメインループでレンダリングする。デコード済みの画像をどうやって渡すか。

```rust
pub(crate) image_slot: Arc<std::sync::Mutex<Option<image::DynamicImage>>>,
pub(crate) pdf_data_slot: Arc<std::sync::Mutex<Option<Vec<u8>>>>,
```

`Arc<Mutex<T>>`。参照カウント付きのスマートポインタでラップしてMutexで排他制御する。（これ言語化するのメチャクチャ大変だった）Goだったらチャネルで渡すかポインタ共有してなんとなく動かすところだ。Rustでは「こいつ複数のタスクが触る可能性あるよね？」ってことをコンパイラに明示しないとビルドすら通らない。

めんどくせ。ただこの面倒くささのおかげで「Goだったら気づかず書いてたであろうデータ競合のリスク」を設計段階で潰せてる。コンパイラが通った時点で少なくともデータ競合は起きないと分かる。この安心感は仕事でGo書いてるときには得られないものだった。

## 箱のまま操作する面白さ

殴られた話ばっかり書いてしまったが、Rustには「お、これは気持ちいい」と感じる瞬間もちゃんとある。自分にとってはコンビネータがそれだった。

```rust
// get_config() → Option<Config>
// u.name() → Option<String>（名前が未設定の場合がある）
let name = get_config()
    .map(|c| c.user)
    .and_then(|u| u.name());
```

中身を取り出さずに変換をつなげていける。この「箱のまま操作する」感覚、初めて書いたとき結構感動した。

RubyやKotlin、Swiftあたりだと馴染みあるかもしれない。でもRustではこれが型で守られてる。`.map()` の中で型が合わなければコンパイルエラー。気持ちよく書けてかつ安全。

s3vを書いてるとこのパターンが至るところに出てきた。たとえばキャッシュの取得。

```rust
pub fn get_cached(&self, path: &S3Path) -> Option<&Vec<S3Item>> {
    let key = path.to_s3_uri();
    self.cache.get(&key).and_then(|entry| {
        if entry.is_expired() { None } else { Some(&entry.items) }
    })
}
```

`HashMap::get()` が返す `Option` をそのまま `.and_then()` で「期限切れならNone、有効ならSome」に変換してる。中身取り出して `if` で分岐するより意図が伝わりやすい。

Iteratorでも同じノリで書ける。S3のバケット一覧を取得する処理がこれ。

```rust
let buckets = resp.buckets().iter()
    .filter_map(|b| {
        b.name().map(|name| S3Item::Bucket {
            name: name.to_string(),
        })
    })
    .collect();
```

`.filter_map()` は「Noneを捨ててSomeの中身だけ集める」ってやつ。名前がないバケットは無視して名前があるものだけ `S3Item` に変換する。Goだったら `for` ループの中に `if name != nil` 書くところだけどRustではこの1チェーンで済む。

Resultでも同じ。JSONのプレビューフォーマット。

```rust
serde_json::from_str::<serde_json::Value>(content)
    .and_then(|v| serde_json::to_string_pretty(&v))
    .unwrap_or_else(|_| content.to_string())
```

パース成功したら整形、失敗したら元のテキストそのまま返す。`and_then` → `unwrap_or_else` のチェーンでエラーハンドリングまで含めて1式で書ける。おぉ。かっちょいい。

Iterator で `.map().filter().collect()` を覚えるとOption でも `.map().unwrap_or()` と同じ感覚で書ける。Result でも `.map_err().and_then()` が自然に読める。もっと言うと `and_then` の感覚が身についたことでFuture のチェーンも抵抗なく読めるようになった。

1つのパターン覚えると他の型でも同じように使える。知識が横につながっていく。この感覚がRust書いてて一番楽しいところかもしれない。

## おわりに

所有権に殴られてライフタイムに悩んで、それでもコンビネータの気持ちよさに引き戻される。Rustはそういう言語だと思う。

まぁ色々書いたが好きだなぁって言語化するの大変だな。

最近は「[単体テストの考え方/使い方](https://www.amazon.co.jp/dp/4839981728)」を読んでいる。気が向いたらそのへんも書いていきたい。
