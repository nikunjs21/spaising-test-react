
import { Route, Routes } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeTable />} />
      <Route path="/employee">

      </Route>

    </Routes>
  );
}

export default App;
