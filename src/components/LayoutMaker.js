import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SeatingPlanner } from '../layoutGenerator'
import { useEffect } from 'react';

const TableRows = (props) => {
    const {rows} = props

    const tableRows = rows.map((tables, index) => {
        return (
            <TableRow tableRowIndex={index} tables={tables} {...props}/>
        )
    })

    return (
        <div className="flex flex-col justify-center items-center gap-y-12">
            {tableRows}
        </div>
    );
}

const TableRow = (props) => {
    const {tables} = props

    const row = [];
    for(let i=0; i<tables.length; i++){
        row.push(<Table {...props} seatCount={tables[i]} tableIndex={i}/>)
    }

    return (
        <div key={`tableRow-${props.tableRowIndex}`} className="flex justify-center items-center gap-x-8">
            {row}
            <div className="flex flex-col cursor-default">
                <h1 onClick={() => props.addTable(props.tableRowIndex)}>➕</h1>
                <h1 onClick={() => props.removeTable(props.tableRowIndex)}>➖</h1>
            </div>
        </div>
    );
}

const Table = (props) => {
    const {seatCount} = props;
    const s = []
    for(let i=0; i<seatCount; i++){

        let name = ""
        try{
            name = props?.layoutSugesstion[props.tableRowIndex][props.tableIndex][i];
        }
        catch{
            
        }

        s.push(
            <div key={`seat-${i}`} className="w-24 h-8 border-2 border-black rounded flex items-center justify-center text-xs font-bold">
                <h1>{name}</h1>
            </div>
        )
    }

    return (
        <div key={`table-${props.tableIndex}`} className="flex flex-col items-center">
            <div className="flex gap-x-1">
                {s}
            </div>
            <div className="flex cursor-default">
                <h1 onClick={() => props.removeTableLength(props.tableRowIndex, props.tableIndex)}>➖</h1>
                <h1 onClick={() => props.addTableLength(props.tableRowIndex, props.tableIndex)}>➕</h1>
            </div>

        </div>
    );
}

export const LayoutMaker = (props) => {
    const [rows, setRows] = useState([])
    const [layoutSugesstion, setLayoutSuggestion] = useState([])
    const [totalSeats, setTotalSeats] = useState(0)
    const [requiredSeats, setRequiredSeats] = useState(0)

    const addRow = () => {
        setRows([...rows, [2]])
    }

    const removeRow = () => {
        const clonedRows = [...rows]
        clonedRows.pop();
        setRows(clonedRows)
    }
    
    const addTable = (rowIndex) => {
        const clonedRows = [...rows];
        clonedRows[rowIndex].push(2)
        setRows(clonedRows)
    }

    const addTableLength = (row, table) => {
        const clonedRows = [...rows];
        clonedRows[row][table]++;
        setRows(clonedRows);
    }
    
    const removeTableLength = (row, table) => {
        const clonedRows = [...rows];

        if(clonedRows[row][table] <= 1)
            return;

        clonedRows[row][table]--;
        setRows(clonedRows);
    }
    
    const removeTable = (rowIndex) => {
        const clonedRows = [...rows];
        if(clonedRows[rowIndex].length === 1)
            return;
        clonedRows[rowIndex].pop()
        setRows(clonedRows)
    }

    useEffect(() => {
        try{
            const planner = new SeatingPlanner(props.students, rows);
            const suggestion = planner.generate();
            setLayoutSuggestion(suggestion);
        }
        catch{

        }

        let totalSeats = 0;
        for(const row of rows){
            for(const table of row){
                console.log(`Table`)
                console.log(table)
                totalSeats+=table;
            }
        }
        console.log(`Total Seats ${totalSeats}`)
        console.log(`Required seats ${props?.students?.length}`)
        setTotalSeats(totalSeats);
        setRequiredSeats(props?.students?.length);
    }, [rows])

    return (
        <div className="flex flex-col gap-y-8 items-center">
            <h1 className="text-6xl">👨‍🏫</h1>
            <TableRows layoutSugesstion={layoutSugesstion} addTableLength={addTableLength} removeTableLength={removeTableLength} rows={rows} addTable={addTable} removeTable={removeTable}/>
            
            {totalSeats < requiredSeats &&
                <h1>
                    Make {requiredSeats - totalSeats} more seats to fit all students
                </h1>
            }


            <div className="flex gap-x-4 justify-center">
                <button onClick={addRow} className="border-2 p-2 border-black rounded-xl font-bold">Add Row</button>
                <button onClick={removeRow} className="border-2 p-2 border-black rounded-xl font-bold">Remove Row</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMaker)