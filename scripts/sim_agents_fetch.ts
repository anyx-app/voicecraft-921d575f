/* eslint-disable */
import { supabase } from '../src/sdk/supabase';

// Mock environment variables
process.env.VITE_PROJECT_ID = 'test-project';
process.env.VITE_ANYX_SERVER_URL = 'http://localhost:3000';

// Mock global fetch
const mockFetch = async (url: string, options: any) => {
  console.log(`[MockFetch] Request to ${url}`);
  console.log(`[MockFetch] Method: ${options.method}`);
  console.log(`[MockFetch] Body: ${options.body}`);

  if (url.includes('/query') && options.method === 'POST') {
    const body = JSON.parse(options.body);
    if (body.table === 'agents' && body.operation === 'select') {
      return {
        ok: true,
        json: async () => ({
          data: [
            { id: '1', name: 'Agent 1', status: 'active', created_at: new Date().toISOString() },
            { id: '2', name: 'Agent 2', status: 'draft', created_at: new Date().toISOString() }
          ],
          error: null
        })
      };
    }
  }

  return {
    ok: false,
    status: 404,
    text: async () => 'Not Found'
  };
};

// @ts-ignore
global.fetch = mockFetch;

async function runSimulation() {
  console.log('Starting Agents Fetch Simulation...');

  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Simulation Failed: Error returned', error);
      process.exit(1);
    }

    if (!data || !Array.isArray(data)) {
      console.error('Simulation Failed: Invalid data format', data);
      process.exit(1);
    }

    console.log('Simulation Success: Fetched agents:', data.length);
    console.log('First agent:', data[0]);
    
  } catch (err) {
    console.error('Simulation Failed: Exception thrown', err);
    process.exit(1);
  }
}

runSimulation();

