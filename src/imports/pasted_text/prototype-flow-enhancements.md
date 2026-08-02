Haan, ab screenshots dekh ke picture kaafi clear hai. Current dashboard section genuinely strong hai—especially RD1/RD2 ke baad jo changes hue the: no employee scores, evidence-based risks, capacity pressure instead of burnout, knowledge dependency instead of intent, human-context Weekly Pulse, and governance.

Lekin ab prototype ka sabse bada missing piece dashboard nahi hai — product ka entry + setup + data-flow hai. Abhi prototype directly “Good morning, Sarah” se start ho raha hai. Evaluator naturally poochega:

“Sarah kaun hai? TeamPulse ko Priya, Liam etc. kaise pata? Sprint 23 kaha se aaya? Jira/GitHub kisne connect kiya? TeamPulse ka user kaun hai?”

Ye flow add karna chahiye.

Recommended complete application flow
Landing
   ↓
Login / Create Account
   ↓
Create / Join Workspace
   ↓
Role Setup
   ↓
Connect Work Sources
   ↓
Select Project
   ↓
Import & Map Team
   ↓
Configure Capacity
   ↓
Review Data & Privacy
   ↓
Setup Complete
   ↓
DASHBOARD

Returning user ke liye simply:

Login
 ↓
Select Workspace / Team
 ↓
Dashboard

Aur invited employee ke liye:

Invitation
 ↓
Create Account / Login
 ↓
Join Team
 ↓
Privacy & Data Overview
 ↓
Employee View
1. Landing screen

Current prototype se pehle ek simple landing screen add karo.

TeamPulse
Collaboration Intelligence for Better Team Decisions

Surface delivery risks, capacity pressure, knowledge dependencies and contribution evidence from the tools your team already uses.

Buttons:

Get Started
Sign In

Small text:

TeamPulse supports managerial decisions. It does not score or rank employees.

Don't overbuild marketing website. Prototype ke liye one screen enough.

2. Login
Welcome back

Work Email
manager@company.com

Password
••••••••

☐ Remember me

Sign In

or

Continue with Google
Continue with Microsoft

Bottom:

New to TeamPulse? Create Workspace

Role dropdown login mein mat dena.

Login as: Project Manager / Employee / Admin

real application mein weak lagega because user apna authorization role khud login ke waqt select nahi karta. Role workspace membership se determined hona chahiye.

3. Create Account
Create your TeamPulse account

Full Name
Sarah Chen

Work Email
sarah@acme.com

Password

Job Role

Project Manager
Engineering Manager
Team Lead
Developer / Contributor
Other

☑ I agree to TeamPulse's data and privacy policy.

Create Account

Important distinction:

Job Role ≠ system permission.

Sarah "Project Manager" choose kar sakti hai, but workspace ke andar uski access permissions Workspace Manager ho sakti hain.

4. Workspace setup

Account create hone ke baad:

Set up your workspace

Workspace name

Acme Engineering

Your role

Project Manager

Team name

Payments Platform

Button:

Continue

Alternative:

Have an invitation? Join an existing workspace

This solves your earlier question: TeamPulse account organization/team context se linked hai.

5. Connect Data Sources — VERY IMPORTANT

Yahi screen tumhare prototype ki story ko complete karegi.

Connect your work tools

Subtitle:

TeamPulse uses project metadata to surface team-level conditions. Connect only the sources you want TeamPulse to analyze.

Cards:

Jira

Task status • assignees • sprints • blockers • estimates

[ Connect Jira ]

GitHub

Pull requests • reviews • repository activity

[ Connect GitHub ]

Confluence

Documentation activity • ownership

[ Connect Confluence ]

Then small section:

TeamPulse does not collect

Private messages • keystrokes • screen activity • webcam/microphone

Continue

Your current Data & Governance page already explains this beautifully. Is onboarding screen ko usi design language mein banao.

6. Jira connect → Select Project

Suppose Sarah clicks Connect Jira.

Don't show fake technical OAuth complexity. Prototype mein:

Connect Jira

Jira Workspace

acme.atlassian.net

Continue to Jira →

Then simulated permission confirmation.

After connection:

Select a project to analyze

○ Payments Platform — PAY
○ Customer Portal — CP
○ Internal Tools — INT

Select:

Payments Platform

Then:

Sprint detected

Current Sprint

Sprint 23
Jul 14 – Jul 28
64% complete

Previous data available

Sprint 19 → Sprint 22

Continue

Now your existing sidebar suddenly makes sense.

Current prototype mein:

SPRINT 23
Jul 14 – Jul 28

ab evaluator knows this came from Jira, not manually entered dummy information.

7. Team Import & Identity Mapping

This is probably the most important missing screen.

Once project selected:

We found 5 project contributors
Team member	Jira	GitHub	Confluence
Priya Sharma	✓	priya-s	Priya Sharma
Liam Torres	✓	liam-t	Liam Torres
Ji-yeon Park	✓	jiyeon	J. Park
Marcus Webb	✓	mwebb	Marcus Webb
Ananya Iyer	✓	ananya-i	Ananya Iyer

Status:

5 identities matched

Then:

TeamPulse links identities across connected systems so activity is attributed to the correct team member.

Buttons:

Review Mapping

Confirm Team

THIS answers:

"GitHub par Priya ka username kuch aur hua toh TeamPulse ko kaise pata?"

You explicitly show identity mapping.

8. Invite Team Members

Ab imported contributors ≠ TeamPulse users.

Very important conceptual difference.

Jira se TeamPulse ko pata chal gaya:

Priya Sharma exists as a contributor.

But Priya necessarily TeamPulse account holder nahi hai.

So next screen:

Invite your team
Member	Email	Access
Priya Sharma	priya@acme.com	Contributor
Liam Torres	liam@acme.com	Contributor
Ji-yeon Park	jiyeon@acme.com	Contributor
Marcus Webb	marcus@acme.com	Contributor
Ananya Iyer	ananya@acme.com	Contributor

Send Invitations

Skip for now

Explain:

Invited members can view their evidence, add context and complete Weekly Pulse.

This makes your employee-facing features logically possible.

9. Capacity Setup

Tumhare existing dashboard mein currently:

Priya — Baseline 34pt
Leave -2pt
Other -2pt
Available 30pt

Evaluator immediately pooch sakta hai:

34 points kaha se aaye?

So onboarding mein explicitly establish it.

Configure planning capacity

TeamPulse detected sprint estimates from Jira.

Member	Baseline	Planned Leave	Other Commitments
Priya	34 pts	2 pts	2 pts
Liam	34 pts	—	6 pts
Ji-yeon	34 pts	4 pts	6 pts
Marcus	34 pts	—	10 pts
Ananya	26 pts	—	4 pts

And:

Baseline capacity is configured by the team/manager. Jira estimates represent planning effort and are not measures of employee capability.

Save & Continue

Data origin becomes:

Assigned work → Jira

Story points → Jira

Baseline capacity → Manager configuration

Leave → Manager/team input (future: calendar/HR integration)

Other commitments → Manager/team input

That's defensible.

10. Privacy & Analysis Review

Before dashboard:

Review what TeamPulse will analyze

Connected

✓ Jira — Payments Platform
✓ GitHub — payments-api
✓ Confluence — Payments Space

Team

5 contributors

TeamPulse will analyze

✓ Delivery workflow metadata
✓ Capacity allocation
✓ PR/review distribution
✓ Documentation activity

TeamPulse will not analyze

✕ Private messages
✕ Screens/keystrokes
✕ Emotional state
✕ Employee personality

Then:

☑ I understand TeamPulse provides decision-support signals, not employee performance scores.

Start TeamPulse

This screen is important because RD2 surveillance criticism ka answer onboarding ke andar hi visible ho jayega.

11. Initial processing state

One small transition screen will make AI feel much more believable.

Preparing your TeamPulse workspace...

✓ Jira project connected
✓ 5 contributors identified
✓ Sprint history imported
✓ GitHub identities mapped
✓ Contribution evidence organized
◉ Analyzing team-level patterns...

Then:

Workspace ready

3 conditions need your attention

Go to Dashboard →

And THEN open your existing screenshot:

Good morning, Sarah.

Now the entire product has a beginning.

But there's another important problem in the current prototype

Your screenshots mix Manager and Employee interfaces in the same navigation.

For example Sarah is clearly shown as:

Sarah Chen — Project Manager

But Sarah can access:

Weekly Pulse → Submit Pulse

and

Data & Governance → My Data

while simultaneously accessing:

Manager View

That's confusing.

I would introduce two permission views
Manager Navigation
Dashboard
Team Signals
Workload & Capacity
Risks & Insights
Contributions
Evidence Profiles
Weekly Pulse
Data & Governance
Contributor Navigation
My Overview
My Contributions
Weekly Pulse
My Data
Team Context

Employee should NOT necessarily see:

every employee's workload;
individual capacity pressure;
manager recommendations;
all evidence profiles;
manager-only risks.

This also makes the application feel much more realistic.

What happens when Priya receives invitation?

This is another prototype flow worth adding, but only 3 screens.

Screen A

You've been invited to TeamPulse

Sarah Chen invited you to:

Payments Platform
Acme Engineering

Accept Invitation

Screen B

Your data in TeamPulse

TeamPulse currently associates:

✓ Jira — Priya Sharma
✓ GitHub — priya-s
✓ Confluence — Priya Sharma

You can review evidence attributed to you, add missing context and report inaccuracies.

Looks Correct

Screen C — Employee Home
Good morning, Priya

Your Weekly Pulse
[ Complete this week's pulse ]

Contribution Evidence
6 recent items

Context requested
TASK-231 exceeded expected completion date
[ Add Context ]

Recent Peer Context
Liam added context about your authentication support

That's enough to demonstrate employee agency.

Where exactly does each current screen get its data?

This should become your mental model:

Existing screen	Main data source
Dashboard	Derived from all connected sources
Sprint 23	Jira
Delivery Health	Jira workflow/sprint metadata
Collaboration Signals	Jira + GitHub
Capacity Balance	Jira + TeamPulse capacity configuration
Knowledge Distribution	Jira + GitHub + Confluence
Active Risks	TeamPulse analysis of source metadata
Capacity Snapshot	Jira + manually configured availability
Sprint Summary	Jira + TeamPulse resolved insights
Blocker Resolution	Jira
Cross-Contributor Activity	GitHub PR/review metadata
Delivery Coordination	Jira dependencies/blockers
Knowledge Distribution	Jira + GitHub + Confluence
Contributions Timeline	Jira + GitHub + Confluence + voluntary context
Peer Context	TeamPulse user input
Weekly Pulse	TeamPulse user input
Evidence Profiles	Aggregated evidence from connected sources
My Data	Source evidence mapped to signed-in employee

This table basically answers your original "data kaha se aayega?" question.

Two changes I'd make to your EXISTING screens

Most screens should remain as they are. But two areas need modification.

Evidence Profiles

Current screen shows:

Priya — 12 Tasks — 9 Reviews — 3 Docs — 2 Cross-team
Liam — 9 — 6 — 1 — 1

Even though you've written:

"No rankings, scores, or comparisons"

visually this still creates a comparison table.

Evaluator can say:

"You're saying you don't compare employees, but you've literally put comparable activity counts side by side."

I'd change cards to:

Priya Sharma
Frontend Engineer

Recent evidence

Delivery activity
PR reviews
Documentation
Cross-team contribution

12 evidence items this sprint

View Evidence →

Don't show category counts side-by-side across every employee.

Inside Priya's profile, detailed evidence is fine.

Rebalancing Recommendations

Current screen:

FROM Priya → TO Marcus

is slightly too strong.

Although you've written:

"Manager makes all decisions"

the AI still appears to be deciding who should receive someone's task.

Change:

Capacity Rebalancing Opportunity

TASK-271 may require allocation review

Priya projected capacity: 105%

Potential available capacity:

Marcus Webb — 54% utilized
Ananya Iyer — 73% utilized

Relevant context:

Marcus — Backend experience
Ananya — QA domain

Suggested action

Review task requirements and discuss possible reassignment with the team.

Buttons:

Review Task

Dismiss

Don't have TeamPulse say:

Reassign Priya → Marcus

Let it surface options, manager decides.

This is much safer after RD2.

One more UI addition: Team/Project Switcher

Top-left/sidebar mein Sprint 23 se above add:

Payments Platform ▾

Click:

Payments Platform ✓
Customer Portal
Internal Tools

+ Connect another project
Workspace Settings

This solves another important question:

"What if Sarah manages multiple teams/projects?"

She doesn't create a different TeamPulse account.

One account → workspace → multiple projects/teams.

So how many NEW screens?

Don't add 20 screens.

For final Figma, I'd add roughly 8 onboarding screens:

Landing
Login / Create Account
Workspace Setup
Connect Sources
Select Jira Project
Team Import & Identity Mapping
Capacity Configuration
Privacy Review / Setup Complete

Plus 3 lightweight employee-flow screens:

Invitation → Data Confirmation → Employee Home.

Your existing 20-ish screens remain largely unchanged.

Final application story

Then during presentation you can explain TeamPulse in ~30 seconds:

“A Project Manager creates a TeamPulse workspace and connects the team's existing Jira, GitHub and Confluence sources. TeamPulse imports the selected project's sprint and contributor metadata, maps identities across systems, and combines those work signals with configured capacity and voluntary employee context. It then surfaces explainable team-level risks such as delivery dependencies, capacity pressure and knowledge concentration. Employees can review evidence attributed to them, add context and complete a lightweight weekly pulse. TeamPulse does not score or rank employees, and all managerial decisions remain with the human manager.”

That story now matches almost every screen you've built.

And your data pipeline becomes very clean:

        JIRA
Tasks • Sprint • Blockers • Estimates
          │
          ▼
       GITHUB
PRs • Reviews • Contributors
          │
          ▼
     CONFLUENCE
Docs • Ownership Activity
          │
          ▼
┌──────────────────────────┐
│      TeamPulse Data      │
│   Integration / Mapping  │
└────────────┬─────────────┘
             │
       + TeamPulse Input
       Capacity Settings
       Weekly Pulse
       Contribution Context
             │
             ▼
┌──────────────────────────┐
│ Collaboration Intelligence│
│                          │
│ Delivery Risk            │
│ Capacity Pressure        │
│ Knowledge Dependency     │
│ Collaboration Signals    │
│ Contribution Evidence    │
└────────────┬─────────────┘
             │
             ▼
     Evidence + Explanation
        + Recommendation
             │
             ▼
       HUMAN DECISION

Current prototype ko redesign karne ki zarurat nahi hai. Dashboard onward roughly 80–90% direction sahi hai. Ab sabse valuable work hai front mein onboarding/data-connection story add karna, manager vs employee access separate karna, aur Evidence Profiles + Rebalancing Recommendations ko thoda soften karna. Uske baad prototype sirf collection of dashboards nahi lagega; end-to-end product lagega.