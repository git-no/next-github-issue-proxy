export enum GitHubIssueState {
  open = 'open',
  closed = 'closed'
}

export interface GitHubIssue {
  locked: boolean
  state: GitHubIssueState
}

export interface GitHubUser {
  id: number
  login: string
  html_url: string
}

export interface GitHubIssueComment {
  id: number
  body: string,
  created_at: string
  updated_at: string
  html_url: string
  user: GitHubUser
}

export interface GitHubAuthOptions {
  username: string,
  token: string
}

export interface GitHubApiOptions {
  auth: GitHubAuthOptions
}