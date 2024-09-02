"use client"
import { useEffect, useState } from 'react';
import { updateContent, updatePageMeta } from '../../utils/wordpress';

export default function UpdatePage() {
    const [status, setStatus] = useState('');

    useEffect(() => {
        async function updatePage() {
            try {
                await updateContent();
                setStatus('Content updated successfully!');

                const metadata = {
                    '_elementor_data': [],
                };
                await updatePageMeta(metadata);
                setStatus(prev => prev + ' Meta updated successfully!');
            } catch (error) {
                console.error(error.message);
                setStatus('An error occurred during the update.');
            }
        }

        updatePage();
    }, []);

    return (
        <div>
            <h1>Update Page</h1>
            <p>{status}</p>
        </div>
    );
}
