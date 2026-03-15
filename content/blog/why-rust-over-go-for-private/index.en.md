+++
title = "Why I Use Rust Instead of Go for Personal Projects"
description = "A software engineer who writes Go and TypeScript at work explores why Rust is the language of choice for personal projects"
date = 2026-03-15

[taxonomies]
tags = ["rust", "go"]

[extra]
toc = true
quick_navigation_buttons = true
+++

I write Go and TypeScript at work. In my personal time, I write Rust.

Why Rust? It's not easy to explain, but I'd like to try.

## What I Look for at Work vs. Personal Projects

Go is simple, with low cognitive overhead. TypeScript is easy to pick up as an extension of JavaScript. Compared to Rust, both have gentler learning curves, and new team members can ramp up quickly. As work languages, that's a major strength.

But what I look for in personal projects is different.

At work, what's needed is **productivity** — delivering results as a team within limited time. Go and TypeScript serve that well. In my personal time, what I'm after is a **sense of growth**. The feeling that I'm being challenged. That I'm thinking more deeply. There's something to be gained from deliberately choosing a language with higher cognitive demands.

This isn't about Go or TypeScript being bad languages. It's simply that different contexts call for different things.

## The Hassle of Rust

Rust is demanding. Ownership, borrowing, lifetimes. The compiler shows no mercy.

At first, there was real resistance. Code that would compile fine in Go or TypeScript gets rejected in Rust. In Go especially, you can get to a working state without thinking about memory management or ownership. In Rust, that's not an option.

But after writing Rust for a while, things change. You get better at reading compiler errors. You start having those moments of "ah, so that's how you write it." You realize the compiler is strict because it's pushing you to think.

This hassle is what I'd call **good friction**. At work, efficiency takes priority, so there's little room to enjoy this kind of friction. Personal projects give me the space to sit with it. And when compilation succeeds, the confidence it gives is qualitatively different from Go or TypeScript. It's not "it seems to work" — it's "I thought this through, and it works."

## A Different Experience of Errors

Error handling in Go and Rust feels quite different in practice.

In Go, functions return both a value and an error.

```go
value, err := doSomething()
if err != nil {
    return err
}
```

You write `if err != nil` over and over. By design, this is meant to make you think about how to handle each error. But honestly, a lot of it feels like ritual — writing it because that's what you do. If you discard the error with `_` or ignore the return values entirely, the code compiles and runs just fine ([try it on Go Playground](https://go.dev/play/p/io24YnMyZmP)). That leaves a small sense of unease.

In Rust, success and failure are wrapped in a single type: `Result<T, E>`.

```rust
match do_something() {
    Ok(value) => { /* handle success */ },
    Err(e) => { /* handle failure */ },
}
```

With `match`, you must cover both `Ok` and `Err` or the code won't compile. The `?` operator offers a concise alternative for early returns, but either way, you have to acknowledge errors to access what's inside a Result. You can still `.unwrap()` or `let _ =` to ignore a Result, but those are conscious choices ([try it on Rust Playground](https://play.rust-lang.org/?gist=eb9d1d7b90562d892fb90349b713e0a8)). Go has linters like `errcheck` for this, but Rust's compiler warns you by default. That difference matters.

And there's more: you can transform the contents of a Result without unwrapping it.

## The Joy of Operating on the Box

In Go, builder patterns and similar use method chains, but there's no idiom for chaining combinators on types like Option or Result. The standard approach is to assign to a variable at each step and check errors along the way.

In Rust, Option, Result, and Iterator all have `.map()` and `.and_then()`.

```rust
// get_config() → Option<Config>
// u.name() → Option<String> (name may not be set)
let name = get_config()
    .map(|c| c.user)
    .and_then(|u| u.name());
```

You can chain transformations without extracting the value. This "operating on the box" feeling was genuinely fun to discover.

It might be familiar if you come from Ruby, Kotlin, or Swift. But in Rust, it's all type-checked. If types don't line up inside `.map()`, you get a compile error. Expressive and safe.

What's more, the API design is consistent. Once you learn `.map().filter().collect()` on Iterator, you find the same patterns on Option with `.map().unwrap_or()`, and on Result too. One pattern unlocks many types. Knowledge connects laterally.

## In Closing

Ownership, Result types, combinators. These might look like separate features, but I think they share the same design philosophy: Rust asks you to think, and rewards that thinking with safety and expressiveness.

It'll take more time before I fully understand everything Rust has to offer. But I'm drawn to this "slightly difficult" quality. Choosing a kind of friction that work doesn't require, deliberately, in my own time — that's what growth feels like to me, and that's why I write Rust.

I've been reading [*Unit Testing Principles, Practices, and Patterns*](https://www.amazon.co.jp/dp/4839981728) lately. I might write about that too, when the mood strikes.
