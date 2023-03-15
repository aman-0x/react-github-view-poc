import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import "./HomePage.css";
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from '@mui/material';

let PageSize = 5;

const HomePage = () => {
  const [load, setLoad] = React.useState(false);
  const [filterState, setFilterState] = React.useState(false);
  const [repositories, setRepositories] = useState([]);
  const [repositories_copy, setRepositoriesCopy] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [change, setChange] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangeSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (searchInput.length == 0) {
      setChange(1)
    }
  };

  const getRepoData = (repoData) => {
    let repoData_len = 0
    repoData.map((res_url, i) => {
      axios.get(res_url.url.toString(), {
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + process.env.REACT_APP_GIT_AUTHSECRET
        }
      }).then(res => {
        repoData_len = repoData_len + 1
        if (res_url.id === res.data.id) {
          repoData[i].created_at = res.data.created_at;
          repoData[i].updated_at = res.data.updated_at;
          repoData[i].language = res.data.language;
        }
        if (repoData_len === repoData.length) {
          setLoad(true)
          console.log(repoData)
          setRepositories(repoData);
          setRepositoriesCopy(repoData)
          setCurrentPage(1);
        }
      }).catch(error => {
        console.error(error);
      })
    })
  }

  const getAllRepoData = () => {
    axios.get('https://api.github.com/repositories', {
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.REACT_APP_GIT_AUTHSECRET
      }
    }).then(response => {
      const repoData = response.data.map(repo => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          owner_id: repo.owner.id,
          owner_login_name: repo.owner.login,
          owner_avatar_url: repo.owner.avatar_url,
          owner_url: repo.owner.url,
          url: repo.url,
          created_at: null,
          updated_at: null,
          language: null,
          git_url: repo.html_url
        }
      });
      getRepoData(repoData);
    })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    setLoad(false);
    getAllRepoData();
  }, []);

  const handleFilter = (field) => {
    switch (field) {
      case 'id':
        if (filterState) {
          setRepositories(repositories.sort((a, b) => { return b.id - a.id }))
          setChange(0)
          setFilterState(false)
        } else {
          setRepositories(repositories.sort((a, b) => { return a.id - b.id }))
          setChange(1)
          setFilterState(true)
        }
        break;
      case 'name':
        if (filterState) {
          setRepositories(repositories.sort((a, b) => { return b.name.toLowerCase() > a.name.toLowerCase() }))
          setChange(0); setFilterState(false);
        } else {
          setRepositories(repositories.sort((a, b) => { return a.name.toLowerCase() > b.name.toLowerCase() }))
          setChange(1); setFilterState(true);
        }
        break;
      case 'owner':
        if (filterState) {
          setRepositories(repositories.sort((a, b) => { return b.owner_login_name.toLowerCase() > a.owner_login_name.toLowerCase() }))
          setChange(0)
          setFilterState(false)
        } else {
          setRepositories(repositories.sort((a, b) => { return a.owner_login_name.toLowerCase() > b.owner_login_name.toLowerCase() }))
          setChange(1)
          setFilterState(true)
        }
        break;
      case 'created':
        if (filterState) {
          setRepositories(repositories.sort((a, b) => { return b.created_at > a.created_at }))
          setChange(0)
          setFilterState(false)
        } else {
          setRepositories(repositories.sort((a, b) => { return a.created_at > b.created_at }))
          setChange(1)
          setFilterState(true)
        }
        break;
      case 'updated':
        if (filterState) {
          setRepositories(repositories.sort((a, b) => { return b.updated_at > a.updated_at }))
          setChange(0)
          setFilterState(false)
        } else {
          setRepositories(repositories.sort((a, b) => { return a.updated_at > b.updated_at }))
          setChange(1)
          setFilterState(true)
        }
        break;
      default:
        break;
    }
  }

  const handleSearch = () => {
    if (searchInput.length > 0) {
      setRepositoriesCopy(repositories)
      setRepositories(repositories.filter((res_d) => {
        return (res_d.name.toLowerCase()).startsWith(searchInput.toLowerCase()) || (res_d.owner_login_name.toLowerCase()).startsWith(searchInput.toLowerCase()) || res_d.language ? (res_d.language.toLowerCase()).includes(searchInput) : true;
      }))
      setChange(1)
    }
  }

  const handleClearSearchFilter = () => {
    setSearchInput("");
    setRepositories(repositories_copy);
    setCurrentPage(1);
    setChange(1);
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return repositories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, change]);

  return (
    load && repositories.length > 0 &&
    <div className='home-body'>
      <div className='search-field'>
        <TextField
          label="Search"
          value={searchInput}
          onChange={handleChangeSearchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => handleSearch('id', filterState)} >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <div className="clear-search">
          <p onClick={() => handleClearSearchFilter()} style={{ color: 'blue', fontFamily: 'Poppins', cursor: 'pointer' }}>Clear Search</p>
        </div>
      </div>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'><IconButton onClick={() => handleFilter('id', filterState)} ><FilterAltIcon style={{ color: 'white' }} /></IconButton> Owner Id</th>
            <th scope='col'><IconButton onClick={() => handleFilter('name')}><FilterAltIcon style={{ color: 'white' }} /></IconButton> Repo Name</th>
            <th className='w-25' style={{ verticalAlign: '', padding: '0px 0px 22px 15px' }} scope='col'> Description</th>
            <th scope='col'><IconButton onClick={() => handleFilter('owner')} ><FilterAltIcon style={{ color: 'white' }} /></IconButton> Owner</th>
            <th scope='col'><IconButton onClick={() => handleFilter('created')}><FilterAltIcon style={{ color: 'white' }} /></IconButton> Created At</th>
            <th scope='col'><IconButton onClick={() => handleFilter('updated')}><FilterAltIcon style={{ color: 'white' }} /></IconButton> Updated At</th>
            <th style={{ verticalAlign: '', padding: '0px 0px 22px 15px' }} scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.owner_login_name}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
                <td>
                  <Link to={'/details'} state={{ repo_details: item }}>View Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={repositories.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  )
}

export default HomePage;