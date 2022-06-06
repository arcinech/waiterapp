import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './TableForm.module.scss'

const TableForm = ({action, actionText, id, ...props}) => {

  const statusOptions = ['Free', 'Busy', 'Cleaning', 'Reserved'];

  const [bill, setBill] = useState(parseInt(props.bill));
  const [peopleAmount, setPeopleAmount] = useState(parseInt(props.peopleAmount) || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(parseInt(props.maxPeopleAmount));
  const [status, setStatus] = useState(props.status);
  const [prevPeople, setPrevPeople] = useState('');

  const { register, handleSubmit: validate, formState: { errors } } = useForm();


  //handle submit
  const handleSubmit = (e) => {
    action({id, bill, peopleAmount,maxPeopleAmount,status});
  };

  //keep peopleAmount no larger than maxPeopleAmount
  const changeMaxPeopleAmount = (e) => {
    const parsed = parseInt(e.target.value);
    if(parsed < 0 || parsed > 10) return;
    setMaxPeopleAmount(parsed);
    console.log(maxPeopleAmount===10)
    console.log(prevPeople, parsed===10, parsed)
    if(parsed===10){
      setPeopleAmount(parseInt(prevPeople))
    };

    if(parsed < peopleAmount){
      // console.log(prevPeople);
      setPrevPeople(peopleAmount);
      // console.log(prevPeople);
      setPeopleAmount(parsed);
    }
  };

  // on status change set releted fields to new values
  const changeTableStatus = (e) => {
    setStatus(e.target.value);
    const newStatus = status.toLowerCase();

    if(newStatus === 'busy'){
      setBill(0);
    }

    if(newStatus === 'cleaning' || newStatus === 'free'){
      setPeopleAmount(0);
    }
  };


  return (
    <>
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group controlId='status' className="d-flex flex-md-row text-start py-3">
          <Form.Label className={`my-auto pe-2 ${styles.labelWidth}`}>Status: </Form.Label>
          <Form.Select className={`me-auto ${styles.optionsSelect}`} value={status} aria-label="Default select example" onChange={changeTableStatus}>
            {statusOptions.map((value, key) => <option key={key} value={value} >{value}</option>) }
          </Form.Select>
        </Form.Group>

        <Form.Group 
          controlId='people'
          className="d-flex flex-md-row text-start py-3"  
        >
            <Form.Label
              className={`my-auto pe-2 ${styles.labelWidth}`}
            >
              People: 
            </Form.Label>
            <Form.Control 
              {...register("people", { required: true, min: 0, max: 10})}
              value={peopleAmount}
              onChange={e => setPeopleAmount(parseInt(e.target.value))}
              className={styles.numberInput}
              type='number'
            />
            <Form.Label className="my-auto px-2"> / </Form.Label>
            <Form.Control
              {...register("maxPeople", {required: true, min: 0, max: 10})}
              value={maxPeopleAmount}
              onChange={changeMaxPeopleAmount}
              className={styles.numberInput}
              type='number'
            />
            {errors.people && <small className="d-block form-text text-danger ms-2 my-auto">Please, set people amount to range from 0 to value on right.</small>}
            {errors.maxPeople && <small className="d-block form-text text-danger ms-2 my-auto">Please, set max people amount to range from 0 to 10.</small>}
          </Form.Group>
          {
            status.toLowerCase() === 'busy' 
            && 
            <Form.Group controlId='bill' className="d-flex flex-md-row text-start py-3">
              <Form.Label className={`my-auto pe-2 ${styles.labelWidth}`}>Bill</Form.Label>
              <Form.Control 
                value={bill}
                onChange={e => setBill(parseInt(e.target.value))}
                className={`${styles.billInput}`}
                type='number'
                // {...register("bill", {min: 0})}
              />
              {/* {errors.bill && <small className="d-block form-text text-danger ms-2 my-auto">Please, use positive value.</small>} */}
            </Form.Group>
          }
          <Button className="my-5" variant="primary" type="submit">
          {actionText.toUpperCase()}
        </Button>
      </Form>
    </>
  )
}

export default TableForm;