import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get("owner")
    const repo = searchParams.get("repo")

    if (!owner || !repo) {
      return NextResponse.json({error: "Owner and repo parameters are required"}, {
        status: 500,
      });
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        method: 'GET', 
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, 
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );
    const info = await response.json()

    return NextResponse.json(info["stargazers_count"]);

  } catch (error) {
    return NextResponse.json({error: "Failed to fetch repo info"}, {
      status: 500,
    });
  }
}
