export const generateEmailHTML = (content: string, subject: string = 'Support Email') => {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        color: #14182c;
        line-height: 1.6;
      }
      h1, h2 {
        color: #14182c;
      }
      p {
        margin: 10px 0;
      }
      ul {
        list-style-type: disc;
        margin: 10px 20px;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>${subject}</h1>
      <div>
        ${content}
      </div>
      <footer style="margin-top: 20px; font-size: 0.9em; color: #555;">
        <p>If you have any questions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
      </footer>
    </div>
  </body>
</html>`;
};
