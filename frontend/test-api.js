// Simple test script to verify API functionality
import { unifiedSearch, getGenres } from './src/api/unified.js';

async function testAPIs() {
    console.log('Testing Movie Discovery APIs...\n');
    
    try {
        // Test unified search
        console.log('1. Testing unified search for "Batman"...');
        const searchResults = await unifiedSearch('Batman', {
            source: 'both',
            type: 'movie',
            year: 2022
        });
        console.log(`Found ${searchResults.results.length} results`);
        console.log('First result:', searchResults.results[0]?.title || 'No results');
        
        // Test genre fetching
        console.log('\n2. Testing genre fetching...');
        const genres = await getGenres('movie');
        console.log(`Found ${genres.genres?.length || 0} movie genres`);
        console.log('First few genres:', genres.genres?.slice(0, 3).map(g => g.name).join(', ') || 'No genres');
        
        console.log('\n✅ API tests completed successfully!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
    }
}

testAPIs();