import {Button , ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { strCapUtil } from '../../../utils/strCapUtil';

const TablesList = () => {
  const tables = useSelector(getAllTables);

  return (
    <ListGroup>
      {tables.map((table) => {
        return  (
        <ListGroup.Item 
          key={table.id}
        >
          <div className="row">
            <h4 className="col-12 col-md-2 my-auto text-center text-md-start">Table {table.id}</h4>
            <p className="col my-auto text-center text-md-start"><strong className="mx-1">Status: </strong>{strCapUtil(table.status)}</p>
            <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-end">
              <Button 
                as={Link} 
                to={`/tables/${table.id}`}
                >
                  Show More
              </Button>
            </div>
          </div>
        </ListGroup.Item>
        )
        })}
    </ListGroup>
  );
};

export default TablesList;