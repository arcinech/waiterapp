import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from '../../../redux/tablesRedux';
import { loadingStatus, setLoadingStatus } from '../../../redux/loadingRedux'
import Spinner from 'react-bootstrap/Spinner';
import TablesList from '../../features/TablesList/TablesList';

const Home = () => {
  const dispatch = useDispatch();
  // const [loading, isLoading] = useState(true);
  const loading = useSelector(loadingStatus);

  useEffect(() => {
    dispatch(setLoadingStatus(true));
    dispatch(fetchTables({setLoadingStatus}));
    }, [dispatch]
  );

  return (
    <div>
      {loading && <div className="d-flex my-2">
        <Spinner 
          animation="border" 
          variant="primary"
          className="mx-auto"
          />
      </div>}
      {!loading && <TablesList />}
    </div>
  );
};

export default Home;