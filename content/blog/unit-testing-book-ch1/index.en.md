+++
title = "Started Reading \"Unit Testing Principles, Practices, and Patterns\""
description = "Reading notes after Chapter 1. The coverage trap, the one-way relationship, and sustainability as the real goal."
date = 2026-03-17

[taxonomies]
tags = ["testing"]

[extra]
toc = true
quick_navigation_buttons = true
+++

I finally started reading [*Unit Testing Principles, Practices, and Patterns*](https://www.amazon.co.jp/dp/4839981728) by Vladimir Khorikov. I bought it a while ago, but it sat on my shelf untouched. Recently, the amount of test code I write at work has been growing, and I've been feeling the friction of managing it all. Why does writing tests take so much effort? I picked up the book hoping to find some answers.

I've only made it through Chapter 1 so far, but even this early on, there's plenty that made me stop and think. I want to capture these impressions while they're still fresh.

## The Goal of Unit Testing — Sustainable Projects

Writing tests is something I take for granted. I understand the reasons — preventing bugs, maintaining quality. But I'd never really thought about what that concretely means for a project.

This book opens Chapter 1 with exactly that question — why do we write unit tests? — and gives a sharp answer: the goal is to make the project's growth sustainable.

Without tests, you move faster at first. But as code accumulates, it starts working against you. Changes ripple into unexpected places, and new features introduce regressions. I've seen this at work more than once. Code, as it grows, becomes more of a liability than an asset. Tests are what keep that disorder in check. For someone who could never quite articulate why tests matter, "sustainability" as the core objective was a clear and satisfying answer.

## The One-Way Relationship — Testable ≠ Good Code

This one caught me off guard.

Good code tends to be easy to unit test — but the reverse doesn't hold. Code that's hard to test likely has design problems. But easy-to-test code isn't proof of good design.

I'd been assuming that if tests are easy to write and modules are loosely coupled, the design must be sound. But loose coupling doesn't automatically mean good design. Reading this, I realized I'd only been looking at the relationship from one direction.

## What Makes a Good Test Suite — Maximum Value at Minimum Cost

Honestly, I'd never looked at a test case and asked myself whether the value it provides is worth the cost of maintaining it. I'd been integrating tests into the workflow, keeping coverage up, and assuming that was enough. This book pushes past that — it goes as far as saying a poorly written test case is worse than none at all.

So what does a good test look like? According to the book, the biggest return comes from testing business logic — the domain model. And the hardest part is doing that while keeping maintenance cost low.

What I found interesting here is the distinction between recognizing a good test and writing one. The book illustrates this with an analogy: you can tell a good song when you hear one, but that doesn't mean you can compose one. Recognition requires a framework for evaluation; creation requires design skills on top of that. When I ask myself which stage I'm at, I'm honestly not even confident in my ability to recognize. That's exactly why I wanted to read this book — to learn the framework first.

## What Coverage Actually Tells You

I'd always had a vague sense that high coverage doesn't necessarily mean good quality. But if someone had asked me why, I couldn't have explained it well. This book made it click.

Coverage comes in several flavors, but the most basic — code coverage (line coverage) — divides lines executed during tests by total lines. Seems straightforward, but here's the catch: squeeze code into fewer lines and coverage goes up. Declare variables explicitly and it goes down. The number shifts based on how you write the code, not how well you test it.

Branch coverage tries to improve on this by focusing on branches rather than lines. It feels more accurate. But ultimately, both metrics only tell you that code was *executed* — not that it was *verified*. A test with no assertions still counts toward coverage. And library code your application depends on typically falls outside the measurement, so even 100% coverage doesn't mean you've verified every code path the system actually takes.

Treating coverage as a KPI or target number is a recipe for misguided optimization. It's useful as a reference metric, but it can't measure test suite quality. Having the mechanics and limitations spelled out like this was what I'd been missing.

## Closing Thoughts

I've only read through Chapter 1, but there's already plenty to think about. I'm curious to see where the book takes the questions I've been carrying about the effort of writing tests. I might write more as I read further.
