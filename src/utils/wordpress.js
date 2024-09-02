import axios from 'axios';

const API_URL = 'https://newtpm.secureclouddns.net/wp-json/wp/v2/pages/108238';
const TOKEN_URL = 'https://newtpm.secureclouddns.net/wp-json/jwt-auth/v1/token';
const USERNAME = 'admin'; // JWT username
const PASSWORD = 'Nahar@5683'; // JWT password

async function getToken() {
    try {
        const response = await axios.post(TOKEN_URL, {
            username: USERNAME,
            password: PASSWORD,
        });
        return response.data.token;
    } catch (error) {
        console.error('Token fetch error:', error);
        throw new Error('Failed to fetch token');
    }
}

async function fetchContent() {
    try {
        console.log('Fetching current content...');
        const response = await axios.get(API_URL);
        console.log('Content fetched successfully.');
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch content');
    }
}

async function updateContent() {
    try {
        const token = await getToken();
        const currentContent = await fetchContent();

        // Modify the content as needed
        const modifiedContent = {
            ...currentContent,
            content: {
                ...currentContent.content,
                rendered: currentContent.content.rendered.replace(/UAE/g, 'India') + ` Updated at: ${new Date().toISOString()}`,
            },
        };
        console.log("modified content");
        
        console.log( modifiedContent.content)
        const updateObject = {
            title: `Updated Title ${new Date().toISOString()}`,
            content: modifiedContent.content,
            status: 'publish',
        };

        console.log('Updating content...');

        const updateResponse = await axios.post(API_URL, updateObject, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Content updated successfully:', updateResponse.data);
        return updateResponse.data;

    } catch (error) {
        console.error('Update post error:', error.response?.data || error.message);
        throw new Error('Failed to update content');
    }
}

async function updatePageMeta(metadata) {
    try {
        const token = await getToken();

        const updateResponse = await axios.put(
            API_URL,
            {
                meta: metadata,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Meta updated successfully:', updateResponse.data);
        return updateResponse.data;

    } catch (error) {
        console.error('Update meta error:', error.response?.data || error.message);
        throw new Error('Failed to update meta');
    }
}

export { fetchContent, updateContent, updatePageMeta };
