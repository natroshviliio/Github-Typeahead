import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { debounce, getUser, getUsers } from "./hooks/otherFunctions";

function App() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [displayUsers, setDisplayUsers] = useState(false);
    const [usersLoading, setUsersLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = (s = false) => {
        setDisplayUsers(true);
        if (users.length === 0 || s) {
            setUsersLoading(true);
            getUsers()
                .then((usrs) => setUsers(usrs))
                .catch((err) => setError(err));
            setUsersLoading(false);
        }
    };

    const handleSearch = (value) => setSearch(value);
    const handleGetUser = (value) => {
        setError("");

        if (value.length > 0) {
            getUser(value).then((user) => {
                if (user) setUsers([user]);
                else {
                    setUsers([]);
                    setError("User not found");
                }
                setUsersLoading(false);
            });
        } else {
            fetchUsers(true);
        }
    };

    const debouncedSearch = useCallback(debounce(handleSearch, handleGetUser), []);

    useEffect(() => {
        if (!usersLoading) {
            setUsersLoading(true);
            setError("");
            setUsers([]);
        }
    }, [search]);

    return (
        <div className="main">
            <div className="header">
                <div className="brand" />
                <h2 className="brand-title">Github Typeahead</h2>
                <div className="search" onFocus={() => fetchUsers()}>
                    <input type="search" className="input-search" placeholder="tap to search" onChange={(e) => debouncedSearch(e.target.value)} />
                    {displayUsers && (
                        <div className="search-result-container">
                            <div className="hide-container" onClick={() => setDisplayUsers(false)} />
                            <div className="search-result">
                                {usersLoading && <h1 className="fetch-info">Loading...</h1>}
                                {error && <h1 className="fetch-info">{error}</h1>}
                                {users.length > 0 &&
                                    users.map((user) => {
                                        return (
                                            <a key={user.id} href={user.html_url} className="user" target="__blank">
                                                <div>
                                                    <img className="user-img" src={user.avatar_url} alt="" />
                                                </div>
                                                <div className="user-info">
                                                    <p className="username">{user.login}</p>
                                                </div>
                                            </a>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
