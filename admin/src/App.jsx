 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch contacts from API
    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/contacts');
            setContacts(res.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete a contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            fetchContacts(); // Refresh list
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="admin-container">
            <h1>Excellent Play School - Admin Panel</h1>
            <div className="contact-list">
                {loading ? (
                    <p>Loading contacts...</p>
                ) : contacts.length === 0 ? (
                    <p>No contacts submitted yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact._id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.phone}</td>
                                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => deleteContact(contact._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default App;