import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'
import { putTable } from '../../../redux/tablesRedux';
import { loadingStatus, setLoadingStatus } from '../../../redux/loadingRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TableForm = ({id, ...props}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(loadingStatus);

  const statusOptions = ['free', 'busy', 'cleaning', 'reserved'];

  const [bill, setBill] = useState(props.bill || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount);
  const [status, setStatus] = useState(props.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoadingStatus(true));
    dispatch(putTable({id, bill, peopleAmount,maxPeopleAmount,status, setLoadingStatus}));
    navigate("/");
  };

  const changeMaxPeopleAmount = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    if(newValue < peopleAmount){
      setPeopleAmount(newValue);
    }
    setMaxPeopleAmount(newValue);
  }


  if(loading) {
    return (
      <Spinner animation="border" variant="primary" />
    )
  } else return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='status'>
          <Form.Select value={status} aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
            {statusOptions.map((value, key) => <option key={key} value={value} >{value}</option>) }
          </Form.Select>
        </Form.Group>
        {
          status === 'busy' && 
          <Form.Group controlId='bill'>
            <Form.Label>Bill</Form.Label>
            <Form.Control 
            value={bill}
            onChange={e => setBill(e.target.value)}
            />
          </Form.Group>
        }
        <Form.Group controlId='people'>
            <Form.Label>Peaople</Form.Label>
            <Form.Control 
            value={peopleAmount}
            onChange={e => setPeopleAmount(e.target.value)}
            />
            <Form.Label> / </Form.Label>
            <Form.Control 
            value={maxPeopleAmount}
            onChange={changeMaxPeopleAmount}
            />
          </Form.Group>
          <Button className="my-5" variant="primary" type="submit">
          UPDATE
        </Button>
      </Form>
    </>
  )
}

export default TableForm;