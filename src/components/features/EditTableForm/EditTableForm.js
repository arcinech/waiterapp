import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useParams  } from "react-router-dom";
import { getTableById, putTable } from '../../../redux/tablesRedux';
import { setLoadingStatus } from '../../../redux/loadingRedux';
import TableForm from '../TableForm/TableForm';
import { useEffect } from 'react';

const EditTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();
  const table = useSelector(state => getTableById(state, id));

  const handleSubmit = (table) => {
    dispatch(setLoadingStatus(true));
    dispatch(putTable({...table, id}));
    navigate("/");
  };

  useEffect(() => {
    if(!table){
      navigate("/");
    }
    }, [navigate, table]
  );
  
  // handle invalid id of table
  if(!table){
    navigate("/");
  } else 
  return (
    <TableForm action={handleSubmit} actionText="Update" {...table} />
  )

}

export default EditTableForm;