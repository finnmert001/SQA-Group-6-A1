# Software Quality Assurance - Group 6

### Table of Contents

---

1. [Feature Implementation](#1-feature-implementation)
2. [Testing](#2-testing)
3. [Security Enhancements](#3-security-enhancements)
4. [Code Quality and Refactoring](#4-code-quality-and-refactoring)
5. [CI/CD and Git Practices](#5-cicd-and-git-practices)

## 1. Feature Implementation

In addition to the core CRUD operations (Create, Read, Update, Delete) for managing blog posts, our team implemented four additional features to further enhance the functionality and overall user experience of the web application. These features are as follows:

### Feature 1: User Authentication

- Implemented user registration and login functionality, enabling users to securely create accounts and access the platform.
- Utilised bcrypt for password hashing, ensuring the secure storage of user passwords in the REST database.
- Integrated session management to maintain user login states across pages, ensuring that unauthenticated users are restricted from accessing protected content. ???? CHECK ????
- Developed a logout feature, allowing users to securely terminate their sessions.
- Implemented comprehensive error handling for both login and registration forms (e.g., invalid credentials, duplicate accounts).
- Provided feedback messages for failed login and registration attempts.

### Feature 2: User Profiles

- Enabled users to view and edit their profile information, including:
  - Username
  - Email address
  - Full name
  - Date of birth
- Incorporated input validation to maintain data integrity:
  - Ensured email addresses follow a valid format (e.g., must contain '@' and end with '.com' or '.co.uk').
  - Required full names to include a space between the forename and surname for proper formatting.
- Delivered detailed feedback messages for invalid inputs, offering clear guidance to help users correct their errors (e.g., "Please enter a valid email address. It must contain '@' and a valid domain.").
- Ensured that profile updates are instantly reflected and securely saved in the database for real-time changes.

### Feature 3: Blog Post Management

- Implemented a robust search feature that allows users to find blog posts by title or author, enhancing the ability to quickly locate specific content.
- Introduced a sorting functionality by topic, which streamlines the organisation of posts and improves browsing efficiency.
  - Enabled users to assign topics to posts during creation, ensuring better categorisation and discoverability.
- Facilitated the ability for users to search and sort simultaneously, allowing for more precise and tailored search results.
- Added a reset feature to clear all active search and sort parameters, returning the home page to its default view with all blog posts displayed.

### Feature 4: Accessibility Improvements (Dark Mode)

- Implemented a dark mode feature to improve accessibility and provide users the option to enable or disable it based on their preference.
- Integrated the dark mode toggle on all key pages, including the login and registration pages, ensuring users can select their preferred mode even before logging in.
- Stored user preferences (light/dark mode) in the database, enabling a personalised experience that persists across sessions.
- Ensured compliance with WCAG (Web Content Accessibility Guidelines) for color contrast and readability, making the application inclusive for all users, including those with visual impairments.

## 2. Testing

NEED TO FINISH TESTING THEN WILL WRITE ABOUT IT

## 3. Security Enhancements

In order to secure user data and protect the application from common vulnerabilities, we implemented several key security measures throughout the project:

### Password Hashing

We utilised bcrypt for password hashing, ensuring that user passwords are stored securely and are never kept in plaintext. Hashing passwords before storing them in the database significantly reduces the risk of exposure in the event of a data breach. The use of bcrypt also ensures that passwords are stored with a salt ????????? CHECK ??????????? and a configurable number of hashing rounds, making them computationally expensive to crack.

### Account Uniqueness

To prevent duplicate or unauthorised accounts, we ensured that users cannot register with an existing username. This prevents conflicts and potential security issues such as impersonation. During both the registration and login processes, the system checks for uniqueness, ensuring that no two accounts share the same username.

### CSRF Protection

We implemented CSRF (Cross-Site Request Forgery) protection using CSRF tokens in our JavaScript-based application. CSRF tokens are generated for each session and included in form submissions, ensuring that requests to the server are coming from a trusted source and not a malicious third party attempting to perform unauthorised actions on behalf of an authenticated user. ???????? CHECK ?????????

### Input Validation & Sanitisation

Input validation and sanitisation were applied to all user-generated data to protect the application from common vulnerabilities, including SQL injection and Cross-Site Scripting (XSS) attacks. Specifically, we validated the following fields:

- **Username:** Checked for proper formatting (e.g., no special characters that could be used for injection attacks).
- **Password:** Ensured passwords meet a certain level of complexity (e.g., length and character variety).
- **Email address:** Validated email structure to prevent malicious data input and ensure proper formatting.
- **Full name:** Ensured that names follow a basic structure, allowing only alphabetic characters and a space between the forename and surname.

By validating and sanitising these fields, we minimised the risk of injection attacks and ensured that user input is handled securely.

### Consistent Application of Security Measures

All security measures, from password hashing to input validation, were consistently applied across the application. We ensured that these best practices were not limited to a specific part of the platform, but were uniformly implemented wherever user input was processed or stored, thereby reducing vulnerabilities and improving overall application security.

## 4. Code Quality and Refactoring

In order to maintain a high standard of software quality and ensure long-term maintainability, we undertook a series of refactoring efforts throughout the project. These improvements were aimed at enhancing both the clarity and efficiency of the codebase, while also ensuring that our solution adhered to best practices such as the Don't Repeat Yourself (DRY) principle. Refactoring was applied strategically across several areas of the application, including simplifying complex logic, breaking down large functions into smaller, reusable components, and eliminating redundant code.

By focusing on code quality and refactoring, we aimed to improve readability, reduce technical debt, and enhance the maintainability of the project, ensuring that future developers can easily understand, extend, and modify the code. Below are key examples demonstrating the improvements made to the codebase.

### 1. Error Handling and Robustness

#### Example 1: Improving Error Handling with Try-Catch Blocks and User-Friendly Messages

<details>
  <summary>Before Refactoring: errorHandling.js</summary>
  
  ![Before Refactoring: errorHandling.js](/images/beforeErrorHandling.png)
</details>

<details>
  <summary>After Refactoring: errorHandling.js</summary>
  
  ![After Refactoring: errorHandling.js](/images/beforeInputValidation.png)
</details>

#### Example 2: Adding Input Validation and Handling Edge Cases for Reliable Performance

<details>
  <summary>Before Refactoring: loginFunctions.js</summary>
  
  ![Before Refactoring: loginFunctions.js](/images/beforeInputValidation.png)
</details>

<details>
  <summary>After Refactoring: loginFunctions.js</summary>
  
  ![After Refactoring: loginFunctions.js](/images/afterInputValidation.png)
</details>

---

### 2. Readability and Style Consistency

#### Example 1: Improving Spacing, Indentations, and Layout for Better Clarity

<details>
  <summary>Before Refactoring: loginFunctions.js (Readability and Style)</summary>
  
  ![Before Refactoring: loginFunctions.js](/images/beforeRefactorReadability.png)
</details>

<details>
  <summary>After Refactoring: loginFunctions.js (Readability and Style)</summary>
  
  ![After Refactoring: loginFunctions.js](/images/afterRefactorReadability.png)
</details>

#### Example 2: Enhancing Variable Names and Commenting for Better Code Understanding

<details>
  <summary>Before Refactoring: loginFunctions.js (Naming and Comments)</summary>
  
  ![Before Refactoring: loginFunctions.js](/images/beforeNameAndComments.png)
</details>

<details>
  <summary>After Refactoring: loginFunctions.js (Naming and Comments)</summary>
  
  ![After Refactoring: loginFunctions.js](/images/afterNameAndComments.png)
</details>

---

### 3. Code Quality and Maintainability

#### Example 1: Simplifying Complex Logic for Efficiency

<details>
  <summary>Before Refactoring: loginFunctions.js</summary>
  
  ![Before Refactoring: loginFunctions.js](/images/beforeSimplify.png)
</details>

<details>
  <summary>After Refactoring: loginFunctions.js</summary>
  
  ![After Refactoring: loginFunctions.js](/images/afterSimplify.png)
</details>

#### Example 2: Breaking Down Large Functions into Smaller, Reusable Ones (DRY)

<details>
  <summary>Before Refactoring: loginFunctions.js</summary>
  
  ![Before Refactoring: loginFunctions.js](/images/beforeBreakDown.png)
</details>

<details>
  <summary>After Refactoring: loginFunctions.js</summary>
  
  ![After Refactoring: loginFunctions.js](/images/afterBreakDown.png)
</details>

---

### 4. Performance Optimisation

#### Example: Refactoring to Speed Up Database Queries and Reduce Memory Usage

<details>
  <summary>Before Refactoring: index.js</summary>
  
  ![Before Refactoring: index.js](/images/beforeDatabaseQuery.png)
</details>

<details>
  <summary>After Refactoring: index.js</summary>
  
  ![After Refactoring: index.js](/images/afterDatabaseQuery.png)
</details>

## 5. CI/CD and Git Practices

This project follows best practices for CI/CD and version control to maintain a high-quality, collaborative, and streamlined development pipeline.

### Version Control with Git

To ensure an organised and efficient workflow, the team employs the following Git practices:

- **Branching Strategy**:  
  Each team member works on individual feature branches named consistently (e.g., `Finn-dev`, `Johnny-dev`, `Mohsin-dev`). This approach ensures that the `main` branch remains stable and avoids conflicts during development.
- **Commit History**:  
  Changes are committed regularly with clear and descriptive messages to document progress and provide an auditable history. This helps track contributions, debug issues, and understand the purpose of each update.
- **Pull Requests for Collaboration**:  
  All changes are integrated into the `main` branch through pull requests (PRs). These PRs are reviewed by at least one other team member to ensure code quality, correctness, and adherence to project standards.

### Branch Protection and Review Enforcement

The project leverages GitHub's branch protection rules to safeguard the `main` branch and enforce collaborative development:

- **Pull Request Requirement**:  
  All changes must be submitted via pull requests to the `main` branch, ensuring that direct pushes are disallowed.
- **Mandatory Code Reviews**:  
  Each pull request requires review and approval from at least one team member before merging. The team collaborates closely during reviews, with additional calls or meetings held to demonstrate functionality before final approval.
- **Challenges with Automated Linting**:  
  The team explored integrating ESLint into the GitHub Actions workflow to enforce coding standards and improve code quality automatically. While we recognise this is a best practice for maintaining a professional codebase, technical challenges prevented its implementation in the current development cycle.

Branch protection and review rules ensure that only verified and peer-reviewed code is integrated into the production-ready `main` branch.

### Evidence of Collaboration

The following evidence highlights the collaborative efforts of the team:

- **Commit History**:  
  The project includes a detailed log of commits from all contributors, demonstrating active participation and regular updates.
  <details>
  <summary>Evidence of Commit History</summary>

  ![Commit History](/images/commitHistory.png)
  ![Commit History 2](/images/commitHistory1.png)

  </details>

---

- **Feature Branches**:  
  Screenshots of branches (e.g., `Finn-dev`, `Johnny-dev`, `Mohsin-dev`) illustrate the structured approach to dividing work and managing development.
  <details>
  <summary>Evidence of Feature Branches</summary>

  ![Feature Branches](/images/featureBranches.png)

  </details>

---

- **Pull Requests**:  
  Examples of pull requests include descriptive titles, meaningful discussions, and approvals, showcasing the team’s commitment to quality and collaboration.
  <details>
  <summary>Evidence of Pull Requests</summary>

  ![Pull Requests](/images/pullRequest.png)
  ![Pull Requests 2](/images/pullRequest1.png)
  </details>

---

### Challenges and Future Enhancements

Although the team initially attempted to implement linting tools like ESLint to enforce consistent coding standards, technical difficulties prevented their integration during this iteration. However, the project compensates for this by enforcing mandatory code reviews and following structured Git workflows. Adding automated linting remains a priority for future updates to the project.

### Summary

The project’s CI/CD and Git practices ensure robust, maintainable, and scalable development. By employing branch protection rules, mandatory reviews, feature branching, and pull request workflows, the team fosters collaboration and high code quality. Screenshots of commit history, branches, and pull requests provide concrete evidence of these practices in action.
