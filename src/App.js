import {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/*
amt.pledged: 15823
blurb: "'Catalysts, Explorers & Secret Keepers: Women of Science Fiction' is a take-home exhibit & anthology by the Museum of Science Fiction."
by: "Museum of Science Fiction"
country: "US"
currency: "usd"
end.time: "2016-11-01T23:59:00-04:00"
location: "Washington, DC"
num.backers: "219382"
percentage.funded: 186
s.no: 0
state: "DC"
title: "Catalysts, Explorers & Secret Keepers: Women of SF"
type: "Town"
url: "/projects/1608905146/catalysts-explorers-and-secret-keepers-women-of-sf?ref=discovery"
__proto__: Object
*/
function MyVerticallyCenteredModal(props) {
  const {rdata} = {...props};
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {rdata["title"]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{rdata["by"]}</h4>
        <p>
        {rdata["blurb"]}
        </p>
        <p><span>Backers:</span>{rdata["num.backers"]}</p>
        <p><span>Amount Pledged:</span>{rdata["currency"].toLocaleUpperCase()} {rdata["amt.pledged"]}</p>
         </Modal.Body>
      <Modal.Footer>
        <Button href={rdata["url"]}>View Project</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
const [data, setData] = useState([]);
const [cdata, setCdata] = useState([]);
const [modalShow, setModalShow] = useState(false);

useEffect(() => {
    axios.get('https://cpp-tech-exercise.s3.eu-west-2.amazonaws.com/kickstarter.json')
    .then(response => setData(response.data));
    return () => {
    setData([]);
  }
}, [])
  return (
    <div className="App">
          <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        rdata ={cdata}
      />
    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>S.No</th>
      <th>Percentage funded</th>
      <th>Amount pledged including currency symbol (euro, pound, dollar)</th>
       </tr>
  </thead>
  {!data.length && <tbody>
    <tr>
      <td colSpan={4}>No Record found</td>
    </tr>
    </tbody>
    }
  {data.length>0 && <tbody>
   {data.map((res)=>(
     <tr key ={res["s.no"]} onClick={() => {setCdata(res);setModalShow(true);}}>
     <td>{res["s.no"]}</td>
     <td>{res["percentage.funded"]}</td>
     <td>{res["currency"].toLocaleUpperCase()} {res["amt.pledged"]}</td>
    </tr>
   ))}
    
  </tbody>}
</Table>
    </div>
  );
}

export default App;
