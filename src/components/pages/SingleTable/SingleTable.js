import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { useParams } from 'react-router-dom';
import TableForm from '../../features/TableForm/TableForm'


const SingleTable = () => {
  const {id} = useParams();

  const table = useSelector(state => getTableById(state, id));

  return (
    <>
    <h2>Table {id}</h2>
    <TableForm  {...table} />
    </>
  )

};

export default SingleTable;