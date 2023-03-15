import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Details.css';
import axios from 'axios';

const Details = () => {

    const location = useLocation()
    const { repo_details } = location.state

    const [userData, setUserData] = useState({});
    const [load, setLoad] = useState(false);

    const getUserDetails = () => {
        axios.get(repo_details.owner_url, {
            headers: {
                'User-Agent': 'request',
                'Authorization': 'token ' + process.env.REACT_APP_GIT_AUTHSECRET
            }
        }).then((result) => {
            const userRawData = {
                name: result.data.name,
                followers: result.data.followers,
                following: result.data.following,
                public_repos: result.data.public_repos,
                location: result.data.location,
                email: result.data.email
            }
            setUserData(userRawData);
            setLoad(true)
        }).catch((err) => {
            console.log("User ", err)
        });
    }

    useEffect(() => {
        console.log(repo_details);
        getUserDetails();
    }, [])

    return (
        load && <div className='details'>
            <div className='details-header'>
                <h2 style={{ fontFamily: 'Poppins', fontSize: '30px' }}>User Details</h2>
                <div className='details-header-inner'>
                    <div className='avatar'>
                        <img src={repo_details.owner_avatar_url} className="avatar-img" />
                    </div>
                    <div className='user-data'>
                        <h4><span style={{ fontWeight: 'bold' }}>Name: </span> {userData.name}</h4>
                        <h4><span style={{ fontWeight: 'bold' }}>Email: </span>{userData.email}</h4>
                        <h4><span style={{ fontWeight: 'bold' }}>Followers: </span> {userData.followers}</h4>
                        <h4><span style={{ fontWeight: 'bold' }}>Following: </span> {userData.following}</h4>
                        <h4><span style={{ fontWeight: 'bold' }}>Public Repos: </span> {userData.public_repos}</h4>
                        <h4><span style={{ fontWeight: 'bold' }}>Location: </span>{userData.location}</h4>
                    </div>
                </div>
                <div className='repo-details'>
                    <div className='repo-details-header'>
                        <h2 style={{ fontFamily: 'Poppins', fontSize: '30px' }}>Repo Details</h2>
                        <Link to={repo_details.git_url} target="_blank"><span style={{ fontFamily: 'Poppins', fontSize: '20px' }}>View Git Repository</span></Link>
                    </div>
                    <p className='description'>
                        <span style={{ fontWeight: 'bold' }}>Name: </span>
                        {repo_details.name}
                    </p>
                    <p className='description'>
                        <span style={{ fontWeight: 'bold' }}>Description: </span>
                        {repo_details.description}
                    </p>
                    <p className='description'>
                        <span style={{ fontWeight: 'bold' }}>Language: </span>
                        {repo_details.language}
                    </p>
                    <p className='description'>
                        <span style={{ fontWeight: 'bold' }}>Created At: </span>
                        {repo_details.created_at}
                    </p>
                    <p className='description'>
                        <span style={{ fontWeight: 'bold' }}>Updated At: </span>
                        {repo_details.updated_at}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Details