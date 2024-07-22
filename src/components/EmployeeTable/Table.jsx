import React, { useState, useEffect } from "react";
import { Button, Form, Table, Toast, ToastContainer, Container, Row, Col,} from "react-bootstrap";
import axios from "axios";
import ButtonAutoSave from "../ElemenReact/ButtonAutoSave";
import PaginationSelector from "../ElemenReact/PaginationSelector";

const TableKaryawan = () => {
	const [tableData, setTableData] = useState([]);
	const [newRows, setNewRows] = useState([]);
	const [data, setData] = useState([]);
	const [newKaryawan, setNewKaryawan] = useState([]);
	const [editedData, setEditedData] = useState([]);
	const [deletedId, setDeletedId] = useState([]);
	const [deletedRows, setDeletedRows] = useState(new Set());
	const [toastMessage, setToastMessage] = useState("");
	const [toggleState, setToggleState] = useState(false);
	const [limit, setLimit] = useState("60000");

	const addRow = () => {
		const newRow = { id: "", firstName: "", lastName: "", email: "", age: "" };
		setTableData((prevTableData) => [...prevTableData, newRow]);
		setNewRows((prevNewRows) => [...prevNewRows, newRow]);
	};

	const getAllKaryawan = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/karyawan`);
			if (response.data) {
				setData(response.data);
				setTableData(response.data.map((row) => ({
					id: row.id || "",
					firstName: row.firstName || "",
					lastName: row.lastName || "",
					email: row.email || "",
					age: row.age || "",
				})));
				setNewRows([]);
			} else {
				console.error("No data returned from API");
			}
		} catch (error) {
			console.error("Error fetching groups:", error);
		}
	};

	const handleInputChange = (e, rowIndex, field) => {
		const newValue = e.target.value;

		const newData = tableData.map((row, rIndex) => {
			if (rIndex === rowIndex) {
				return { ...row, [field]: newValue };
			}
			return row;
		});
		setTableData(newData);

		const updatedNewRows = newRows.map((row) => {
			if (row.id === tableData[rowIndex].id) {
				return { ...row, [field]: newValue };
			}
			return row;
		});
		setNewRows(updatedNewRows);
		setNewKaryawan(updatedNewRows);

		const updatedEditedData = editedData.filter(data => data.index !== rowIndex);
		const rowData = { ...newData[rowIndex], index: rowIndex };
		setEditedData([...updatedEditedData, rowData]);
	};

	const saveAllData = async () => {
		const formattedData = deletedId.map((id) => ({ id }));

		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/karyawan`, newKaryawan);
			console.log("Data successfully posted:", response.data);
			setNewKaryawan([]);
			getAllKaryawan();
		} catch (error) {
			console.error("Error posting newKaryawan data:", error);
		}

		try {
			const response = await axios.put(`${import.meta.env.VITE_API_URL}/karyawan`, editedData);
			console.log("Data successfully updated:", response.data);
			setEditedData([]);
			getAllKaryawan();
		} catch (error) {
			console.error("Error updating editedData:", error);
			setEditedData([]);
		}

		try {
			const response = await axios.delete(`${import.meta.env.VITE_API_URL}/karyawan`, {
				headers: { "Content-Type": "application/json" },
				data: formattedData,
			});
			console.log("Data successfully deleted:", response.data);
			setDeletedId([]);
			getAllKaryawan();
		} catch (error) {
			console.error("Error updating deleted:", error);
			setDeletedId([]);
		}

		setToastMessage(toggleState ? "Data saved successfully, auto save is active" : "Data saved successfully");
	};

	const handleDelete = (id) => {
		setDeletedRows(prev => new Set(prev).add(id));
		setDeletedId(prevDeletedIds => {
			if (!prevDeletedIds.includes(id)) {
				return [...prevDeletedIds, id];
			}
			return prevDeletedIds;
		});
	};

	useEffect(() => {
		getAllKaryawan();
	}, []);

	useEffect(() => {
		let intervalId;
		if (toggleState) {
			intervalId = setInterval(saveAllData, limit);
		}
		return () => clearInterval(intervalId);
	}, [toggleState, deletedId, newKaryawan, editedData]);

	const handleToggle = (newState) => {
		setToggleState(newState);
		console.log(newState);
	};

	const handleLimitChange = (newLimit) => {
		setLimit(newLimit);
	};

	return (
		<div className="container mt-4">
			<div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center mb-3 gap-2">
				<PaginationSelector value={limit} onChange={handleLimitChange} />
			</div>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Id</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Age</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((row, rowIndex) => (
						<tr key={rowIndex} className={deletedRows.has(row.id) ? "table-danger" : ""}>
							<td><Form.Control type="text" value={row.id || ""} disabled /></td>
							<td>
								<Form.Control
									type="text"
									value={row.firstName || ""}
									onChange={(e) => handleInputChange(e, rowIndex, "firstName")}
								/>
							</td>
							<td>
								<Form.Control
									type="text"
									value={row.lastName || ""}
									onChange={(e) => handleInputChange(e, rowIndex, "lastName")}
								/>
							</td>
							<td>
								<Form.Control
									type="text"
									value={row.email || ""}
									onChange={(e) => handleInputChange(e, rowIndex, "email")}
								/>
							</td>
							<td>
								<Form.Control
									type="text"
									value={row.age || ""}
									onChange={(e) => handleInputChange(e, rowIndex, "age")}
								/>
							</td>
							<td className="text-center">
								<Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{toastMessage && (
				<ToastContainer position="top-center">
					<Toast onClose={() => setToastMessage("")} bg="primary" text="white">
						<Toast.Body>{toastMessage}</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
			<Container fluid className="p-3">
				<Row className="align-items-center">
					<Col xs="auto">
						<Button variant="primary" className="mb-2 me-2" onClick={addRow}>
							Add Row
						</Button>
						<Button variant="success" className="mb-2 me-2" onClick={saveAllData}>
							Save
						</Button>
					</Col>
					<Col className="d-flex justify-content-end">
						<ButtonAutoSave initialState={toggleState} onToggle={handleToggle} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default TableKaryawan;
