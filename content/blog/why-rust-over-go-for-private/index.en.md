+++
title = "Why I Use Rust Instead of Go for Personal Projects"
description = "A software engineer who writes Go and TypeScript at work explores why Rust is the language of choice for personal projects"
date = 2026-03-15

[taxonomies]
tags = ["rust", "go", "essay"]

[extra]
toc = true
quick_navigation_buttons = true
+++

I write Go and TypeScript at work. In my personal time, I write Rust.

Why Rust? It's not easy to explain, but I'd like to try.

## What I Look for at Work vs. Personal Projects

Go and TypeScript are simple, with low cognitive overhead. The learning curve is gentle, and new team members can start contributing quickly. As work languages, that's a major strength.

But what I look for in personal projects is different.

At work, what's needed is **productivity** — delivering results as a team within limited time. Go and TypeScript serve that well. In my personal time, what I'm after is a **sense of growth**. The feeling that I'm being challenged. That I'm thinking more deeply. There's something to be gained from deliberately choosing a language with higher cognitive demands.

This isn't about Go or TypeScript being bad languages. It's simply that different contexts call for different things.

## The Hassle of Rust

Rust is demanding. Ownership, borrowing, lifetimes. The compiler shows no mercy.

At first, there was real resistance. Code that would compile fine in Go or TypeScript gets rejected in Rust. In Go or TypeScript, you can quickly get something "kind of working." In Rust, that's not an option.

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

You write `if err != nil` over and over. Honestly, a lot of it feels habitual. If you forget to check, the code still compiles and runs. That leaves a small sense of unease.

In Rust, success and failure are wrapped in a single type: `Result<T, E>`.

```rust
match do_something() {
    Ok(value) => /* handle success */,
    Err(e) => /* handle failure */,
}
```

Pattern matching forces you to handle both cases — the code won't compile otherwise. You can't forget. So when it does compile, you can say "I've considered every error case." That's a kind of confidence I never got from Go.

And there's more: you can transform the contents of a Result without unwrapping it.

## The Joy of Operating on the Box

Coming from Go, you don't really build logic through method chains. The standard approach is to assign to a variable at each step and check errors along the way.

In Rust, Option, Result, and Iterator all have `.map()` and `.and_then()`.

```rust
let name = get_config()
    .map(|c| c.user)
    .and_then(|u| u.name());
```

You can chain transformations without extracting the value. This "operating on the box" feeling was genuinely fun to discover.

It might be familiar if you come from Python or Ruby. But in Rust, it's all type-checked. If types don't line up inside `.map()`, you get a compile error. Expressive and safe.

What's more, the API design is consistent. Once you learn `.map().filter().collect()` on Iterator, you find the same patterns on Option with `.map().unwrap_or()`, and on Result too. One pattern unlocks many types. Knowledge connects laterally.

## In Closing

Ownership, Result types, method chaining. These might look like separate features, but I think they share the same design philosophy: Rust asks you to think, and rewards that thinking with safety and expressiveness.

It'll take more time before I fully understand everything Rust has to offer. But I'm drawn to this "slightly difficult" quality. Choosing a kind of friction that work doesn't require, deliberately, in my own time — that's what growth feels like to me, and that's why I write Rust.
