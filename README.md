## [Crazy Kittens](../page-0/README.md) >> Page 42 Chapter 2

Acceptance Tests ARE THE BEST!!!

You hve chosen to start with focusing your automation on higher-level acceoptance tests (you may know these as functinal tests, ui tests, user tests, selenium tests, a waste of time, etc).

After researching with the team, an approach with BDD using Cucumber seemed to make the most sense.  The scenarios and test code are all written in the same codebase with the production code, so everyone sees progress as it happens and can run the tests at any time.  The scenarios help to drive everyone to a common language, with vocabulary for components and behaviors that is consistent throughout and through different parts of the application.  The scenarios are plain english and business level contributors can both understand and contribute.

Putting this new framework in has taken time, however, and everyone had to learn a new technology.  Not very many tests got written in your one rainbow of effort, and some people are questioning whether this was worth it.  The tests that were written were known to pass, and the team has to convince the business people that they were worth writing anyway.  These tests can now act as regression tests, being run as often as they wish, helping to add confidence that future changes have not broken previously working parts of the application.

On the other hand, these tests are very high level, and do not thoroughly cover many combinations of scenarios. Testing combinations of possible behaviors through the UI is very expensive and involves writing a LOT of code, and also, as lots of these tests are written, they become more brittle, susceptible to application changes and timing issues, and transient failures.

There is excitement on the team about using BDD as a way to develop new features, and some team members really want to try it that way.  Maybe they can even include unit tests with this new feature ... On the3 other hand, continuing to leave the rest of the application without tests leaves open the possibility that something will break and the team will not know it.


<hr>

<details>
    <summary>click here to view <b>Test Results</b></summary>
    <img width="50%" src="assets/results.png"/>
</details>

<details>
    <summary>click here to view <b>Execution command</b></summary>

    ./execute.sh
</details>

<hr>

If you choose Yay! We see value in high level tests and our test strategy is sound; let's add new features!: [turn to page 8](../page-8/README.md)

If you choose We're on a roll! Let's add a bunch more acceptance tests!: [turn to page 17](../page-17/README.md)

