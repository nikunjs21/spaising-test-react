
import { Route, Routes } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './pages/EmployeeForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeForm />} />
      <Route path="/employees" element={<EmployeeTable />} />
      <Route path="/edit/:id" element={<EmployeeForm isEditMode={true} />} />
    </Routes>
  );
}

export default App;
