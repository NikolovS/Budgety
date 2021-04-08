import MainLayout from "../Layout/MainLayout";
import ListRecords from "../components/ListRecords";
import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "../services/firebase";
import Total from "../components/Total/Total";

const List = () => {
	const [loaded, setLoaded] = useState(false);

	const [data, setData] = useState([]);
	const [type, setType] = useState("");
	const [order, setOrder] = useState({ name: "", type: "" });

	useEffect(() => {
		const unsubscribe = getTransactions(
			{
				next: (querySnapshot) => {
					const transactionDocs = querySnapshot.docs.map(
						(docSnapshot) => {
							return {
								...docSnapshot.data(),
								id: docSnapshot.id,
							};
						}
					);
					setLoaded(true);
					setData(transactionDocs);
				},
				error: (e) => {
					console.log("Transaction list get fail", e);
				},
			},
			type,
			order
		);
		return unsubscribe;
	}, [type, order]);

	const onTypeChange = useCallback((e) => setType(e.target.value), []);
	const onOrderChange = useCallback(
		(e) =>
			setOrder((currentOrder) => {
				const newType =
					currentOrder.name === e.target.textContent.toLowerCase()
						? currentOrder.type === "asc"
							? "desc"
							: "asc"
						: "asc";
				return {
					name: e.target.textContent.toLowerCase(),
					type: newType,
				};
			}),
		[]
	);

	return (
		<MainLayout>
			<div className='budget'>
				<div className='container'>
					<h1>List</h1>
					<select name='type' onChange={onTypeChange}>
						<option value=''>All</option>
						<option value='Expense'>Expense</option>
						<option value='Income'>Income</option>
					</select>
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Type</th>
								<th onClick={onOrderChange}>Name</th>
								<th onClick={onOrderChange}>Amount</th>
								<th onClick={onOrderChange}>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<ListRecords
								data={data}
								loaded={loaded}
								setData={setData}
								setLoaded={setLoaded}
							/>
						</tbody>
						<tfoot>
							{type === "" && (
								<Total
									data={data}
									loaded={loaded}
									selection={type}
								/>
							)}
							{type === "Expense" && (
								<Total
									data={data}
									loaded={loaded}
									selection={type}
								/>
							)}
							{type === "Income" && (
								<Total
									data={data}
									loaded={loaded}
									selection={type}
								/>
							)}
						</tfoot>
					</table>
				</div>
			</div>
		</MainLayout>
	);
};

export default List;
