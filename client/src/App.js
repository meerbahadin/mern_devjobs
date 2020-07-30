import React, { Fragment, useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container, Navbar } from 'react-bootstrap';
import Pagination from './JobsPagination';
import SarchForm from './search/SearchForm';
import Spinner from './Spinner/Spinner';
import Job from './Job';
import LoadingBar from 'react-top-loading-bar';
function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  const [progress, setProgress] = useState(100);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((preveParam) => {
      return {
        ...preveParam,
        [param]: value,
      };
    });
  };
  return (
    <Fragment>
      <Navbar bg="dark" className="mb-4">
        <Navbar.Brand className="text-light">
          <img src="https://rstacode.info/assets/img/logo.png" alt='rstacode logo'></img>
        </Navbar.Brand>
      </Navbar>
      <Container>
      <SarchForm params={params} onParamChange={handleParamChange}/>
        <Spinner loading={loading} />
        <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        <LoadingBar
          color="#5260FF"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        {error && <h1>Error Try Refreshing</h1>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
      </Container>
    </Fragment>
  );
}

export default App;
