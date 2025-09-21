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
I designed the parser in a way where parseCSV would be more generic and accept a ZodSchema. This way, it would allow the parser to validate the rwows into caller defined tpyes instead of having to hardcode assumptions. Another design choice that I made was that I return an object that contains data, errors, and headers. The errors are there so that its structured objects with row numbers. This way the error handling can be clearly communciated back to the caller, and they can deal it with it however they see fit. This can be improved, but for now I added an option for hasHeaderRow: boolean, so that we know whether to interpret the first row as column labels. If it's true, the rows are converted into object keyed by those labels before being passed into the schema. My parser currrently still has some limitations however. It doesn't handle quoted fields with commas (for ex: "a, b, c"). This is an area I'd like to address in the future sprint. As well as the fact that testing is currently limited to simple datasets (the people one supplied to me). A more thorough test suite with m ore edge cases would be best practice. 

### 1340 Supplement

**REFLECTION**

- #### 1. Correctness

The CSV parser is "correct" when it gives me back a strcuture that I expect (or an error if that's expected output). This means that it should properly parse the fields from whatever dataset I am using. When I am talking about errors, I expect it to follow the same sort of structure. What I want the most from my parser is predictability. I want to know what I will be recieving from it. Correctness then is the ability for the caller to rely on the parser without having to post process whatever output we get.

- #### 2. Random, On-Demand Generation
If I had a function that would generate random CSV data, it would be a good tool to use to test my parser. It can help with the fact that I need to return errors in a structured way. These different areas would allow me to make sure that my parser is strong enough to deal with unusual data, and test my code more than thought of tests I wrote myself. It would also be more than what I am doing now as I did not make more datasets or CSV files to test my parser on which was a bit of a mistake. I hope to improve this moving forward.

- #### 3. Overall experience, Bugs encountered and resolved
This project definitely felt different from others in the way that I had to write my code. I had to pay closer attention to edge cases and different specifications so that my parser can have some caller empathy. I had to think about how it could work in functionality, but also reusability. I had to think about the structure of what I was returning and think about why I designed my parser the way I did. I learned how useful Zod schemas can be, as they helped me validate and transform data at parsing. What this sprint made me more aware of is the extensibility of what I write, as well as the devloper experience. One thing I hope to improve however is adding more tests. I need to test different datasets, which I know I did not do very well. I hope to improve this for the next sprint for sure.

#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins): n/a

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): n/a
#### Total estimated time it took to complete project: 2
#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-carlos-freire2.git
