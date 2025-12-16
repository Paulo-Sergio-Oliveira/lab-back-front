const PORT = 3000;
const API_URL = `http://localhost:${PORT}`;

async function runTests() {
    console.log("Running tests...");
    let hasError = false;

    try {
        const response = await fetch(`${API_URL}/items`);
        if (response.status === 200) {
            console.log("Test 1: GET /items passed");
        } else {
            throw new Error(`Expected 200, got ${response.status}`);
        }
    } catch (error) {
        console.error("Test 1 failed:", error.message);
        hasError = true;
    }

    try {
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "Item de Teste Automatizado" })
        });
        if (response.status === 201) {
            console.log("Test 2: POST /items passed");
        } else {
            throw new Error(`Expected 201, got ${response.status}`);
        }
    } catch (error) {
        console.error("Test 2 failed:", error.message);
        hasError = true;
    }

    if (hasError) process.exit(1); 
}

runTests();