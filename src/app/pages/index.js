import { supabase } from '../lib/supabase';

export async function getServerSideProps() {
  const { data, error } = await supabase.from('your_table_name').select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } };
  }

  return {
    props: {
      data,
    },
  };
}

export default function HomePage({ data }) {
  return (
    <div>
      <h1>Data from Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
