TeamPulse AI is a decision-support layer for Project Managers that combines existing project signals with lightweight human context to surface collaboration risks, workload imbalance, and overlooked contributions—without continuously monitoring employees.

Your primary user should be the Project Manager / Engineering Manager / Scrum Master. Employees are secondary users who provide limited contextual input and can see or validate their own contribution data.

Here is the feature specification I would give your teammate for the Figma prototype.

TeamPulse AI — Features for Figma Prototype
1. Team Health Dashboard ⭐ CORE
Purpose

Give the Project Manager an immediate overview of the team's current collaboration and delivery health.

UI Components

Header

Good morning, Project Manager
Here's your team's pulse this week.

Team Health Score: 76/100 — Stable

Below it, show four component indicators:

Indicator	Example
Collaboration Health	82/100
Workload Balance	64/100 ⚠️
Delivery Health	78/100
Knowledge Distribution	71/100

Then:

Active Insights

⚠️ Workload imbalance detected
2 team members are approaching their planned sprint capacity.

⚠️ Knowledge dependency detected
68% of authentication-related work involves one primary contributor.

✓ Collaboration improving
Blocker resolution time decreased 18% this sprint.

Data Required

From Jira/Azure DevOps:

Assigned tasks
Story points
Task status
Sprint dates
Spillovers
Blocked tasks
Assignees

From GitHub/GitLab:

Pull requests
Code reviews
Review participation

From lightweight employee input:

Blockers
Ad-hoc contributions
Optional weekly pulse
Important UX Decision

Do not show:

Employee A is 67% collaborative.

Instead show:

Authentication knowledge is concentrated around one contributor.

The system should diagnose team conditions, not label personalities.

2. Collaboration Health ⭐ CORE

This should be the central differentiator of TeamPulse.

Purpose

Identify whether collaboration conditions are improving or deteriorating.

UI

Collaboration Health: 82/100

Trend:

↑ 6% from previous sprint

Breakdown:

Signal	Status
Blocker Resolution	Healthy
Cross-Team Support	Healthy
Knowledge Sharing	Moderate
Delivery Coordination	At Risk
Suggested Formula

For the prototype:

Collaboration Health Score

30% Blocker Resolution Health
+ 25% Cross-Contributor Activity
+ 25% Delivery Coordination
+ 20% Knowledge Distribution

This is deliberately based primarily on observable project signals, not personality or message sentiment.

Example Calculation
Blocker Resolution = 85
Cross-Contributor Activity = 80
Delivery Coordination = 75
Knowledge Distribution = 70

Score =
(85 × .30)
+ (80 × .25)
+ (75 × .25)
+ (70 × .20)

= 78.25

Display:

Collaboration Health: 78/100 — Stable

Critical Disclaimer

For the prototype, call this an indicative score, not an objective measurement of human collaboration.

The product should explicitly say:

"TeamPulse surfaces patterns requiring managerial attention. Scores are decision-support indicators, not employee performance ratings."

That directly addresses the Ritual Dissent concern about behavioral science validity.

3. Workload & Capacity Monitor ⭐ CORE

This was one of the most consistently validated needs across your interviews.

Purpose

Help managers identify workload imbalance proactively instead of relying entirely on intuition.

UI

Show team members with:

Team Member	Capacity Used	Status
Member A	92%	High
Member B	78%	Balanced
Member C	54%	Available
Member D	81%	Balanced
Formula

Instead of counting tasks:

Capacity Utilization =
Current Assigned Story Points
÷
Available Sprint Capacity
× 100

Example:

A developer's historical sprint capacity = 30 points.

Current assigned workload = 27 points.

27 ÷ 30 × 100 = 90%

Status:

< 60%     Available
60–85%    Balanced
85–100%   High
> 100%    Over Capacity
Capacity Adjustments

The manager can specify:

Planned leave
Holidays
Part-time availability
Other project commitments

This addresses Ankur's feedback that fair workload ≠ equal task count.

AI Insight

Potential workload imbalance

Member A is at 92% planned capacity, while Member C has approximately 46% capacity available.

Suggested action: Review whether Task #124 can be reassigned.

Button:

Review Recommendation

Not:

Automatically Reassign

The manager makes the decision.

4. Early Risk Detection ⭐ CORE

This directly addresses one of the strongest recurring interview themes.

Purpose

Identify leading indicators before they become delivery failures.

UI

Team Risks

HIGH

🔴 Sprint Delivery Risk

Why was this flagged?

3 tasks blocked for >2 days
Defect backlog increased 24%
2 high-priority stories showing timeline deviation

Suggested action

Review blockers in the next standup.

MEDIUM

🟠 Knowledge Dependency Risk

Why was this flagged?

One contributor owns 68% of authentication-related tasks
4/5 recent reviews required the same contributor

Suggested action

Consider secondary ownership or a knowledge-sharing session.

Risk Formula

Do not create one mysterious "AI risk score."

Use transparent rule-based indicators for the MVP.

Example:

Delivery Risk Score =
35% Blocked Task Ratio
+ 30% Sprint Spillover Trend
+ 20% Defect Trend
+ 15% Timeline Deviation

Then:

0–39   Low
40–69  Medium
70–100 High

Every risk must have:

Signal → Evidence → Recommendation

This is your Explainable AI architecture.

5. Contribution Timeline / Invisible Work ⭐ CORE

This is where you need to modify your original concept significantly based on Ritual Dissent.

Do not claim TeamPulse "automatically captures all invisible work."

It cannot.

Instead, call the feature:

Contribution Timeline
Purpose

Combine existing digital evidence with lightweight, voluntary contextual contributions.

Automatically Captured

From Jira:

Completed tasks
Blocker resolutions
Incident tickets

From GitHub:

Code reviews
Pull-request assistance
Contributions

From Confluence:

Documentation created
Documentation updated
Lightweight User Input

Button:

+ Add Contribution

Form:

Contribution Type

Peer Support
Mentoring
Problem Solving
Incident Support
Knowledge Sharing
Documentation
Cross-Team Assistance
Other

What happened?

Helped another team resolve authentication API issue.

Related project/task: Optional

Collaborators: Optional

Outcome: Optional

Unblocked deployment.

Time required: ideally under 30 seconds.

6. Peer Recognition ⭐ CORE SUPPORTING FEATURE

This is your practical answer to the offline-work problem.

You cannot automatically detect someone walking to another desk and helping a colleague—and you should not try.

Instead:

Recognize a Teammate

Employee selects:

Who helped you?

Team Member A

How did they help?

Unblocked my work
Shared knowledge
Reviewed my work
Mentored me
Solved an issue
Other

Optional note

Helped debug an API issue that was blocking my task.

This creates a lightweight evidence signal for offline contributions without surveillance.

Importantly, this should not automatically increase someone's "performance score." It simply becomes evidence in their contribution timeline.

7. Contribution Evidence Profile ⭐ CORE

Instead of your earlier proposed Impact Score, I recommend an Evidence Profile.

This is much more defensible.

UI

Member A — Contribution Overview

Delivery

12 completed tasks

Collaborative Contributions

8 peer-support activities

Knowledge Sharing

3 documentation contributions

Peer Recognition

5 recognitions

Cross-Team Support

2 contributions

Contribution Timeline

July 18
Resolved production authentication incident
Source: Jira

July 16
Reviewed payment integration PR
Source: GitHub

July 14
Helped Member B debug API issue
Source: Peer Recognition

Why this is better

You avoid claiming:

Member A has an Impact Score of 87.

That would immediately raise the question:

"Why 87?"

Instead, you provide evidence and let the manager interpret it.

This also addresses the interview insight:

AI should support, not replace, managerial judgment.

8. Knowledge Dependency Map ⭐ CORE

This emerged strongly across multiple interviews.

Purpose

Identify single points of knowledge dependency.

UI

Knowledge Distribution

Authentication
Member A ██████████ 68%
Member B ███ 20%
Member C ██ 12%

⚠ High Dependency
Frontend
Member A ███ 25%
Member B █████ 40%
Member C ████ 35%

✓ Distributed
Data Sources

Use:

Task ownership
Code ownership
Pull-request reviews
Documentation contributions
Formula

For each project area:

Knowledge Concentration =
Activities associated with top contributor
÷
Total activities in that area
× 100

Example:

Authentication activities = 20
Activities involving Member A = 14

14 ÷ 20 = 70%

Flag:

⚠ 70% of recent authentication work depends on one primary contributor.

This does not accuse someone of "knowledge hoarding."

That's crucial.

You are detecting concentration, not inferring intent.

9. Explainable AI Insights ⭐ CORE

Every AI recommendation should answer three questions:

What happened?

Potential delivery risk detected.

Why?

• 3 blocked tasks exceeded 48 hours
• Defect backlog increased 24%
• Sprint completion rate declined from 88% to 71%

What could I do?

Review unresolved blockers during the next standup.

Then:

View Evidence

Dismiss

Mark Resolved

This should be a reusable UI pattern throughout TeamPulse.

10. Data Sources & Privacy Center ⭐ IMPORTANT

Because your Ritual Dissent group raised surveillance concerns, I would actually include this screen in the Figma prototype.

Connected Sources

✓ Jira — Connected

✓ GitHub — Connected

✓ Confluence — Connected

○ Slack — Not connected

What TeamPulse Uses

✓ Task metadata

✓ Task status

✓ Pull requests and reviews

✓ Documentation activity

✓ Voluntary contribution records

What TeamPulse Does NOT Monitor

✗ Private messages

✗ Message content

✗ Keystrokes

✗ Screen activity

✗ Physical movement

✗ Webcam or microphone

Privacy Principle

TeamPulse analyzes work patterns, not private employee behavior.

This single screen substantially strengthens your concept against the "employee surveillance" criticism.

11. Weekly Team Pulse — OPTIONAL BUT RECOMMENDED

A very lightweight employee check-in.

Do not ask:

"How stressed are you?"

if you're positioning this as an enterprise productivity product and have no validated psychological framework.

Instead ask operational questions.

This Week

My workload feels:

Too Low / Manageable / High / Unsustainable

I currently have blockers:

None / Minor / Significant

I have the information needed to complete my work:

Yes / Partially / No

Optional:

Anything your manager should know?

This provides human context that project metadata cannot capture.

It also solves part of the "AI lacks business context" problem.