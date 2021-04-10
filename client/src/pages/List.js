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
		 let isMounted = true
	 
		getTransactions({
				next: (querySnapshot) => {
					const transactionDocs = querySnapshot.docs.map(
						(docSnapshot) => {
							return {
								...docSnapshot.data(),
								id: docSnapshot.id,
							};
						}
				 );
				 if (isMounted) {
					 setLoaded(true);
					setData(transactionDocs);
				 }
					
				},
				error: (e) => {
					 
					console.log("Transaction list get fail", e);
				},
		 }, type, order, (r => r())  )
		return  () => {
			isMounted=false
		}
		 
		
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
					<select name='type' onChange={onTypeChange} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
						<option value=''>All</option>
						<option value='Expense'>Expense</option>
						<option value='Income'>Income</option>
					</select>
					<table class="table table-hover table-bordered">
						<thead>
							<tr>
								<th scope="col">Id</th>
								<th scope="col">Type</th>
								<th scope="col" onClick={onOrderChange}>Name </th>
								<th scope="col" onClick={onOrderChange}>Amount</th>
								<th scope="col" onClick={onOrderChange}>Date</th>
								<th scope="col">Actions</th>
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

 