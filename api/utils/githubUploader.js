import { Octokit } from '@octokit/rest'
import fs from 'fs'

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function uploadImageToGitHub(
    localPath,
    githubPath,
    commitMessage
) {
    const content = fs.readFileSync(localPath, { encoding: 'base64' })

    await octokit.repos.createOrUpdateFileContents({
        owner: 'ahmedmk11',
        repo: 'splash-v2',
        path: githubPath,
        message: commitMessage,
        content,
        committer: {
            name: 'Render Bot',
            email: 'render@bot.com',
        },
        author: {
            name: 'Render Bot',
            email: 'render@bot.com',
        },
    })
}
