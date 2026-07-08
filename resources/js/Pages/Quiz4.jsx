import React, { useState, useEffect } from 'react';

export default function Quiz4() {
    // 1. Define states for student data and loading status
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch data from API on component mount
    useEffect(() => {
        fetch('/api/students')
            .then((response) => response.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
                
                {/* Header Section */}
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Student List (Quiz 4)</h1>
                    <p className="text-sm text-gray-600 mt-1">Displaying database records using Fetch API + Inertia.js</p>
                </div>

                {/* Loading State Handling */}
                {loading ? (
                    <div className="text-center py-10 text-gray-500 font-semibold">
                        Loading data, please wait...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {/* Data Table */}
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-indigo-600 text-white text-left text-sm uppercase font-semibold">
                                    <th className="py-3 px-4 rounded-l-md">No.</th>
                                    <th className="py-3 px-4">Student Code</th>
                                    <th className="py-3 px-4">Full Name</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4 rounded-r-md">Major</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                                {students.length > 0 ? (
                                    students.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-indigo-50 transition-colors">
                                            <td className="py-3 px-4 font-medium">{index + 1}</td>
                                            <td className="py-3 px-4 text-indigo-600 font-semibold">{student.student_code}</td>
                                            <td className="py-3 px-4">{student.first_name} {student.last_name}</td>
                                            <td className="py-3 px-4">{student.email}</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                    {student.major}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-500 font-medium">
                                            No student records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
            </div>
        </div>
    );
}