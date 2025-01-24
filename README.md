# Software Quality Assurance - Group 6

The demonstration of the Blog Posts application can be found [here](https://drive.google.com/file/d/1FLqnyMuS1KMdmg1ene4oVPmz27uudDdw/view?usp=sharing).

### Table of Contents

---

1. [Team Contributions](#1-team-contributions)
2. [Setup Instructions](#2-setup-instructions)
3. [Feature Implementation](#3-feature-implementation)
4. [Testing](#4-testing)
5. [Security Enhancements](#5-security-enhancements)
6. [Code Quality and Refactoring](#6-code-quality-and-refactoring)
7. [CI/CD and Git Practices](#7-cicd-and-git-practices)
8. [Challenges and Potential Enhancements](#8-challenges-and-potential-enhancements)
9. [Summary](#9-summary)

## 1. Team Contributions

The project was developed collaboratively by the following team members, each contributing to different aspects of the application. Below is an outline of their responsibilities and the percentage of their contributions:

- **Finn Merton:** Responsible for the implementation of the search and sorting feature, collaborating with Johnny on the profile management feature, CSS styling, bug fixing, code refactoring, and input validation for updating profile details. Contributed **40%**.
- **Johnny Connolly:** Led the development of the login and signup/user authentication feature, including setting up the RESTdb database for user authentication. Worked with Finn on the profile management feature, and created unit and integration tests. Contributed **35%**.
- **Mohsin Khan:** Focused on implementing the dark mode feature, bug fixing, and creating unit and integration tests. Contributed **25%**.

These contributions were achieved through constant collaboration and communication, ensuring that the project adhered to best practices and deadlines.

## 2. Setup Instructions

To run and test the application locally, please follow the steps below:

**1. Clone the respository:**
https://github.com/finnmert001/SQA-Group-6-A1.git

**2. Install Dependencies:**

Navigate into the project directory and run:
`npm install`

**3. Configure Environment Variables:**

Ensure that you have the required environment variable set up. Create a `.env` file in the root directory and include the following variable:

- `REST_DB_API_KEY=cc01d1c5debb81a181f683c8626e2fad9b4ca`

**4. Run the Application:**

After installing dependencies and setting up the environment, start the application with:
`npm start`

The application should now be running on http://localhost:3000.

**5. Run tests:**

To run the unit and integration tests, execute the following command:
`npm start`

## 3. Feature Implementation

In addition to the core CRUD operations (Create, Read, Update, Delete) for managing blog posts, our team implemented four additional features to further enhance the functionality and overall user experience of the web application. These features are as follows:

### Feature 1: User Authentication

- Implemented user registration and login functionality, enabling users to securely create accounts and access the platform.
- Utilised bcrypt for password hashing, ensuring the secure storage of user passwords in the REST database.
- Integrated session management to maintain user login states across pages, ensuring that unauthenticated users are restricted from accessing protected content.
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

## 4. Testing

To ensure the robustness and reliability of the application, we implemented a comprehensive suite of unit and integration tests. Our testing strategy focused on validating both individual components and their interactions, ensuring that the application behaves as expected across various scenarios.

### Test Suite Structure

The tests are organised into a well-structured folder hierarchy, with each test file clearly corresponding to the module it tests. This structure makes it easy to navigate the test suite, while ensuring that test cases are clearly organised and well-documented. **Each test case includes a description of its purpose, expected behaviour, and any relevant edge cases it covers.**

### Testing Approach

We used Behaviour-Driven Development (BDD) principles for testing user-facing functionality. This approach focused on validating application behaviour from the user's perspective, ensuring that features align with expected outcomes in real-world use cases. BDD scenarios were written to describe the desired behaviour in a clear, natural language format, making them easier for both developers and non-developers to understand. These tests ensured that key workflows, such as form submissions and database API interactions, functioned correctly from a user's point of view.

In addition to BDD, we wrote unit tests to validate individual components and functions in isolation, as well as integration tests to verify that different parts of the application work together as intended. These tests cover a range of functionality, including user interactions, and both blog posts and user authentication (API) database operations.

### Test Coverage

A generated test coverage report provides a detailed breakdown of the codebase's coverage, highlighting areas that have been thoroughly tested and identifying any portions that may need further attention. We aimed for high coverage in critical sections of the application, prioritising tests that add meaningful value over achieving full code coverage.

### Edge Case and Error Testing

We paid particular attention to edge cases and error conditions, ensuring that the application behaves reliably even under unexpected or adverse conditions. Tests were written to cover scenarios such as invalid inputs and malformed data, to ensure the system handles these gracefully without crashing or producing incorrect results.

### Evidence of Testing

Screenshots of the test suite in action, including unit tests, integration tests, and the generated coverage report, are provided below for verification.

<details>
  <summary>Example Unit Tests</summary>
  
  ![Unit Test 1](/images/loginFunctionsUnitTest1.png)
  ![Unit Test 2](/images/loginFunctionsUnitTest2.png)
</details>

<details>
  <summary>Example Integration Tests</summary>
  
  ![Integration Test 1](/images/loginDatabaseIntegrationTest1.png)
  ![Integration Test 2](/images/loginDatabaseIntegrationTest2.png)
</details>

<details>
  <summary>Test Coverage Report</summary>
  
  ![Test Coverage Report](/images/passwordHashing.png)
</details>

## 5. Security Enhancements

In order to secure user data and protect the application from common vulnerabilities, we implemented several key security measures throughout the project:

### Password Hashing

We utilised bcrypt for password hashing, ensuring that user passwords are stored securely and are never kept in plaintext. Hashing passwords before storing them in the database significantly reduces the risk of exposure in the event of a data breach. The use of bcrypt also ensures that passwords are stored with a configurable number of hashing rounds, making them computationally expensive to crack.

<details>
  <summary>Password Hashing Relevant Code</summary>
  
  ![Password Hashing](/images/passwordHashing.png)
  ![Password Hashing](/images/passwordHashing1.png)
</details>

---

### Account Uniqueness

To prevent duplicate or unauthorised accounts, we ensured that users cannot register with an existing username. This prevents conflicts and potential security issues such as impersonation. During both the registration and login processes, the system checks for uniqueness, ensuring that no two accounts share the same username.

<details>
  <summary>Account Uniqueness Relevant Code</summary>
  
  ![Account Uniqueness](/images/accountUnique.png)
  ![Account Uniqueness](/images/inputValidation4.png)
</details>

---

### Input Validation & Sanitisation

Input validation and sanitisation were applied to all user-generated data to protect the application from common vulnerabilities, including SQL injection and Cross-Site Scripting (XSS) attacks. Specifically, we validated the following fields:

- **Username:** Checked for proper formatting (e.g., no special characters that could be used for injection attacks).
- **Password:** Ensured passwords meet a certain level of complexity (e.g., length and character variety).
- **Email address:** Validated email structure to prevent malicious data input and ensure proper formatting.
- **Full name:** Ensured that names follow a basic structure, allowing only alphabetic characters and a space between the forename and surname.

By validating and sanitising these fields, we minimised the risk of injection attacks and ensured that user input is handled securely.

<details>
  <summary>Input Validation & Sanitisation Relevant Code</summary>
  
  ![Input Validation & Sanitisation](/images/inputValidation.png)
  ![Input Validation & Sanitisation](/images/inputValidation1.png)
  ![Input Validation & Sanitisation](/images/inputValidation2.png)
  ![Input Validation & Sanitisation](/images/inputValidation3.png)
  ![Input Validation & Sanitisation](/images/inputValidation4.png)
</details>

---

### CSRF Protection

While we recognise that implementing CSRF (Cross-Site Request Forgery) protection is a best practice for enhancing security, we encountered technical challenges during implementation. We attempted to integrate CSRF tokens in our JavaScript-based application, which are typically used to ensure that form submissions are coming from trusted sources. However, despite our efforts, we faced issues with token validation, often receiving the error "invalid CSRF token." As a result, CSRF protection is not fully functional in this version of the application.

---

### Consistent Application of Security Measures

All security measures, from password hashing to input validation, were consistently applied across the application. We ensured that these best practices were not limited to a specific part of the platform, but were uniformly implemented wherever user input was processed or stored, thereby reducing vulnerabilities and improving overall application security.

## 6. Code Quality and Refactoring

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

## 7. CI/CD and Git Practices

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

## 8. Challenges and Potential Enhancements

Although we recognise the importance of using security best practices like CSRF protection and tools such as ESLint to enforce consistent coding standards, we encountered technical challenges that prevented their successful implementation in this iteration of the project. Specifically, while we attempted to integrate CSRF tokens for enhanced security, issues with token validation led to the feature not functioning as intended. Similarly, despite efforts to integrate ESLint, technical difficulties hindered its setup.

To mitigate these gaps, we have enforced mandatory code reviews and adhered to structured Git workflows. We acknowledge that implementing CSRF protection and linting practices would significantly improve both security and code quality.

## 9. Summary

The project’s CI/CD and Git practices ensure robust, maintainable, and scalable development. By employing branch protection rules, mandatory reviews, feature branching, and pull request workflows, the team fosters collaboration and high code quality. Screenshots of commit history, branches, and pull requests provide concrete evidence of these practices in action.
