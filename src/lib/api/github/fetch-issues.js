const { Octokit } = require("@octokit/rest");

export const fetchIssues = async () => {
  try {
    const authToken = process.env.GIT_AUTH_TOK
    const octokit = new Octokit({
      auth: authToken
    });

    const owner = process.env.GIT_USER_NAME;
    const repo = process.env.GIT_REPO_NAME
    const content = process.env.GIT_LABL_CONTENT

    // octokit.request
    // https://octokit.github.io/rest.js/v18#issues-list-for-repo
    // const url = `/${owner}/${repo}/issues`
    // const issues = await octokit.request(url);
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
    });

    // console.log(issues);

    const data = issues?.map(issue => {
      return {
        body: issue.body,
        comments: issue.comments,
        created_at: issue.created_at,
        id: issue.id,
        labels: issue.labels.map(label => label['name']),
        number: issue.number,
        state: issue.state,
        title: issue.title,
        updated_at: issue.updated_at,
        url: issue.url,
        isContent: issue.labels.some(label => label['name'] === content)
      }
    }).filter(issue => issue.isContent === true)

    return data
  } catch (error) {
    console.error(error.message);
    return null
  }
}
