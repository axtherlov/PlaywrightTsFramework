# Prompts

## Add new test cases from a target user story

Project: <PROJECT_NAME> (e.g. PR-2 )
Folder: <FOLDER_NAME> (e.g "Sprint1/US-001")

1. Read the user story in [file path].
2. Review Test design techniques mentioned on @docs/test-cases/rules.md to decide how many test cases create
3. Add the test cases in the mentioned Project and Folder above. Check if the Folder exists, if so add the test cases directly there, if not create it in the indicated path
4. When creating them respect the test case fields rules such as: Title, preconditions, priority, type, steps, tags and expected results based on @docs/test-cases/rules.md

return the created test case id, title, priority, technique, tag and url in a table format
