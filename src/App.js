import {Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/views/Header/Header';
import NotFound from './components/pages/NotFound/NotFound';
import Home from './components/pages/Home/Home';
import SingleTable from './components/pages/SingleTable/SingleTable'
function App() {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables/:id" element={<SingleTable />}/>
        <Route path='/tables/*' element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
