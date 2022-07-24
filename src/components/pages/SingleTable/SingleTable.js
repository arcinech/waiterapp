import { useParams } from 'react-router-dom';
import EditTableFrom from '../../features/EditTableForm/EditTableForm';


const SingleTable = () => {
  const {id} = useParams();
  return (
    <>
    <h2>Table {id}</h2>
    <EditTableFrom />
    </>
  )

};

export default SingleTable;