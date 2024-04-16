import { useEffect, useState } from "react"
import { getUsers } from "../config/api";
import { MdEdit, MdOutlineBrowserUpdated } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "axios"

const Todo = () => {

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")

  const getRequest = async () => {
    try {
      const { data } = await axios.get(getUsers())
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRequest()
  }, [])

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleUpdate = async (index) => {
    const combinedName = name + ' ' + lastName; 
    try {
      const updatedData = [...data];
      updatedData[index] = { ...updatedData[index], name: combinedName, email, company: { name: department } };
      await axios.put(`https://jsonplaceholder.typicode.com/users/${index+1}`, updatedData[index]);
      setData(updatedData);
      setEditIndex(null);
      alert("Data Updated Successfully!")
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <>
      <button style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        AddNew <span style={{ marginTop: "5px" }}><FaPlus /></span>
      </button>
      <table>
        <tr>
          <th>Id</th>
          <th>User firstName</th>
          <th>User lastName</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
        {data?.map(function (ele, index) {
          return <tr key={index}>
            <td>{ele.id}</td>
            <td>{editIndex === index ? <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={ele.name.split(' ')[0]} /> : `${ele.name.split(' ')[0]}`}</td>
            <td>{editIndex === index ? <input onChange={(e) => setLastName(e.target.value)} type="text" defaultValue={ele.name.split(' ')[1]} /> : `${ele.name.split(' ')[1]}`}</td>
            <td>{editIndex === index ? <input onChange={(e) => setEmail(e.target.value)} type="email" defaultValue={ele.email} /> : `${ele.email}`}</td>
            <td>{editIndex === index ? <input onChange={(e) => setDepartment(e.target.value)} type="text" defaultValue={ele.company.name} /> : `${ele.company.name}`}</td>
            <td className="actions-btn">
              {editIndex === index ? (
                <button onClick={() => handleUpdate(index)}>Update <span><MdOutlineBrowserUpdated /></span></button>
              ) : (
                <button onClick={() => handleEdit(index)}>Edit <span><MdEdit /></span></button>
              )}
              <button>Delete<span><MdDelete /></span></button></td>
          </tr>
        })}
      </table>
    </>
  )
}

export default Todo