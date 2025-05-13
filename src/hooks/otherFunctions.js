const users_api_url = "https://api.github.com/users";

export const getUsers = async (since = 0, per_page = 10) => {
    let users;

    try {
        users = await fetch(`${users_api_url}?since=${since}&per_page=${per_page}`);
        if (users.ok) return await users.json();
        else return false;
    } catch {}
};

export const getUser = async (username) => {
    let user;
    try {
        user = await fetch(`${users_api_url}/${username}`);
        if (user.ok) return await user.json();
        else return false;
    } catch {}
};

export function debounce(action1, action2) {
    let timeoutId;

    return (...args) => {
        action1(...args);
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => action2(...args), 1000);
    };
}
