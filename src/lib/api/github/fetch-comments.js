const { Octokit } = require("@octokit/rest");

/**
 * @param {number} issueNumber
 */
export const fetchComments = async (issueNumber) => {
  try {
    const authToken = process.env.GIT_AUTH_TOK
    const octokit = new Octokit({
      auth: authToken
    });

    const owner = process.env.GIT_USER_NAME;
    const repo = process.env.GIT_REPO_NAME

    // octokit.request
    // https://octokit.github.io/rest.js/v18#issues-list-for-repo
    // const url = `/${owner}/${repo}/issues`
    // const issues = await octokit.request(url);
    // const { data } = await octokit.rest.issues.listComments({
    const { data } = await octokit.rest.issues.listCommentsForRepo({
      owner,
      repo
    });

    return data
  } catch (error) {
    console.error(error.message);
    return null
  }
}
