# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
1) I would need to consider what happens if I need to send some kind of error. The caller would need to be able to do something with this error object or exception (whatever I end up using). 
2) I would need to consider what happens if some fields naturally contains commas, because currently the parser will just blindly split on commas  
3) I would need to consider how to handle quoted fields, especially if they include quotes inside them (e.g., "He said ""hi""").
4) I would need to consider whether the parser should treat the first row as headers and provide a way for the caller to choose (sometimes it’s data, sometimes it’s labels).

- #### Step 2: Use an LLM to help expand your perspective.

When I used the LLM to help expand my perspective, it decided on these points that are summarized:
Support for variable delimiters (semicolon, tab).
Support for large file streaming so it doesn’t load the entire file in memory.
More detailed error reporting (row number, column index).
Integration with Zod schemas for validation during parsing.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 
    
    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Extensibility: As a caller, I want the parser to provide structured error objects with row/column context so that I can handle malformed data gracefully.

    Extensibility: As a caller, I want to pass in a Zod schema so that each row can be validated/coerced automatically into the right types.

    Functionality: As a user of the parser, I want quoted fields containing commas or quotes to be handled correctly, so that I get the intended values instead of broken splits.

    Functionality: As a user of the parser, I want an option to treat the first row as column headers, so I can get back an array of objects instead of just arrays of strings.

### Design Choices

### 1340 Supplement

**REFLECTION**

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins): n/a

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): n/a
#### Total estimated time it took to complete project: 2
#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-carlos-freire2.git
