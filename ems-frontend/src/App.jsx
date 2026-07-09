import { useEffect, useState } from "react";
import { getEmployees } from "./services/EmployeeService";

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    getEmployees()
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  return (
    <div>

      <h1>Employee Management System</h1>

      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>


        <tbody>

          {
            employees.map(employee => (

              <tr key={employee.id}>

                <td>{employee.id}</td>

                <td>{employee.firstName}</td>

                <td>{employee.lastName}</td>

                <td>{employee.email}</td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default App;