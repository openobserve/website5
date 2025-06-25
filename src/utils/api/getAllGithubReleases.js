export async function getAllReleasesForVersion(owner, repo) {
  const url = import.meta.env.PUBLIC_GITHUB_VERSION_API;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        // 'Authorization': `Bearer YOUR_GITHUB_TOKEN` // Optional for higher rate limits
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const releases = await response.json();

    const matrix = releases.map((release) => {
      const version = release.tag_name;
      const platforms = {
        windows: null,
        linux: null,
        macos: null,
        docker: { command: `docker pull ${owner}/${repo}:${version}` },
        kubernetes: {
          command: `kubectl apply -f https://github.com/${owner}/${repo}/releases/download/${version}/k8s.yaml`,
        },
      };

      release.assets.forEach((asset) => {
        const { name, browser_download_url } = asset;

        if (name.includes("windows")) {
          platforms.windows = {
            command: `curl -LO ${browser_download_url}`,
          };
        } else if (name.includes("linux")) {
          platforms.linux = {
            command: `wget ${browser_download_url}`,
          };
        } else if (name.includes("mac") || name.includes("darwin")) {
          platforms.macos = {
            command: `curl -LO ${browser_download_url}`,
          };
        }
      });

      return { version, platforms };
    });

    return matrix;
  } catch (error) {
    console.error("Error fetching all releases:", error);
  }
}
