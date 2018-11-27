Friendsurance assignment
=============================

- [LICENSE](#license)
- [Introduction](#introduction)
- [A simple interactive questionnaire](#a-simple-interactive-questionnaire)
  - [Description](#description)
  - [Outcome](#outcome)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Notes from us](#notes-from-us)
- [Your solution](#your-solution)

LICENSE
=============================
Copyright (C) Alecto GmbH - All Rights Reserved

Unauthorized copying of any content of this project via any medium is strictly prohibited.
Proprietary and confidential.

**Important Note:**
_Please do not commit your solution in any public repository_

Introduction
=============================
Hello and welcome fellow coder!

As part of our interview process we kindly ask you to complete a small programming assignment. This way we can get an impression of the way you work.
Please read the whole description thoroughly, then create a solution to solve the problem at hand.

For your solution, we request that you use **JavaScript** (or TypeScript) as a programming language and **ReactJS** as your framework. The application must run and your solution should provide sufficient evidence that it is complete.

A Simple Interactive Questionnaire
=============================

Description
-----------
Your challenge is to create a simple questionnaire form in which the user can answer given questions and finally see the form in a completed state!

- The questionnaire consist of multiple questions alongside of a CTA to submit the answer and a linkButton to cancel user input, per question. Each question also has a title, a description and set of options if needed

- Questions can be dependent or not, meaning that if they are dependent, the answer of one question can disable or enable another question.

- Questions also need to be validated if it was asked, meaning if a validation was required, given error message needs to be shown to user if input was not valid

Please have a look at the mockup to get a better idea of the questionnaire design and data table for its data structure
![questionnaire mockup](fs-fe-desktop.png)

**_Please note that the task and the table below are presented for technical requirements only and none of the questions nor answers are intended to be meaningful or accurate._**

|id|title|description|type|options|value|enabled|validations|
|---|---|---|---|---|---|---|---|
|QUESTION_1|What is your name?|a paragraph of random text...!|TEXT|[ ]|null|true|[ { "type": "min", "message": "Your name must not be shorter than 3 characters." }, { "type": "max", "message": "Your name must not be longer than 25 characters." } ]|
|QUESTION_2|What is your gender?|a paragraph of random text...!|RADIO|[ { "key": "FEMALE", "text": "Female" }, { "key": "MALE", "text": "Male" }, { "key": "OTHER", "text": "Other" } ]|null|true|[ ]|
|QUESTION_3|What is your the date of your birth?|a paragraph of random text...!|DATE|[ ]|null|QUESTION_2 != "OTHER"|[ ]|
|QUESTION_4|What insurances do you have?|a paragraph of random text...!|CHECKBOX|[ { "key": "HEALTH", "text": "Health" }, { "key": "LIABILITY", "text": "Liability" }, { "key": "LEGAL", "text": "Legal" }, { "key": "CAR", "text": "Car" } ]|null|true|[ ]|
|QUESTION_5|What is your employment status?|a paragraph of random text...!|SELECT|[ { "key": "EMPLOYEE", "text": "Employee" }, { "key": "BUSINESS_OWNER", "text": "Business Owner" }, { "key": "HOUSE_SPOUSE", "text": "Housewife / Househusband" }, { "key": "RETIREE", "text": "Retiree" }, { "key": "STUDENT", "text": "Student" }, { "key": "SELF_EMPLOYED", "text": "Self-Employed" }, { "key": "UNEMPLOYED", "text": "Unemployed" } ]|null|true|[ ]|
|QUESTION_6|What is your phone number?|a paragraph of random text...!|NUMBER|[ ]|null|QUESTION_5 == "EMPLOYEE" \|\| QUESTION_5 == "BUSINESS_OWNER" \|\| QUESTION_5 == "STUDENT"|[ { "type": "min", "message": "Your number must be only digits and not shorter than 7." }, { "type": "max", "message": "Your number must be only digits and not longer than 12." } ]|

Outcome
-------------------
By running your application,
- the user must see a questionnaire that
  - shows all completed questions collapsed, with the header that contains
    - question title
    - given answer
    - green icon, meaning this question is answered
  - the first unanswered question expanded with no headline
  - the rest of unanswered questions completely hidden
- the user must be able to submit an answer for the expanded question, while
  - CTA has a label 'Submit'
  - Cancel linkButton clears everything
  - the next question must not be shown if the current question doesn't have any answer yet
- the user must be able to expand answered questions and change the answer, while
  - CTA has a label 'Edit'
  - Cancel linkButton clears recent changes, collapses current step and expands previously opened step
- the user must see completed state of questionnaire
  - all questions are collapsed
  - a green icon turns to be blue, meaning questionnaire is complete and question can still be edited
  - a new CTA to clean whole questionnaire and let the user to begin from scratch

Acceptance Criteria
-------------------
- Your solution must run completely, covering all requirements without any issues
- Your solution must be clean, optimised and implemented by following best practices
- As mentioned you must use Javascript or Typescript for the logic implementation and ReactJS to present! For styling you must use one of CSS Pre-Processors
- Using state managements (like Redux) is not mandatory, but having it in place would be a big plus for your assignment

Notes from us
-------------
- Please don't spend more than 3 - 4 hours on this task.
- The provided data table is just an idea how we want you to implement the data structure. You can either create your JSON structure as same as what is provided or whatever suits your code which also covers all requirements.
- The provided mockup as well is just an idea how we want you to implement the UI. We indeed don't need you to provide the exact same design! Feel free to be creative!

Your solution
=============================
Once everything is done and you are happy with your result, please simply `.zip` your project and email it to [this email address](mailto:borna@friendsurance.de). If for any reason it was not possible, you can simply put your code in the cloud and just share the link with [the same email address](mailto:borna@friendsurance.de)

Please, feel free to contact us with any questions regarding the assignment or submission process. We are happy to help!

**Important Note:**
_Please do not commit your solution in any public repository_

Good luck!
We are already excited about your solution :)

Your Friendsurance Team