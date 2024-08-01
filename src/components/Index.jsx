"use client"
import React, { useEffect, useState } from 'react';

const Index = () => {
    const [inputData, setInputData] = useState("");
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        fetchAllData();
    }, [])

    const handleSaveData = async () => {
        const response = await fetch("/api/saveData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: inputData })
        });
        if (response.ok) {
            alert("Data saved successfully!");
            setInputData("");
        } else {
            alert("Something went wrong!");
        }
        
        // loading fetch data after click the add btn
        fetchAllData()
    }

    const fetchAllData = async () => {
        const response = await fetch("/api/getAllData");

        if (response.ok) {
            const data = await response.json();
            setAllData(data);
        } else {
            alert("Failed to fetch data!");
        }
    }

    console.log(allData);

    return (
        <div className='pb-16'>
            <h1 className='text-center py-16 text-5xl font-bold'>Favorite Countries</h1>
            <div className='text-center'>
                <input type="text" className='py-3 px-6 border w-[400px] rounded-full shadow-xl' placeholder='Write your favorite country name' value={inputData} onChange={(e) => setInputData(e.target.value)} />
                <br />
                <button onClick={handleSaveData} className='btn mt-8 bg-gray-800 hover:bg-black text-white py-2 px-8 rounded-md'>Add</button>
            </div>
            <div className='w-[840px] h-[500px] mx-auto p-6 rounded-md bg-white shadow-xl border-2 border-black mt-16'>
                <h1 className='text-black text-center text-2xl font-bold'>Countries you added</h1>
                <div className='flex flex-wrap gap-4 mt-8'>
                    {
                        allData.map((data, index) => (
                            <div key={data._id} className='w-[180px] bg-[#d90429] text-white rounded-md py-2 px-4'>
                                <h1 className='font-semibold'><span>{index + 1}.</span> {data.data}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Index;