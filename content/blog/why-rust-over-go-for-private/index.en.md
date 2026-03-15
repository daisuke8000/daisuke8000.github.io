+++
title = "Why I Use Rust Instead of Go for Personal Projects"
description = "Hard, they said. But everyone seemed to love it. So I tried it, and got hooked. A Go engineer's journey into Rust for personal projects"
date = 2026-03-15

[taxonomies]
tags = ["rust", "go"]

[extra]
toc = true
quick_navigation_buttons = true
+++

I write Go and TypeScript at work. In my personal time, I write Rust.

Rust is supposed to be hard. Yet it's weirdly popular. I got curious, gave it a try, and got more hooked than I expected. I'd never properly articulated why, so let me try to sort it out.

## Why Rust

I write Go and TypeScript at work, and I don't really have complaints. Simple languages with low cognitive overhead are great for shipping results as a team. I get that.

But somehow, work code alone doesn't feel like enough. I can write it, but it doesn't make me think. My hands keep moving, but I feel like my brain has stopped too.

That's when Rust caught my eye. People kept saying it was "hard," yet everyone using it seemed to be having a great time. It topped Stack Overflow's "most loved language" ranking for years. Hard but beloved — what's that about?

I've never minded tackling hard things. If anything, I'm the type who enjoys the time spent thinking "why won't this work" while the compiler yells at me. That temperament and Rust turned out to be a good match.

On top of that, I like building CLIs and TUIs, and Rust's ecosystem happens to be strong there. Assemble CLI arguments with clap, draw terminal UIs with ratatui, run async with tokio. These crates are mature, and what I wanted to build lined up with the language I wanted to use. I've actually built a TUI tool for browsing S3 buckets in Rust ([s3v](https://github.com/daisuke8000/s3v)).

## Getting Hit by Ownership and Lifetimes

Plenty has been written about Rust being a pain. The compiler is strict, but when it passes you feel safe — that kind of thing. I agree, but that alone doesn't really convey the experience, so let me talk about where I actually got stuck.

When I was building s3v — a TUI app for browsing S3 buckets — the thing that made me think hardest was lifetimes.

In a TUI event loop, you need to receive user key input, fetch data from S3 asynchronously in the background, and redraw the screen. In Go, you'd knock that out with goroutines and channels.

In Rust, it wasn't that easy. When I tried to extract the async logic into a function, the compiler asked, "how long does that reference live?" I ended up with a signature like this:

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

That `'a` is a declaration saying "all the references passed to this function share the same lifetime." When I first saw it, I honestly had no idea what it meant. But without it, the compiler complains: "the lifetimes of `app`, `preview`, and `s3_client` might differ, so I can't tell how long the returned Future is allowed to live." It's something I'd never even thought about in Go.

Another stumbling block was passing data between async tasks. In s3v, image decoding runs in a background task while the main loop handles rendering. The question was: how do you hand off the decoded image?

```rust
pub(crate) image_slot: Arc<std::sync::Mutex<Option<image::DynamicImage>>>,
pub(crate) pdf_data_slot: Arc<std::sync::Mutex<Option<Vec<u8>>>>,
```

`Arc<Mutex<T>>` — wrap it in a reference-counted smart pointer, then use a Mutex for exclusive access. In Go, you'd pass it through a channel or share a pointer and hope for the best. In Rust, if you don't explicitly tell the compiler "multiple tasks might touch this data," it won't even build.

It's a hassle. But thanks to that hassle, I'm catching data race risks at the design stage — risks I'd have written right past in Go without noticing. Once the compiler passes, you know at least there are no data races. That sense of safety is something I never got writing Go at work.

## The Joy of Operating on the Box

I've mostly written about getting beaten up by ownership and lifetimes, but Rust has moments that genuinely feel good too. For me, that was combinators.

```rust
// get_config() → Option<Config>
// u.name() → Option<String> (name may not be set)
let name = get_config()
    .map(|c| c.user)
    .and_then(|u| u.name());
```

You chain transformations without extracting the value. This "operating on the box" feeling was genuinely fun.

If you've used Ruby, Kotlin, or Swift, this might feel familiar. But in Rust, it's all guarded by the type system. If the types don't line up inside `.map()`, you get a compile error. Expressive to write, and safe.

Working on s3v, this pattern shows up everywhere. For example, fetching from a cache:

```rust
pub fn get_cached(&self, path: &S3Path) -> Option<&Vec<S3Item>> {
    let key = path.to_s3_uri();
    self.cache.get(&key).and_then(|entry| {
        if entry.is_expired() { None } else { Some(&entry.items) }
    })
}
```

The `Option` returned by `HashMap::get()` gets transformed directly with `.and_then()` — expired means None, valid means Some. It communicates intent better than extracting the value and branching with `if`.

The same feel carries over to Iterators. Here's fetching a list of S3 buckets:

```rust
let buckets = resp.buckets().iter()
    .filter_map(|b| {
        b.name().map(|name| S3Item::Bucket {
            name: name.to_string(),
        })
    })
    .collect();
```

`.filter_map()` means "drop the Nones, keep the insides of the Somes." Buckets without names get skipped; the ones with names become `S3Item`s. In Go you'd write a `for` loop with `if name != nil` inside, but in Rust it's one chain.

Same story with Result. Formatting a JSON preview:

```rust
serde_json::from_str::<serde_json::Value>(content)
    .and_then(|v| serde_json::to_string_pretty(&v))
    .unwrap_or_else(|_| content.to_string())
```

If parsing succeeds, pretty-print it; if it fails, return the original text. The `and_then` → `unwrap_or_else` chain handles the error case in a single expression.

Once you learn `.map().filter().collect()` on Iterator, you find `.map().unwrap_or()` works the same way on Option. `.map_err().and_then()` reads naturally on Result too. And once `and_then` clicks, Future chains start making sense without resistance.

Learn one pattern, and it works across other types. Knowledge connects laterally. That might be the most enjoyable thing about writing Rust.

## In Closing

Getting hit by ownership, struggling with lifetimes, and yet getting pulled back in by the satisfaction of combinators. That's the kind of language Rust is, I think.

Deliberately choosing a kind of difficulty that work doesn't demand, in my personal time. Picking the harder path. That's all there is to it.

I've been reading [*Unit Testing Principles, Practices, and Patterns*](https://www.amazon.co.jp/dp/4839981728) lately. I might write about that too, when the mood strikes.
