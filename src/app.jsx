import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState('');
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    const res = await fetch(`https://api.github.com/user/repos?visibility=public`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setRepos(data);
      setUsername(data[0]?.owner?.login || 'Unknown');
    } else {
      alert('Token එක වැරදියි හෝ GitHub API call එකේ error එකක් තියනවා.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-xl font-bold">GitHub Public Repositories Viewer</h1>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="GitHub Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          onClick={fetchRepos}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load Repos
        </button>

        {loading && <p>Loading...</p>}

        {repos.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">{username}'s Public Repositories</h2>
            <ul className="space-y-2">
              {repos.map((repo) => (
                <li key={repo.id} className="border-b pb-2">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {repo.name}
                  </a>
                  <p className="text-sm text-gray-600">{repo.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}