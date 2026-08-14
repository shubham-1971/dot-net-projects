# REFLECTION

Throughout the DSIP project, AI tools like GitHub Copilot and ChatGPT helped accelerate development, especially in repetitive coding tasks and syntax generation.

One area where AI helped significantly was in the ADO.NET layer. While writing repository methods, Copilot suggested boilerplate code for SqlConnection, SqlCommand, and parameter handling. This reduced development time and helped ensure I followed correct patterns such as using parameterized queries and proper disposal using using blocks.

However, AI was not always correct. For example, when generating the SQL stored procedure for updating shipment status, the initial AI suggestion did not handle the DeliveredAt column when status is set to 'Delivered'. I caught this issue by comparing the implementation with the project requirements and modified the logic accordingly. This showed that blindly trusting AI output can lead to incomplete or incorrect solutions.

To verify AI-generated code, I followed three practices:
1. Cross-checking with official documentation
2. Testing functionality manually (API calls, database queries)
3. Ensuring alignment with project requirements

AI was also helpful in frontend development, especially for writing AJAX calls and DOM updates. However, sometimes it suggested using fetch instead of jQuery, which I corrected based on project constraints.

In future projects, I would use AI more as a support tool rather than a solution provider. I plan to improve prompt clarity and always validate outputs before integration.

Overall, AI improved productivity but required careful oversight to ensure correctness and quality.