import { useEffect, useState } from "react"
import { getUsers } from "../config/api";
import { MdEdit, MdOutlineBrowserUpdated } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "axios"

const Todo = () => {

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const getRequest = async () => {
    try {
      const { data } = await axios.get(getUsers())
      // console.log(data);
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
    setEditIndex(null)
  };

  console.log(data);

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
            <td>{editIndex === index ? <input type="text" defaultValue={ele.name.split(' ')[0]} /> : `${ele.name.split(' ')[0]}`}</td>
            {/* <td>{ele.name.split(' ')[0]}</td> */}
            <td>{editIndex === index ? <input type="text" defaultValue={ele.name.split(' ')[1]} /> : `${ele.name.split(' ')[1]}`}</td>
            <td>{editIndex === index ? <input type="text" defaultValue={ele.email} /> : `${ele.email}`}</td>
            <td>{editIndex === index ? <input type="text" defaultValue={ele.company.name} /> : `${ele.company.name}`}</td>
            <td>
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