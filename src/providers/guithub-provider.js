import react, {createContext, useState} from "react";
import { useCallback } from "react/cjs/react.production.min";
import api from "../services/api";

export const GithubContext = createContext({
    loadin: false,
    user: {},
    repositories: [],
    starred: [],
})

const GithubProvider = ({children}) => {
    const [gihubState, setGithubState] = useState({
        hasUser: false,
        loadin: false,
        user: {
            id: undefined,
            avatar: undefined,
            login: undefined,
            name: undefined,
            html_url: undefined,
            blog: undefined,
            company: undefined,
            location: undefined,
            followers: 0,
            following: 0,
            public_gists: 0,
            public_repos: 0,
        },
        repositories: [],
        starred: [],
    });

    const getUser = (username) =>
    {
        setGithubState(prevState => ({... prevState,
            loadin: !prevState.loadin, 
            user:{
                avatar: data.avatar_url,
                login: user.login,
                name: user.name,
                html_url: user.html_url,
                blog: user.blog,
                company: user.company,
                location: user.location,
                followers: user.followers,
                following: user.following,
                public_gists: user.public_gists,
                public_repos: user.public_repos,  
            },
        }));
        api.get(`users/${username}`).then(({ data }) => 
        {
            setGithubState(prevState => ({... prevState,
                hasUser: true,
                user:{
                    id: data.id,
                    avatar: data.avatar_url,
                    login: user.login,
                    name: user.name,
                    html_url: user.html_url,
                    blog: user.blog,
                    company: user.company,
                    location: user.location,
                    followers: user.followers,
                    following: user.following,
                    public_gists: user.public_gists,
                    public_repos: user.public_repos,  
                },
            })); 
        }).finally(() =>{
            setGithubState(prevState => ({... prevState,
                loadin: !prevState.loadin,
            }));
        })
    };

    const getUserRepos = (username) =>
    {
        api.get(`users/${username}/repos`).then(({ data }) => 
        {
            setGithubState((prevState) => ({... prevState,
                repositories: data,
            }));
        });
    };

    const getUserStarred = (username) =>
    {
        api.get(`users/${username}/starred`).then(({ data }) => 
        {
            setGithubState((prevState) => ({... prevState,
                starred: data,
            }));
        });
    }

    const contextValue = {
        githubState,
        getUser: useCallback((username) => getUser(username), []),
        getUserRepos: useCallback((username) => getUserRepos(username), []),
        getUserStarred: useCallback((username) => getUserRepos(username), []),
    };

    return (
        <GithubContext.Provider value={contextValue}>
            {children}
        </GithubContext.Provider>
    );  
};

export default GithubProvider;